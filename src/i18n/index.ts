import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import { SUPPORTED_LANGS } from "./languages";

export { SUPPORTED_LANGS } from "./languages";

const STORAGE_KEY = "indexia-lang";
type SupportedLang = (typeof SUPPORTED_LANGS)[number];
type LocaleModule = { default: typeof en };

const localeLoaders: Record<Exclude<SupportedLang, "en">, () => Promise<LocaleModule>> = {
  ar: () => import("./locales/ar.json"),
  de: () => import("./locales/de.json"),
  el: () => import("./locales/el.json"),
  es: () => import("./locales/es.json"),
  fr: () => import("./locales/fr.json"),
  he: () => import("./locales/he.json"),
  hi: () => import("./locales/hi.json"),
  id: () => import("./locales/id.json"),
  it: () => import("./locales/it.json"),
  ja: () => import("./locales/ja.json"),
  ko: () => import("./locales/ko.json"),
  nl: () => import("./locales/nl.json"),
  pl: () => import("./locales/pl.json"),
  pt: () => import("./locales/pt.json"),
  ru: () => import("./locales/ru.json"),
  sv: () => import("./locales/sv.json"),
  th: () => import("./locales/th.json"),
  tr: () => import("./locales/tr.json"),
  uk: () => import("./locales/uk.json"),
  vi: () => import("./locales/vi.json"),
  zh: () => import("./locales/zh.json"),
};

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
  if (saved && (SUPPORTED_LANGS as readonly string[]).includes(saved)) return saved as SupportedLang;
  return "en";
})();

const RTL_LANGS = ["ar", "he"];

const setDocumentLanguage = (lng: string) => {
  document.documentElement.lang = lng;
  document.documentElement.dir = RTL_LANGS.includes(lng) ? "rtl" : "ltr";
};

const loadLocale = async (lng: SupportedLang) => {
  if (lng === "en" || i18n.hasResourceBundle(lng, "translation")) return;
  const locale = await localeLoaders[lng]();
  i18n.addResourceBundle(lng, "translation", locale.default, true, true);
};

export const changeLanguage = async (lng: string) => {
  const target = (SUPPORTED_LANGS as readonly string[]).includes(lng) ? (lng as SupportedLang) : "en";
  await loadLocale(target);
  await i18n.changeLanguage(target);
};

export const i18nReady = (async () => {
  await i18n.use(initReactI18next).init({
    resources: { en: { translation: en } },
    lng: "en",
    fallbackLng: "en",
    supportedLngs: [...SUPPORTED_LANGS],
    nonExplicitSupportedLngs: true,
    load: "currentOnly",
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
    returnNull: false,
  });

  if (initialLang !== "en") await changeLanguage(initialLang);
  else setDocumentLanguage("en");
})();

i18n.on("languageChanged", (lng) => {
  setDocumentLanguage(lng);
  safeSet(STORAGE_KEY, lng);
});

export default i18n;
