import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const localesDir = path.resolve(__dirname, '../src/i18n/locales');

function setNested(obj, dotPath, value) {
  const parts = dotPath.split('.');
  let cur = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    if (!(parts[i] in cur) || typeof cur[parts[i]] !== 'object' || cur[parts[i]] === null) cur[parts[i]] = {};
    cur = cur[parts[i]];
  }
  cur[parts[parts.length - 1]] = value;
}

function sortObjectKeys(obj) {
  if (typeof obj !== 'object' || obj === null) return obj;
  if (Array.isArray(obj)) return obj.map(sortObjectKeys);
  const sorted = {};
  for (const key of Object.keys(obj).sort()) {
    sorted[key] = sortObjectKeys(obj[key]);
  }
  return sorted;
}

// Read all translation JSON files from scripts/translations/ dir
const transDir = path.resolve(__dirname, 'translations');
if (!fs.existsSync(transDir)) {
  console.error('No translations directory found at', transDir);
  process.exit(1);
}

const files = fs.readdirSync(transDir).filter(f => f.endsWith('.json'));
for (const file of files) {
  const lang = file.replace('.json', '');
  const filePath = path.join(localesDir, lang + '.json');
  if (!fs.existsSync(filePath)) {
    console.log(`Skipping ${lang}: locale file not found`);
    continue;
  }
  
  const locale = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const t = JSON.parse(fs.readFileSync(path.join(transDir, file), 'utf8'));
  
  let count = 0;
  for (const [key, value] of Object.entries(t)) {
    setNested(locale, key, value);
    count++;
  }
  
  const sorted = sortObjectKeys(locale);
  fs.writeFileSync(filePath, JSON.stringify(sorted, null, 2) + '\n', 'utf8');
  console.log(`${lang}: applied ${count} translations`);
}

console.log('All translations applied!');
