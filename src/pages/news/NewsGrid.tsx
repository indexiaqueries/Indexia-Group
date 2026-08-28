import { companyColor, type ArticleItem } from "./newsData";

type NewsGridProps = {
  latest: ArticleItem[];
};

const NewsGrid = ({ latest }: NewsGridProps) => {
  // Duplicate cards for seamless infinite loop
  const items = [...latest, ...latest];

  return (
    <div className="group/carousel relative overflow-hidden">
      {/* Fade edges */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white/80 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white/80 to-transparent"
      />

      {/* Infinite scroll track */}
      <div className="flex w-max gap-4 animate-scroll group-hover/carousel:[animation-play-state:paused]">
        {items.map((article, i) => {
          const color = companyColor(article.company);
          return (
            <article
              key={`${article.slug}-${i}`}
              className="group relative flex h-full w-[340px] shrink-0 flex-col overflow-hidden rounded-2xl border border-white/20 bg-white/85 p-6 pl-7 shadow-lg backdrop-blur-md"
            >
              <span
                aria-hidden="true"
                className="absolute inset-y-0 left-0 z-10 w-1"
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
              <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">
                {article.excerpt}
              </p>

              <div className="mt-auto flex items-center justify-between border-t border-black/10 pt-4">
                <span className="text-xs font-semibold text-slate-400">
                  {article.company}
                </span>
                <span
                  aria-hidden="true"
                  className="text-sm font-bold"
                  style={{ color }}
                >
                  →
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default NewsGrid;
