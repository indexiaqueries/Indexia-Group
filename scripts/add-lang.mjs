// Helper to add a language's translations to all-translations.json
import fs from 'fs';
const file = 'scripts/all-translations.json';
const data = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : {};

export function addLang(code, translations) {
  data[code] = translations;
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
  console.log(`${code}: ${Object.keys(translations).length} keys`);
}
