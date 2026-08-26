export const colors = {
  teal: "#26ae90",
  tealDeep: "#1e9478",
  blue: "#066a9c",
  yellow: "#f2f231",
  gray: "#7b7b7b",
  navyDeep: "#0a2233",
  navy: "#0c3652",
  navyMid: "#0f4a6e",
  paper: "#f6f2e9",
  inkDeep: "#122029",
  white: "#ffffff",
} as const;

export const accent = {
  green: "var(--color-teal)",
  blue: "var(--color-blue)",
  gray: "var(--color-gray)",
} as const;

export const displayFont = { fontFamily: "'Fraunces', Georgia, serif", fontOpticalSizing: "auto" } as const;

export const monoFont = { fontFamily: "'IBM Plex Mono', 'Cascadia Mono', Menlo, monospace" } as const;

