import i18n, { type BackendModule } from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import { RTL_LANGS, SUPPORTED_LANGS } from "./languages";

export { SUPPORTED_LANGS } from "./languages";
export type { SupportedLang } from "./languages";

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

const loadLocale = (lng: string) => {
  switch (lng) {
    case "es":
      return import("./locales/es.json");
    case "fr":
      return import("./locales/fr.json");
    case "de":
      return import("./locales/de.json");
    case "it":
      return import("./locales/it.json");
    case "pt":
      return import("./locales/pt.json");
    default:
      return Promise.resolve({ default: en });
  }
};

export const preloadLocale = (lng: string) => loadLocale(lng).then((m) => m.default);

const localeBackend: BackendModule = {
  type: "backend",
  init() {},
  read(language, _namespace, callback) {
    loadLocale(language)
      .then((module) => callback(null, module.default))
      .catch((err: unknown) => callback(err as Error, null));
  },
  create() {},
};

i18n.use(initReactI18next).use(localeBackend);

export const i18nReady = i18n.init({
  resources: {
    en: { translation: en },
  },

  partialBundledLanguages: true,
  lng: initialLang,
  fallbackLng: "en",
  supportedLngs: [...SUPPORTED_LANGS],
  nonExplicitSupportedLngs: true,
  load: "currentOnly",
  interpolation: { escapeValue: false },
  react: { useSuspense: false },
  returnNull: false,
});

const applyDirection = (lng: string) => {
  document.documentElement.dir = RTL_LANGS.has(lng) ? "rtl" : "ltr";
};

i18n.on("languageChanged", (lng) => {
  document.documentElement.lang = lng;
  applyDirection(lng);
  safeSet(STORAGE_KEY, lng);
});

applyDirection(i18n.language);
document.documentElement.lang = i18n.language;

export default i18n;
