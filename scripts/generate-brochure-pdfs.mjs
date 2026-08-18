// Renders the brochure pages to branded PDFs with headless Chrome during the build.
//
// Flow: build (vite build) -> this script serves dist/ with `vite preview`, opens
// each brochure route in headless Chrome, and prints it to a PDF with backgrounds,
// logo and imagery intact. Output goes to dist/brochures (served now) and
// public/brochures (source, copied on the next build).
//
// Chrome/Edge is discovered from common install locations (or CHROME_PATH).
// If no browser is found the script warns and keeps any existing PDFs.

import { spawn } from "node:child_process";
import { existsSync, mkdirSync, copyFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(ROOT, "dist");
const VITE_BIN = path.join(ROOT, "node_modules", "vite", "bin", "vite.js");

const PAGES = [
  { route: "/warehouse-brochure", pdf: "indexia-warehouse.pdf" },
  { route: "/advertising-brochure", pdf: "indexia-advertising.pdf" },
];

const PORT = 4173;
const BASE = `http://localhost:${PORT}`;

const BROWSER_CANDIDATES = [
  process.env.CHROME_PATH,
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "/usr/bin/google-chrome",
  "/usr/bin/google-chrome-stable",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
].filter(Boolean);

const findBrowser = () => BROWSER_CANDIDATES.find((p) => p && existsSync(p));

const waitForServer = async (timeoutMs = 20000) => {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(BASE);
      if (res.ok) return true;
    } catch {
      /* not up yet */
    }
    await new Promise((r) => setTimeout(r, 300));
  }
  return false;
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const main = async () => {
  if (!existsSync(path.join(DIST, "index.html"))) {
    console.error("[pdf] dist/ not found — run `vite build` first. Skipping PDF generation.");
    process.exit(1);
  }

  const chromePath = findBrowser();
  if (!chromePath) {
    console.warn("[pdf] No Chrome/Edge found — keeping existing brochure PDFs. Set CHROME_PATH to enable rendering.");
    return;
  }
  console.log(`[pdf] Using ${chromePath}`);

  const server = spawn(
    process.execPath,
    [VITE_BIN, "preview", "--port", String(PORT), "--strictPort"],
    { cwd: ROOT, stdio: "ignore" }
  );

  try {
    if (!(await waitForServer())) {
      throw new Error("vite preview did not become ready in time");
    }

    const browser = await puppeteer.launch({ executablePath: chromePath, headless: true });

    try {
      for (const { route, pdf } of PAGES) {
        const page = await browser.newPage();
        try {
          await page.setViewport({ width: 1240, height: 1754, deviceScaleFactor: 1 });
          const res = await page.goto(`${BASE}${route}`, { waitUntil: "networkidle2", timeout: 60000 });
          if (!res || !res.ok()) throw new Error(`${route} returned ${res?.status?.() ?? "no response"}`);

          // Wait for the brochure sheet (logo band) to render, then let fonts settle.
          await page.waitForSelector("article header h1", { timeout: 20000 });
          await sleep(1200);

          const distOut = path.join(DIST, "brochures", pdf);
          mkdirSync(path.dirname(distOut), { recursive: true });
          await page.pdf({
            path: distOut,
            format: "A4",
            printBackground: true,
            margin: { top: 0, right: 0, bottom: 0, left: 0 },
          });
          console.log(`[pdf] wrote ${distOut}`);
        } finally {
          await page.close();
        }
      }
    } finally {
      await browser.close();
    }

    // Keep the source PDFs fresh so the next build ships the same branded files.
    const srcOut = path.join(ROOT, "public", "brochures");
    mkdirSync(srcOut, { recursive: true });
    for (const { pdf } of PAGES) {
      copyFileSync(path.join(DIST, "brochures", pdf), path.join(srcOut, pdf));
    }
    console.log(`[pdf] synced ${PAGES.length} PDFs to public/brochures`);
  } catch (err) {
    console.error("[pdf] failed:", err.message);
    process.exitCode = 1;
  } finally {
    server.kill();
  }
};

main();
