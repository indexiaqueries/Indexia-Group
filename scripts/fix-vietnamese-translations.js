/**
 * Fix Vietnamese translations that had garbled characters.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, '..', 'src', 'i18n', 'locales', 'vi.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

function setNestedValue(obj, keyPath, value) {
  const keys = keyPath.split('.');
  let current = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    if (current[keys[i]] === undefined) current[keys[i]] = {};
    current = current[keys[i]];
  }
  current[keys[keys.length - 1]] = value;
}

const fixes = {
  "foundationGallery.videos.fieldPractice.label": "T\u1eadp Luy\u1EC7n S\u1ED1ng",
  "foundationGallery.videos.fieldPractice.sublabel": "B\u00E0i t\u1EADp \u0111i\u1EC1n kinh",
  "foundationGallery.videos.trainingSession.label": "Bu\u1ED5i Hu\u1EA5n Luy\u1EC7n",
  "foundationGallery.videos.trainingSession.sublabel": "T\u1EADp luy\u1EC7n s\u1ED1ng v\u1EDBi hu\u1EA5n luy\u1EC7n vi\u00EAn",
};

let fixed = 0;
for (const [key, value] of Object.entries(fixes)) {
  setNestedValue(data, key, value);
  fixed++;
}

fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
console.log(`Fixed ${fixed} Vietnamese keys`);
