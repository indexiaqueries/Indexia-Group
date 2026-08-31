import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { companyColor, type ArticleItem } from "./newsData";

type NewsGridProps = {
  latest: ArticleItem[];
};

// How many cards we clone onto each end to fake an infinite loop.
const CLONE_COUNT = 3;

const NewsGrid = ({ latest }: NewsGridProps) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const firstCardRef = useRef<HTMLDivElement>(null);

  const n = latest.length;
  const canLoop = n > CLONE_COUNT;

  const slides = canLoop
    ? [...latest.slice(-CLONE_COUNT), ...latest, ...latest.slice(0, CLONE_COUNT)]
    : latest;

  const [index, setIndex] = useState(canLoop ? CLONE_COUNT : 0);
  const [withTransition, setWithTransition] = useState(true);
  const [cardStep, setCardStep] = useState(0);

  const measure = useCallback(() => {
    if (!firstCardRef.current || !trackRef.current) return;
    const width = firstCardRef.current.getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(trackRef.current).columnGap || "0");
    setCardStep(width + gap);
  }, []);

  useLayoutEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const goTo = (dir: 1 | -1) => {
    setWithTransition(true);
    setIndex((i) => i + dir);
  };

  const handleTransitionEnd = () => {
    if (!canLoop) return;
    if (index >= n + CLONE_COUNT) {
      setWithTransition(false);
      setIndex((i) => i - n);
    } else if (index < CLONE_COUNT) {
      setWithTransition(false);
      setIndex((i) => i + n);
    }
  };

  useEffect(() => {
    if (!withTransition) {
      const id = requestAnimationFrame(() => setWithTransition(true));
      return () => cancelAnimationFrame(id);
    }
  }, [withTransition]);

  return (
    <div className="group/carousel relative">
      <button
        type="button"
        onClick={() => goTo(-1)}
        disabled={!canLoop}
        aria-label="Previous articles"
        className="absolute -left-3 top-1/2 z-20 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-slate-600 shadow-md backdrop-blur-sm transition-all hover:border-slate-300 hover:text-slate-900 hover:shadow-lg disabled:opacity-0 lg:flex"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        type="button"
        onClick={() => goTo(1)}
        disabled={!canLoop}
        aria-label="Next articles"
        className="absolute -right-3 top-1/2 z-20 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-slate-600 shadow-md backdrop-blur-sm transition-all hover:border-slate-300 hover:text-slate-900 hover:shadow-lg disabled:opacity-0 lg:flex"
      >
        <ChevronRight size={18} />
      </button>

      <div className="overflow-hidden px-8">
        <div
          ref={trackRef}
          onTransitionEnd={handleTransitionEnd}
          className="flex items-stretch gap-4"
          style={{
            transform: cardStep ? `translateX(-${index * cardStep}px)` : undefined,
            transition: withTransition ? "transform 500ms ease" : "none",
          }}
        >
          {slides.map((article, i) => {
            const color = companyColor(article.company);
            return (
              <article
                key={`${article.slug}-${i}`}
                ref={i === 0 ? firstCardRef : undefined}
                className="group/card relative flex h-full w-[85%] shrink-0 flex-col overflow-hidden rounded-2xl border border-white/20 bg-white/85 shadow-lg backdrop-blur-md sm:w-[calc(50%-0.5rem)] lg:w-[calc((100%-2rem)/3)]"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 z-10 w-1"
                  style={{ backgroundColor: color }}
                />

                {/* Image */}
                {article.image && (
                  <div className="relative h-36 overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover/card:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                )}

                <div className="flex flex-1 flex-col p-6 pl-7">
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className="text-[10px] font-bold uppercase tracking-[0.16em]"
                      style={{ color }}
                    >
                      {article.category}
                    </span>
                    {article.date && (
                      <span className="font-ledger text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                        {article.date}
                      </span>
                    )}
                  </div>

                  <h3 className="font-display mt-3 text-lg font-bold leading-snug text-slate-900">
                    {article.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">
                    {article.excerpt}
                  </p>

                  {/* Source + Read Full Story */}
                  <div className="mt-auto flex items-center justify-between border-t border-black/10 pt-4">
                    <div className="flex flex-col">
                      {article.source && (
                        <span className="text-[10px] font-semibold text-slate-400">
                          {article.source}
                        </span>
                      )}
                      <span className="text-xs font-semibold text-slate-400">
                        {article.company}
                      </span>
                    </div>
                    {article.articleUrl ? (
                      <a
                        href={article.articleUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-bold transition-colors hover:underline"
                        style={{ color }}
                      >
                        Read Full Story
                        <ExternalLink size={12} />
                      </a>
                    ) : (
                      <span
                        aria-hidden="true"
                        className="text-sm font-bold"
                        style={{ color }}
                      >
                        →
                      </span>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NewsGrid;
