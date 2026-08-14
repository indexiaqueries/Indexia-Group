import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import HomeHeroGallery from "./HomeHeroGallery";
import type { HeroPanel } from "../cards/HeroGalleryThumb";
import { getCompanyImage } from "../../data/companyImages";

const makePanels = (t: (key: string) => string): HeroPanel[] => [
  {
    id: 0,
    tag: t("hero.p0.tag"),
    heading: t("hero.p0.heading"),
    sub: t("hero.p0.sub"),
    image: getCompanyImage("Indexia Group"),
  },
  {
    id: 1,
    tag: t("hero.p1.tag"),
    heading: t("hero.p1.heading"),
    sub: t("hero.p1.sub"),
    image: getCompanyImage("Indexia Finance"),
  },
  {
    id: 2,
    tag: t("hero.p2.tag"),
    heading: t("hero.p2.heading"),
    sub: t("hero.p2.sub"),
    image: getCompanyImage("Indexia Finserve"),
  },
  {
    id: 3,
    tag: t("hero.p3.tag"),
    heading: t("hero.p3.heading"),
    sub: t("hero.p3.sub"),
    image: getCompanyImage("Indexia Overseas"),
  },
  {
    id: 4,
    tag: t("hero.p4.tag"),
    heading: t("hero.p4.heading"),
    sub: t("hero.p4.sub"),
    image: getCompanyImage("Agro Bio Fertilizers"),
  },
  {
    id: 5,
    tag: t("hero.p5.tag"),
    heading: t("hero.p5.heading"),
    sub: t("hero.p5.sub"),
    image: getCompanyImage("Indexia Securities"),
  },
  {
    id: 6,
    tag: t("hero.p6.tag"),
    heading: t("hero.p6.heading"),
    sub: t("hero.p6.sub"),
    image: getCompanyImage("Indexia Warehouse"),
  },
  {
    id: 7,
    tag: t("hero.p7.tag"),
    heading: t("hero.p7.heading"),
    sub: t("hero.p7.sub"),
    image: getCompanyImage("Indexia Advertising"),
  },
  {
    id: 8,
    tag: t("hero.p8.tag"),
    heading: t("hero.p8.heading"),
    sub: t("hero.p8.sub"),
    image: getCompanyImage("Indexia Foundation"),
  },
];

const TEXT_ZOOM_MS = 6000;
const AUTOPLAY_INTERVAL = 6000;

const KEN_BURNS_SCALE: [number, number] = [1, 1.08];
const KEN_BURNS_MS = 6500;

const SLIDE_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const SHADOW_LEVEL: Record<number, number> = {
  2: 1.55, 
  3: 1.65, 
  4: 1.55, 
  7: 1.45, 
};

const textShadow = (level: number, blur: number, alpha: number) =>
  [
    `0 1px 2px rgba(2,16,26,${Math.min(0.7, 0.5 * level).toFixed(2)})`,
    `0 8px ${Math.round(blur * level)}px rgba(2,16,26,${Math.min(1, alpha * level).toFixed(2)})`,
  ].join(", ");

const slideChildAnim = (reduce: boolean, index: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: reduce
    ? { duration: 0 }
    : { duration: 0.45, delay: 0.05 + index * 0.09, ease: SLIDE_EASE },
});

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

type MorphRect = {
  id: number;
  top: number;
  left: number;
  width: number;
  height: number;
  calm?: boolean;
};

const Banner = () => {
  const { t } = useTranslation();
  const [currentId, setCurrentId] = useState(0);
  const [bgId, setBgId] = useState(0);
  const [morph, setMorph] = useState<MorphRect | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const reduce = !!prefersReducedMotion;
  const childAnim = useCallback((index: number) => slideChildAnim(reduce, index), [reduce]);
  const panels = useMemo(() => makePanels(t), [t]);

  const autoplayRef = useRef<number | null>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const currentIdRef = useRef(currentId);
  const morphRef = useRef<MorphRect | null>(null);

  useEffect(() => {
    currentIdRef.current = currentId;
  }, [currentId]);

  useEffect(() => {
    morphRef.current = morph;
  }, [morph]);

  const currentIndex = panels.findIndex((p) => p.id === currentId);
  const current = panels[currentIndex];
  const isHome = current.id === 0;
  const shadowLevel = SHADOW_LEVEL[currentId] ?? 1;
  const bgPanel = panels.find((p) => p.id === bgId) ?? panels[0];

  const captureThumbRect = useCallback((id: number): MorphRect | null => {
    const section = heroSectionRef.current;
    const panel = panels.find((p) => p.id === id);
    if (!section || !panel) return null;
    const thumbs = [
      ...document.querySelectorAll<HTMLButtonElement>(
        `button[aria-label="Show ${panel.tag}"]`
      ),
    ];
    const thumb =
      thumbs.find((t) => {
        const r = t.getBoundingClientRect();
        return (
          r.right > 0 &&
          r.left < window.innerWidth &&
          r.bottom > 0 &&
          r.top < window.innerHeight
        );
      }) ?? thumbs[0];
    if (!thumb) return null;
    const sectionRect = section.getBoundingClientRect();
    const thumbRect = thumb.getBoundingClientRect();
    return {
      id,
      top: thumbRect.top - sectionRect.top,
      left: thumbRect.left - sectionRect.left,
      width: thumbRect.width,
      height: thumbRect.height,
    };
  }, [panels]);

  const goTo = useCallback(
    (id: number, calm = false) => {
      if (id === currentIdRef.current) return;
      setCurrentId(id);
      if (prefersReducedMotion) {
        setBgId(id);
        return;
      }
      if (morphRef.current) setBgId(morphRef.current.id);
      const section = heroSectionRef.current;
      const rect =
        calm && section
          ? {
              id,
              calm: true,
              top: section.clientHeight,
              left: 0,
              width: section.clientWidth,
              height: section.clientHeight,
            }
          : captureThumbRect(id);
      if (rect) setMorph(rect);
      else setBgId(id);
    },
    [prefersReducedMotion, captureThumbRect]
  );

  const restartAutoplay = useCallback(() => {
    if (autoplayRef.current) window.clearInterval(autoplayRef.current);
    if (prefersReducedMotion) return;
    autoplayRef.current = window.setInterval(() => {
      const idx = panels.findIndex((p) => p.id === currentIdRef.current);
      goTo(panels[(idx + 1) % panels.length].id, true);
    }, AUTOPLAY_INTERVAL);
  }, [prefersReducedMotion, goTo, panels]);

  useEffect(() => {
    restartAutoplay();
    return () => {
      if (autoplayRef.current) window.clearInterval(autoplayRef.current);
    };
  }, [restartAutoplay]);

  const selectPanel = (id: number) => {
    goTo(id);
    restartAutoplay();
  };

  const prevPanel = () => selectPanel(panels[(currentIndex - 1 + panels.length) % panels.length].id);
  const nextPanel = () => selectPanel(panels[(currentIndex + 1) % panels.length].id);

  return (
    <section
      ref={heroSectionRef}
      className="relative overflow-hidden bg-(--color-night)"
    >
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

      <div className="relative flex min-h-svh flex-col sm:min-h-screen">
        <div className="absolute inset-0 overflow-hidden">
          <motion.img
            key={bgId}
            src={bgPanel.image}
            alt=""
            aria-hidden="true"
            width={1408}
            height={768}
            decoding="async"
            fetchPriority="high"
            className="absolute inset-0 w-full h-full object-cover object-center"
            initial={{ scale: 1, y: "0%", opacity: 1 }}
            animate={
              morph
                ? { y: morph.calm ? "25%" : "40%", opacity: 0, scale: 1.1 }
                : prefersReducedMotion
                  ? { y: "0%", opacity: 1, scale: 1 }
                  : { y: "0%", opacity: 1, scale: KEN_BURNS_SCALE }
            }
            transition={
              morph
                ? morph.calm
                  ? { duration: prefersReducedMotion ? 0 : 1.3, ease: "easeInOut" }
                  : { duration: prefersReducedMotion ? 0 : 0.75, ease: [0.22, 1, 0.36, 1] }
                : prefersReducedMotion
                  ? { duration: 0 }
                  : {
                      y: { duration: 0 },
                      opacity: { duration: 0 },
                      scale: {
                        duration: KEN_BURNS_MS / 1000,
                        ease: "linear",
                        repeat: Infinity,
                        repeatType: "reverse",
                      },
                    }
            }
          />

          {morph && (
            <motion.div
              key={morph.id}
              data-morph
              className="pointer-events-none absolute inset-0 z-[2] overflow-hidden"
              initial={
                morph.calm
                  ? {
                      opacity: 0,
                      top: morph.top,
                      left: morph.left,
                      width: morph.width,
                      height: morph.height,
                      borderRadius: 12,
                    }
                  : {
                      top: morph.top,
                      left: morph.left,
                      width: morph.width,
                      height: morph.height,
                      borderRadius: 12,
                    }
              }
              animate={
                morph.calm
                  ? {
                      opacity: 1,
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      borderRadius: 0,
                    }
                  : {
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      borderRadius: 0,
                    }
              }
              transition={
                morph.calm
                  ? { duration: prefersReducedMotion ? 0 : 1.3, ease: "easeInOut" }
                  : { duration: prefersReducedMotion ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }
              }
              onAnimationComplete={() => {
                setBgId(morph.id);
                setMorph(null);
              }}
            >
              <motion.img
                src={panels.find((p) => p.id === morph.id)?.image ?? panels[0].image}
                alt=""
                aria-hidden="true"
                className="w-full h-full object-cover object-center"
                initial={false}
                animate={{ scale: morph.calm ? 1 : [1.04, 1] }}
                transition={
                  morph.calm
                    ? { duration: 0 }
                    : { scale: { duration: 0.8, ease: "easeOut" } }
                }
              />
            </motion.div>
          )}

          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-[2] bg-(--color-night)"
            initial={false}
            animate={{ opacity: morph?.calm ? 0.25 : 0 }}
            transition={
              morph?.calm
                ? { duration: 1.3, ease: "easeInOut" }
                : { duration: 0.6, ease: "easeOut" }
            }
          />

        </div>

        <div className="container relative z-3 flex-1 flex flex-col items-center justify-center text-center px-5 pt-28 pb-36 sm:pt-32 sm:pb-44 overflow-hidden">

          <AnimatePresence mode="popLayout">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              exit={
                prefersReducedMotion
                  ? undefined
                  : {
                      opacity: 0,
                      y: 72,
                      scale: 0.94,
                      transition: { duration: 0.34, ease: [0.55, 0.06, 0.68, 0.19] },
                    }
              }
              transition={
                prefersReducedMotion
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
              <div className={`flex flex-col items-center ${prefersReducedMotion ? "" : "bnr-text-zoom"}`}>
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
                  {isHome ? "Explore Group Companies" : "Explore More"}
                  <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          onClick={prevPanel}
          aria-label="Previous panel"
          className="absolute top-1/2 -translate-y-1/2 start-5 md:start-8 z-10 w-11 h-11 rounded-full border border-white/35 bg-white/10 backdrop-blur-md text-white text-xl items-center justify-center hover:bg-white/25 transition-colors duration-200 hidden sm:flex"
        >
          ‹
        </button>
        <button
          onClick={nextPanel}
          aria-label="Next panel"
          className="absolute top-1/2 -translate-y-1/2 end-5 md:end-8 z-10 w-11 h-11 rounded-full border border-white/35 bg-white/10 backdrop-blur-md text-white text-xl items-center justify-center hover:bg-white/25 transition-colors duration-200 hidden sm:flex"
        >
          ›
        </button>

        <HomeHeroGallery
          panels={panels}
          currentId={currentId}
          reducedMotion={!!prefersReducedMotion}
          onSelect={selectPanel}
        />
      </div>
    </section>
  );
};

export default Banner;
