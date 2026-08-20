import { useEffect, useState } from "react";

/**
 * Animate from 0 → `target` once `run` becomes true.
 * Returns the current display value.
 */
export const useCountUp = (
  target: number,
  run: boolean,
  duration = 1200,
): number => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!run || target === 0) return;

    let raf = 0;
    const t0 = performance.now();

    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      // Cubic ease-out
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, target, duration]);

  return value;
};
