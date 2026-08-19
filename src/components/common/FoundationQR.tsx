import { useState, useEffect } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const FoundationQR = () => {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past ~60vh (hero section height)
      const threshold = window.innerHeight * 0.6;
      setVisible(window.scrollY > threshold);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const qrPlaceholder = (
    <div className="flex h-48 w-48 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-(--color-teal)/40 bg-white p-4 shadow-xl">
      <svg
        className="mb-2 h-16 w-16 text-(--color-teal)/50"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path d="M3 7V5a2 2 0 012-2h2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M17 3h2a2 2 0 012 2v2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M21 17v2a2 2 0 01-2 2h-2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 21H5a2 2 0 01-2-2v-2" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="7" y="7" width="4" height="4" rx="0.5" />
        <rect x="13" y="7" width="4" height="4" rx="0.5" />
        <rect x="7" y="13" width="4" height="4" rx="0.5" />
        <rect x="13" y="13" width="2" height="2" rx="0.5" />
      </svg>
      <p className="text-center text-[11px] font-bold text-(--color-teal)/70">QR Code Coming Soon</p>
    </div>
  );

  return (
    <div
      className={`fixed end-4 bottom-24 z-40 transition-all duration-500 sm:end-6 sm:bottom-28 ${
        visible
          ? "pointer-events-auto translate-x-0 opacity-100"
          : "pointer-events-none translate-x-20 opacity-0"
      }`}
    >
      {!expanded ? (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          aria-label="Donate to Indexia Foundation"
          className={`group relative flex h-14 w-14 items-center justify-center rounded-full bg-(--color-teal-deep) text-white shadow-[0_0_0_4px_rgba(38,130,110,0.25),0_10px_28px_rgba(2,16,26,0.45)] transition-all duration-300 hover:scale-110 hover:shadow-[0_0_0_4px_rgba(38,130,110,0.4),0_14px_34px_rgba(2,16,26,0.55)] ${
            prefersReducedMotion ? "" : "animate-foundation-pulse"
          }`}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} className="h-6 w-6">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <span className="absolute -top-1 -end-1 flex h-4 w-4 items-center justify-center rounded-full bg-(--color-yellow) text-[8px] font-bold text-(--color-deep)">
            ❤
          </span>
        </button>
      ) : (
        <div className="animate-foundation-pop-in rounded-3xl border border-(--color-teal)/20 bg-white p-4 shadow-[0_20px_50px_rgba(2,16,26,0.25)]">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-(--color-teal-deep)">
              Indexia Foundation
            </p>
            <button
              type="button"
              onClick={() => setExpanded(false)}
              className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-colors hover:bg-slate-200"
              aria-label="Close"
            >
              ×
            </button>
          </div>
          {qrPlaceholder}
          <p className="mt-3 text-center text-[10px] leading-5 text-slate-500">
            Scan to donate and support athletes on their journey to the Olympics.
          </p>
        </div>
      )}
    </div>
  );
};

export default FoundationQR;
