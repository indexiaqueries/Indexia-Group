import { useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type VideoItem = {
  src: string;
  label: string;
};

type TrainingGalleryProps = {
  videos: VideoItem[];
};

const TrainingGallery = ({ videos }: TrainingGalleryProps) => {
  const [center, setCenter] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev" | null>(null);

  const prev = useCallback(() => {
    setDirection("prev");
    setCenter((c) => (c - 1 + videos.length) % videos.length);
  }, [videos.length]);

  const next = useCallback(() => {
    setDirection("next");
    setCenter((c) => (c + 1) % videos.length);
  }, [videos.length]);

  const getIdx = (offset: number) => (center + offset + videos.length) % videos.length;
  const leftIdx = getIdx(-1);
  const rightIdx = getIdx(1);

  return (
    <>
      <style>{`
        @keyframes slide-in-right {
          from { opacity: 0; transform: translateX(60px) scale(0.96); }
          to   { opacity: 1; transform: translateX(0) scale(1); }
        }
        @keyframes slide-in-left {
          from { opacity: 0; transform: translateX(-60px) scale(0.96); }
          to   { opacity: 1; transform: translateX(0) scale(1); }
        }
        .gallery-slide-in {
          animation: ${direction === "prev" ? "slide-in-left" : direction === "next" ? "slide-in-right" : "none"} 0.4s cubic-bezier(0.25, 1, 0.5, 1) both;
        }
        @media (prefers-reduced-motion: reduce) {
          .gallery-slide-in { animation: none; }
        }
      `}</style>

      <div className="flex items-center justify-center gap-4 py-4 sm:gap-6">
        {/* Left arrow */}
        <button
          onClick={prev}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm ring-1 ring-white/20 transition-all duration-300 hover:bg-white/20 hover:scale-110 sm:h-11 sm:w-11"
          aria-label="Previous video"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Left frame — dimmed */}
        <button
          onClick={prev}
          className="group relative hidden w-36 shrink-0 overflow-hidden rounded-xl opacity-40 ring-1 ring-white/5 transition-all duration-500 hover:opacity-60 sm:block lg:w-44"
        >
          <video
            src={videos[leftIdx].src}
            muted
            preload="metadata"
            className="w-full object-cover aspect-[3/4]"
          />
          <div className="absolute inset-0 bg-black/40" />
        </button>

        {/* Center frame — focused & playable with smooth transition */}
        <div className="gallery-slide-in relative w-full max-w-2xl shrink-0 overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/15" key={`gallery-${center}`}>
          <video
            src={videos[center].src}
            controls
            preload="metadata"
            className="w-full object-contain bg-black/20"
            style={{ maxHeight: "70vh" }}
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-4 sm:p-5 pointer-events-none">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-white drop-shadow-md">
                {videos[center].label}
              </p>
              <p className="font-ledger text-[11px] font-bold text-white/50">
                {center + 1} / {videos.length}
              </p>
            </div>
          </div>
          <span className="absolute top-3 left-3 flex h-7 w-7 items-center justify-center rounded-full bg-white/15 font-ledger text-[10px] font-bold text-white backdrop-blur-sm ring-1 ring-white/20 pointer-events-none">
            {String(center + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Right frame — dimmed */}
        <button
          onClick={next}
          className="group relative hidden w-36 shrink-0 overflow-hidden rounded-xl opacity-40 ring-1 ring-white/5 transition-all duration-500 hover:opacity-60 sm:block lg:w-44"
        >
          <video
            src={videos[rightIdx].src}
            muted
            preload="metadata"
            className="w-full object-cover aspect-[3/4]"
          />
          <div className="absolute inset-0 bg-black/40" />
        </button>

        {/* Right arrow */}
        <button
          onClick={next}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm ring-1 ring-white/20 transition-all duration-300 hover:bg-white/20 hover:scale-110 sm:h-11 sm:w-11"
          aria-label="Next video"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {videos.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > center || (center === videos.length - 1 && i === 0) ? "next" : "prev");
              setCenter(i);
            }}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === center ? "w-5 bg-(--color-yellow)" : "w-1.5 bg-white/25 hover:bg-white/40"
            }`}
            aria-label={`Go to video ${i + 1}`}
          />
        ))}
      </div>
    </>
  );
};

export default TrainingGallery;
