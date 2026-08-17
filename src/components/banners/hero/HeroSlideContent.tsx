import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { HeroPanel } from "../../cards/HeroGalleryThumb";
import { SLIDE_EASE, TEXT_ZOOM_MS, textShadow } from "./heroMotion";

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

type HeroSlideContentProps = {
  panel: HeroPanel;
  isHome: boolean;
  shadowLevel: number;
  reduce: boolean;
  childAnim: (index: number) => Record<string, unknown>;
};

const HeroSlideContent = ({ panel: current, isHome, shadowLevel, reduce, childAnim }: HeroSlideContentProps) => {
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

    <AnimatePresence mode="popLayout">
      <motion.div
        key={current.id}
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        exit={
          reduce
            ? undefined
            : {
                opacity: 0,
                y: 72,
                scale: 0.94,
                transition: { duration: 0.34, ease: [0.55, 0.06, 0.68, 0.19] },
              }
        }
        transition={
          reduce
            ? { duration: 0 }
            : {
                opacity: { duration: 0.4 },
                y: { duration: 0.55, ease: SLIDE_EASE },
              }
        }
        className={`relative flex flex-col items-center ${isHome ? "max-w-200" : "max-w-190"}`}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_30%,rgba(38,174,144,0.36),rgba(38,174,144,0.10)_55%,transparent_72%),radial-gradient(ellipse_45%_30%_at_50%_92%,rgba(242,242,49,0.22),transparent_65%)]"
        />
        <div className={`flex flex-col items-center ${reduce ? "" : "bnr-text-zoom"}`}>
          {isHome ? (
            <motion.div
              {...childAnim(0)}
              className="inline-flex items-center gap-2.5 rounded-full px-5 py-2 mb-6 border border-(--color-yellow)/60 bg-(--color-yellow)/10"
            >
              <span className="w-2 h-2 rounded-full bg-(--color-yellow) animate-[bnr-pulse_1.6s_ease-in-out_infinite]" />
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-(--color-yellow)">
                Indexia Group
              </span>
            </motion.div>
          ) : (
            <motion.div
              {...childAnim(0)}
              className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 mb-5 border border-(--color-yellow)/45 bg-(--color-night)/55"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-(--color-yellow) animate-[bnr-pulse_1.6s_ease-in-out_infinite]" />
              <span className="text-[10px] font-bold tracking-[0.16em] uppercase text-(--color-yellow) whitespace-nowrap">
                {current.tag}
              </span>
            </motion.div>
          )}

          <motion.h1
            {...childAnim(1)}
            style={{ textShadow: textShadow(shadowLevel, 36, 0.95) }}
            className={`w-max font-display font-bold text-white leading-[1.12] mb-5.5 whitespace-pre-line ${
              isHome
                ? "text-[clamp(26px,4vw,44px)]"
                : "text-[clamp(24px,3.8vw,40px)]"
            }`}
          >
            {current.heading}
          </motion.h1>

          <motion.p
            {...childAnim(2)}
            style={{ textShadow: textShadow(shadowLevel, 24, 0.9) }}
            className={`leading-[1.8] text-white/90 ${
              isHome
                ? "text-[16px] max-w-170 border-t border-white/20 pt-5 mt-1"
                : "text-[15px] max-w-140"
            }`}
          >
            {renderSub(current.sub)}
          </motion.p>
        </div>

        <motion.div {...childAnim(3)} className="flex flex-wrap gap-3 justify-center mt-9">
          <Link
            to="/businesses"
            className="inline-flex items-center gap-2 bg-(--color-teal) hover:bg-(--color-teal-deep) text-white font-bold text-sm px-7 py-3.25 rounded-lg shadow-[0_4px_16px_rgba(38,174,144,0.4)] transition-colors duration-200 hover:-translate-y-0.5"
          >
            {isHome ? t("hero.ctaExploreGroup") : t("hero.ctaExploreMore")}
            <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  </>
  );
};

export default HeroSlideContent;
