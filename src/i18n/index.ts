import i18n, { type BackendModule } from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import { RTL_LANGS, SUPPORTED_LANGS } from "./languages";

export { SUPPORTED_LANGS } from "./languages";
export type { SupportedLang } from "./languages";

const STORAGE_KEY = "indexia-lang";

/** Language actually available on first paint — no flash of the wrong language. */
const initialLang = (() => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && (SUPPORTED_LANGS as readonly string[]).includes(saved)) return saved;
  } catch {
    /* storage unavailable — fall through */
  }
  return "en";
})();

/** Lazy per-language loaders — each locale is its own code-split chunk, so the
 *  initial bundle only ever carries the default (English) translation. Adding a
 *  new language is one case here plus one entry in `SUPPORTED_LANGS`. */
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

/** Load (and cache) a locale's chunk ahead of a language switch so the swap is
 *  atomic — no flash of fallback text. Dynamic-import modules cache themselves. */
export const preloadLocale = (lng: string) => loadLocale(lng).then((m) => m.default);

/** i18next backend that fetches a language's chunk on demand via dynamic import. */
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

/** Resolves when the initial language's resources are loaded. `main.tsx` awaits
 *  this before mounting so the first paint is already in the right language. */
export const i18nReady = i18n.init({
  resources: {
    en: { translation: en },
  },
  // English is the only bundled locale; everything else is fetched from the
  // backend on demand. Without this flag i18next would treat the `resources`
  // option as the complete bundle and never consult the backend.
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
  try {
    localStorage.setItem(STORAGE_KEY, lng);
  } catch {
    /* storage unavailable — in-memory language still works */
  }
});

applyDirection(i18n.language);
document.documentElement.lang = i18n.language;

export default i18n;
