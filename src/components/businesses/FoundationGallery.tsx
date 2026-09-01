import { useState, useRef, useCallback, useEffect } from "react";
import { X, Play, ChevronLeft, ChevronRight } from "lucide-react";

type VideoItem = {
  src: string;
  label: string;
  sublabel?: string;
};

type FoundationGalleryProps = {
  videos: VideoItem[];
};

const FoundationGallery = ({ videos }: FoundationGalleryProps) => {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const thumbStripRef = useRef<HTMLDivElement>(null);

  const openModal = useCallback((idx: number) => {
    setActiveIdx(idx);
    document.body.style.overflow = "hidden";
  }, []);

  const closeModal = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setActiveIdx(null);
    document.body.style.overflow = "";
  }, []);

  const goTo = useCallback(
    (idx: number) => {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
      setActiveIdx(idx);
    },
    [],
  );

  // Close on Escape
  useEffect(() => {
    if (activeIdx === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowLeft") goTo((activeIdx - 1 + videos.length) % videos.length);
      if (e.key === "ArrowRight") goTo((activeIdx + 1) % videos.length);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeIdx, closeModal, goTo, videos.length]);

  // Auto-play when modal opens or index changes
  useEffect(() => {
    if (activeIdx === null || !videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play().catch(() => {});
  }, [activeIdx]);

  // Scroll active thumbnail into view
  useEffect(() => {
    if (activeIdx === null || !thumbStripRef.current) return;
    const btn = thumbStripRef.current.children[activeIdx] as HTMLElement | undefined;
    btn?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [activeIdx]);

  const scrollGallery = (dir: -1 | 1) => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.7;
    scrollRef.current.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <>
      {/* ── Gallery row ──────────────────────────────────────── */}
      <div className="relative">
        {/* Scroll arrows */}
        <button
          onClick={() => scrollGallery(-1)}
          className="absolute -inset-s-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm ring-1 ring-white/20 transition-colors hover:bg-white/20"
          aria-label="Scroll left"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={() => scrollGallery(1)}
          className="absolute -inset-e-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm ring-1 ring-white/20 transition-colors hover:bg-white/20"
          aria-label="Scroll right"
        >
          <ChevronRight size={18} />
        </button>

        {/* Scrollable thumbnails */}
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto scroll-smooth px-1 pb-2 pt-1"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {videos.map((v, i) => (
            <button
              key={i}
              onClick={() => openModal(i)}
              className="group relative shrink-0 overflow-hidden rounded-xl transition-transform duration-300 hover:scale-[1.03]"
              style={{ width: "clamp(240px, 30vw, 340px)" }}
            >
              <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black/30">
                <video
                  src={v.src}
                  muted
                  preload="metadata"
                  playsInline
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.currentTime = 0;
                    el.play().catch(() => {});
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.pause();
                    el.currentTime = 0;
                  }}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
                <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-(--color-yellow)/25 backdrop-blur-md ring-1 ring-(--color-yellow)/50">
                    <Play size={18} fill="white" className="ml-0.5 text-white" />
                  </span>
                </span>
                <span className="absolute left-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white/10 font-ledger text-[9px] font-bold text-white backdrop-blur-sm ring-1 ring-white/15">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

            </button>
          ))}
        </div>
      </div>

      {/* ── Full-screen video modal ──────────────────────────── */}
      {activeIdx !== null && (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-black animate-fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          {/* ── Video fills entire viewport ── */}
          <video
            ref={videoRef}
            key={activeIdx}
            src={videos[activeIdx].src}
            controls
            playsInline
            className="h-full w-full object-contain bg-black"
          />

          {/* ── Frosted glass top bar ── */}
          <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between bg-linear-to-b from-black/80 via-black/40 to-transparent px-4 py-3 sm:px-6">
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-white sm:text-base">
                {videos[activeIdx].sublabel}
              </p>
              <p className="truncate text-[11px] text-white/50 sm:text-xs">
                {videos[activeIdx].label}
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Counter */}
              <span className="rounded-full bg-white/10 px-3 py-1 font-ledger text-[11px] font-bold tracking-wider text-white/80 ring-1 ring-white/10">
                {activeIdx + 1} / {videos.length}
              </span>

              {/* Close */}
              <button
                onClick={closeModal}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* ── Prev / Next arrows ── */}
          <button
            onClick={() => goTo((activeIdx - 1 + videos.length) % videos.length)}
            className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm ring-1 ring-white/15 transition-all hover:bg-white/20 hover:ring-white/30 sm:left-6 sm:h-12 sm:w-12"
            aria-label="Previous video"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={() => goTo((activeIdx + 1) % videos.length)}
            className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm ring-1 ring-white/15 transition-all hover:bg-white/20 hover:ring-white/30 sm:right-6 sm:h-12 sm:w-12"
            aria-label="Next video"
          >
            <ChevronRight size={22} />
          </button>

          {/* ── Thumbnail strip (bottom) ── */}
          <div className="absolute inset-x-0 bottom-0 z-20 bg-linear-to-t from-black/80 via-black/50 to-transparent pt-10 pb-4">
            <div
              ref={thumbStripRef}
              className="mx-auto flex max-w-3xl gap-2 overflow-x-auto px-4 sm:px-6 py-2"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {videos.map((v, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`group relative shrink-0 overflow-hidden rounded-lg transition-all duration-300 ${
                    i === activeIdx
                      ? "ring-2 ring-(--color-yellow) scale-105 opacity-100"
                      : "ring-1 ring-white/10 opacity-50 hover:opacity-80"
                  }`}
                  style={{ width: "clamp(80px, 12vw, 120px)" }}
                >
                  <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black/40">
                    <video
                      src={v.src}
                      muted
                      preload="metadata"
                      playsInline
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {i !== activeIdx && (
                      <div className="absolute inset-0 bg-black/40" />
                    )}
                  </div>
                  {i === activeIdx && (
                    <span className="absolute -bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-(--color-yellow)" />
                  )}
                </button>
              ))}
            </div>

            <p className="mt-3 text-center text-[10px] text-white/25 font-ledger tracking-wider">
              ← → NAVIGATE &nbsp;·&nbsp; ESC TO CLOSE
            </p>
          </div>
        </div>
      )}

      {/* ── Inline keyframe for fade-in ── */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.25s ease-out;
        }
      `}</style>
    </>
  );
};

export default FoundationGallery;
