import Reveal from "../../components/common/Reveal";
import { companyColor, type ArticleItem } from "./newsData";

type NewsGridProps = {
  latest: ArticleItem[];
};

const NewsGrid = ({ latest }: NewsGridProps) => {
  return (
    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {latest.map((article, i) => {
        const color = companyColor(article.company);
        return (
          <Reveal key={article.slug} delay={(i % 3) * 0.08} amount={0.15}>
            <article className="flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="flex items-center justify-between gap-3">
                <span
                  className="inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em]"
                  style={{ backgroundColor: `${color}1a`, color }}
                >
                  {article.category}
                </span>
                {article.date && (
                  <span className="font-ledger text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                    {article.date}
                  </span>
                )}
              </div>
              <h3 className="font-display mt-4 text-lg font-bold leading-snug text-slate-900">
                {article.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">{article.excerpt}</p>
              <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                <span className="text-xs font-semibold text-slate-400">{article.company}</span>
                <span className="text-sm" style={{ color }}>
                  →
                </span>
              </div>
            </article>
          </Reveal>
        );
      })}
    </div>
  );
};

export default NewsGrid;
