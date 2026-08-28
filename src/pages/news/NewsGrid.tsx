import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Reveal from "../../components/common/Reveal";
import { companyColor, type ArticleItem } from "./newsData";

type NewsGridProps = {
  latest: ArticleItem[];
};

const NewsGrid = ({ latest }: NewsGridProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.offsetWidth * 0.7;
    scrollRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <div className="relative mt-8">
      {/* Navigation arrows */}
      <button
        type="button"
        onClick={() => scroll("left")}
        aria-label="Scroll left"
        className="absolute -left-3 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-slate-600 shadow-md backdrop-blur-sm transition-all hover:border-slate-300 hover:text-slate-900 hover:shadow-lg lg:flex"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        type="button"
        onClick={() => scroll("right")}
        aria-label="Scroll right"
        className="absolute -right-3 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-slate-600 shadow-md backdrop-blur-sm transition-all hover:border-slate-300 hover:text-slate-900 hover:shadow-lg lg:flex"
      >
        <ChevronRight size={18} />
      </button>

      {/* Scrollable track */}
      <div
        ref={scrollRef}
        className="flex items-stretch snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: "none" }}
      >
        {latest.map((article, i) => {
          const color = companyColor(article.company);
          return (
            <Reveal key={article.slug} delay={(i % 3) * 0.08} amount={0.15}>
              <article
                className="group relative snap-start flex h-full w-[340px] shrink-0 flex-col overflow-hidden rounded-2xl border border-white/20 bg-white/85 backdrop-blur-md p-6 pl-7 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 w-1 z-10"
                  style={{ backgroundColor: color }}
                />

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
                <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">{article.excerpt}</p>

                <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
                  <span className="text-xs font-semibold text-slate-400">{article.company}</span>
                  <span
                    aria-hidden="true"
                    className="text-sm font-bold transition-transform duration-200 group-hover:translate-x-0.5"
                    style={{ color }}
                  >
                    →
                  </span>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
};

export default NewsGrid;