#!/usr/bin/env node
/**
 * Optimize photos for the site's image slots.
 *
 * Converts each source photo to WebP at the slot's target width (quality 80,
 * effort 6, target ≤ 300 KB), saves it to `public/images/<group>/<name>.webp`,
 * and registers it in `src/data/siteImages.ts` so the placeholder swaps for
 * the picture automatically.
 *
 * Usage:
 *   node scripts/optimize-images.cjs <slotKey> <photo...>
 *     e.g. node scripts/optimize-images.cjs contactEnquiry ~/Desktop/team.jpg
 *          node scripts/optimize-images.cjs careersCulture photos/a.jpg photos/b.jpg
 *
 *   node scripts/optimize-images.cjs --all
 *     Process every photo in public/images/_incoming/ (filenames must match a
 *     slot key, ignoring case/non-alphanumerics, e.g. "ContactMumbai.jpg" ->
 *     contactMumbai). Delete files from _incoming after they are processed.
 *
 * Slot keys live in src/data/siteImages.ts.
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const ROOT = path.resolve(__dirname, "..");
const SITE_IMAGES = path.join(ROOT, "src", "data", "siteImages.ts");
const INCOMING = path.join(ROOT, "public", "images", "_incoming");
const QUALITY = 80;

// Slot -> output group folder + target width in px (long edge preserved).
const SLOT_SPECS = {
  contactCorporate: { group: "contact", width: 1536 },
  contactMumbai: { group: "contact", width: 1536 },
  contactDelhi: { group: "contact", width: 1536 },
  contactInternational: { group: "contact", width: 1536 },
  contactEnquiry: { group: "contact", width: 1024 }, // landscape 16:9 side image
  companyImpact: { group: "company", width: 1536 },
  companyStory: { group: "company", width: 1536 },
  careersCulture: { group: "careers", width: 1536 },
  careersOpenRoles: { group: "careers", width: 1536 },
  newsFeatured: { group: "news", width: 1536 },
  researchOTG: { group: "research", width: 1024 },
  researchACT: { group: "research", width: 1024 },
  researchSpecial: { group: "research", width: 1024 },
  securityFeatures: { group: "security", width: 1536 },
};
const DEFAULT_SPEC = { group: "misc", width: 1536 };

const EXTS = [".jpg", ".jpeg", ".png", ".webp", ".avif", ".heic"];

const slugify = (s) =>
  s.toLowerCase().replace(/[^a-z0-9]/g, "");

const loadSiteImages = () => fs.readFileSync(SITE_IMAGES, "utf8");

const registerInSiteImages = (slotKey, publicPath) => {
  let s = loadSiteImages();
  const keyIdx = s.indexOf(`${slotKey}: {`);
  if (keyIdx === -1) {
    throw new Error(`Slot "${slotKey}" not found in ${SITE_IMAGES}`);
  }
  const srcMatch = s.slice(keyIdx).match(/src: "[^"]*"/);
  if (!srcMatch) {
    throw new Error(`Could not find "src:" in the "${slotKey}" entry`);
  }
  const start = keyIdx + srcMatch.index;
  const end = start + srcMatch[0].length;
  s = s.slice(0, start) + `src: "${publicPath}"` + s.slice(end);
  fs.writeFileSync(SITE_IMAGES, s);
  return srcMatch[0];
};

const optimize = async ({ slotKey, source }) => {
  const spec = SLOT_SPECS[slotKey] ?? DEFAULT_SPEC;
  const stat = fs.statSync(source);
  if (!stat.isFile()) throw new Error(`Not a file: ${source}`);
  const ext = path.extname(source).toLowerCase();
  if (!EXTS.includes(ext)) throw new Error(`Unsupported type "${ext}" for ${source}`);

  const meta = await sharp(source).metadata();
  if (!meta.width || !meta.height) throw new Error(`Could not read ${source}`);
  const shrink = Math.min(1, spec.width / meta.width);
  const outW = Math.max(1, Math.round(meta.width * shrink));
  const outH = Math.max(1, Math.round(meta.height * shrink));

  const dir = path.join(ROOT, "public", "images", spec.group);
  fs.mkdirSync(dir, { recursive: true });
  const name = slugify(path.basename(source, ext)) + ".webp";
  const outPath = path.join(dir, name);

  await sharp(source)
    .rotate() // respect EXIF orientation from phone photos
    .resize(outW, outH, { fit: "inside", withoutEnlargement: true })
    .webp({ quality: QUALITY, effort: 6 })
    .toFile(outPath);

  const outStat = fs.statSync(outPath);
  const publicPath = `images/${spec.group}/${name}`;
  const oldSrc = registerInSiteImages(slotKey, publicPath);

  console.log(
    `${path.basename(source)} -> ${publicPath}  ` +
      `(${outW}×${outH}, ${(outStat.size / 1024).toFixed(0)} KB)` +
      `  src: ${oldSrc}  =>  src: "${publicPath}"`
  );
};

const main = async () => {
  const args = process.argv.slice(2);
  if (args.length === 0 || args.includes("--help")) {
    console.log(
      `Usage:\n  node scripts/optimize-images.cjs <slotKey> <photo...>\n  node scripts/optimize-images.cjs --all\n\nSlots: ${Object.keys(SLOT_SPECS).join(", ")}`
    );
    process.exit(args.includes("--help") ? 0 : 1);
  }

  const known = new Set(Object.keys(SLOT_SPECS));
  const jobs = [];

  if (args[0] === "--all") {
    if (!fs.existsSync(INCOMING)) {
      console.error(`Incoming folder not found: ${INCOMING}`);
      process.exit(1);
    }
    const files = fs
      .readdirSync(INCOMING)
      .filter((f) => EXTS.includes(path.extname(f).toLowerCase()));
    if (files.length === 0) {
      console.log("No photos in public/images/_incoming/ — drop some there and re-run.");
      process.exit(0);
    }
    const bySlug = new Map([...known].map((k) => [slugify(k), k]));
    for (const file of files) {
      const match = bySlug.get(slugify(path.basename(file, path.extname(file))));
      if (!match) {
        console.warn(`SKIP (no matching slot): ${file}`);
        continue;
      }
      jobs.push({ slotKey: match, source: path.join(INCOMING, file) });
    }
  } else {
    const slotKey = args[0];
    if (!known.has(slotKey)) {
      console.error(`Unknown slot "${slotKey}". Known slots: ${[...known].join(", ")}`);
      process.exit(1);
    }
    const sources = args.slice(1);
    if (sources.length === 0) {
      console.error(`No photos given. Usage: node scripts/optimize-images.cjs ${slotKey} <photo...>`);
      process.exit(1);
    }
    for (const s of sources) jobs.push({ slotKey, source: path.resolve(ROOT, s) });
  }

  for (const job of jobs) {
    try {
      await optimize(job);
    } catch (err) {
      console.error(`FAIL ${path.basename(job.source)}: ${err.message}`);
    }
  }
};

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
