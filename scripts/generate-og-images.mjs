// Build-time: generate 1200×630 OG images for each company page and the
// static routes from existing artwork, into public/images/og/.
// Output is committed with the repo so builds don't depend on this step.
import sharp from "sharp";
import { mkdirSync } from "node:fs";
import path from "node:path";

const OUT_DIR = path.resolve("public/images/og");
mkdirSync(OUT_DIR, { recursive: true });

// Company art lives in src/assets/company-img (Vite-imported at runtime,
// readable directly here for generation).
const SOURCES = [
  { slug: "finance", file: "src/assets/company-img/IndexiaFinance.webp" },
  { slug: "finserve", file: "src/assets/company-img/IndexiaFinserve.webp" },
  { slug: "overseas", file: "src/assets/company-img/IndexiaOverseas.webp" },
  { slug: "agro-bio", file: "src/assets/company-img/IndexiaAgroBioFertilizers.webp" },
  { slug: "securities", file: "src/assets/company-img/IndexiaSecurities.webp" },
  { slug: "warehouse", file: "src/assets/company-img/IndexiaWarehouse.webp" },
  { slug: "advertising", file: "src/assets/company-img/IndexiaAdvertising.webp" },
  { slug: "foundation", file: "src/assets/company-img/IndexiaFoundation.webp" },
  { slug: "about", file: "src/assets/about-img/OurStory.webp" },
  { slug: "contact", file: "src/assets/contact-img/delhioffice.webp" },
  { slug: "careers", file: "src/assets/careers-img/OpenPositions.webp" },
  { slug: "news", file: "public/images/heroes/news-hero.webp" },
  { slug: "global-research", file: "public/images/heroes/research-hero.webp" },
  { slug: "security-tips", file: "public/images/heroes/security-hero.webp" },
];

const W = 1200;
const H = 630;

for (const { slug, file } of SOURCES) {
  try {
    // Smart-crop to 1200×630 (entropy keeps the interesting region), JPEG
    // quality 82 — the classic unfurl size, small enough to load fast.
    await sharp(file)
      .resize(W, H, { fit: "cover", position: sharp.strategy.entropy })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(path.join(OUT_DIR, `${slug}.jpg`));
    console.log(`og: ${slug}.jpg`);
  } catch (err) {
    console.warn(`og: SKIP ${slug} (${err.message})`);
  }
}
console.log("OG image generation complete.");
