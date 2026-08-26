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
      className="fade-up relative w-full"
      style={{ "--fade-up-y": "22px" } as CSSProperties}
    >
      <div className={`mx-auto max-w-xl sm:max-w-2xl lg:max-w-3xl ${isHome ? "bnr-text-zoom" : ""}`}>
        {/* Unified frosted glass card */}
        <div className="relative rounded-3xl border border-white/15 bg-gradient-to-br from-black/70 via-[#0a1520]/65 to-black/60 backdrop-blur-xl px-6 py-6 sm:px-10 sm:py-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
          {/* Accent line */}
          <div className="absolute top-0 left-6 sm:left-10 h-full w-px bg-gradient-to-b from-transparent via-(--color-yellow)/40 to-transparent" />

          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            {/* Tag pill */}
            {isHome ? (
              <div
                className="hero-slide-child mb-4 sm:mb-5 inline-flex items-center gap-2 sm:gap-2.5 rounded-full border border-(--color-yellow)/30 bg-(--color-yellow)/10 px-3.5 py-1.5 sm:px-5 sm:py-2"
                style={{ animationDelay: CHILD_DELAYS[0] }}
              >
                <span className="w-2 h-2 rounded-full bg-(--color-yellow) animate-[bnr-pulse_1.6s_ease-in-out_infinite]" />
                <span className="font-ledger text-[10px] font-bold tracking-[0.24em] uppercase text-(--color-yellow)">
                  Indexia Group
                </span>
              </div>
            ) : (
              <div
                className="hero-slide-child mb-4 sm:mb-5 inline-flex items-center gap-2 rounded-full border border-(--color-yellow)/30 bg-(--color-yellow)/10 px-3 py-1 sm:px-3.5 sm:py-1.5"
                style={{ animationDelay: CHILD_DELAYS[0] }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-(--color-yellow) animate-[bnr-pulse_1.6s_ease-in-out_infinite]" />
                <span className="font-ledger text-[10px] font-bold tracking-[0.18em] uppercase text-(--color-yellow) whitespace-nowrap">
                  {current.tag}
                </span>
              </div>
            )}

            {/* Heading */}
            <h1
              className={`hero-slide-child font-display font-bold text-white ${
                isHome
                  ? "text-[clamp(24px,4vw,44px)] leading-[1.08] mb-3"
                  : "text-[clamp(22px,3.8vw,42px)] leading-[1.1] mb-3"
              }`}
              style={{
                textShadow: textShadow(shadowLevel, 36, 0.95),
                animationDelay: CHILD_DELAYS[1],
              }}
            >
              {current.heading}
            </h1>

            {/* Motto */}
            {current.motto && (
              <p
                className="hero-slide-child mb-3 italic text-[14px] sm:text-[16px] font-medium text-(--color-yellow)/90"
                style={{ textShadow: textShadow(shadowLevel, 14, 0.8), animationDelay: CHILD_DELAYS[1] }}
              >
                {current.motto}
              </p>
            )}

            {/* Sub text */}
            <p
              className={`hero-slide-child text-white/80 ${
                isHome
                  ? "text-[13px] sm:text-[14px] leading-[1.7] max-w-full sm:max-w-150"
                  : "text-[12px] sm:text-[13px] leading-[1.7] max-w-full sm:max-w-130"
              }`}
              style={{ textShadow: textShadow(shadowLevel, 24, 0.9), animationDelay: CHILD_DELAYS[2] }}
            >
              {renderSub(current.sub)}
            </p>

            {/* CTA */}
            <div className="hero-slide-child flex flex-wrap gap-3 justify-center sm:justify-start mt-5 sm:mt-6" style={{ animationDelay: CHILD_DELAYS[3] }}>
              <Link
                to={isHome || !current.slug ? "/businesses" : `/businesses/${current.slug}`}
                className="group inline-flex items-center gap-2 rounded-full bg-(--color-teal) text-white font-bold text-[13px] tracking-wide px-6 py-2.5 sm:px-8 sm:py-3 shadow-[0_4px_20px_rgba(38,174,144,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(38,174,144,0.5)]"
              >
                {isHome ? t("hero.ctaExploreGroup") : t("hero.ctaExploreMore")}
                <svg className="transition-transform duration-300 group-hover:translate-x-1" width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  );
};

export default HeroSlideContent;
