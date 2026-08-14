const parseHex = (hex: string): [number, number, number] => {
  const h = hex.replace("#", "");
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
};

const toHex = (rgb: [number, number, number]): string =>
  `#${rgb
    .map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0"))
    .join("")}`;

const luminance = (hex: string): number => {
  const [r, g, b] = parseHex(hex);
  return 0.299 * r + 0.587 * g + 0.114 * b;
};

const isLightColor = (hex: string): boolean => luminance(hex) > 170;

export const contrastText = (hex: string): string => (isLightColor(hex) ? "#241a03" : "#ffffff");

const mix = (from: string, to: string, t: number): string => {
  const a = parseHex(from);
  const b = parseHex(to);
  return toHex(a.map((v, i) => v * (1 - t) + b[i] * t) as [number, number, number]);
};

export const accentInk = (hex: string): string => (isLightColor(hex) ? mix(hex, "#122029", 0.52) : hex);
