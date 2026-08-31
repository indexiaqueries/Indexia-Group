import { useTranslation } from "react-i18next";
import { ExternalLink } from "lucide-react";
import Reveal from "../../components/common/Reveal";
import { siteImages } from "../../data/siteImages";
import { colors } from "../../lib/theme";
import { companyColor, type ArticleItem } from "./newsData";

type FeaturedArticleProps = {
  featured: ArticleItem;
};

const FeaturedArticle = ({ featured }: FeaturedArticleProps) => {
  const { t } = useTranslation();
  const hasImage = Boolean(featured.image);

  return (
    <Reveal>
      <article className="group relative grid overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg lg:grid-cols-[42%_1fr]">
        {/* Image — left side */}
        <div className="relative overflow-hidden">
          {hasImage ? (
            <img
              src={featured.image}
              alt={featured.title}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <img
              src={siteImages.newsFeaturedNew?.src || siteImages.newsFeatured.src}
              alt={featured.title}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          )}
        </div>

        {/* Content — right side */}
        <div
          className="relative flex min-h-[280px] flex-col justify-between overflow-hidden p-8 text-white sm:p-10"
          style={{ background: `linear-gradient(135deg, ${colors.navyDeep}, ${colors.navyMid})` }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-25"
            style={{
              background: `radial-gradient(circle at 80% 20%, ${companyColor(featured.company)}, transparent 55%)`,
            }}
          />
          <div className="relative">
            <span
              className="inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em]"
              style={{ backgroundColor: `${companyColor(featured.company)}26`, color: "var(--color-yellow)" }}
            >
              {featured.category}
            </span>
            <p className="font-ledger mt-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white/55">
              {featured.date && <>{featured.date} · </>}
              {featured.source || featured.company}
            </p>
          </div>
          <div>
            <h2 className="font-display relative mt-5 text-2xl font-bold leading-snug text-white sm:text-3xl">
              {featured.title}
            </h2>
            <p className="relative mt-4 max-w-xl text-sm leading-7 text-white/80">{featured.excerpt}</p>
            <div className="relative mt-6 flex flex-wrap items-center gap-4">
              {featured.articleUrl ? (
                <a
                  href={featured.articleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-(--color-yellow) px-6 py-2.5 text-sm font-bold text-(--color-yellow-ink) shadow-[0_4px_16px_rgba(242,242,49,0.3)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-(--color-yellow-bright)"
                >
                  Read Full Story
                  <ExternalLink size={14} />
                </a>
              ) : (
                <span className="inline-flex items-center gap-2 rounded-full bg-(--color-yellow) px-6 py-2.5 text-sm font-bold text-(--color-yellow-ink) shadow-[0_4px_16px_rgba(242,242,49,0.3)]">
                  {t("newsPage.readMore")}
                </span>
              )}
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
};

export default FeaturedArticle;
