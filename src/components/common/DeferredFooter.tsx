import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

// Lazy-load the heavy Footer — it pulls in footer-bg image, translations,
// and link data, but is only visible when scrolled to the bottom.
const Footer = lazy(() => import("./Footer"));

// Minimal placeholder that reserves the same space to prevent layout shift.
const FooterPlaceholder = () => <footer id="footer" className="bg-(--color-deep)" />;

export default function DeferredFooter() {
  const ref = useRef<HTMLElement>(null);
  const [shouldRender, setShouldRender] = useState(false);
  const location = useLocation();

  // Brochure pages hide the footer entirely
  const hidden =
    location.pathname === "/warehouse-brochure" ||
    location.pathname === "/advertising-brochure";

  useEffect(() => {
    if (hidden || shouldRender) return;
    const el = ref.current;
    if (!el) return;

    // If the footer placeholder is already in view (very short page), render immediately
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight + 600) {
      setShouldRender(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin: "800px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hidden, shouldRender]);

  if (hidden) return null;

  return (
    <footer ref={ref} id="footer-wrapper">
      {shouldRender ? (
        <Suspense fallback={<FooterPlaceholder />}>
          <Footer />
        </Suspense>
      ) : (
        <FooterPlaceholder />
      )}
    </footer>
  );
}
