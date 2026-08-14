import { useEffect, useState } from "react";

/**
 * Visibility gating for the floating Back to Top button: it appears only once
 * the user has scrolled past ~75% of the first screen, and disappears while
 * any of `hideOver`'s selectors occupies the viewport — so it never covers the
 * footer or an enquiry band. On pages without a footer (or enquiry section)
 * the selectors simply don't match and the button behaves normally, which is
 * what makes this reusable beyond the footer.
 */
export const useBackToTop = (hideOver: string[] = ["#footer", "#enquiry, #enquiry-form"]) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const vh = window.innerHeight;
      if (window.scrollY < vh * 0.75) {
        setVisible(false);
        return;
      }
      const blocked = hideOver.some((selector) => {
        const el = document.querySelector(selector);
        if (!el) return false;
        const r = el.getBoundingClientRect();
        return r.top < vh && r.bottom > 0;
      });
      setVisible(!blocked);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [hideOver]);

  return visible;
};
