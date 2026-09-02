import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import type { HeroPanel } from "../../cards/HeroGalleryThumb";

export type MorphRect = {
  id: number;
  top: number;
  left: number;
  width: number;
  height: number;
  calm?: boolean;
};

type HeroBackgroundProps = {
  bgImage: string;
  bgMobileImage: string;
  morph: MorphRect | null;
  panels: HeroPanel[];
  prefersReducedMotion: boolean | null;
  onMorphComplete: (id: number) => void;
};

const MORPH_MS = { calm: 1300, thumb: 800 };

const MorphLayer = ({
  morph,
  image,
  mobileImage,
  reducedMotion,
  onComplete,
}: {
  morph: MorphRect;
  image: string;
  mobileImage: string;
  reducedMotion: boolean;
  onComplete: (id: number) => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  // First render the thumbnail-sized rect, then grow it to full-screen
  // in the next frame so the CSS transition animates the change.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const frame = requestAnimationFrame(() => {
      el.style.top = "0px";
      el.style.left = "0px";
      el.style.width = "100%";
      el.style.height = "100%";
      el.style.borderRadius = "0px";
      if (morph.calm) el.style.opacity = "1";
    });
    return () => cancelAnimationFrame(frame);
  }, [morph]);

  // Fallback that always fires, even under reduced motion (0s transitions
  // don't emit transitionend events).
  const duration = reducedMotion ? 0 : morph.calm ? MORPH_MS.calm : MORPH_MS.thumb;
  useEffect(() => {
    let cancelled = false;
    const timeout = window.setTimeout(() => {
      if (!cancelled) onComplete(morph.id);
    }, duration + 60);
    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={ref}
      data-morph
      className="morph-layer pointer-events-none absolute inset-0 z-2 overflow-hidden"
      style={
        {
          top: morph.top,
          left: morph.left,
          width: morph.width,
          height: morph.height,
          borderRadius: 12,
          opacity: morph.calm ? 0 : 1,
          transitionDuration: `${duration}ms`,
        } as CSSProperties
      }
    >
      <img
        src={image}
        srcSet={`${mobileImage} 900w, ${image} 1900w`}
        sizes="100vw"
        alt=""
        aria-hidden="true"
        width={1408}
        height={768}
        className={`w-full h-full object-cover object-center${morph.calm ? "" : " morph-zoom"}`}
      />
    </div>
  );
};

const HeroBackground = ({ bgImage, bgMobileImage, morph, panels, prefersReducedMotion, onMorphComplete }: HeroBackgroundProps) => {
  const reducedMotion = !!prefersReducedMotion;

  return (
    <div className="absolute inset-0 overflow-hidden">
      <img
        key={bgImage}
        src={bgImage}
        srcSet={`${bgMobileImage} 900w, ${bgImage} 1900w`}
        sizes="100vw"
        alt=""
        aria-hidden="true"
        width={1408}
        height={768}
        decoding="async"
        fetchPriority="high"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {morph && (
        <MorphLayer
          key={morph.id}
          morph={morph}
          image={panels.find((p) => p.id === morph.id)?.image ?? panels[0].image}
          mobileImage={panels.find((p) => p.id === morph.id)?.mobileImage ?? panels[0].mobileImage}
          reducedMotion={reducedMotion}
          onComplete={onMorphComplete}
        />
      )}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-2 bg-(--color-night) transition-opacity ease-out"
        style={{
          opacity: morph?.calm ? 0.25 : 0,
          transitionDuration: reducedMotion ? "0ms" : morph?.calm ? "1.3s" : "0.6s",
        }}
      />
    </div>
  );
};

export default HeroBackground;
