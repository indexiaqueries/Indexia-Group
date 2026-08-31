/**
 * Add missing keys from en.json to all other locale files.
 * Copies the English value as a placeholder for untranslated strings.
 *
 * Usage:  node scripts/add-missing-keys.js
 *         node scripts/add-missing-keys.js --dry-run
 */

import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const localesDir = resolve(__dirname, "../src/i18n/locales");
const isDryRun = process.argv.includes("--dry-run");

function getByPath(obj, path) {
  return path.split(".").reduce((o, k) => (o && o[k] !== undefined ? o[k] : undefined), obj);
}

function setByPath(obj, path, value) {
  const keys = path.split(".");
  let cur = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    if (!(keys[i] in cur)) cur[keys[i]] = {};
    cur = cur[keys[i]];
  }
  cur[keys[keys.length - 1]] = value;
}

function getLeafPaths(obj, prefix = "") {
  let paths = [];
  for (const [k, v] of Object.entries(obj)) {
    const full = prefix ? prefix + "." + k : k;
    if (typeof v === "object" && v !== null && !Array.isArray(v)) {
      paths.push(...getLeafPaths(v, full));
    } else {
      paths.push(full);
    }
  }
  return paths;
}

// Read English source
const en = JSON.parse(readFileSync(resolve(localesDir, "en.json"), "utf8"));
const enPaths = new Set(getLeafPaths(en));

// Process each language file
const files = ["ar", "de", "el", "es", "fr", "he", "hi", "id", "it", "ja", "ko", "nl", "pl", "pt", "ru", "sv", "th", "tr", "uk", "vi", "zh"];

let totalAdded = 0;

for (const lang of files) {
  const filePath = resolve(localesDir, `${lang}.json`);
  const data = JSON.parse(readFileSync(filePath, "utf8"));
  const langPaths = new Set(getLeafPaths(data));

  const missing = [...enPaths].filter((p) => !langPaths.has(p));

  if (missing.length > 0) {
    console.log(`${lang}.json: adding ${missing.length} missing key(s)`);
    for (const path of missing) {
      const enVal = getByPath(en, path);
      if (!isDryRun) setByPath(data, path, enVal);
    }
    if (!isDryRun) {
      writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n", "utf8");
    }
    totalAdded += missing.length;
  }
}

console.log(`\n${isDryRun ? "Dry run" : "Done"}. ${totalAdded} key(s) ${isDryRun ? "would be" : "were"} added across ${files.length} languages.`);
