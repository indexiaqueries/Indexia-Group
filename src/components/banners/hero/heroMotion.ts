export const TEXT_ZOOM_MS = 6000;
export const AUTOPLAY_INTERVAL = 6000;

export const SHADOW_LEVEL: Record<number, number> = {
  2: 1.55,
  3: 1.65,
  4: 1.55,
  7: 1.45,
};

export const textShadow = (level: number, blur: number, alpha: number) =>
  [
    `0 1px 2px rgba(2,16,26,${Math.min(0.7, 0.5 * level).toFixed(2)})`,
    `0 8px ${Math.round(blur * level)}px rgba(2,16,26,${Math.min(1, alpha * level).toFixed(2)})`,
  ].join(", ");
