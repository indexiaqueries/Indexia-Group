/**
 * Translate addresses across all languages.
 *
 * Usage:  node scripts/translate-addresses.js
 *         node scripts/translate-addresses.js --dry-run
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

// ── Address translations ──
// Addresses are kept in English as they are physical locations
// Only the labels and descriptions are translated

const translations = {
  ar: {
    "addresses.corporateOffice": "المكتب رقم 3، الطابق الأول،\nمبنى راهيمتولا، شارع هومجي،\nمقابل البنك الاحتياطي الهندي، فورت،\nمومباي - 400001، ماهاراشترا",
    "addresses.mumbaiOffice": "2أ/1402، مجمع مهادا الجديد،\nبالقرب من دوار لوكهاندوالا،\nأنديري غرب،\nمومباي - 400053، ماهاراشترا",
    "addresses.delhiOffice": "213، الطابق الثاني، برج إمبيريال،\nبالقرب من جورودوارا،\nمجمع بلوك سي التجاري،\nناراينا فيهار، نيودلهي - 110028",
    "addresses.shamliOffice": "طريق ميروت كارنال،\nشملي، أتر برديش - 247776",
    "addresses.internationalOffice": "أفينيدا بيريز غيريرو OE-375،\nوأفينيدا كيتو،\nإكوادور، أمريكا الجنوبية",
  },
  de: {
    "addresses.corporateOffice": "Büro Nr. 3, 1. Stock,\nRahimtoola House, Homji Street,\n gegenüber RBI, Fort,\nMumbai - 400001, Maharashtra",
    "addresses.mumbaiOffice": "2A/1402, New Mhada Complex,\nNear Lokhandwala Circle,\nAndheri West,\nMumbai - 400053, Maharashtra",
    "addresses.delhiOffice": "213, Second Floor, Imperial Tower,\nNear Gurudwara,\nC Block Commercial Complex,\nNaraina Vihar, New Delhi - 110028",
    "addresses.shamliOffice": "Meerut Karnal Road,\nShamli, Uttar Pradesh - 247776",
    "addresses.internationalOffice": "Avenida Perez Guerrero OE-375,\ny Avenida Quito,\nEcuador, South America",
  },
  hi: {
    "addresses.corporateOffice": "कार्यालय क्र. 3, प्रथम तल,\nरहीमटूला हाउस, होमजी स्ट्रीट,\nआरबीआई के सामने, फोर्ट,\nमुंबई - 400001, महाराष्ट्र",
    "addresses.mumbaiOffice": "2ए/1402, न्यू म्हाडा कॉम्प्लेक्स,\nलोखंडवाला सर्कल के पास,\nअंधेरी वेस्ट,\nमुंबई - 400053, महाराष्ट्र",
    "addresses.delhiOffice": "213, दूसरी मंजिल, इंपीरियल टावर,\nगुरुद्वारा के पास,\nसी ब्लॉक कमर्शियल कॉम्प्लेक्स,\nनारायणा विहार, नई दिल्ली - 110028",
    "addresses.shamliOffice": "मेरठ कर्नल रोड,\nशामली, उत्तर प्रदेश - 247776",
    "addresses.internationalOffice": "أفينيدا بيريز غيريرو OE-375،\nوأفينيدا كيتو،\nإكوادور، أمريكا الجنوبية",
  },
  fr: {
    "addresses.corporateOffice": "Bureau N° 3, 1er étage,\nRahimtoola House, Homji Street,\nEn face de la RBI, Fort,\nMumbai - 400001, Maharashtra",
    "addresses.mumbaiOffice": "2A/1402, New Mhada Complex,\nNear Lokhandwala Circle,\nAndheri West,\nMumbai - 400053, Maharashtra",
    "addresses.delhiOffice": "213, Second Floor, Imperial Tower,\nNear Gurudwara,\nC Block Commercial Complex,\nNaraina Vihar, New Delhi - 110028",
    "addresses.shamliOffice": "Meerut Karnal Road,\nShamli, Uttar Pradesh - 247776",
    "addresses.internationalOffice": "Avenida Perez Guerrero OE-375,\ny Avenida Quito,\nEcuador, South America",
  },
  es: {
    "addresses.corporateOffice": "Oficina N° 3, 1er Piso,\nRahimtoola House, Homji Street,\nFrente al RBI, Fort,\nMumbai - 400001, Maharashtra",
    "addresses.mumbaiOffice": "2A/1402, New Mhada Complex,\nNear Lokhandwala Circle,\nAndheri West,\nMumbai - 400053, Maharashtra",
    "addresses.delhiOffice": "213, Second Floor, Imperial Tower,\nNear Gurudwara,\nC Block Commercial Complex,\nNaraina Vihar, New Delhi - 110028",
    "addresses.shamliOffice": "Meerut Karnal Road,\nShamli, Uttar Pradesh - 247776",
    "addresses.internationalOffice": "Avenida Perez Guerrero OE-375,\ny Avenida Quito,\nEcuador, South America",
  },
  zh: {
    "addresses.corporateOffice": "办公室3号，一楼，\nRahimtoola House，Homji Street，\nRBI对面，Fort，\nMumbai - 400001，Maharashtra",
    "addresses.mumbaiOffice": "2A/1402，New Mhada Complex，\nLokhandwala Circle附近，\nAndheri West，\nMumbai - 400053，Maharashtra",
    "addresses.delhiOffice": "213，二楼，Imperial Tower，\nGurudwara附近，\nC Block Commercial Complex，\nNaraina Vihar，New Delhi - 110028",
    "addresses.shamliOffice": "Meerut Karnal Road，\nShamli，Uttar Pradesh - 247776",
    "addresses.internationalOffice": "Avenida Perez Guerrero OE-375，\ny Avenida Quito，\nEcuador，South America",
  },
  ja: {
    "addresses.corporateOffice": "オフィス3号、1階、\nRahimtoola House、Homji Street、\nRBI向かい、Fort、\nMumbai - 400001、Maharashtra",
    "addresses.mumbaiOffice": "2A/1402、New Mhada Complex、\nLokhandwala Circle近く、\nAndheri West、\nMumbai - 400053、Maharashtra",
    "addresses.delhiOffice": "213、2階、Imperial Tower、\nGurudwara近く、\nC Block Commercial Complex、\nNaraina Vihar、New Delhi - 110028",
    "addresses.shamliOffice": "Meerut Karnal Road、\nShamli、Uttar Pradesh - 247776",
    "addresses.internationalOffice": "Avenida Perez Guerrero OE-375、\ny Avenida Quito、\nEcuador、South America",
  },
  ko: {
    "addresses.corporateOffice": "사무실 3번, 1층,\nRahimtoola House, Homji Street,\nRBI 맞은편, Fort,\nMumbai - 400001, Maharashtra",
    "addresses.mumbaiOffice": "2A/1402, New Mhada Complex,\nLokhandwala Circle 근처,\nAndheri West,\nMumbai - 400053, Maharashtra",
    "addresses.delhiOffice": "213, 2층, Imperial Tower,\nGurudwara 근처,\nC Block Commercial Complex,\nNaraina Vihar, New Delhi - 110028",
    "addresses.shamliOffice": "Meerut Karnal Road,\nShamli, Uttar Pradesh - 247776",
    "addresses.internationalOffice": "Avenida Perez Guerrero OE-375,\ny Avenida Quito,\nEcuador, South America",
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
    console.log(`${lang}.json: ${changed} address(es) translated`);
    if (!isDryRun) {
      writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n", "utf8");
    }
    totalUpdated += changed;
  }
}

console.log(`\n${isDryRun ? "Dry run" : "Done"}. ${totalUpdated} total address(es) ${isDryRun ? "would be" : "were"} translated across ${files.length} languages.`);
