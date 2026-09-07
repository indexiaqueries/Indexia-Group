// Supported UI languages in display order (as shown in the language menu).
export const SUPPORTED_LANGS = [
  "en",
  "es",
  "fr",
  "de",
  "it",
  "pt",
  "hi",
  "ar",
  "zh",
  "ja",
  "ru",
  "ko",
  "id",
  "tr",
  "vi",
  "nl",
  "pl",
  "th",
  "sv",
  "uk",
  "el",
  "he",
] as const;

export type SupportedLang = (typeof SUPPORTED_LANGS)[number];

/**
 * Language menu entries with the i18n key for each native language name.
 * Derived from SUPPORTED_LANGS so the two lists can never drift apart.
 */
export const LANGUAGES: { code: SupportedLang; key: string }[] =
  SUPPORTED_LANGS.map((code) => ({
    code,
    key: `common.languages.${code}`,
  }));
