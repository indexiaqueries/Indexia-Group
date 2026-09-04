import { useCallback, useEffect, useRef, useState } from "react";

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
  onVisible,
}: {
  m: MilestoneData;
  index: number;
  isCurrent: boolean;
  isPast: boolean;
  onVisible: (index: number) => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [appeared, setAppeared] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAppeared(true);
          onVisible(index);
        }
      },
      { threshold: 0.4, rootMargin: "0px 0px -5% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [index, onVisible]);

  return (
    <div ref={ref} className="relative flex items-center sm:justify-center">
      {/* Center dot */}
      <div
        className={`absolute left-4 sm:left-1/2 z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border-2 transition-all duration-500 ${
          isCurrent
            ? "border-(--color-yellow) bg-(--color-yellow) scale-125 shadow-[0_0_20px_rgba(219,183,63,0.5)]"
            : isPast
              ? "border-(--color-teal) bg-(--color-teal) scale-110"
              : "border-slate-300 bg-white"
        }`}
      >
        <span
          className={`font-ledger text-[8px] sm:text-[9px] font-bold transition-colors duration-500 ${
            isCurrent ? "text-black" : isPast ? "text-white" : "text-slate-400"
          }`}
        >
          {m.year.slice(-2)}
        </span>
      </div>

      {/* Content card */}
      <div
        className={`ml-10 sm:ml-0 sm:w-[calc(50%-2.5rem)] transition-all duration-500 ${
          index % 2 === 0
            ? "sm:mr-auto sm:pr-6 sm:text-right"
            : "sm:ml-auto sm:pl-6"
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
                  "border-slate-200 bg-white shadow-sm"
          }`}
        >
          <span
            className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold transition-colors duration-500 ${
              isCurrent
                ? "bg-(--color-yellow) text-black"
                : isPast
                  ? "bg-(--color-teal)/15 text-(--color-teal-deep)"
                  : "bg-slate-100 text-slate-500"
            }`}
          >
            {m.year}
          </span>
          <h3
            className={`mt-2 font-display text-[14px] sm:text-[15px] font-bold transition-colors duration-500 ${
              isCurrent ? "text-white" : isPast ? "text-slate-800" : "text-slate-500"
            }`}
          >
            {m.title}
          </h3>
          <p
            className={`mt-1 text-[12px] sm:text-[13px] leading-5 sm:leading-6 transition-colors duration-500 ${
              isCurrent ? "text-white/75" : isPast ? "text-slate-600" : "text-slate-500"
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
  const [activeIndex, setActiveIndex] = useState(-1);

  // Track which milestones have been scrolled past
  const handleMilestoneVisible = useCallback((index: number) => {
    setActiveIndex((prev) => Math.max(prev, index));
  }, []);

  // Update active index as user scrolls, track the highest dot past the viewport center
  useEffect(() => {
    const handleScroll = () => {
      const viewportCenter = window.innerHeight * 0.55;
      let current = -1;

      dotRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top < viewportCenter) {
          current = i;
        }
      });

      if (current >= 0) {
        setActiveIndex(current);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Progress for the line fill (0 to 1 based on active index)
  const lineProgress = activeIndex < 0 ? 0 : (activeIndex + 1) / milestones.length;

  return (
    <div ref={containerRef} className="relative">
      {/* Animated progress line */}
      <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-slate-200 sm:-translate-x-1/2">
        <div
          className="absolute top-0 left-0 w-full bg-gradient-to-b from-(--color-teal) to-(--color-yellow) transition-[height] duration-300"
          style={{ height: `${lineProgress * 100}%` }}
        />
        {/* Glowing pointer */}
        <div
          className="absolute left-1/2 -translate-x-1/2 h-3 w-3 rounded-full bg-(--color-teal) shadow-[0_0_12px_rgba(0,128,128,0.6)] transition-[top] duration-300"
          style={{ top: `${lineProgress * 100}%` }}
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
              onVisible={handleMilestoneVisible}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
