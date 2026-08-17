import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import es from "./locales/es.json";
import fr from "./locales/fr.json";
import de from "./locales/de.json";
import it from "./locales/it.json";
import pt from "./locales/pt.json";
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

i18n.on("languageChanged", (lng) => {
  document.documentElement.lang = lng;
  safeSet(STORAGE_KEY, lng);
});

document.documentElement.lang = i18n.language;

export default i18n;
