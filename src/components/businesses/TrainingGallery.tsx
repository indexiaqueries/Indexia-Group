import { useState, useCallback, useEffect, useRef } from "react";
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
  const [phase, setPhase] = useState<"idle" | "exit" | "enter">("idle");
  const [exitDir, setExitDir] = useState<"left" | "right">("left");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goto = useCallback(
    (next: number, dir: "left" | "right") => {
      if (phase !== "idle") return;
      setExitDir(dir);
      setPhase("exit");
      timerRef.current = setTimeout(() => {
        setCenter(next);
        setPhase("enter");
        timerRef.current = setTimeout(() => setPhase("idle"), 350);
      }, 250);
    },
    [phase],
  );

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  const prev = useCallback(() => {
    const next = (center - 1 + videos.length) % videos.length;
    goto(next, "right");
  }, [center, videos.length, goto]);

  const nextFn = useCallback(() => {
    const n = (center + 1) % videos.length;
    goto(n, "left");
  }, [center, videos.length, goto]);

  const getIdx = (offset: number) => (center + offset + videos.length) % videos.length;

  return (
    <>
      <style>{`
        .tg-slide { transition: transform 0.35s cubic-bezier(0.25,1,0.5,1), opacity 0.35s cubic-bezier(0.25,1,0.5,1); }
        .tg-enter { transform: translateX(0); opacity: 1; }
        .tg-exit  { transform: translateX(${-32}px); opacity: 0; }
        .tg-enter-rev { transform: translateX(0); opacity: 1; }
        .tg-exit-rev  { transform: translateX(32px); opacity: 0; }
        .tg-init { transform: translateX(0); opacity: 1; }
        @media (prefers-reduced-motion: reduce) {
          .tg-slide { transition: none; }
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
          <video src={videos[getIdx(-1)].src} muted preload="metadata" className="w-full object-cover aspect-[3/4]" />
          <div className="absolute inset-0 bg-black/40" />
        </button>

        {/* Center frame */}
        <div className="relative w-full max-w-2xl shrink-0 overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/15">
          <div className="relative aspect-video w-full bg-black/20">
            <div
              className={`absolute inset-0 tg-slide ${
                phase === "idle" ? "tg-init" : phase === "exit" ? (exitDir === "left" ? "tg-exit" : "tg-exit-rev") : (exitDir === "left" ? "tg-enter-rev" : "tg-enter")
              }`}
            >
              <video
                src={videos[center].src}
                controls
                preload="metadata"
                className="absolute inset-0 h-full w-full object-contain"
              />
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-4 sm:p-5 pointer-events-none">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-white drop-shadow-md">{videos[center].label}</p>
              <p className="font-ledger text-[11px] font-bold text-white/50">{center + 1} / {videos.length}</p>
            </div>
          </div>
          <span className="absolute top-3 left-3 flex h-7 w-7 items-center justify-center rounded-full bg-white/15 font-ledger text-[10px] font-bold text-white backdrop-blur-sm ring-1 ring-white/20 pointer-events-none">
            {String(center + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Right frame — dimmed */}
        <button
          onClick={nextFn}
          className="group relative hidden w-36 shrink-0 overflow-hidden rounded-xl opacity-40 ring-1 ring-white/5 transition-all duration-500 hover:opacity-60 sm:block lg:w-44"
        >
          <video src={videos[getIdx(1)].src} muted preload="metadata" className="w-full object-cover aspect-[3/4]" />
          <div className="absolute inset-0 bg-black/40" />
        </button>

        {/* Right arrow */}
        <button
          onClick={nextFn}
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
            onClick={() => goto(i, i > center || (center === videos.length - 1 && i === 0) ? "left" : "right")}
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
