import { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";

type UseInViewOptions = {
  once?: boolean;
  amount?: number;
};

export const useInView = <T extends Element>(
  options: UseInViewOptions = {}
): [RefObject<T | null>, boolean] => {
  const { once = true, amount = 0.2 } = options;
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const isVisible = () => {
      if (!ref.current) return false;
      const rect = ref.current.getBoundingClientRect();
      const viewport = window.innerHeight || document.documentElement.clientHeight;
      const height = rect.height || 1;
      const visible = Math.min(rect.bottom, viewport) - Math.max(rect.top, 0);
      return visible / height >= amount;
    };

    const check = () => {
      if (isVisible()) {
        setInView(true);
        if (once) {
          window.removeEventListener("scroll", check);
          window.removeEventListener("resize", check);
        }
      }
    };

    // The element may already be in view on mount.
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);

    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [once, amount]);

  return [ref, inView];
};
