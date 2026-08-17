import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { HeroPanel } from "../../cards/HeroGalleryThumb";
import { TEXT_ZOOM_MS, textShadow } from "./heroMotion";

const PORTAL_URL = "https://www.indexiafinance.com/";
const PORTAL_TEXT = "www.indexiafinance.com";

const renderSub = (text: string) => {
  const parts = text.split(PORTAL_TEXT);
  if (parts.length === 1) return text;
  return (
    <>
      {parts[0]}
      <a
        href={PORTAL_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold text-(--color-yellow) underline decoration-(--color-yellow)/60 underline-offset-2 hover:text-(--color-yellow-bright)"
      >
        {PORTAL_TEXT}
      </a>
      {parts.slice(1).join(PORTAL_TEXT)}
    </>
  );
};

// Staggered entrance for hero content — same rhythm the motion version used.
const CHILD_DELAYS = ["0.05s", "0.14s", "0.23s", "0.32s"];

type HeroSlideContentProps = {
  panel: HeroPanel;
  isHome: boolean;
  shadowLevel: number;
};

const HeroSlideContent = ({ panel: current, isHome, shadowLevel }: HeroSlideContentProps) => {
  const { t } = useTranslation();
  return (
  <>
    <style>{`
      @keyframes bnr-pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50%      { opacity: .5; transform: scale(1.5); }
      }
      @keyframes bnr-text-zoom {
        from { transform: scale(1); }
        to   { transform: scale(1.12); }
      }
      .bnr-text-zoom {
        animation: bnr-text-zoom ${TEXT_ZOOM_MS}ms ease-out forwards;
      }
      @media (prefers-reduced-motion: reduce) {
        .bnr-text-zoom { animation: none; }
      }
    `}</style>

    <div
      key={current.id}
      className="fade-up relative flex flex-col items-center"
      style={{ "--fade-up-y": "22px" } as CSSProperties}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_30%,rgba(38,174,144,0.36),rgba(38,174,144,0.10)_55%,transparent_72%),radial-gradient(ellipse_45%_30%_at_50%_92%,rgba(242,242,49,0.22),transparent_65%)]"
      />
      <div className={`flex flex-col items-center ${isHome ? "bnr-text-zoom" : ""}`}>
        {isHome ? (
          <div
            className="hero-slide-child inline-flex items-center gap-2.5 rounded-full px-5 py-2 mb-6 border border-(--color-yellow)/60 bg-(--color-yellow)/10"
            style={{ animationDelay: CHILD_DELAYS[0] }}
          >
            <span className="w-2 h-2 rounded-full bg-(--color-yellow) animate-[bnr-pulse_1.6s_ease-in-out_infinite]" />
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-(--color-yellow)">
              Indexia Group
            </span>
          </div>
        ) : (
          <div
            className="hero-slide-child inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 mb-5 border border-(--color-yellow)/45 bg-(--color-night)/55"
            style={{ animationDelay: CHILD_DELAYS[0] }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-(--color-yellow) animate-[bnr-pulse_1.6s_ease-in-out_infinite]" />
            <span className="text-[10px] font-bold tracking-[0.16em] uppercase text-(--color-yellow) whitespace-nowrap">
              {current.tag}
            </span>
          </div>
        )}

        <h1
          className={`hero-slide-child w-max font-display font-bold text-white leading-[1.12] mb-5.5 whitespace-pre-line ${
            isHome
              ? "text-[clamp(26px,4vw,44px)]"
              : "text-[clamp(24px,3.8vw,40px)]"
          }`}
          style={{ textShadow: textShadow(shadowLevel, 36, 0.95), animationDelay: CHILD_DELAYS[1] }}
        >
          {current.heading}
        </h1>

        <p
          className={`hero-slide-child leading-[1.8] text-white/95 rounded-xl border border-white/20 bg-(image:--hero-sub-gradient) shadow-[0_8px_24px_rgba(2,16,26,0.35)] backdrop-blur-[2px] ${
            isHome
              ? "text-[16px] max-w-170 px-5 py-4 mt-1"
              : "text-[15px] max-w-140 px-4 py-3"
          }`}
          style={{ textShadow: textShadow(shadowLevel, 24, 0.9), animationDelay: CHILD_DELAYS[2] }}
        >
          {renderSub(current.sub)}
        </p>
      </div>

      <div className="hero-slide-child flex flex-wrap gap-3 justify-center mt-9" style={{ animationDelay: CHILD_DELAYS[3] }}>
        <Link
          to="/businesses"
          className="inline-flex items-center gap-2 bg-(--color-teal) hover:bg-(--color-teal-deep) text-white font-bold text-sm px-7 py-3.25 rounded-lg shadow-[0_4px_16px_rgba(38,174,144,0.4)] transition-colors duration-200 hover:-translate-y-0.5"
        >
          {isHome ? t("hero.ctaExploreGroup") : t("hero.ctaExploreMore")}
          <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </div>
  </>
  );
};

export default HeroSlideContent;
