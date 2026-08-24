#!/usr/bin/env node
/**
 * generate-hero-quality-variants.mjs
 *
 * Generates intermediate quality WebP variants (q80, q90) from the hero
 * images for better LCP performance on slow connections.
 *
 * Usage: node scripts/generate-hero-quality-variants.mjs
 */

import sharp from "sharp";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = join(__dirname, "..", "public");
const ASSETS_DIR = join(__dirname, "..", "src", "assets", "company-img");

const IMAGES = [
  {
    src: join(ASSETS_DIR, "IndexiaGroup.webp"),
    outDir: PUBLIC_DIR,
    names: { q80: "IndexiaGroup-q80.webp", q90: "IndexiaGroup-q90.webp" },
  },
  {
    src: join(ASSETS_DIR, "mobile", "IndexiaGroup-mobile.webp"),
    outDir: PUBLIC_DIR,
    names: {
      q80: "IndexiaGroup-mobile-q80.webp",
      q90: "IndexiaGroup-mobile-q90.webp",
    },
  },
];

async function generateVariants() {
  console.log("[hero-quality] Generating intermediate WebP variants…");

  for (const { src, outDir, names } of IMAGES) {
    if (!existsSync(src)) {
      console.warn(`[hero-quality] Source not found: ${src} — skipping`);
      continue;
    }

    for (const quality of [80, 90]) {
      const outPath = join(outDir, names[`q${quality}`]);
      await sharp(src)
        .webp({ quality })
        .toFile(outPath);

      const stats = await sharp(outPath).metadata();
      console.log(
        `[hero-quality] ${names[`q${quality}`]} — ${quality}% quality, ${stats.width}×${stats.height}`
      );
    }
  }

  console.log("[hero-quality] Done.");
}

generateVariants().catch((err) => {
  console.error("[hero-quality] Error:", err);
  process.exit(1);
});
