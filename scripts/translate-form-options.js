/**
 * Translate form dropdown options for all languages.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const localesDir = resolve(__dirname, "../src/i18n/locales");

const formTranslations = {
  zh: { generalEnquiry: "一般咨询", subjectPlaceholder: "选择企业..." },
  ja: { generalEnquiry: "一般的なお問い合わせ", subjectPlaceholder: "企業を選択..." },
  ko: { generalEnquiry: "일반 문의", subjectPlaceholder: "기업 선택..." },
  ar: { generalEnquiry: "استفسار عام", subjectPlaceholder: "اختر شركة..." },
  hi: { generalEnquiry: "सामान्य पूछताछ", subjectPlaceholder: "कंपनी चुनें..." },
  de: { generalEnquiry: "Allgemeine Anfrage", subjectPlaceholder: "Unternehmen wählen..." },
  fr: { generalEnquiry: "Demande Générale", subjectPlaceholder: "Choisir une entreprise..." },
  es: { generalEnquiry: "Consulta General", subjectPlaceholder: "Seleccionar empresa..." },
  el: { generalEnquiry: "Γενικό Ερώτημα", subjectPlaceholder: "Επιλέξτε εταιρεία..." },
  he: { generalEnquiry: "פניה כללית", subjectPlaceholder: "בחר חברה..." },
  id: { generalEnquiry: "Umum", subjectPlaceholder: "Pilih perusahaan..." },
  it: { generalEnquiry: "Richiesta Generale", subjectPlaceholder: "Seleziona un'azienda..." },
  nl: { generalEnquiry: "Algemene Vraag", subjectPlaceholder: "Selecteer een bedrijf..." },
  pl: { generalEnquiry: "Ogólne Zapytanie", subjectPlaceholder: "Wybierz firmę..." },
  pt: { generalEnquiry: "Consulta Geral", subjectPlaceholder: "Selecionar empresa..." },
  ru: { generalEnquiry: "Общий Запрос", subjectPlaceholder: "Выберите компанию..." },
  sv: { generalEnquiry: "Allmän Förfrågan", subjectPlaceholder: "Välj företag..." },
  th: { generalEnquiry: "สอบถามทั่วไป", subjectPlaceholder: "เลือกบริษัท..." },
  tr: { generalEnquiry: "Genel Sorgu", subjectPlaceholder: "Şirket seçin..." },
  uk: { generalEnquiry: "Загальний Запит", subjectPlaceholder: "Оберіть компанію..." },
  vi: { generalEnquiry: "Yêu cầu chung", subjectPlaceholder: "Chọn công ty..." },
};

let updated = 0;
for (const [lang, vals] of Object.entries(formTranslations)) {
  const filePath = resolve(localesDir, `${lang}.json`);
  const data = JSON.parse(readFileSync(filePath, "utf8"));
  if (!data.form) data.form = {};

  let changed = 0;
  for (const [key, val] of Object.entries(vals)) {
    if (data.form[key] !== val) {
      data.form[key] = val;
      changed++;
    }
  }

  if (changed > 0) {
    writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n", "utf8");
    console.log(`${lang}: ${changed} form strings translated`);
    updated++;
  }
}
console.log(`\nDone. Updated ${updated} language files.`);
