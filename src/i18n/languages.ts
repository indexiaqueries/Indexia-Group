
export const LANGUAGES: { code: string; label: string }[] = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
  { code: "it", label: "Italiano" },
  { code: "pt", label: "Português" },
];

export const SUPPORTED_LANGS = ["en", "es", "fr", "de", "it", "pt"] as const;

export const RTL_LANGS = new Set<string>(["fa", "ur", "he", "ps", "sd", "ckb"]);
