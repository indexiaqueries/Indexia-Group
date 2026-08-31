/**
 * Fix untranslated strings across all locale files.
 *
 * Usage:  node scripts/fix-translations.js
 *         node scripts/fix-translations.js --dry-run   (preview only)
 */

import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const localesDir = resolve(__dirname, "../src/i18n/locales");
const isDryRun = process.argv.includes("--dry-run");

// ── Language names (common.languages.*) — each language's name in its own script ──
const languageNames = {
  ar: { id: "الإندونيسية", nl: "هولندية", uk: "أوكرانية", vi: "فيتنامية" },
  de: { id: "Indonesisch", nl: "Niederländisch", uk: "Ukrainisch", vi: "Vietnamesisch" },
  el: { id: "Ινδονεσιακά", nl: "Ολλανδικά", uk: "Ουκρανικά", vi: "Βιετναμέζικα" },
  en: { id: "Bahasa Indonesia", nl: "Nederlands", uk: "Українська", vi: "Tiếng Việt" },
  es: { id: "Indonesio", nl: "Neerlandés", uk: "Ucraniano", vi: "Vietnamita" },
  fr: { id: "Indonésien", nl: "Néerlandais", uk: "Ukrainien", vi: "Vietnamien" },
  he: { id: "אינדונזית", nl: "הולנדית", uk: "אוקראינית", vi: "וייטנאמית" },
  hi: { id: "इन्डोनेशियाई", nl: "डच", uk: "यूक्रेनी", vi: "वियतनामी" },
  id: { id: "Bahasa Indonesia", nl: "Nederlands", uk: "Українська", vi: "Tiếng Việt" },
  it: { id: "Indonesiano", nl: "Olandese", uk: "Ucraino", vi: "Vietnamita" },
  ja: { id: "インドネシア語", nl: "オランダ語", uk: "ウクライナ語", vi: "ベトナム語" },
  ko: { id: "인도네시아어", nl: "네덜란드어", uk: "우크라이나어", vi: "베트남어" },
  nl: { id: "Indonesisch", nl: "Nederlands", uk: "Oekraïens", vi: "Vietnamees" },
  pl: { id: "Indonejski", nl: "Holenderski", uk: "Ukraiński", vi: "Wietnamski" },
  pt: { id: "Indonésio", nl: "Neerlandês", uk: "Ucraniano", vi: "Vietnamita" },
  ru: { id: "Индонезийский", nl: "Нидерландский", uk: "Украинский", vi: "Вьетнамский" },
  sv: { id: "Indonesiska", nl: "Nederländska", uk: "Ukrainska", vi: "Vietnamesiska" },
  th: { id: "อินโดนีเซีย", nl: "ดัตช์", uk: "ยูเครน", vi: "เวียดนาม" },
  tr: { id: "Endonezce", nl: "Felemenkçe", uk: "Ukraynaca", vi: "Vietnamca" },
  uk: { id: "Індонезійська", nl: "Нідерландська", uk: "Українська", vi: "В'єтнамська" },
  vi: { id: "Tiếng Indonesia", nl: "Tiếng Hà Lan", uk: "Tiếng Ukraina", vi: "Tiếng Việt" },
  zh: { id: "印尼语", nl: "荷兰语", uk: "乌克兰语", vi: "越南语" },
};

// ── Hero tags (brand/company names — intentionally stay the same in all languages) ──
// These are company brand names and should NOT be translated. Skip them.

// ── jsonLd keys (brand names — stay the same) ──
// jsonLd.orgName, jsonLd.companyPageName — skip

// ── pageContent.companies.*.name keys (brand names — stay the same) ──
// Skip these

// ── Other strings that genuinely need translation per language ──
const extraTranslations = {
  de: {
    "aboutPage.value4Title": "Innovation",
    "hero.p0.tag": "Indexia Group",
    "newsPage.tvCaption": "Loan Chahiye Matlab… Indexia Finance",
    "newsPage.tvHeadingAccent": "Indexia Finance",
  },
  el: {
    "hero.p0.tag": "Indexia Group",
    "hero.p1.tag": "Indexia Finance",
    "hero.p2.tag": "Indexia Finserve Pvt. Ltd.",
    "hero.p3.tag": "Indexia Overseas Pvt. Ltd.",
    "hero.p4.tag": "Indexia Agro Bio Fertilizers Pvt. Ltd.",
    "hero.p5.tag": "Indexia Securities",
    "hero.p6.tag": "Indexia Warehouse",
    "hero.p7.tag": "Indexia Advertising",
    "hero.p8.tag": "Indexia Foundation",
    "newsPage.tvCaption": "Loan Chahiye Matlab… Indexia Finance",
    "newsPage.tvHeadingAccent": "Indexia Finance",
  },
  es: {
    "hero.p0.tag": "Indexia Group",
    "newsPage.tvCaption": "Loan Chahiye Matlab… Indexia Finance",
    "newsPage.tvHeadingAccent": "Indexia Finance",
  },
  fr: {
    "aboutPage.leaderEyebrow": "Leadership",
    "aboutPage.milestone4Title": "Diversification",
    "aboutPage.value4Title": "Innovation",
    "globalResearchPage.reportFormat": "Publication",
    "globalResearchPage.reportsEyebrow": "Publications",
    "hero.p0.tag": "Indexia Group",
    "hero.p1.tag": "Indexia Finance",
    "newsHero.sectors.agriculture": "Agriculture",
    "newsPage.tvCaption": "Loan Chahiye Matlab… Indexia Finance",
    "newsPage.tvHeadingAccent": "Indexia Finance",
  },
  he: {
    "hero.p0.tag": "Indexia Group",
    "hero.p1.tag": "Indexia Finance",
    "hero.p2.tag": "Indexia Finserve Pvt. Ltd.",
    "hero.p3.tag": "Indexia Overseas Pvt. Ltd.",
    "hero.p4.tag": "Indexia Agro Bio Fertilizers Pvt. Ltd.",
    "hero.p5.tag": "Indexia Securities",
    "hero.p6.tag": "Indexia Warehouse",
    "hero.p7.tag": "Indexia Advertising",
    "hero.p8.tag": "Indexia Foundation",
    "newsPage.tvCaption": "Loan Chahiye Matlab… Indexia Finance",
    "newsPage.tvHeadingAccent": "Indexia Finance",
  },
  hi: {
    "newsPage.tvHeadingAccent": "Indexia Finance",
  },
  id: {
    "hero.p0.tag": "Indexia Group",
    "hero.p1.tag": "Indexia Finance",
    "hero.p2.tag": "Indexia Finserve Pvt. Ltd.",
    "hero.p3.tag": "Indexia Overseas Pvt. Ltd.",
    "hero.p4.tag": "Indexia Agro Bio Fertilizers Pvt. Ltd.",
    "hero.p5.tag": "Indexia Securities",
    "hero.p6.tag": "Indexia Warehouse",
    "hero.p7.tag": "Indexia Advertising",
    "hero.p8.tag": "Indexia Foundation",
    "newsPage.tvHeadingAccent": "Indexia Finance",
  },
  it: {
    "aboutPage.leaderEyebrow": "Leadership",
    "contactInfo.headlineAccent": "Indexia Company",
    "hero.p0.tag": "Indexia Group",
    "newsPage.tvCaption": "Loan Chahiye Matlab… Indexia Finance",
    "newsPage.tvHeadingAccent": "Indexia Finance",
  },
  ja: {
    "newsPage.tvHeadingAccent": "Indexia Finance",
  },
  ko: {
    "hero.p0.tag": "Indexia Group",
    "hero.p1.tag": "Indexia Finance",
    "hero.p2.tag": "Indexia Finserve Pvt. Ltd.",
    "hero.p3.tag": "Indexia Overseas Pvt. Ltd.",
    "hero.p4.tag": "Indexia Agro Bio Fertilizers Pvt. Ltd.",
    "hero.p5.tag": "Indexia Securities",
    "hero.p6.tag": "Indexia Warehouse",
    "hero.p7.tag": "Indexia Advertising",
    "hero.p8.tag": "Indexia Foundation",
    "newsPage.tvHeadingAccent": "Indexia Finance",
  },
  nl: {
    "hero.p0.tag": "Indexia Group",
    "hero.p1.tag": "Indexia Finance",
    "hero.p2.tag": "Indexia Finserve Pvt. Ltd.",
    "hero.p3.tag": "Indexia Overseas Pvt. Ltd.",
    "hero.p4.tag": "Indexia Agro Bio Fertilizers Pvt. Ltd.",
    "hero.p5.tag": "Indexia Securities",
    "hero.p6.tag": "Indexia Warehouse",
    "hero.p7.tag": "Indexia Advertising",
    "hero.p8.tag": "Indexia Foundation",
    "newsPage.tvHeadingAccent": "Indexia Finance",
  },
  pl: {
    "hero.p0.tag": "Indexia Group",
    "hero.p1.tag": "Indexia Finance",
    "hero.p2.tag": "Indexia Finserve Pvt. Ltd.",
    "hero.p3.tag": "Indexia Overseas Pvt. Ltd.",
    "hero.p4.tag": "Indexia Agro Bio Fertilizers Pvt. Ltd.",
    "hero.p5.tag": "Indexia Securities",
    "hero.p6.tag": "Indexia Warehouse",
    "hero.p7.tag": "Indexia Advertising",
    "hero.p8.tag": "Indexia Foundation",
    "newsPage.tvHeadingAccent": "Indexia Finance",
  },
  pt: {
    "contactInfo.headlineAccent": "Indexia Company",
    "hero.p0.tag": "Indexia Group",
    "newsPage.tvCaption": "Loan Chahiye Matlab… Indexia Finance",
    "newsPage.tvHeadingAccent": "Indexia Finance",
  },
  ru: {
    "hero.p1.tag": "Indexia Finance",
    "hero.p2.tag": "Indexia Finserve Pvt. Ltd.",
    "hero.p3.tag": "Indexia Overseas Pvt. Ltd.",
    "hero.p4.tag": "Indexia Agro Bio Fertilizers Pvt. Ltd.",
    "hero.p5.tag": "Indexia Securities",
    "hero.p6.tag": "Indexia Warehouse",
    "hero.p7.tag": "Indexia Advertising",
    "newsPage.tvCaption": "Loan Chahiye Matlab… Indexia Finance",
    "newsPage.tvHeadingAccent": "Indexia Finance",
  },
  sv: {
    "aboutPage.c3Tag": "Global Export",
    "aboutPage.value4Title": "Innovation",
    "hero.p0.tag": "Indexia Group",
    "hero.p1.tag": "Indexia Finance",
    "hero.p2.tag": "Indexia Finserve Pvt. Ltd.",
    "hero.p3.tag": "Indexia Overseas Pvt. Ltd.",
    "hero.p4.tag": "Indexia Agro Bio Fertilizers Pvt. Ltd.",
    "hero.p5.tag": "Indexia Securities",
    "hero.p6.tag": "Indexia Warehouse",
    "hero.p7.tag": "Indexia Advertising",
    "hero.p8.tag": "Indexia Foundation",
    "newsPage.tvCaption": "Loan Chahiye Matlab… Indexia Finance",
    "newsPage.tvHeadingAccent": "Indexia Finance",
    "pageContent.careers.roles.business-development.title": "Business Development Executive",
  },
  th: {
    "hero.p0.tag": "Indexia Group",
    "hero.p1.tag": "Indexia Finance",
    "hero.p2.tag": "Indexia Finserve Pvt. Ltd.",
    "hero.p3.tag": "Indexia Overseas Pvt. Ltd.",
    "hero.p4.tag": "Indexia Agro Bio Fertilizers Pvt. Ltd.",
    "hero.p5.tag": "Indexia Securities",
    "hero.p6.tag": "Indexia Warehouse",
    "hero.p7.tag": "Indexia Advertising",
    "hero.p8.tag": "Indexia Foundation",
    "newsPage.tvCaption": "Loan Chahiye Matlab… Indexia Finance",
    "newsPage.tvHeadingAccent": "Indexia Finance",
  },
  tr: {
    "hero.p0.tag": "Indexia Group",
    "hero.p1.tag": "Indexia Finance",
    "hero.p2.tag": "Indexia Finserve Pvt. Ltd.",
    "hero.p3.tag": "Indexia Overseas Pvt. Ltd.",
    "hero.p4.tag": "Indexia Agro Bio Fertilizers Pvt. Ltd.",
    "hero.p5.tag": "Indexia Securities",
    "hero.p6.tag": "Indexia Warehouse",
    "hero.p7.tag": "Indexia Advertising",
    "hero.p8.tag": "Indexia Foundation",
    "newsPage.tvHeadingAccent": "Indexia Finance",
  },
  uk: {
    "hero.p0.tag": "Indexia Group",
    "hero.p1.tag": "Indexia Finance",
    "hero.p2.tag": "Indexia Finserve Pvt. Ltd.",
    "hero.p3.tag": "Indexia Overseas Pvt. Ltd.",
    "hero.p4.tag": "Indexia Agro Bio Fertilizers Pvt. Ltd.",
    "hero.p5.tag": "Indexia Securities",
    "hero.p6.tag": "Indexia Warehouse",
    "hero.p7.tag": "Indexia Advertising",
    "hero.p8.tag": "Indexia Foundation",
    "newsPage.tvCaption": "Loan Chahiye Matlab… Indexia Finance",
    "newsPage.tvHeadingAccent": "Indexia Finance",
  },
  vi: {
    "hero.p0.tag": "Indexia Group",
    "hero.p1.tag": "Indexia Finance",
    "hero.p2.tag": "Indexia Finserve Pvt. Ltd.",
    "hero.p3.tag": "Indexia Overseas Pvt. Ltd.",
    "hero.p4.tag": "Indexia Agro Bio Fertilizers Pvt. Ltd.",
    "hero.p5.tag": "Indexia Securities",
    "hero.p6.tag": "Indexia Warehouse",
    "hero.p7.tag": "Indexia Advertising",
    "hero.p8.tag": "Indexia Foundation",
    "newsPage.tvHeadingAccent": "Indexia Finance",
  },
};

// ── Helpers ──

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

function countChanges(obj, prefix = "") {
  let count = 0;
  for (const [k, v] of Object.entries(obj)) {
    if (typeof v === "object" && v !== null && !Array.isArray(v)) {
      count += countChanges(v, prefix ? prefix + "." + k : k);
    }
  }
  return count;
}

// ── Main ──
const files = ["ar", "de", "el", "es", "fr", "he", "hi", "id", "it", "ja", "ko", "nl", "pl", "pt", "ru", "sv", "th", "tr", "uk", "vi", "zh"];

let totalUpdated = 0;

for (const lang of files) {
  const filePath = resolve(localesDir, `${lang}.json`);
  const data = JSON.parse(readFileSync(filePath, "utf8"));
  let changed = 0;

  // 1. Fix language names
  if (languageNames[lang]) {
    for (const [key, val] of Object.entries(languageNames[lang])) {
      const path = `common.languages.${key}`;
      const current = getByPath(data, path);
      if (current !== val) {
        if (!isDryRun) setByPath(data, path, val);
        changed++;
      }
    }
  }

  // 2. Fix extra translations (brand names that stay the same, or other strings)
  if (extraTranslations[lang]) {
    for (const [key, val] of Object.entries(extraTranslations[lang])) {
      const current = getByPath(data, key);
      if (current !== val) {
        if (!isDryRun) setByPath(data, key, val);
        changed++;
      }
    }
  }

  if (changed > 0) {
    console.log(`${lang}.json: ${changed} string(s) updated`);
    if (!isDryRun) {
      writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n", "utf8");
    }
    totalUpdated += changed;
  }
}

console.log(`\n${isDryRun ? "Dry run" : "Done"}. ${totalUpdated} total string(s) ${isDryRun ? "would be" : "were"} updated across ${files.length} languages.`);
