#!/usr/bin/env node
/**
 * generate-responsive-images.mjs
 *
 * Scans src/assets for images >150KB, generates responsive WebP variants
 * at 400w, 800w, and 1200w into src/assets-responsive/<subdir>/.
 *
 * The variant filenames use the pattern:
 *   <original-basename>-<width>.webp
 *
 * These are then importable via Vite's import.meta.glob in the
 * ResponsiveImage component.
 *
 * Usage:  node scripts/generate-responsive-images.mjs
 *         (runs automatically as part of `npm run build` pre-step)
 */

import { readdirSync, statSync, mkdirSync, existsSync } from "node:fs";
import { join, basename, dirname, extname, relative } from "node:path";

const SRC_DIR = join(import.meta.dirname, "..", "src", "assets");
const OUT_DIR = join(import.meta.dirname, "..", "src", "assets-responsive");
const WIDTHS = [400, 800, 1200, 1600];
const MIN_SIZE = 150 * 1024; // 150 KB — skip small images
const IMAGE_RE = /\.(png|jpe?g)$/i; // skip already-webp (they're usually small thumbnails)

let sharp;
try {
  sharp = (await import("sharp")).default;
} catch {
  console.warn("[responsive] sharp not installed — skipping responsive image generation.");
  process.exit(0);
}

/** Recursively collect image files */
function collectImages(dir) {
  const results = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...collectImages(full));
    } else if (IMAGE_RE.test(entry.name) && statSync(full).size > MIN_SIZE) {
      results.push(full);
    }
  }
  return results;
}

const images = collectImages(SRC_DIR);

if (images.length === 0) {
  console.log("[responsive] No large source images found — nothing to do.");
  process.exit(0);
}

console.log(`[responsive] Processing ${images.length} images…`);

let generated = 0;

for (const imgPath of images) {
  const rel = relative(SRC_DIR, imgPath);
  const base = basename(imgPath, extname(imgPath));
  const outSubdir = join(OUT_DIR, dirname(rel));

  mkdirSync(outSubdir, { recursive: true });

  try {
    const meta = await sharp(imgPath).metadata();
    const origWidth = meta.width ?? 0;

    for (const w of WIDTHS) {
      if (w >= origWidth) continue; // don't upscale
      const outName = `${base}-${w}.webp`;
      const outPath = join(outSubdir, outName);

      // Skip if already up-to-date (mtime newer than source)
      if (existsSync(outPath)) {
        const outMtime = statSync(outPath).mtimeMs;
        const srcMtime = statSync(imgPath).mtimeMs;
        if (outMtime > srcMtime) continue;
      }

      await sharp(imgPath)
        .resize(w, null, { withoutEnlargement: true })
        .webp({ quality: 85, effort: 4 })
        .toFile(outPath);

      generated++;
    }
  } catch (err) {
    console.error(`[responsive] Failed: ${rel} — ${err.message}`);
  }
}

console.log(`[responsive] Done — generated ${generated} variants.`);
