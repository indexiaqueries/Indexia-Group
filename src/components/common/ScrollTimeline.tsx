import { useEffect, useRef, useState } from "react";

type MilestoneData = {
  year: string;
  title: string;
  body: string;
};

type ScrollTimelineProps = {
  milestones: MilestoneData[];
};

const MilestoneItem = ({
  m,
  index,
  isCurrent,
  isPast,
}: {
  m: MilestoneData;
  index: number;
  isCurrent: boolean;
  isPast: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [appeared, setAppeared] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setAppeared(true);
      },
      { threshold: 0.4, rootMargin: "0px 0px -5% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative flex items-center sm:justify-center">
      {/* Center dot */}
      <div
        className={`absolute left-4 sm:left-1/2 z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border-2 transition-all duration-500 ${
          isCurrent
            ? "border-(--color-yellow) bg-(--color-yellow) scale-125 shadow-[0_0_20px_rgba(219,183,63,0.5)]"
            : isPast
              ? "border-(--color-teal) bg-(--color-teal) scale-110"
              : "border-(--color-line) bg-white"
        }`}
      >
        <span
          className={`font-ledger text-[9px] sm:text-[10px] font-bold transition-colors duration-500 ${
            isCurrent ? "text-black" : isPast ? "text-white" : "text-(--color-muted)"
          }`}
        >
          {m.year.slice(-2)}
        </span>
      </div>

      {/* Content card */}
      <div
        className={`ml-10 sm:ml-0 sm:w-[calc(50%-2rem)] transition-all duration-500 ${
          index % 2 === 0
            ? "sm:mr-auto sm:pr-4 sm:text-right"
            : "sm:ml-auto sm:pl-4"
        } ${
          appeared
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4"
        }`}
      >
        <div
          className={`rounded-xl border p-4 transition-all duration-500 ${
            isCurrent
              ? "-translate-y-0.5 border-(--color-navy-deep) bg-(--color-navy-deep) shadow-[0_20px_46px_rgba(10,34,51,0.35)] ring-1 ring-white/10"
              : isPast
                ? // Ex-active cards keep the previous active tint, so the colour
                  // visibly drains upward as the reading point passes.
                  "border-(--color-teal)/30 bg-(--color-teal)/5 shadow-md"
                : // Upcoming cards take over the plain look of the ones passed.
                  "border-(--color-line) bg-white shadow-sm"
          }`}
        >
          <span
            className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold transition-colors duration-500 ${
              isCurrent
                ? "bg-(--color-yellow) text-black"
                : isPast
                  ? "bg-(--color-teal)/15 text-(--color-teal-deep)"
                  : "bg-(--color-mist) text-(--color-muted)"
            }`}
          >
            {m.year}
          </span>
          <h3
            className={`mt-2 font-display text-[14px] sm:text-[15px] font-bold transition-colors duration-500 ${
              isCurrent ? "text-(--color-yellow)" : isPast ? "text-(--color-blue)" : "text-(--color-muted)"
            }`}
          >
            {m.title}
          </h3>
          <p
            className={`mt-1 text-xs sm:text-[13px] leading-5 sm:leading-6 transition-colors duration-500 ${
              isCurrent ? "text-white/75" : isPast ? "text-(--color-muted)" : "text-(--color-muted)"
            }`}
          >
            {m.body}
          </p>
        </div>
      </div>
    </div>
  );
};

export default function ScrollTimeline({ milestones }: ScrollTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lineFillRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(-1);

  // Drive the line fill + glowing pointer with the scroll position.
  //
  // The pointer position is written synchronously on every scroll event, so it
  // tracks the scroll exactly — it cannot lag behind or pause between frames
  // even when the main thread is busy and requestAnimationFrame is throttled.
  // The rAF pass is kept as a fallback coalescer for the highlight index, and
  // both `window` and `document` (capture) are listened to so any scroll
  // container triggers an update.
  useEffect(() => {
    let rafId = 0;

    // Returns continuous progress 0..1: 0 while the timeline's top is still
    // below the reading line, 1 once its bottom passes it.
    const updateProgress = () => {
      const container = containerRef.current;
      if (!container) return 0;
      const readingLine = window.innerHeight * 0.55;
      const rect = container.getBoundingClientRect();
      const traveled = readingLine - rect.top;
      const progress = rect.height > 0 ? Math.min(1, Math.max(0, traveled / rect.height)) : 0;
      const pct = `${progress * 100}%`;
      if (lineFillRef.current) lineFillRef.current.style.height = pct;
      if (pointerRef.current) pointerRef.current.style.top = pct;
      return progress;
    };

    // A milestone becomes active only once the gliding pointer has travelled
    // past the milestone's number on the line: compare the pointer's progress
    // against each number dot's own position within the timeline. The dot sits
    // at the vertical centre of its milestone row, so the row centre is used.
    const updateIndex = (progress: number) => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      let current = -1;
      dotRefs.current.forEach((el, i) => {
        if (!el) return;
        const dotCenter = el.getBoundingClientRect().top - rect.top + el.getBoundingClientRect().height / 2;
        const fraction = rect.height > 0 ? dotCenter / rect.height : 0;
        if (progress >= fraction) current = i;
      });
      setActiveIndex(current);
    };

    const onScroll = () => {
      updateProgress();
      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          rafId = 0;
          // Re-read the latest scroll position inside the frame, then activate
          // whichever milestone the pointer has passed.
          updateIndex(updateProgress());
        });
      }
    };

    const onResize = () => {
      updateIndex(updateProgress());
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("scroll", onScroll, { passive: true, capture: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onResize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {/* Animated progress line */}
      <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-(--color-line) sm:-translate-x-1/2">
        <div
          ref={lineFillRef}
          className="absolute top-0 left-0 w-full bg-linear-to-b from-(--color-teal) to-(--color-yellow) transition-none"
        />
        {/* Glowing pointer */}
        <div
          ref={pointerRef}
          className="absolute left-1/2 -translate-x-1/2 h-3 w-3 rounded-full bg-(--color-teal) shadow-[0_0_12px_rgba(0,128,128,0.6)] transition-none"
        />
      </div>

      <div className="space-y-5 sm:space-y-7">
        {milestones.map((m, i) => (
          <div key={i} ref={(el) => { dotRefs.current[i] = el; }}>
            <MilestoneItem
              m={m}
              index={i}
              isCurrent={i === activeIndex}
              isPast={i < activeIndex}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
