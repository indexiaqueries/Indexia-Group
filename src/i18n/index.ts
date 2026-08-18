import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import es from "./locales/es.json";
import fr from "./locales/fr.json";
import de from "./locales/de.json";
import it from "./locales/it.json";
import pt from "./locales/pt.json";
import hi from "./locales/hi.json";
import ar from "./locales/ar.json";
import zh from "./locales/zh.json";
import ja from "./locales/ja.json";
import ru from "./locales/ru.json";
import ko from "./locales/ko.json";
import id from "./locales/id.json";
import tr from "./locales/tr.json";
import vi from "./locales/vi.json";
import nl from "./locales/nl.json";
import pl from "./locales/pl.json";
import th from "./locales/th.json";
import sv from "./locales/sv.json";
import uk from "./locales/uk.json";
import el from "./locales/el.json";
import he from "./locales/he.json";
import { SUPPORTED_LANGS } from "./languages";

export { SUPPORTED_LANGS } from "./languages";

const STORAGE_KEY = "indexia-lang";

const safeGet = (key: string) => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

const safeSet = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value);
  } catch {
    return;
  }
};

const initialLang = (() => {
  const saved = safeGet(STORAGE_KEY);
  if (saved && (SUPPORTED_LANGS as readonly string[]).includes(saved)) return saved;
  return "en";
})();

const resources = {
  en: { translation: en },
  es: { translation: es },
  fr: { translation: fr },
  de: { translation: de },
  it: { translation: it },
  pt: { translation: pt },
  hi: { translation: hi },
  ar: { translation: ar },
  zh: { translation: zh },
  ja: { translation: ja },
  ru: { translation: ru },
  ko: { translation: ko },
  id: { translation: id },
  tr: { translation: tr },
  vi: { translation: vi },
  nl: { translation: nl },
  pl: { translation: pl },
  th: { translation: th },
  sv: { translation: sv },
  uk: { translation: uk },
  el: { translation: el },
  he: { translation: he },
};

export const i18nReady = i18n.use(initReactI18next).init({
  resources,
  lng: initialLang,
  fallbackLng: "en",
  supportedLngs: [...SUPPORTED_LANGS],
  nonExplicitSupportedLngs: true,
  load: "currentOnly",
  interpolation: { escapeValue: false },
  react: { useSuspense: false },
  returnNull: false,
});

const RTL_LANGS = ["ar", "he"];

i18n.on("languageChanged", (lng) => {
  document.documentElement.lang = lng;
  document.documentElement.dir = RTL_LANGS.includes(lng) ? "rtl" : "ltr";
  safeSet(STORAGE_KEY, lng);
});

document.documentElement.lang = i18n.language;
document.documentElement.dir = RTL_LANGS.includes(i18n.language) ? "rtl" : "ltr";

export default i18n;
