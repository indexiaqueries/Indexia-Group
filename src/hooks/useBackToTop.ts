import { useEffect, useState } from "react";

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
