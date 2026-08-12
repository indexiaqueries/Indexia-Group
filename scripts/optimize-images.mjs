import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const assetsDir = path.join(root, "src", "assets");

const out = [];
const total = (label, from, to) => out.push(`${label}: ${(from / 1024).toFixed(0)}KB -> ${(to / 1024).toFixed(0)}KB`);

const heroes = ["BusinessesHero", "ContactHero"];
for (const name of heroes) {
  const webpSrc = path.join(assetsDir, `${name}.webp`);
  if (!existsSync(webpSrc)) continue;
  const before = (await import("node:fs")).statSync(webpSrc).size;

  await sharp(webpSrc).rotate().resize({ width: 1920, withoutEnlargement: true }).webp({ quality: 76, effort: 6 }).toFile(path.join(assetsDir, `${name}.webp`));
  const webp = (await import("node:fs")).statSync(path.join(assetsDir, `${name}.webp`)).size;
  total(`${name} (webp)`, before, webp);
}

const logoSrc = path.join(assetsDir, "IndexiaGroup_Logo.gif");
if (existsSync(logoSrc)) {
  const before = (await import("node:fs")).statSync(logoSrc).size;
  await sharp(logoSrc, { animated: true })
    .resize({ width: 240, height: 240, fit: "contain" })
    .gif({ colours: 128, effort: 2 })
    .toFile(path.join(assetsDir, "IndexiaGroup_Logo.small.gif"));
  const after = (await import("node:fs")).statSync(path.join(assetsDir, "IndexiaGroup_Logo.small.gif")).size;
  total("logo.gif", before, after);
}

console.log(out.join("\n"));
