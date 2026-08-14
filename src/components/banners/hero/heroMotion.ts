export const TEXT_ZOOM_MS = 6000;
export const AUTOPLAY_INTERVAL = 6000;

export const KEN_BURNS_SCALE: [number, number] = [1, 1.08];
export const KEN_BURNS_MS = 6500;

export const SLIDE_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

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

export const slideChildAnim = (reduce: boolean, index: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: reduce
    ? { duration: 0 }
    : { duration: 0.45, delay: 0.05 + index * 0.09, ease: SLIDE_EASE },
});
