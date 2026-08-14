/**
 * Brand design tokens — single source of truth for colors, fonts and shared
 * typography/card presets. Keep the hex values in sync with the CSS variables
 * declared in `src/index.css` (e.g. `--color-teal`).
 */

export const colors = {
  teal: "#26ae90",
  tealDeep: "#1e9478",
  blue: "#066a9c",
  blueDeep: "#055780",
  blue2: "#286090",
  yellow: "#f2f231",
  yellowBright: "#f7f75c",
  yellowInk: "#241a03",
  gray: "#7b7b7b",
  grayLight: "#9ca3af",
  paper: "#f6f2e9",
  ink: "#111827",
  inkDeep: "#122029",
  inkSoft: "#374151",
  muted: "#6b7280",
  soft: "#f8fafc",
  mist: "#f6f9fb",
  deep: "#044e74",
  night: "#02101a",
  navyDeep: "#0a2233",
  navy: "#0c3652",
  navyMid: "#0f4a6e",
  navyBlack: "#043249",
  sand: "#e3dcc9",
  sandDeep: "#ddd6c4",
  goldPale: "#f4efc4",
  success: "#14765f",
  danger: "#b91c1c",
  white: "#ffffff",
} as const;

/** Legacy palette alias kept for callers that use `palette.*` inline. */
export const palette = {
  navyDeep: colors.navyDeep,
  navy: colors.navy,
  navyMid: colors.navyMid,
  teal: colors.teal,
  gold: colors.yellow,
  goldLight: colors.yellow,
  seal: colors.yellow,
  paper: colors.paper,
  ink: colors.ink,
  inkDeep: colors.inkDeep,
} as const;

/** Semantic accent colors as CSS variables (themed). */
export const accent = {
  green: "var(--color-teal)",
  blue: "var(--color-blue)",
  yellow: "var(--color-yellow)",
  gray: "var(--color-gray)",
} as const;

export const displayFont = { fontFamily: "'Fraunces', Georgia, serif" } as const;

export const monoFont = { fontFamily: "'IBM Plex Mono', Menlo, monospace" } as const;

export const cardBaseClass =
  "rounded-2xl border border-slate-100 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md";
