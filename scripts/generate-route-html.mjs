// Build-time (npm run postbuild): emit dist/<route>/index.html for every
// public route so the STATIC deployment (Apache) serves per-page preview
// tags without any server-side rewriting. Social unfurlers and browsers
// alike get the right title/description/image per URL.
//
// Uses the shared route metadata (shared/routeMeta.js) — the same source
// the Render crawler middleware reads, so the two deployments never drift.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import path from "node:path";
import { ROUTES, COMPANY_SLUGS, buildPreviewHtml } from "../shared/routeMeta.js";

const DIST_DIR = path.resolve("dist");
const templatePath = path.join(DIST_DIR, "index.html");
if (!existsSync(templatePath)) {
  console.error("postbuild: dist/index.html not found — run `vite build` first.");
  process.exit(1);
}
const template = readFileSync(templatePath, "utf8");

// The company page slugs must match what AppRoutes actually registers.
// Drift here would emit dead directories, so fail loudly instead.
const appRoutesSrc = readFileSync("src/routes/AppRoutes.tsx", "utf8");
for (const slug of COMPANY_SLUGS) {
  if (!appRoutesSrc.includes(`"/${slug}"`) && !appRoutesSrc.includes(`'/${slug}'`)) {
    // Slugs come from companies.ts and are spread via companies.map(...), so a
    // literal check needs the companies import instead — fall back to data.
    const companiesSrc = readFileSync("src/data/companies.ts", "utf8");
    if (!companiesSrc.includes(`slug: "${slug}"`)) {
      console.error(`postbuild: slug "${slug}" exists in shared/routeMeta.js but not in src/data/companies.ts — out of sync.`);
      process.exit(1);
    }
  }
}

let emitted = 0;
for (const [route, preview] of Object.entries(ROUTES)) {
  // Admin is served by the Express deployment only; skip static admin HTML.
  if (route.startsWith("/admin")) continue;
  // Brochure pages are robots-blocked; still emit them so shared brochure
  // links unfurl with the right preview (noindex meta is included).

  const html = buildPreviewHtml(template, preview, route);
  const dir = path.join(DIST_DIR, route);
  mkdirSync(dir, { recursive: true });
  writeFileSync(path.join(dir, "index.html"), html);
  emitted += 1;
  console.log(`route-html: ${route === "/" ? "/" : route + "/"}index.html`);
}
console.log(`postbuild: emitted ${emitted} per-route HTML files.`);
