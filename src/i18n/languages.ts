/** Languages offered in the site's language selector — only languages with
 *  full bundled translations. Adding a language requires a locale file, a
 *  `loadLocale` case, a `SUPPORTED_LANGS` entry, and an entry here. */
export const LANGUAGES: { code: string; label: string }[] = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
  { code: "it", label: "Italiano" },
  { code: "pt", label: "Português" },
];

/** Languages with bundled translations. Others in LANGUAGES fall back to English. */
export const SUPPORTED_LANGS = ["en", "es", "fr", "de", "it", "pt"] as const;

export type SupportedLang = (typeof SUPPORTED_LANGS)[number];

/** Right-to-left scripts — the document flips to dir="rtl" when one is active. */
export const RTL_LANGS = new Set<string>(["fa", "ur", "he", "ps", "sd", "ckb"]);
