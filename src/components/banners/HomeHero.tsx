import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import heroImg1 from "../../assets/hero-image1.png";
import heroImg2 from "../../assets/hero-image2.webp";
import heroImg3 from "../../assets/hero-image3.webp";
import HomeHeroGallery from "./HomeHeroGallery";
import type { HeroPanel } from "../cards/HeroGalleryThumb";

type BannerProps = {
  buttonText?: string;
  buttonLink?: string;
};

const panels: HeroPanel[] = [
  {
    id: 0,
    tag: "Indexia Group",
    heading: "One Group.\nMultiple Solutions.",
    sub: "From finance and logistics to agro and advertising, Indexia Group powers growth across industries with trusted, future-ready businesses.",
    image: heroImg1,
  },
  {
    id: 1,
    tag: "Indexia Finance",
    heading: "Plan With Confidence.\nInvest With Clarity.",
    sub: "Comprehensive financial planning, wealth management and insurance solutions built around your goals.",
    image: heroImg2,
  },
  {
    id: 2,
    tag: "Indexia Finserve",
    heading: "Credit That\nMoves With You.",
    sub: "Fast, flexible lending and credit facilitation for individuals and businesses ready to grow.",
    image: heroImg2,
  },
  {
    id: 3,
    tag: "Indexia Securities",
    heading: "Markets Made\nAccessible.",
    sub: "Broking, research and portfolio advisory that turns market complexity into informed action.",
    image: heroImg2,
  },
  {
    id: 4,
    tag: "Indexia Overseas",
    heading: "Trade Without\nBorders.",
    sub: "Import-export and global trade facilitation connecting local businesses to international markets.",
    image: heroImg3,
  },
  {
    id: 5,
    tag: "Agro Bio Fertilizers",
    heading: "Growing Soil.\nGrowing Yield.",
    sub: "Sustainable, bio-based fertilizers that improve farm productivity while protecting the land.",
    image: heroImg3,
  },
  {
    id: 6,
    tag: "Indexia Warehouse",
    heading: "Storage Built\nFor Scale.",
    sub: "Modern warehousing and logistics infrastructure that keeps goods moving efficiently.",
    image: heroImg3,
  },
  {
    id: 7,
    tag: "Indexia Foundation",
    heading: "Impact Beyond\nBusiness.",
    sub: "Community programs in education, health and livelihood that give back where we operate.",
    image: heroImg3,
  },
];

const TEXT_ZOOM_MS = 6000;
const AUTOPLAY_INTERVAL = 6000;

const Banner = ({ buttonText = "Explore Our Services", buttonLink = "/services" }: BannerProps) => {
  const [currentId, setCurrentId] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const autoplayRef = useRef<number | null>(null);

  const currentIndex = panels.findIndex((p) => p.id === currentId);
  const current = panels[currentIndex];
  const isHome = current.id === 0;

  const restartAutoplay = useCallback(() => {
    if (autoplayRef.current) window.clearInterval(autoplayRef.current);
    if (prefersReducedMotion) return;
    autoplayRef.current = window.setInterval(() => {
      setCurrentId((prev) => {
        const idx = panels.findIndex((p) => p.id === prev);
        return panels[(idx + 1) % panels.length].id;
      });
    }, AUTOPLAY_INTERVAL);
  }, [prefersReducedMotion]);

  useEffect(() => {
    restartAutoplay();
    return () => {
      if (autoplayRef.current) window.clearInterval(autoplayRef.current);
    };
  }, [restartAutoplay]);

  const selectPanel = (id: number) => {
    if (id === currentId) return;
    setCurrentId(id);
    restartAutoplay();
  };

  const prevPanel = () => selectPanel(panels[(currentIndex - 1 + panels.length) % panels.length].id);
  const nextPanel = () => selectPanel(panels[(currentIndex + 1) % panels.length].id);

  return (
    <section className="relative overflow-hidden bg-[#044e74]">
      <style>{`
        @keyframes bnr-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%      { opacity: .5; transform: scale(1.5); }
        }
        @keyframes bnr-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes bnr-text-zoom {
          from { transform: scale(1); }
          to   { transform: scale(1.12); }
        }
        .bnr-marquee-track {
          animation: bnr-marquee ${38}s linear infinite;
        }
        .bnr-marquee-track.paused {
          animation-play-state: paused;
        }
        .bnr-text-zoom {
          animation: bnr-text-zoom ${TEXT_ZOOM_MS}ms ease-out forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .bnr-marquee-track { animation: none; }
          .bnr-text-zoom { animation: none; }
        }
      `}</style>

      <div className="relative h-svh sm:h-screen flex flex-col">
        <div className="absolute inset-0">
          <AnimatePresence initial={false}>
            <motion.img
              key={current.id}
              layoutId={`panel-image-${current.id}`}
              src={current.image}
              alt=""
              aria-hidden="true"
              width={1408}
              height={768}
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover object-center"
              transition={{
                layout: prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
              }}
            />
          </AnimatePresence>
        </div>

        <div className="absolute inset-0 z-2 bg-[linear-gradient(180deg,rgba(2,16,26,0.68)_0%,rgba(2,16,26,0.4)_28%,rgba(2,16,26,0.62)_62%,rgba(2,16,26,0.94)_100%)]" />
        <div className="absolute bottom-0 left-0 z-2 h-60 w-full bg-linear-to-t from-[#02101a]/70 via-[#26ae90]/30 to-transparent pointer-events-none" />

        <div className="container relative z-3 flex-1 flex flex-col items-center justify-center text-center px-5 pt-28 pb-36 sm:pt-32 sm:pb-44 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.42, ease: "easeOut" }}
              className={`flex flex-col items-center ${isHome ? "max-w-200" : "max-w-190"}`}
            >
              <div className={`flex flex-col items-center ${prefersReducedMotion ? "" : "bnr-text-zoom"}`}>
                {isHome ? (
                  <div className="inline-flex items-center gap-2.5 rounded-full px-5 py-2 mb-6 border border-[#f2f231]/60 bg-[#f2f231]/10 backdrop-blur-md">
                    <span className="w-2 h-2 rounded-full bg-[#f2f231] animate-[bnr-pulse_1.6s_ease-in-out_infinite]" />
                    <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#f2f231]">
                      Indexia Group
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-row gap-3 flex-wrap justify-center">
                    <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 mb-5 backdrop-blur-sm border border-[#f2f231]/40 bg-[#7b7b7b]/70">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#f2f231] animate-[bnr-pulse_1.6s_ease-in-out_infinite]" />
                      <span className="text-[10px] font-bold tracking-[0.16em] uppercase text-[#f2f231]">
                        Currently in Development
                      </span>
                    </div>

                    <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 mb-5 backdrop-blur-sm border border-[#f2f231]/40 bg-[#7b7b7b]/70">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#f2f231] animate-[bnr-pulse_1.6s_ease-in-out_infinite]" />
                      <span className="text-[10px] font-bold tracking-[0.16em] uppercase text-[#f2f231]">
                        {current.tag}
                      </span>
                    </div>
                  </div>
                )}

                <h1
                  className={`font-extrabold text-white leading-[1.1] mb-5.5 whitespace-pre-line ${
                    isHome
                      ? "text-[clamp(34px,5.5vw,64px)] drop-shadow-[0_6px_24px_rgba(0,0,0,0.55)]"
                      : "text-[clamp(32px,5.5vw,60px)]"
                  }`}
                >
                  {current.heading}
                </h1>

                <p
                  className={`leading-[1.8] text-white/85 ${
                    isHome
                      ? "text-[19px] max-w-170 border-t border-white/20 pt-5 mt-1"
                      : "text-[17px] max-w-140"
                  }`}
                >
                  {current.sub}
                </p>
              </div>

              <div className="flex flex-wrap gap-3 justify-center mt-9">
                <Link
                  to={buttonLink}
                  className="inline-flex items-center gap-2 bg-[#26ae90] hover:bg-[#1e9478] text-white font-bold text-sm px-7 py-3.25 rounded-lg shadow-[0_4px_16px_rgba(38,174,144,0.4)] transition-colors duration-200 hover:-translate-y-0.5"
                >
                  {isHome ? buttonText : "Explore More"}
                  <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 border-2 border-white/45 hover:border-white/80 hover:bg-white/10 text-white font-bold text-sm px-7 py-3.25 rounded-lg transition-colors duration-200"
                >
                  About Indexia
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

