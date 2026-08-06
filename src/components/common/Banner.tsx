import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import heroImg1 from "../../assets/hero-image1.png";
import heroImg2 from "../../assets/hero-image2.png";
import heroImg3 from "../../assets/hero-image3.png";

type BannerProps = {
  title: string;
  description: string;
  buttonText?: string;
  buttonLink?: string;
};

const slides = [
  {
    tag: "Multi-Business Group",
    heading: "One Group.\nMultiple Solutions.",
    sub: "From finance and logistics to agro and advertising, Indexia Group powers growth across industries with trusted, future-ready businesses.",
    image: heroImg1,
  },
  {
    tag: "Finance & Advisory",
    heading: "Stronger Finances.\nSmarter Decisions.",
    sub: "Indexia Finance, Finserve and Securities deliver end-to-end financial solutions — from planning and investments to risk protection and compliance.",
    image: heroImg2,
  },
  {
    tag: "Trade, Agro & Impact",
    heading: "Moving Goods,\nGrowing Futures.",
    sub: "Through Overseas, Agro Bio Fertilizers, Warehouse and Foundation, we enable global trade, sustainable farming and meaningful community impact.",
    image: heroImg3,
  },
];

const INTERVAL = 5000;          // time each slide stays up before auto-advancing
const BG_DURATION = 700;        // background crossfade duration
const TEXT_FADE_OUT = 600;      // old text fade-out duration
const TEXT_FADE_IN = 420;       // new text fade-in duration
const TEXT_ZOOM_DURATION = 6000; // continuous zoom runs for the length of the slide's display time

const Banner = ({ buttonText = "Explore Our Group", buttonLink = "/services" }: BannerProps) => {
  const [current, setCurrent] = useState(0);
  const [nextSlide, setNextSlide] = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);
  const [textVisible, setTextVisible] = useState(true);
  const [textZoomed, setTextZoomed] = useState(false);

  const bgTimeoutRef = useRef<number | null>(null);
  const textOutTimeoutRef = useRef<number | null>(null);
  const textInTimeoutRef = useRef<number | null>(null);
  const textZoomTimeoutRef = useRef<number | null>(null);

  const goTo = useCallback(
    (idx: number) => {
      if (animating || idx === current) return;

      setNextSlide(idx);
      setAnimating(true);

      // 1) fade the current text out immediately, dropping any zoom in progress
      setTextVisible(false);
      setTextZoomed(false);

      if (bgTimeoutRef.current) window.clearTimeout(bgTimeoutRef.current);
      if (textOutTimeoutRef.current) window.clearTimeout(textOutTimeoutRef.current);
      if (textInTimeoutRef.current) window.clearTimeout(textInTimeoutRef.current);
      if (textZoomTimeoutRef.current) window.clearTimeout(textZoomTimeoutRef.current);

      // 2) once the old text has fully faded out, swap the slide content
      textOutTimeoutRef.current = window.setTimeout(() => {
        setCurrent(idx);
      }, TEXT_FADE_OUT);

      // 3) right after the content swap, fade the new text in
      textInTimeoutRef.current = window.setTimeout(() => {
        setTextVisible(true);
      }, TEXT_FADE_OUT + 30);

      // 4) once the fade-in settles, start the continuous zoom-in
      textZoomTimeoutRef.current = window.setTimeout(() => {
        setTextZoomed(true);
      }, TEXT_FADE_OUT + 30 + TEXT_FADE_IN);

      // background crossfade runs on its own timeline, right-to-left, always
      bgTimeoutRef.current = window.setTimeout(() => {
        setNextSlide(null);
        setAnimating(false);
      }, BG_DURATION);
    },
    [animating, current]
  );

  const prev = () => goTo((current - 1 + slides.length) % slides.length);
  const next = useCallback(() => goTo((current + 1) % slides.length), [current, goTo]);

  useEffect(() => {
    const t = window.setInterval(next, INTERVAL);
    return () => window.clearInterval(t);
  }, [next]);

  // kick off the zoom on the very first slide too, once its initial fade-in settles
  useEffect(() => {
    const t = window.setTimeout(() => setTextZoomed(true), TEXT_FADE_IN);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => {
      if (bgTimeoutRef.current) window.clearTimeout(bgTimeoutRef.current);
      if (textOutTimeoutRef.current) window.clearTimeout(textOutTimeoutRef.current);
      if (textInTimeoutRef.current) window.clearTimeout(textInTimeoutRef.current);
      if (textZoomTimeoutRef.current) window.clearTimeout(textZoomTimeoutRef.current);
    };
  }, []);

  const activeSlide = slides[current];
  const incomingSlide = nextSlide !== null ? slides[nextSlide] : null;

  return (
    <>
      <style>{`
        @keyframes bnr-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%      { opacity: .5; transform: scale(1.5); }
        }
        @keyframes bnr-slide-in {
          from {transform: scale(1) translateX(100%); }
          to   {transform: scale(1) translateX(0); }
        }
        @keyframes bnr-text-zoom {
          from { transform: translateY(0) scale(1); }
          to   { transform: translateY(0) scale(1.25); }
        }
      `}</style>

      <section className="relative overflow-hidden bg-[#044e74]">
        <div className="relative min-h-screen flex items-center justify-center">

          {/* Incoming background: always slides in right-to-left */}
          {incomingSlide && (
            <img
              key={`next-${nextSlide}`}
              src={incomingSlide.image}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 z-1 w-full h-full object-cover object-center animate-[bnr-slide-in_700ms_ease_forwards]"
            />
          )}

          {/* Current background: exits left when a transition is running */}
          <img
            key={`current-${current}`}
            src={activeSlide.image}
            alt=""
            aria-hidden="true"
            className={`absolute inset-0 w-full h-full object-cover object-center transition-[transform] duration-700 ease-in-out will-change-transform ${
              animating ? "scale-[1.02] translate-x-[-8%]" : "scale-100"
            }`}
          />

          {/* Dark gradient so text stays legible over any photo */}
          <div className="absolute inset-0 z-2 bg-[linear-gradient(180deg,rgba(2,16,26,0.72)_0%,rgba(2,16,26,0.45)_32%,rgba(2,16,26,0.62)_68%,rgba(2,16,26,0.88)_100%)]" />

          {/* Bottom gradient */}
          <div className="absolute bottom-0 left-0 z-2 h-20 w-full bg-linear-to-t from-[#286090]/30 via-[#26ae90]/30 to-transparent pointer-events-none" />

          <div className="container relative z-3 w-full flex flex-col items-center text-center px-5 pt-30 pb-35">
            <div
              className={`flex flex-col items-center max-w-190 transition-[opacity,transform] will-change-[opacity,transform] ${
                textVisible
                  ? "opacity-100 translate-y-0 duration-420 ease-out"
                  : "opacity-0 -translate-y-2.5 duration-400 ease-in"
              }`}
              style={
                textZoomed
                  ? { animation: `bnr-text-zoom ${TEXT_ZOOM_DURATION}ms ease-out forwards` }
                  : undefined
              }
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
                    {activeSlide.tag}
                  </span>
                </div>
              </div>

              <h1 className="text-[clamp(32px,5.5vw,60px)] font-extrabold text-white leading-[1.14] mb-5.5 whitespace-pre-line">
                {activeSlide.heading}
              </h1>

              <p className="text-[17px] leading-[1.8] text-white/85 max-w-140">
                {activeSlide.sub}
              </p>
            </div>
          </div>

          {/* Button Container */}
          <div className="absolute bottom-25 left-0 w-full py-6 md:py-10 z-3">
            <div className="flex flex-wrap gap-3 justify-center">
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

          {/* Dots */}
          <div className="absolute left-1/2 bottom-7 -translate-x-1/2 z-10 flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Slide ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current ? "w-6 bg-[#f2f231]" : "w-2 bg-white/35"
                }`}
              />
            ))}
          </div>

          {/* Arrows */}
          <button
            onClick={prev}
            aria-label="Previous slide"
            className="absolute top-1/2 -translate-y-1/2 left-5 md:left-8 z-10 w-11 h-11 rounded-full border border-white/35 bg-white/10 backdrop-blur-md text-white text-xl flex items-center justify-center hover:bg-white/25 transition-colors duration-200"
          >
            ‹
          </button>
          <button
            onClick={next}
            aria-label="Next slide"
            className="absolute top-1/2 -translate-y-1/2 right-5 md:right-8 z-10 w-11 h-11 rounded-full border border-white/35 bg-white/10 backdrop-blur-md text-white text-xl flex items-center justify-center hover:bg-white/25 transition-colors duration-200"
          >
            ›
          </button>
        </div>
      </section>
    </>
  );
};

export default Banner;