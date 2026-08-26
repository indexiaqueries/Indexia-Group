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
  activeIndex,
  total,
}: {
  m: MilestoneData;
  index: number;
  activeIndex: number;
  total: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.3, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const isActive = index <= activeIndex;
  const isCurrent = index === activeIndex;

  return (
    <div ref={ref} className="relative flex items-center sm:justify-center">
      {/* Center dot */}
      <div
        className={`absolute left-4 sm:left-1/2 z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border-2 transition-all duration-500 ${
          isCurrent
            ? "border-(--color-yellow) bg-(--color-yellow) scale-125 shadow-[0_0_20px_rgba(219,183,63,0.5)]"
            : isActive
              ? "border-(--color-teal) bg-(--color-teal) scale-110"
              : "border-slate-300 bg-white"
        }`}
      >
        <span
          className={`font-ledger text-[8px] sm:text-[9px] font-bold transition-colors duration-500 ${
            isCurrent ? "text-black" : isActive ? "text-white" : "text-slate-400"
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
          visible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4"
        }`}
      >
        <div
          className={`rounded-xl border p-4 transition-all duration-500 ${
            isCurrent
              ? "border-(--color-teal)/30 bg-(--color-teal)/5 shadow-lg -translate-y-0.5"
              : isActive
                ? "border-slate-200 bg-white shadow-sm"
                : "border-slate-100 bg-slate-50/50"
          }`}
        >
          <span
            className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold transition-colors duration-500 ${
              isCurrent
                ? "bg-(--color-yellow) text-black"
                : isActive
                  ? "bg-(--color-teal)/10 text-(--color-teal)"
                  : "bg-slate-100 text-slate-400"
            }`}
          >
            {m.year}
          </span>
          <h3
            className={`mt-2 font-display text-[14px] sm:text-[15px] font-bold transition-colors duration-500 ${
              isCurrent ? "text-slate-900" : isActive ? "text-slate-700" : "text-slate-400"
            }`}
          >
            {m.title}
          </h3>
          <p
            className={`mt-1 text-[12px] sm:text-[13px] leading-5 sm:leading-6 transition-colors duration-500 ${
              isCurrent ? "text-slate-600" : isActive ? "text-slate-500" : "text-slate-400"
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
  const lineRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const totalH = rect.height;

      // Progress: 0 when container top reaches viewport bottom, 1 when bottom reaches viewport top
      const scrolled = viewportH - rect.top;
      const totalScrollable = viewportH + totalH;
      const p = Math.max(0, Math.min(1, scrolled / totalScrollable));
      setProgress(p);

      // Active index based on progress
      const idx = Math.floor(p * milestones.length);
      setActiveIndex(Math.min(idx, milestones.length - 1));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [milestones.length]);

  const lineProgress = Math.min(1, Math.max(0, progress * 1.3));

  return (
    <div ref={containerRef} className="relative">
      {/* Animated progress line */}
      <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-slate-200 sm:-translate-x-1/2">
        <div
          ref={lineRef}
          className="absolute top-0 left-0 w-full bg-gradient-to-b from-(--color-teal) to-(--color-yellow) transition-[height] duration-100"
          style={{ height: `${lineProgress * 100}%` }}
        />
        {/* Glowing pointer */}
        <div
          className="absolute left-1/2 -translate-x-1/2 h-3 w-3 rounded-full bg-(--color-teal) shadow-[0_0_12px_rgba(0,128,128,0.6)] transition-[top] duration-100"
          style={{ top: `${lineProgress * 100}%` }}
        />
      </div>

      <div className="space-y-5 sm:space-y-7">
        {milestones.map((m, i) => (
          <MilestoneItem
            key={i}
            m={m}
            index={i}
            activeIndex={activeIndex}
            total={milestones.length}
          />
        ))}
      </div>
    </div>
  );
}
