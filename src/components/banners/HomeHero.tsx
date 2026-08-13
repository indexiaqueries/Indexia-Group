import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import HomeHeroGallery from "./HomeHeroGallery";
import type { HeroPanel } from "../cards/HeroGalleryThumb";
import { getCompanyImage } from "../../data/companyImages";

const panels: HeroPanel[] = [
  {
    id: 0,
    tag: "Indexia Group",
    heading: "One Group.\nMultiple Solutions.",
    sub: "From finance and logistics to agro and advertising, Indexia Group powers growth across industries with trusted, future-ready businesses.",
    image: getCompanyImage("Indexia Group"),
  },
  {
    id: 1,
    tag: "Indexia Finance",
    heading: "An Entire\nLoan Destination.",
    sub: "You may apply to our portal for any kind loan at www.indexiafinance.com. We provide our services globally — in India, we are business partners with 43 banks and NBFCs.",
    image: getCompanyImage("Indexia Finance"),
  },
  {
    id: 2,
    tag: "Indexia Finserve Pvt. Ltd.",
    heading: "The Next Gen\nFinance Method.",
    sub: "Now the right bank will come at your doorstep.",
    image: getCompanyImage("Indexia Finserve"),
  },
  {
    id: 3,
    tag: "Indexia Overseas Pvt. Ltd.",
    heading: "Refined Sugar &\nAll Edible Items.",
    sub: "We deal and export refined sugar and all edible items.",
    image: getCompanyImage("Indexia Overseas"),
  },
  {
    id: 4,
    tag: "Indexia Agro Bio Fertilizers Pvt. Ltd.",
    heading: "We Manufacture &\nExport Organic Fertilizers",
    sub: "We manufacture organic fertilizers in India and export globally.",
    image: getCompanyImage("Agro Bio Fertilizers"),
  },
  {
    id: 5,
    tag: "Indexia Securities",
    heading: "Armed Commandos &\nArmed Security",
    sub: "Safeguarding politicians and big business tycoons.",
    image: getCompanyImage("Indexia Securities"),
  },
  {
    id: 6,
    tag: "Indexia Warehouse",
    heading: "Storage Built\nFor Scale.",
    sub: "Modern warehousing and logistics infrastructure that keeps goods moving efficiently.",
    image: getCompanyImage("Indexia Warehouse"),
  },
  {
    id: 7,
    tag: "Indexia Advertising",
    heading: "Your Brand on\nEvery Highway.",
    sub: "Multiple advertising holdings across highways, giving brands high-visibility campaigns.",
    image: getCompanyImage("Indexia Advertising"),
  },
  {
    id: 8,
    tag: "Indexia Foundation",
    heading: "Empowering\nAthletes.",
    sub: "Sports programs that train, mentor, and fund athletes on their journey to peak performance.",
    image: getCompanyImage("Indexia Foundation"),
  },
];

const TEXT_ZOOM_MS = 6000;
const AUTOPLAY_INTERVAL = 6000;

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
        className="font-semibold text-[#f2f231] underline decoration-[#f2f231]/60 underline-offset-2 hover:text-[#f7f75c]"
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
  const [currentId, setCurrentId] = useState(0);
  const [bgId, setBgId] = useState(0);
  const [morph, setMorph] = useState<MorphRect | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const autoplayRef = useRef<number | null>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const currentIdRef = useRef(currentId);
  const morphRef = useRef<MorphRect | null>(null);
  currentIdRef.current = currentId;
  morphRef.current = morph;

  const currentIndex = panels.findIndex((p) => p.id === currentId);
  const current = panels[currentIndex];
  const isHome = current.id === 0;
  const bgPanel = panels.find((p) => p.id === bgId) ?? panels[0];

  const captureThumbRect = (id: number): MorphRect | null => {
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
  };

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
              // Start just below the hero so the photo rises up into view
              top: section.clientHeight,
              left: 0,
              width: section.clientWidth,
              height: section.clientHeight,
            }
          : captureThumbRect(id);
      if (rect) setMorph(rect);
      else setBgId(id);
    },
    [prefersReducedMotion]
  );

  const restartAutoplay = useCallback(() => {
    if (autoplayRef.current) window.clearInterval(autoplayRef.current);
    if (prefersReducedMotion) return;
    autoplayRef.current = window.setInterval(() => {
      const idx = panels.findIndex((p) => p.id === currentIdRef.current);
      goTo(panels[(idx + 1) % panels.length].id, true);
    }, AUTOPLAY_INTERVAL);
  }, [prefersReducedMotion, goTo]);

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
      className="relative overflow-hidden bg-[#02101a]"
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
            src={bgPanel.image}
            alt=""
            aria-hidden="true"
            width={1408}
            height={768}
            decoding="async"
            fetchPriority="high"
            className="absolute inset-0 w-full h-full object-cover object-center"
            initial={false}
            animate={
              morph ? { y: morph.calm ? "25%" : "40%", opacity: 0 } : { y: "0%", opacity: 1 }
            }
            transition={
              morph
                ? morph.calm
                  ? { duration: prefersReducedMotion ? 0 : 1.3, ease: "easeInOut" }
                  : { duration: prefersReducedMotion ? 0 : 0.75, ease: [0.22, 1, 0.36, 1] }
                : { duration: 0 }
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
                  : { duration: prefersReducedMotion ? 0 : 0.75, ease: [0.22, 1, 0.36, 1] }
              }
              onAnimationComplete={() => {
                setBgId(morph.id);
                setMorph(null);
              }}
            >
              <img
                src={panels.find((p) => p.id === morph.id)?.image ?? panels[0].image}
                alt=""
                aria-hidden="true"
                className="w-full h-full object-cover object-center"
              />
            </motion.div>
          )}

          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-[2] bg-[#02101a]"
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
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.42, ease: "easeOut" }}
              className={`relative flex flex-col items-center ${isHome ? "max-w-200" : "max-w-190"}`}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_65%_at_50%_45%,rgba(2,16,26,0.7),transparent_72%)]"
              />
              <div className={`flex flex-col items-center ${prefersReducedMotion ? "" : "bnr-text-zoom"}`}>
                {isHome ? (
                  <div className="inline-flex items-center gap-2.5 rounded-full px-5 py-2 mb-6 border border-[#f2f231]/60 bg-[#f2f231]/10">
                    <span className="w-2 h-2 rounded-full bg-[#f2f231] animate-[bnr-pulse_1.6s_ease-in-out_infinite]" />
                    <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#f2f231]">
                      Indexia Group
                    </span>
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 mb-5 border border-[#f2f231]/45 bg-[#02101a]/55">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f2f231] animate-[bnr-pulse_1.6s_ease-in-out_infinite]" />
                    <span className="text-[10px] font-bold tracking-[0.16em] uppercase text-[#f2f231] whitespace-nowrap">
                      {current.tag}
                    </span>
                  </div>
                )}

                <h1
                  style={{ textShadow: "0 1px 2px rgba(2,16,26,0.5), 0 8px 36px rgba(2,16,26,0.95)" }}
                  className={`w-max font-display font-bold text-white leading-[1.12] mb-5.5 whitespace-pre-line ${
                    isHome
                      ? "text-[clamp(26px,4vw,44px)]"
                      : "text-[clamp(24px,3.8vw,40px)]"
                  }`}
                >
                  {current.heading}
                </h1>

                <p
                  style={{ textShadow: "0 1px 2px rgba(2,16,26,0.5), 0 4px 24px rgba(2,16,26,0.9)" }}
                  className={`leading-[1.8] text-white/90 ${
                    isHome
                      ? "text-[16px] max-w-170 border-t border-white/20 pt-5 mt-1"
                      : "text-[15px] max-w-140"
                  }`}
                >
                  {renderSub(current.sub)}
                </p>
              </div>

              <div className="flex flex-wrap gap-3 justify-center mt-9">
                <Link
                  to="/businesses"
                  className="inline-flex items-center gap-2 bg-[#26ae90] hover:bg-[#1e9478] text-white font-bold text-sm px-7 py-3.25 rounded-lg shadow-[0_4px_16px_rgba(38,174,144,0.4)] transition-colors duration-200 hover:-translate-y-0.5"
                >
                  {isHome ? "Explore Group Companies" : "Explore More"}
                  <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          onClick={prevPanel}
          aria-label="Previous panel"
          className="absolute top-1/2 -translate-y-1/2 left-5 md:left-8 z-10 w-11 h-11 rounded-full border border-white/35 bg-white/10 backdrop-blur-md text-white text-xl items-center justify-center hover:bg-white/25 transition-colors duration-200 hidden sm:flex"
        >
          ‹
        </button>
        <button
          onClick={nextPanel}
          aria-label="Next panel"
          className="absolute top-1/2 -translate-y-1/2 right-5 md:right-8 z-10 w-11 h-11 rounded-full border border-white/35 bg-white/10 backdrop-blur-md text-white text-xl items-center justify-center hover:bg-white/25 transition-colors duration-200 hidden sm:flex"
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
