/**
 * Deduplicate newsarticles collection.
 * Keeps the newest document per (category, link) pair and removes older duplicates.
 *
 * Usage:  node scripts/deduplicate-news.js
 *         node scripts/deduplicate-news.js --dry-run   (preview only, no deletes)
 */

import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import mongoose from "mongoose";

// Load env from server/.env (same as the dev server does)
const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, "../server/.env");
try {
  const envContent = readFileSync(envPath, "utf8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    let val = trimmed.slice(eqIdx + 1).trim();
    // Strip surrounding quotes (single or double)
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = val;
  }
} catch {
  console.warn(`[dedup] Could not read ${envPath} — relying on shell env vars.`);
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("MONGODB_URI not set — cannot connect to the database.");
  process.exit(1);
}

const isDryRun = process.argv.includes("--dry-run");

async function run() {
  await mongoose.connect(MONGODB_URI);
  console.log("[dedup] Connected to MongoDB");

  const col = mongoose.connection.db.collection("newsarticles");

  // Aggregate to find duplicate (category, link) groups with more than 1 doc
  const duplicates = await col
    .aggregate([
      { $group: { _id: { category: "$category", link: "$link" }, docs: { $push: "$$ROOT" }, count: { $sum: 1 } } },
      { $match: { count: { $gt: 1 } } },
      { $sort: { "_id.category": 1, "_id.link": 1 } },
    ])
    .toArray();

  if (duplicates.length === 0) {
    console.log("[dedup] No duplicates found — collection is clean.");
    await mongoose.disconnect();
    return;
  }

  let totalRemoved = 0;

  for (const group of duplicates) {
    const { category, link } = group._id;
    // Sort by createdAt descending — keep the newest
    const sorted = group.docs.sort(
      (a, b) => new Date(b.createdAt || b.pubDate) - new Date(a.createdAt || a.pubDate)
    );
    const toRemove = sorted.slice(1); // everything after the first (newest) is a duplicate

    console.log(
      `[dedup] ${category}: "${link.slice(0, 80)}${link.length > 80 ? "..." : ""}" — ${group.docs.length} copies, removing ${toRemove.length}`
    );

    if (!isDryRun) {
      const ids = toRemove.map((d) => d._id);
      await col.deleteMany({ _id: { $in: ids } });
    }

    totalRemoved += toRemove.length;
  }

  console.log(
    `\n[dedup] ${isDryRun ? "Dry run" : "Done"}. ${totalRemoved} duplicate(s) ${isDryRun ? "would be" : "were"} removed across ${duplicates.length} group(s).`
  );

  await mongoose.disconnect();
}

run().catch((err) => {
  console.error("[dedup] Error:", err.message);
  process.exit(1);
});
