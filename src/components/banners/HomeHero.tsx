import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import HomeHeroGallery from "./HomeHeroGallery";
import HeroBackground from "./hero/HeroBackground";
import HeroSlideContent from "./hero/HeroSlideContent";
import { makePanels } from "./hero/heroData";
import { AUTOPLAY_INTERVAL, SHADOW_LEVEL } from "./hero/heroMotion";

const Banner = () => {
  const { t } = useTranslation();
  const [currentId, setCurrentId] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const panels = useMemo(() => makePanels(t), [t]);

  const autoplayRef = useRef<number | null>(null);
  const currentIdRef = useRef(currentId);

  useEffect(() => {
    currentIdRef.current = currentId;
  }, [currentId]);

  const currentIndex = panels.findIndex((p) => p.id === currentId);
  const current = panels[currentIndex];
  const isHome = current.id === 0;
  const shadowLevel = SHADOW_LEVEL[currentId] ?? 1;

  const goTo = useCallback(
    (id: number) => {
      if (id === currentIdRef.current) return;
      setCurrentId(id);
    },
    []
  );

  const restartAutoplay = useCallback(() => {
    if (autoplayRef.current) window.clearInterval(autoplayRef.current);
    if (prefersReducedMotion) return;
    autoplayRef.current = window.setInterval(() => {
      const idx = panels.findIndex((p) => p.id === currentIdRef.current);
      goTo(panels[(idx + 1) % panels.length].id);
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
    <>
      <section
        className="relative overflow-hidden bg-(--color-night)"
      >
        <div className="relative flex min-h-svh flex-col sm:min-h-screen">
          <HeroBackground
            bgImage={current.image}
            bgMobileImage={current.mobileImage}
          />

          <div className="container relative z-3 flex-1 flex flex-col items-center justify-center px-5 pt-28 pb-20 sm:pt-32 sm:pb-28 overflow-hidden">
            <HeroSlideContent panel={current} isHome={isHome} shadowLevel={shadowLevel} />
          </div>

          <button
            onClick={prevPanel}
            aria-label={t("hero.prevPanel")}
            className="absolute top-1/2 -translate-y-1/2 inset-s-5 md:inset-s-8 z-10 w-11 h-11 rounded-full border border-white/35 bg-white/10 backdrop-blur-md text-white text-xl items-center justify-center hover:bg-white/25 transition-colors duration-200 hidden sm:flex"
          >
            ‹
          </button>
          <button
            onClick={nextPanel}
            aria-label={t("hero.nextPanel")}
            className="absolute top-1/2 -translate-y-1/2 inset-e-5 md:inset-e-8 z-10 w-11 h-11 rounded-full border border-white/35 bg-white/10 backdrop-blur-md text-white text-xl items-center justify-center hover:bg-white/25 transition-colors duration-200 hidden sm:flex"
          >
            ›
          </button>
        </div>

        {/* Gallery thumbnails, overlaid at bottom of hero */}
        <div className="absolute inset-x-0 bottom-0 z-3">
          <HomeHeroGallery
            panels={panels}
            currentId={currentId}
            reducedMotion={!!prefersReducedMotion}
            onSelect={selectPanel}
          />
        </div>

      </section>


    </>
  );
};

export default Banner;
