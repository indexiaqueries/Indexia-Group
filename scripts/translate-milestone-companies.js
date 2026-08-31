/**
 * Translate company names inside milestone description text.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const localesDir = resolve(__dirname, "../src/i18n/locales");

const companyNames = {
  zh: { "Indexia Finserve": "英德西亚金融", "Indexia Overseas": "英德西亚海外", "Agro Bio": "农科生物", "Indexia Foundation": "英德西亚基金会", "Indexia Finance": "英德西亚金融", "Indexia Securities": "英德西亚安保", "Indexia Warehouse": "英德西亚仓储", "Indexia Advertising": "英德西亚广告" },
  ja: { "Indexia Finserve": "インデキシアフィンサーブ", "Indexia Overseas": "インデキシアオーバーシーズ", "Agro Bio": "アグロバイオ", "Indexia Foundation": "インデキシア財団", "Indexia Finance": "インデキシアファイナンス", "Indexia Securities": "インデキシアセキュリティ", "Indexia Warehouse": "インデキシアウェアハウス", "Indexia Advertising": "インデキシアアドバタイジング" },
  ko: { "Indexia Finserve": "인덱시아 핀서브", "Indexia Overseas": "인덱시아 오버시스", "Agro Bio": "아그로 바이오", "Indexia Foundation": "인덱시아 재단", "Indexia Finance": "인덱시아 파이낸스", "Indexia Securities": "인덱시아 보안", "Indexia Warehouse": "인덱시아 창고", "Indexia Advertising": "인덱시아 광고" },
  ar: { "Indexia Finserve": "إنديكسيا فينسرف", "Indexia Overseas": "إنديكسيا أوفرسيز", "Agro Bio": "أوروبيو", "Indexia Foundation": "مؤسسة إندكسيا", "Indexia Finance": "إنديكسيا فاينانس", "Indexia Securities": "إنديكسيا سيكيوريتيز", "Indexia Warehouse": "إنديكسيا ويرهاوس", "Indexia Advertising": "إنديكسيا أدفرتايزنغ" },
  hi: { "Indexia Finserve": "इंडेक्सिया फिनसर्व", "Indexia Overseas": "इंडेक्सिया ओवरसीज़", "Agro Bio": "एग्रो बायो", "Indexia Foundation": "इंडेक्सिया फाउंडेशन", "Indexia Finance": "इंडेक्सिया फाइनेंस", "Indexia Securities": "इंडेक्सिया सिक्योरिटीज़", "Indexia Warehouse": "इंडेक्सिया वेयरहाउस", "Indexia Advertising": "इंडेक्सिया एडवरटाइज़िंग" },
  he: { "Indexia Finserve": "אינדקסיה פינסרב", "Indexia Overseas": "אינדקסיה אוורסיס", "Agro Bio": "אגרו בייו", "Indexia Foundation": "קרן אינדקסיה", "Indexia Finance": "אינדקסיה פייננס", "Indexia Securities": "אינדקסיה אבטחה", "Indexia Warehouse": "אינדקסיה מחסנים", "Indexia Advertising": "אינדקסיה פרסום" },
  th: { "Indexia Finserve": "อินเด็กเซีย ฟินเซิร์ฟ", "Indexia Overseas": "อินเด็กเซีย โอเวอร์ซีส์", "Agro Bio": "อากроไบโอ", "Indexia Foundation": "มูลนิธิอินเด็กเซีย", "Indexia Finance": "อินเด็กเซีย ไฟแนนซ์", "Indexia Securities": "อินเด็กเซีย รักษาความปลอดภัย", "Indexia Warehouse": "อินเด็กเซีย คลังสินค้า", "Indexia Advertising": "อินเด็กเซีย โฆษณา" },
  ru: { "Indexia Finserve": "Индексия Финсерв", "Indexia Overseas": "Индексия Оверсиз", "Agro Bio": "АгроБио", "Indexia Foundation": "Фонд Индексия", "Indexia Finance": "Индексия Финанс", "Indexia Securities": "Индексия Безопасность", "Indexia Warehouse": "Индексия Склад", "Indexia Advertising": "Индексия Реклама" },
  uk: { "Indexia Finserve": "Індексія Фінсерв", "Indexia Overseas": "Індексія Оверсіз", "Agro Bio": "АгроБіо", "Indexia Foundation": "Фонд Індексія", "Indexia Finance": "Індексія Фінанс", "Indexia Securities": "Індексія Безпека", "Indexia Warehouse": "Індексія Склад", "Indexia Advertising": "Індексія Реклама" },
  fr: { "Indexia Finserve": "Indexia Finserve", "Indexia Overseas": "Indexia International", "Agro Bio": "Agro Bio", "Indexia Foundation": "Indexia Fondation", "Indexia Finance": "Indexia Finance", "Indexia Securities": "Indexia Sécurité", "Indexia Warehouse": "Indexia Entrepôts", "Indexia Advertising": "Indexia Publicité" },
  de: { "Indexia Finserve": "Indexia Finserve", "Indexia Overseas": "Indexia International", "Agro Bio": "Agro Bio", "Indexia Foundation": "Indexia Stiftung", "Indexia Finance": "Indexia Finanz", "Indexia Securities": "Indexia Sicherheit", "Indexia Warehouse": "Indexia Lager", "Indexia Advertising": "Indexia Werbung" },
  es: { "Indexia Finserve": "Indexia Finserve", "Indexia Overseas": "Indexia Internacional", "Agro Bio": "Agro Bio", "Indexia Foundation": "Indexia Fundación", "Indexia Finance": "Indexia Finanzas", "Indexia Securities": "Indexia Seguridad", "Indexia Warehouse": "Indexia Almacenes", "Indexia Advertising": "Indexia Publicidad" },
  el: { "Indexia Finserve": "Indexia Finserve", "Indexia Overseas": "Indexia Overseas", "Agro Bio": "Agro Bio", "Indexia Foundation": "Indexia Foundation", "Indexia Finance": "Indexia Finance", "Indexia Securities": "Indexia Ασφάλεια", "Indexia Warehouse": "Indexia Αποθήκευση", "Indexia Advertising": "Indexia Διαφήμιση" },
  id: { "Indexia Finserve": "Indexia Finserve", "Indexia Overseas": "Indexia Overseas", "Agro Bio": "Agro Bio", "Indexia Foundation": "Yayasan Indexia", "Indexia Finance": "Indexia Keuangan", "Indexia Securities": "Indexia Keamanan", "Indexia Warehouse": "Indexia Gudang", "Indexia Advertising": "Indexia Periklanan" },
  it: { "Indexia Finserve": "Indexia Finserve", "Indexia Overseas": "Indexia Internazionale", "Agro Bio": "Agro Bio", "Indexia Foundation": "Fondazione Indexia", "Indexia Finance": "Indexia Finanza", "Indexia Securities": "Indexia Sicurezza", "Indexia Warehouse": "Indexia Magazzini", "Indexia Advertising": "Indexia Pubblicità" },
  nl: { "Indexia Finserve": "Indexia Finserve", "Indexia Overseas": "Indexia Overseas", "Agro Bio": "Agro Bio", "Indexia Foundation": "Indexia Stichting", "Indexia Finance": "Indexia Financiën", "Indexia Securities": "Indexia Beveiliging", "Indexia Warehouse": "Indexia Opslag", "Indexia Advertising": "Indexia Reclame" },
  pl: { "Indexia Finserve": "Indexia Finserve", "Indexia Overseas": "Indexia International", "Agro Bio": "Agro Bio", "Indexia Foundation": "Fundacja Indexia", "Indexia Finance": "Indexia Finanse", "Indexia Securities": "Indexia Bezpieczeństwo", "Indexia Warehouse": "Indexia Magazyny", "Indexia Advertising": "Indexia Reklama" },
  pt: { "Indexia Finserve": "Indexia Finserve", "Indexia Overseas": "Indexia Internacional", "Agro Bio": "Agro Bio", "Indexia Foundation": "Fundação Indexia", "Indexia Finance": "Indexia Finanças", "Indexia Securities": "Indexia Segurança", "Indexia Warehouse": "Indexia Armazéns", "Indexia Advertising": "Indexia Publicidade" },
  sv: { "Indexia Finserve": "Indexia Finserve", "Indexia Overseas": "Indexia Overseas", "Agro Bio": "Agro Bio", "Indexia Foundation": "Indexia Stiftelse", "Indexia Finance": "Indexia Finans", "Indexia Securities": "Indexia Säkerhet", "Indexia Warehouse": "Indexia Lager", "Indexia Advertising": "Indexia Reklam" },
  tr: { "Indexia Finserve": "Indexia Finserve", "Indexia Overseas": "Indexia International", "Agro Bio": "Agro Bio", "Indexia Foundation": "Indexia Vakfı", "Indexia Finance": "Indexia Finans", "Indexia Securities": "Indexia Güvenlik", "Indexia Warehouse": "Indexia Depo", "Indexia Advertising": "Indexia Reklam" },
  vi: { "Indexia Finserve": "Indexia Finserve", "Indexia Overseas": "Indexia Overseas", "Agro Bio": "Agro Bio", "Indexia Foundation": "Quỹ Indexia", "Indexia Finance": "Indexia Tài chính", "Indexia Securities": "Indexia An ninh", "Indexia Warehouse": "Indexia Kho vận", "Indexia Advertising": "Indexia Quảng cáo" },
};

// Keys that contain milestone body text
const textKeys = [
  "aboutPage.milestone1Body", "aboutPage.milestone2Body", "aboutPage.milestone3Body",
  "aboutPage.milestone4Body", "aboutPage.milestone5Body", "aboutPage.milestone6Body", "aboutPage.milestone7Body",
  "aboutPage.founderBio1", "aboutPage.founderBio2", "aboutPage.storyBody1", "aboutPage.storyBody2",
];

// Also scan all pageContent.companies for name/desc/overview fields
const companyKeys = [
  "pageContent.companies.finance.name",
  "pageContent.companies.finserve.name",
  "pageContent.companies.overseas.name",
  "pageContent.companies.securities.name",
  "pageContent.companies.warehouse.name",
  "pageContent.companies.advertising.name",
  "pageContent.companies.foundation.name",
];

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

let totalUpdated = 0;

for (const [lang, names] of Object.entries(companyNames)) {
  const filePath = resolve(localesDir, `${lang}.json`);
  const data = JSON.parse(readFileSync(filePath, "utf8"));
  let changed = 0;

  // Replace in aboutPage text keys
  for (const key of textKeys) {
    let text = getByPath(data, key);
    if (!text || typeof text !== "string") continue;

    const sortedNames = Object.entries(names).sort((a, b) => b[0].length - a[0].length);
    for (const [en, translated] of sortedNames) {
      if (en === translated) continue; // skip same-language names
      if (text.includes(en)) {
        text = text.split(en).join(translated);
        changed++;
      }
    }
    setByPath(data, key, text);
  }

  // Replace in pageContent company names
  for (const key of companyKeys) {
    const current = getByPath(data, key);
    if (!current || typeof current !== "string") continue;

    const sortedNames = Object.entries(names).sort((a, b) => b[0].length - a[0].length);
    for (const [en, translated] of sortedNames) {
      if (en === translated) continue;
      if (current === en) {
        setByPath(data, key, translated);
        changed++;
        break;
      }
    }
  }

  if (changed > 0) {
    writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n", "utf8");
    console.log(`${lang}: ${changed} company names translated in milestone text`);
    totalUpdated += changed;
  }
}

console.log(`\nDone. ${totalUpdated} total company names translated across ${Object.keys(companyNames).length} languages.`);
