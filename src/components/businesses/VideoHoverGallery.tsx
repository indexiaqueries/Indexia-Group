import { useState, useRef, useCallback, useEffect } from "react";

type VideoItem = {
  src: string;
  label: string;
  sublabel?: string;
};

type VideoHoverGalleryProps = {
  videos: VideoItem[];
  activeWidth?: number;
  gap?: number;
  perspective?: number;
  hoverScale?: number;
  transitionDuration?: number;
  grayscaleStrength?: number;
  brightnessLevel?: number;
  enableKeyboardNavigation?: boolean;
  autoPlay?: boolean;
  autoPlayDelay?: number;
};

const VideoHoverGallery = ({
  videos,
  activeWidth = 35,
  gap = 0.6,
  perspective = 40,
  hoverScale = 12,
  transitionDuration = 1.2,
  grayscaleStrength = 0.8,
  brightnessLevel = 0.6,
  enableKeyboardNavigation = true,
  autoPlay = true,
  autoPlayDelay = 4000,
}: VideoHoverGalleryProps) => {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const idxRef = useRef<number | null>(null);

  // Keep ref in sync
  idxRef.current = activeIdx;

  const activateCard = useCallback((idx: number) => {
    setActiveIdx(idx);
    // Pause all, play the active one
    videoRefs.current.forEach((vid, i) => {
      if (!vid) return;
      if (i === idx) {
        vid.currentTime = 0;
        vid.play().catch(() => {});
      } else {
        vid.pause();
        vid.currentTime = 0;
      }
    });
  }, []);

  const handleMouseEnter = useCallback((idx: number) => {
    activateCard(idx);
    // Stop autoplay on hover
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  }, [activateCard]);

  const handleMouseLeave = useCallback(() => {
    setActiveIdx(null);
    videoRefs.current.forEach((vid) => {
      if (vid) { vid.pause(); vid.currentTime = 0; }
    });
    // Resume autoplay
    startAutoPlay();
  }, []);

  const startAutoPlay = useCallback(() => {
    if (!autoPlay) return;
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => {
      const next = idxRef.current === null ? 0 : (idxRef.current + 1) % videos.length;
      activateCard(next);
    }, autoPlayDelay);
  }, [autoPlay, autoPlayDelay, videos.length, activateCard]);

  // Keyboard navigation
  useEffect(() => {
    if (!enableKeyboardNavigation) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        const next = idxRef.current === null ? 0 : (idxRef.current + 1) % videos.length;
        activateCard(next);
      } else if (e.key === "ArrowLeft") {
        const prev = idxRef.current === null ? videos.length - 1 : (idxRef.current - 1 + videos.length) % videos.length;
        activateCard(prev);
      } else if (e.key === "Escape") {
        setActiveIdx(null);
        videoRefs.current.forEach((v) => { if (v) { v.pause(); v.currentTime = 0; } });
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [enableKeyboardNavigation, videos.length, activateCard]);

  // Start autoplay on mount
  useEffect(() => {
    startAutoPlay();
    return () => { if (autoPlayRef.current) clearInterval(autoPlayRef.current); };
  }, [startAutoPlay]);

  const count = videos.length;
  const isActive = activeIdx !== null;

  const calcCardStyle = (i: number): React.CSSProperties => {
    const active = activeIdx === i;
    const distFromActive = activeIdx !== null ? i - activeIdx : 0;

    if (active) {
      return {
        width: `${activeWidth}%`,
        transform: `translateZ(${hoverScale * 0.15}rem) scale(${1 + hoverScale * 0.004})`,
        zIndex: 20,
        filter: "grayscale(0) brightness(1)",
        opacity: 1,
        boxShadow: "0 25px 80px rgba(0,0,0,0.7), 0 0 50px rgba(242,242,49,0.12), inset 0 0 0 2px rgba(242,242,49,0.3)",
      };
    }

    if (isActive) {
      // Fan away from the active card
      const rotateY = distFromActive * 8;
      const translateZ = -Math.abs(distFromActive) * 1.5;
      const scale = 0.92 - Math.abs(distFromActive) * 0.02;

      return {
        width: `${(100 - activeWidth - gap * count) / (count - 1)}%`,
        transform: `rotateY(${rotateY}deg) translateZ(${translateZ}rem) scale(${scale})`,
        zIndex: 10 - Math.abs(distFromActive),
        filter: `grayscale(${grayscaleStrength}) brightness(${brightnessLevel})`,
        opacity: 1 - Math.abs(distFromActive) * 0.12,
        boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
      };
    }

    // Default: evenly spaced
    return {
      width: `${100 / count}%`,
      transform: "rotateY(0deg) translateZ(0) scale(1)",
      zIndex: 1,
      filter: "grayscale(0) brightness(1)",
      opacity: 1,
      boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
    };
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full py-4 px-4 sm:px-8"
      style={{
        perspective: `${perspective}rem`,
        maxHeight: "calc(100svh - 6rem)",
      }}
      onMouseLeave={handleMouseLeave}
    >
      <style>{`
        .vgh3d::-webkit-scrollbar { display: none; }
        @media (max-width: 639px) {
          .vgh3d { width: 68vw !important; min-height: 240px; transform: none !important; filter: none !important; opacity: 1 !important; }
          .vgh3d video { object-fit: contain; }
        }
      `}</style>

      {/* Desktop: 3D perspective fan. Mobile: horizontally scrollable */}
      <div
        className="flex items-stretch sm:items-center sm:justify-center mx-auto overflow-x-auto sm:overflow-visible scroll-smooth pb-2 sm:pb-0"
        style={{
          gap: `${gap}rem`,
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
          transformStyle: "preserve-3d",
          transition: `transform ${transitionDuration}s cubic-bezier(0.23, 1, 0.32, 1)`,
        }}
      >
        {videos.map((v, i) => {
          const cardStyle = calcCardStyle(i);

          return (
            <div
              key={i}
              className="relative shrink-0 overflow-hidden rounded-2xl cursor-pointer vgh3d"
              style={{
                ...cardStyle,
                minHeight: "200px",
                maxHeight: activeIdx === i ? "55vh" : "none",
                transition: `all ${transitionDuration}s cubic-bezier(0.23, 1, 0.32, 1)`,
              }}
              onMouseEnter={() => handleMouseEnter(i)}
            >
              {/* Video */}
              <video
                ref={(el) => { videoRefs.current[i] = el; }}
                src={v.src}
                muted
                preload="metadata"
                playsInline
                className="w-full h-full object-contain bg-black/20 rounded-2xl"
                style={{
                  objectPosition: activeIdx === i ? "center center" : "center 30%",
                }}
              />

              {/* Dark scrim for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10 pointer-events-none" />

              {/* Hover glow ring */}
              {activeIdx === i && (
                <div className="absolute inset-0 ring-2 ring-(--color-yellow)/40 rounded-2xl pointer-events-none" />
              )}

              {/* Label */}
              <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 pointer-events-none">
                <p className="text-xs sm:text-sm font-bold text-white drop-shadow-lg truncate">
                  {v.label}
                </p>
                {v.sublabel && (
                  <p className="text-[10px] sm:text-[11px] text-white/50 mt-0.5 truncate">
                    {v.sublabel}
                  </p>
                )}
              </div>

              {/* Index badge */}
              <span className="absolute top-2 left-2 flex h-6 w-6 items-center justify-center rounded-full bg-white/10 font-ledger text-[9px] font-bold text-white backdrop-blur-sm ring-1 ring-white/15 pointer-events-none">
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Play indicator when active (desktop only) */}
              {activeIdx === i && (
                <span className="absolute inset-0 hidden sm:flex items-center justify-center pointer-events-none">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-(--color-yellow)/25 backdrop-blur-md ring-1 ring-(--color-yellow)/50 animate-pulse">
                    <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
                      <polygon points="7,4 21,12 7,20" />
                    </svg>
                  </span>
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile: dot indicators */}
      <div className="flex sm:hidden justify-center gap-1.5 mt-3">
        {videos.map((_, i) => (
          <button
            key={i}
            onClick={() => activateCard(i)}
            className={`block h-1.5 rounded-full transition-all duration-300 ${
              i === activeIdx ? "w-4 bg-(--color-yellow)" : "w-1.5 bg-white/25"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Desktop: keyboard hint */}
      {isActive && enableKeyboardNavigation && (
        <p className="hidden sm:block text-center text-[10px] text-white/30 mt-2 font-ledger tracking-wider">
          ← → ARROW KEYS TO NAVIGATE &nbsp;·&nbsp; ESC TO CLOSE
        </p>
      )}
    </div>
  );
};

export default VideoHoverGallery;
