/**
 * Translate company names across all languages.
 *
 * Usage:  node scripts/translate-company-names.js
 *         node scripts/translate-company-names.js --dry-run
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

// ── Company name translations ──
const companyNameTranslations = {
  ar: {
    "Indexia Finance": "إنديكسيا فاينانس",
    "Indexia Finserve Pvt. Ltd.": "إنديكسيا فينسرف بريفت المحدودة",
    "Indexia Overseas Pvt. Ltd.": "إنديكسيا أوفرسيز بريفت المحدودة",
    "Indexia Agro Bio Fertilizers Pvt. Ltd.": "إنديكسيا أوروبيو للأسمدة بريفت المحدودة",
    "Indexia Securities": "إنديكسيا سيكيوريتيز",
    "Indexia Warehouse": "إنديكسيا ويرهاوس",
    "Indexia Advertising": "إنديكسيا أدفرتايزنغ",
    "Indexia Foundation": "إنديكسيا فاونديشن",
    "Indexia Group": "مجموعة إنديكسيا",
    "Indexia Finserve": "إنديكسيا فينسرف",
    "Indexia Overseas": "إنديكسيا أوفرسيز",
    "Indexia Agro Bio": "إنديكسيا أوروبيو",
  },
  de: {
    "Indexia Finance": "Indexia Finanz",
    "Indexia Finserve Pvt. Ltd.": "Indexia Finserve GmbH",
    "Indexia Overseas Pvt. Ltd.": "Indexia International GmbH",
    "Indexia Agro Bio Fertilizers Pvt. Ltd.": "Indexia Agro Bio Düngemittel GmbH",
    "Indexia Securities": "Indexia Sicherheit",
    "Indexia Warehouse": "Indexia Lager",
    "Indexia Advertising": "Indexia Werbung",
    "Indexia Foundation": "Indexia Stiftung",
    "Indexia Group": "Indexia Gruppe",
    "Indexia Finserve": "Indexia Finserve",
    "Indexia Overseas": "Indexia International",
    "Indexia Agro Bio": "Indexia Agro Bio",
  },
  hi: {
    "Indexia Finance": "इंडेक्सिया फाइनेंस",
    "Indexia Finserve Pvt. Ltd.": "इंडेक्सिया फिनसर्व प्राइवेट लिमिटेड",
    "Indexia Overseas Pvt. Ltd.": "इंडेक्सिया ओवरसीज़ प्राइवेट लिमिटेड",
    "Indexia Agro Bio Fertilizers Pvt. Ltd.": "इंडेक्सिया एग्रो बायो फर्टिलाइज़र्स प्राइवेट लिमिटेड",
    "Indexia Securities": "इंडेक्सिया सिक्योरिटीज़",
    "Indexia Warehouse": "इंडेक्सिया वेयरहाउस",
    "Indexia Advertising": "इंडेक्सिया एडवरटाइज़िंग",
    "Indexia Foundation": "इंडेक्सिया फाउंडेशन",
    "Indexia Group": "इंडेक्सिया ग्रुप",
    "Indexia Finserve": "इंडेक्सिया फिनसर्व",
    "Indexia Overseas": "इंडेक्सिया ओवरसीज़",
    "Indexia Agro Bio": "इंडेक्सिया एग्रो बायो",
  },
  fr: {
    "Indexia Finance": "Indexia Finance",
    "Indexia Finserve Pvt. Ltd.": "Indexia Finserve SARL",
    "Indexia Overseas Pvt. Ltd.": "Indexia International SARL",
    "Indexia Agro Bio Fertilizers Pvt. Ltd.": "Indexia Agro Bio Fertilisants SARL",
    "Indexia Securities": "Indexia Sécurité",
    "Indexia Warehouse": "Indexia Entrepôts",
    "Indexia Advertising": "Indexia Publicité",
    "Indexia Foundation": "Indexia Fondation",
    "Indexia Group": "Groupe Indexia",
    "Indexia Finserve": "Indexia Finserve",
    "Indexia Overseas": "Indexia International",
    "Indexia Agro Bio": "Indexia Agro Bio",
  },
  es: {
    "Indexia Finance": "Indexia Finanzas",
    "Indexia Finserve Pvt. Ltd.": "Indexia Finserve S.L.",
    "Indexia Overseas Pvt. Ltd.": "Indexia Internacional S.L.",
    "Indexia Agro Bio Fertilizers Pvt. Ltd.": "Indexia Agro Bio Fertilizantes S.L.",
    "Indexia Securities": "Indexia Seguridad",
    "Indexia Warehouse": "Indexia Almacenes",
    "Indexia Advertising": "Indexia Publicidad",
    "Indexia Foundation": "Indexia Fundación",
    "Indexia Group": "Grupo Indexia",
    "Indexia Finserve": "Indexia Finserve",
    "Indexia Overseas": "Indexia Internacional",
    "Indexia Agro Bio": "Indexia Agro Bio",
  },
  zh: {
    "Indexia Finance": "英德西亚金融",
    "Indexia Finserve Pvt. Ltd.": "英德西亚金融服务有限公司",
    "Indexia Overseas Pvt. Ltd.": "英德西亚海外有限公司",
    "Indexia Agro Bio Fertilizers Pvt. Ltd.": "英德西亚农科生物肥料有限公司",
    "Indexia Securities": "英德西亚安保",
    "Indexia Warehouse": "英德西亚仓储",
    "Indexia Advertising": "英德西亚广告",
    "Indexia Foundation": "英德西亚基金会",
    "Indexia Group": "英德西亚集团",
    "Indexia Finserve": "英德西亚金融",
    "Indexia Overseas": "英德西亚海外",
    "Indexia Agro Bio": "英德西亚农科",
  },
  ja: {
    "Indexia Finance": "インデキシアファイナンス",
    "Indexia Finserve Pvt. Ltd.": "インデキシアフィンサーブ株式会社",
    "Indexia Overseas Pvt. Ltd.": "インデキシアオーバーシーズ株式会社",
    "Indexia Agro Bio Fertilizers Pvt. Ltd.": "インデキシアアグロバイオ肥料株式会社",
    "Indexia Securities": "インデキシアセキュリティ",
    "Indexia Warehouse": "インデキシアウェアハウス",
    "Indexia Advertising": "インデキシアアドバタイジング",
    "Indexia Foundation": "インデキシア財団",
    "Indexia Group": "インデキシアグループ",
    "Indexia Finserve": "インデキシアフィンサーブ",
    "Indexia Overseas": "インデキシアオーバーシーズ",
    "Indexia Agro Bio": "インデキシアアグロバイオ",
  },
  ko: {
    "Indexia Finance": "인덱시아 파이낸스",
    "Indexia Finserve Pvt. Ltd.": "인덱시아 핀서브 유한회사",
    "Indexia Overseas Pvt. Ltd.": "인덱시아 오버시스 유한회사",
    "Indexia Agro Bio Fertilizers Pvt. Ltd.": "인덱시아 아그로 바이오 비료 유한회사",
    "Indexia Securities": "인덱시아 보안",
    "Indexia Warehouse": "인덱시아 창고",
    "Indexia Advertising": "인덱시아 광고",
    "Indexia Foundation": "인덱시아 재단",
    "Indexia Group": "인덱시아 그룹",
    "Indexia Finserve": "인덱시아 핀서브",
    "Indexia Overseas": "인덱시아 오버시스",
    "Indexia Agro Bio": "인덱시아 아그로 바이오",
  },
  el: {
    "Indexia Finance": "Indexia Finance",
    "Indexia Finserve Pvt. Ltd.": "Indexia Finserve ΕΠΕ",
    "Indexia Overseas Pvt. Ltd.": "Indexia Overseas ΕΠΕ",
    "Indexia Agro Bio Fertilizers Pvt. Ltd.": "Indexia Agro Bio Λιπάσματα ΕΠΕ",
    "Indexia Securities": "Indexia Ασφάλεια",
    "Indexia Warehouse": "Indexia Αποθήκευση",
    "Indexia Advertising": "Indexia Διαφήμιση",
    "Indexia Foundation": "Indexia Ίδρυμα",
    "Indexia Group": "Ομάδα Indexia",
    "Indexia Finserve": "Indexia Finserve",
    "Indexia Overseas": "Indexia Overseas",
    "Indexia Agro Bio": "Indexia Agro Bio",
  },
  he: {
    "Indexia Finance": "אינדקסיה פייננס",
    "Indexia Finserve Pvt. Ltd.": "אינדקסיה פינסרב בע\"מ",
    "Indexia Overseas Pvt. Ltd.": "אינדקסיה אוורסיס בע\"מ",
    "Indexia Agro Bio Fertilizers Pvt. Ltd.": "אינדקסיה אגרו בייו דשנים בע\"מ",
    "Indexia Securities": "אינדקסיה אבטחה",
    "Indexia Warehouse": "אינדקסיה מחסנים",
    "Indexia Advertising": "אינדקסיה פרסום",
    "Indexia Foundation": "קרן אינדקסיה",
    "Indexia Group": "קבוצת אינדקסיה",
    "Indexia Finserve": "אינדקסיה פינסרב",
    "Indexia Overseas": "אינדקסיה אוורסיס",
    "Indexia Agro Bio": "אינדקסיה אגרו בייו",
  },
  id: {
    "Indexia Finance": "Indexia Keuangan",
    "Indexia Finserve Pvt. Ltd.": "Indexia Finserve PT",
    "Indexia Overseas Pvt. Ltd.": "Indexia Overseas PT",
    "Indexia Agro Bio Fertilizers Pvt. Ltd.": "Indexia Agro Bio Pupuk PT",
    "Indexia Securities": "Indexia Keamanan",
    "Indexia Warehouse": "Indexia Gudang",
    "Indexia Advertising": "Indexia Periklanan",
    "Indexia Foundation": "Yayasan Indexia",
    "Indexia Group": "Grup Indexia",
    "Indexia Finserve": "Indexia Finserve",
    "Indexia Overseas": "Indexia Overseas",
    "Indexia Agro Bio": "Indexia Agro Bio",
  },
  it: {
    "Indexia Finance": "Indexia Finanza",
    "Indexia Finserve Pvt. Ltd.": "Indexia Finserve S.r.l.",
    "Indexia Overseas Pvt. Ltd.": "Indexia Internazionale S.r.l.",
    "Indexia Agro Bio Fertilizers Pvt. Ltd.": "Indexia Agro Bio Fertilizzanti S.r.l.",
    "Indexia Securities": "Indexia Sicurezza",
    "Indexia Warehouse": "Indexia Magazzini",
    "Indexia Advertising": "Indexia Pubblicità",
    "Indexia Foundation": "Fondazione Indexia",
    "Indexia Group": "Gruppo Indexia",
    "Indexia Finserve": "Indexia Finserve",
    "Indexia Overseas": "Indexia Internazionale",
    "Indexia Agro Bio": "Indexia Agro Bio",
  },
  nl: {
    "Indexia Finance": "Indexia Financiën",
    "Indexia Finserve Pvt. Ltd.": "Indexia Finserve B.V.",
    "Indexia Overseas Pvt. Ltd.": "Indexia Overseas B.V.",
    "Indexia Agro Bio Fertilizers Pvt. Ltd.": "Indexia Agro Bio Meststoffen B.V.",
    "Indexia Securities": "Indexia Beveiliging",
    "Indexia Warehouse": "Indexia Opslag",
    "Indexia Advertising": "Indexia Reclame",
    "Indexia Foundation": "Indexia Stichting",
    "Indexia Group": "Indexia Groep",
    "Indexia Finserve": "Indexia Finserve",
    "Indexia Overseas": "Indexia Overseas",
    "Indexia Agro Bio": "Indexia Agro Bio",
  },
  pl: {
    "Indexia Finance": "Indexia Finanse",
    "Indexia Finserve Pvt. Ltd.": "Indexia Finserve Sp. z o.o.",
    "Indexia Overseas Pvt. Ltd.": "Indexia International Sp. z o.o.",
    "Indexia Agro Bio Fertilizers Pvt. Ltd.": "Indexia Agro Bio Nawozy Sp. z o.o.",
    "Indexia Securities": "Indexia Bezpieczeństwo",
    "Indexia Warehouse": "Indexia Magazyny",
    "Indexia Advertising": "Indexia Reklama",
    "Indexia Foundation": "Fundacja Indexia",
    "Indexia Group": "Grupa Indexia",
    "Indexia Finserve": "Indexia Finserve",
    "Indexia Overseas": "Indexia International",
    "Indexia Agro Bio": "Indexia Agro Bio",
  },
  pt: {
    "Indexia Finance": "Indexia Finanças",
    "Indexia Finserve Pvt. Ltd.": "Indexia Finserve Ltda.",
    "Indexia Overseas Pvt. Ltd.": "Indexia Internacional Ltda.",
    "Indexia Agro Bio Fertilizers Pvt. Ltd.": "Indexia Agro Bio Fertilizantes Ltda.",
    "Indexia Securities": "Indexia Segurança",
    "Indexia Warehouse": "Indexia Armazéns",
    "Indexia Advertising": "Indexia Publicidade",
    "Indexia Foundation": "Fundação Indexia",
    "Indexia Group": "Grupo Indexia",
    "Indexia Finserve": "Indexia Finserve",
    "Indexia Overseas": "Indexia Internacional",
    "Indexia Agro Bio": "Indexia Agro Bio",
  },
  ru: {
    "Indexia Finance": "Индексия Финанс",
    "Indexia Finserve Pvt. Ltd.": "Индексия Финсерв ООО",
    "Indexia Overseas Pvt. Ltd.": "Индексия Оверсиз ООО",
    "Indexia Agro Bio Fertilizers Pvt. Ltd.": "Индексия АгроБио Удобрения ООО",
    "Indexia Securities": "Индексия Безопасность",
    "Indexia Warehouse": "Индексия Склад",
    "Indexia Advertising": "Индексия Реклама",
    "Indexia Foundation": "Фонд Индексия",
    "Indexia Group": "Группа Индексия",
    "Indexia Finserve": "Индексия Финсерв",
    "Indexia Overseas": "Индексия Оверсиз",
    "Indexia Agro Bio": "Индексия АгроБио",
  },
  sv: {
    "Indexia Finance": "Indexia Finans",
    "Indexia Finserve Pvt. Ltd.": "Indexia Finserve AB",
    "Indexia Overseas Pvt. Ltd.": "Indexia Overseas AB",
    "Indexia Agro Bio Fertilizers Pvt. Ltd.": "Indexia Agro Bio Gödselmedel AB",
    "Indexia Securities": "Indexia Säkerhet",
    "Indexia Warehouse": "Indexia Lager",
    "Indexia Advertising": "Indexia Reklam",
    "Indexia Foundation": "Indexia Stiftelse",
    "Indexia Group": "Indexia Grupp",
    "Indexia Finserve": "Indexia Finserve",
    "Indexia Overseas": "Indexia Overseas",
    "Indexia Agro Bio": "Indexia Agro Bio",
  },
  th: {
    "Indexia Finance": "อินเด็กเซีย ไฟแนนซ์",
    "Indexia Finserve Pvt. Ltd.": "อินเด็กเซีย ฟินเซิร์ฟ จำกัด",
    "Indexia Overseas Pvt. Ltd.": "อินเด็กเซีย โอเวอร์ซีส์ จำกัด",
    "Indexia Agro Bio Fertilizers Pvt. Ltd.": "อินเด็กเซีย อากроไบโอ ปุ๋ย จำกัด",
    "Indexia Securities": "อินเด็กเซีย รักษาความปลอดภัย",
    "Indexia Warehouse": "อินเด็กเซีย คลังสินค้า",
    "Indexia Advertising": "อินเด็กเซีย โฆษณา",
    "Indexia Foundation": "มูลนิธิอินเด็กเซีย",
    "Indexia Group": "กลุ่มอินเด็กเซีย",
    "Indexia Finserve": "อินเด็กเซีย ฟินเซิร์ฟ",
    "Indexia Overseas": "อินเด็กเซีย โอเวอร์ซีส์",
    "Indexia Agro Bio": "อินเด็กเซีย อากроไบโอ",
  },
  tr: {
    "Indexia Finance": "Indexia Finans",
    "Indexia Finserve Pvt. Ltd.": "Indexia Finserve Ltd. Şti.",
    "Indexia Overseas Pvt. Ltd.": "Indexia International Ltd. Şti.",
    "Indexia Agro Bio Fertilizers Pvt. Ltd.": "Indexia Agro Bio Gübreler Ltd. Şti.",
    "Indexia Securities": "Indexia Güvenlik",
    "Indexia Warehouse": "Indexia Depo",
    "Indexia Advertising": "Indexia Reklam",
    "Indexia Foundation": "Indexia Vakfı",
    "Indexia Group": "Indexia Grubu",
    "Indexia Finserve": "Indexia Finserve",
    "Indexia Overseas": "Indexia International",
    "Indexia Agro Bio": "Indexia Agro Bio",
  },
  uk: {
    "Indexia Finance": "Індексія Фінанс",
    "Indexia Finserve Pvt. Ltd.": "Індексія Фінсерв ТОВ",
    "Indexia Overseas Pvt. Ltd.": "Індексія Оверсіз ТОВ",
    "Indexia Agro Bio Fertilizers Pvt. Ltd.": "Індексія АгроБіо Добрива ТОВ",
    "Indexia Securities": "Індексія Безпека",
    "Indexia Warehouse": "Індексія Склад",
    "Indexia Advertising": "Індексія Реклама",
    "Indexia Foundation": "Фонд Індексія",
    "Indexia Group": "Група Індексія",
    "Indexia Finserve": "Індексія Фінсерв",
    "Indexia Overseas": "Індексія Оверсіз",
    "Indexia Agro Bio": "Індексія АгроБіо",
  },
  vi: {
    "Indexia Finance": "Indexia Tài chính",
    "Indexia Finserve Pvt. Ltd.": "Indexia Finserve TNHH",
    "Indexia Overseas Pvt. Ltd.": "Indexia Overseas TNHH",
    "Indexia Agro Bio Fertilizers Pvt. Ltd.": "Indexia Agro Bio Phân bón TNHH",
    "Indexia Securities": "Indexia An ninh",
    "Indexia Warehouse": "Indexia Kho vận",
    "Indexia Advertising": "Indexia Quảng cáo",
    "Indexia Foundation": "Quỹ Indexia",
    "Indexia Group": "Tập đoàn Indexia",
    "Indexia Finserve": "Indexia Finserve",
    "Indexia Overseas": "Indexia Overseas",
    "Indexia Agro Bio": "Indexia Agro Bio",
  },
};

// Keys that contain company names
const companyNameKeys = [
  "aboutPage.c1Name",
  "aboutPage.c2Name",
  "aboutPage.c3Name",
  "aboutPage.c4Name",
  "aboutPage.c5Name",
  "aboutPage.c6Name",
  "aboutPage.c7Name",
  "aboutPage.c8Name",
  "hero.p1.tag",
  "hero.p2.tag",
  "hero.p3.tag",
  "hero.p4.tag",
  "hero.p5.tag",
  "hero.p6.tag",
  "hero.p7.tag",
  "hero.p8.tag",
  "newsPage.tvHeadingAccent",
  "pageContent.companies.finance.name",
  "pageContent.companies.finserve.name",
  "pageContent.companies.overseas.name",
  "pageContent.companies.agro-bio.name",
  "pageContent.companies.securities.name",
  "pageContent.companies.warehouse.name",
  "pageContent.companies.advertising.name",
  "pageContent.companies.foundation.name",
];

// ── Process each language ──
const files = Object.keys(companyNameTranslations);
let totalUpdated = 0;

for (const lang of files) {
  const filePath = resolve(localesDir, `${lang}.json`);
  const data = JSON.parse(readFileSync(filePath, "utf8"));
  let changed = 0;

  for (const key of companyNameKeys) {
    const current = getByPath(data, key);
    if (!current) continue;

    // Find matching translation
    for (const [enName, translatedName] of Object.entries(companyNameTranslations[lang])) {
      if (current === enName) {
        if (!isDryRun) setByPath(data, key, translatedName);
        changed++;
        break;
      }
    }
  }

  if (changed > 0) {
    console.log(`${lang}.json: ${changed} company name(s) translated`);
    if (!isDryRun) {
      writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n", "utf8");
    }
    totalUpdated += changed;
  }
}

console.log(`\n${isDryRun ? "Dry run" : "Done"}. ${totalUpdated} total company name(s) ${isDryRun ? "would be" : "were"} translated across ${files.length} languages.`);
