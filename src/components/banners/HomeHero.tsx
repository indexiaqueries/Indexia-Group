import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import heroImg1 from "../../assets/hero-image1.png";
import heroImg2 from "../../assets/hero-image2.webp";
import heroImg3 from "../../assets/hero-image3.webp";

type BannerProps = {
  buttonText?: string;
  buttonLink?: string;
};

type Panel = {
  id: number;
  tag: string;
  heading: string;
  sub: string;
  image: string;
};

// 8 panels, mapped to Indexia's actual business units rather than
// arbitrary repeats — each image is shared by the units it belongs to.
const panels: Panel[] = [
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

const AUTOPLAY_INTERVAL = 6000;
const MARQUEE_SECONDS = 38;

const Banner = ({ buttonText = "Explore Our Group", buttonLink = "/services" }: BannerProps) => {
  const [currentId, setCurrentId] = useState(0);
  const [filmstripPaused, setFilmstripPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const autoplayRef = useRef<number | null>(null);

  const currentIndex = panels.findIndex((p) => p.id === currentId);
  const current = panels[currentIndex];

  const restartAutoplay = useCallback(() => {
    if (autoplayRef.current) window.clearInterval(autoplayRef.current);
    autoplayRef.current = window.setInterval(() => {
      setCurrentId((prev) => {
        const idx = panels.findIndex((p) => p.id === prev);
        return panels[(idx + 1) % panels.length].id;
      });
    }, AUTOPLAY_INTERVAL);
  }, []);

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

  // Doubled list drives the seamless marquee loop. Only the first copy
  // carries a layoutId — that's what the hero image morphs from/to.
  // The second copy is purely decorative continuation of the strip.
  const marqueeList = [...panels, ...panels];

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
        .bnr-marquee-track {
          animation: bnr-marquee ${MARQUEE_SECONDS}s linear infinite;
        }
        .bnr-marquee-track.paused,
        .bnr-marquee-track.reduced {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .bnr-marquee-track { animation: none; }
        }
      `}</style>

      {/* ---------- HERO ---------- */}
      <div className="relative min-h-[86svh] sm:min-h-[90vh] flex items-center justify-center">
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

        <div className="absolute inset-0 z-2 bg-[linear-gradient(180deg,rgba(2,16,26,0.72)_0%,rgba(2,16,26,0.45)_32%,rgba(2,16,26,0.62)_68%,rgba(2,16,26,0.88)_100%)]" />

        <div className="absolute bottom-0 left-0 z-2 h-20 w-full bg-linear-to-t from-[#286090]/30 via-[#26ae90]/30 to-transparent pointer-events-none" />

        <div className="container relative z-3 w-full flex flex-col items-center text-center px-5 pt-24 pb-44 sm:pt-30 sm:pb-52">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.42, ease: "easeOut" }}
              className="flex flex-col items-center max-w-190"
            >
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

              <h1 className="text-[clamp(32px,5.5vw,60px)] font-extrabold text-white leading-[1.14] mb-5.5 whitespace-pre-line">
                {current.heading}
              </h1>

              <p className="text-[17px] leading-[1.8] text-white/85 max-w-140">
                {current.sub}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="flex flex-wrap gap-3 justify-center mt-9">
            <Link
              to={buttonLink}
              className="inline-flex items-center gap-2 bg-[#26ae90] hover:bg-[#1e9478] text-white font-bold text-sm px-7 py-3.25 rounded-lg shadow-[0_4px_16px_rgba(38,174,144,0.4)] transition-colors duration-200 hover:-translate-y-0.5"
            >
              {buttonText}
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
      </div>

      {/* ---------- FILMSTRIP ---------- */}
      <div
        className="relative z-4 border-t border-white/10 bg-[#02101a]/70 backdrop-blur-sm py-4"
        onMouseEnter={() => setFilmstripPaused(true)}
        onMouseLeave={() => setFilmstripPaused(false)}
      >
        <div className="overflow-hidden">
          <div
            className={`flex gap-4 w-max bnr-marquee-track ${
              filmstripPaused || prefersReducedMotion ? "paused" : ""
            }`}
          >
            {marqueeList.map((p, i) => {
              const isOriginal = i < panels.length;
              const isActive = p.id === currentId;
              return (
                <button
                  key={`${p.id}-${i}`}
                  onClick={() => selectPanel(p.id)}
                  aria-label={`Show ${p.tag}`}
                  aria-current={isActive}
                  tabIndex={isOriginal ? 0 : -1}
                  className={`relative shrink-0 w-36 h-20 sm:w-44 sm:h-24 rounded-lg overflow-hidden border-2 transition-colors duration-200 ${
                    isActive ? "border-[#f2f231]" : "border-white/15 hover:border-white/40"
                  }`}
                >
                  {isOriginal ? (
                    <motion.img
                      layoutId={`panel-image-${p.id}`}
                      src={p.image}
                      alt={p.tag}
                      className="w-full h-full object-cover"
                      animate={{ opacity: isActive ? 0.35 : 1 }}
                      transition={{ opacity: { duration: 0.3 } }}
                    />
                  ) : (
                    <img src={p.image} alt="" aria-hidden="true" className="w-full h-full object-cover" />
                  )}
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent text-[10px] font-semibold text-white px-2 py-1.5 text-left truncate">
                    {p.tag}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;