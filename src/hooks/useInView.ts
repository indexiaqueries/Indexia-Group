import { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";

type UseInViewOptions = {
  once?: boolean;
  amount?: number;
  rootMargin?: string;
};

export const useInView = <T extends Element>(
  options: UseInViewOptions = {}
): [RefObject<T | null>, boolean] => {
  const { once = true, amount = 0.2, rootMargin = "0px 0px -8% 0px" } = options;
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver !== "undefined") {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          setInView(true);
          if (once) observer.unobserve(entry.target);
        },
        { threshold: amount, rootMargin }
      );
      observer.observe(el);
      return () => observer.disconnect();
    }

    const check = () => {
      const rect = el.getBoundingClientRect();
      const viewport = window.innerHeight || document.documentElement.clientHeight;
      const height = rect.height || 1;
      const visible = Math.min(rect.bottom, viewport) - Math.max(rect.top, 0);
      if (visible / height >= amount) {
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
  }, [once, amount, rootMargin]);

  return [ref, inView];
};
