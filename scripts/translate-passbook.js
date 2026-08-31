/**
 * Translate passbook card content across all languages.
 *
 * Usage:  node scripts/translate-passbook.js
 *         node scripts/translate-passbook.js --dry-run
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

// ── Passbook translations ──
const translations = {
  ar: {
    "passbook.branchOffices": "المكاتب",
    "passbook.directLines": "الخطوط المباشرة",
    "passbook.avgReplyTime": "متوسط وقت الرد",
    "passbook.enquiryStatus": "حالة الاستفسار",
    "passbook.lessThan24hrs": "أقل من 24 ساعة",
    "passbook.inReview": "قيد المراجعة",
  },
  de: {
    "passbook.branchOffices": "Niederlassungen",
    "passbook.directLines": "Direktleitungen",
    "passbook.avgReplyTime": "Durchschn. Antwortzeit",
    "passbook.enquiryStatus": "Anfragestatus",
    "passbook.lessThan24hrs": "< 24 Std.",
    "passbook.inReview": "In Bearbeitung",
  },
  hi: {
    "passbook.branchOffices": "शाखा कार्यालय",
    "passbook.directLines": "सीधी लाइनें",
    "passbook.avgReplyTime": "औसत प्रतिक्रिया समय",
    "passbook.enquiryStatus": "पूछताछ की स्थिति",
    "passbook.lessThan24hrs": "< 24 घंटे",
    "passbook.inReview": "समीक्षा में",
  },
  fr: {
    "passbook.branchOffices": "Agences",
    "passbook.directLines": "Lignes directes",
    "passbook.avgReplyTime": "Délai moyen de réponse",
    "passbook.enquiryStatus": "Statut de la demande",
    "passbook.lessThan24hrs": "< 24h",
    "passbook.inReview": "En cours d'examen",
  },
  es: {
    "passbook.branchOffices": "Sucursales",
    "passbook.directLines": "Líneas directas",
    "passbook.avgReplyTime": "Tiempo prom. de respuesta",
    "passbook.enquiryStatus": "Estado de la consulta",
    "passbook.lessThan24hrs": "< 24 hrs",
    "passbook.inReview": "En revisión",
  },
  zh: {
    "passbook.branchOffices": "分支机构",
    "passbook.directLines": "直线电话",
    "passbook.avgReplyTime": "平均回复时间",
    "passbook.enquiryStatus": "咨询状态",
    "passbook.lessThan24hrs": "< 24小时",
    "passbook.inReview": "审核中",
  },
  ja: {
    "passbook.branchOffices": "支店",
    "passbook.directLines": "直通電話",
    "passbook.avgReplyTime": "平均応答時間",
    "passbook.enquiryStatus": "お問い合わせ状況",
    "passbook.lessThan24hrs": "< 24時間",
    "passbook.inReview": "審査中",
  },
  ko: {
    "passbook.branchOffices": "지점",
    "passbook.directLines": "직통 전화",
    "passbook.avgReplyTime": "평균 응답 시간",
    "passbook.enquiryStatus": "문의 상태",
    "passbook.lessThan24hrs": "< 24시간",
    "passbook.inReview": "검토 중",
  },
};

// ── Process each language ──
const files = Object.keys(translations);
let totalUpdated = 0;

for (const lang of files) {
  const filePath = resolve(localesDir, `${lang}.json`);
  const data = JSON.parse(readFileSync(filePath, "utf8"));
  let changed = 0;

  for (const [key, val] of Object.entries(translations[lang])) {
    const current = getByPath(data, key);
    if (current !== val) {
      if (!isDryRun) setByPath(data, key, val);
      changed++;
    }
  }

  if (changed > 0) {
    console.log(`${lang}.json: ${changed} string(s) translated`);
    if (!isDryRun) {
      writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n", "utf8");
    }
    totalUpdated += changed;
  }
}

console.log(`\n${isDryRun ? "Dry run" : "Done"}. ${totalUpdated} total string(s) ${isDryRun ? "would be" : "were"} translated across ${files.length} languages.`);
