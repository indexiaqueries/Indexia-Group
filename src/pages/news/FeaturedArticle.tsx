import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Reveal from "../../components/common/Reveal";
import ImageSlot from "../../components/common/ImageSlot";
import { companies } from "../../data/companies";
import { siteImages } from "../../data/siteImages";
import { colors } from "../../lib/theme";
import { companyColor, type ArticleItem } from "./newsData";

type FeaturedArticleProps = {
  featured: ArticleItem;
};

const FeaturedArticle = ({ featured }: FeaturedArticleProps) => {
  const { t } = useTranslation();

  return (
    <Reveal>
      <article className="group relative overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg">
        <ImageSlot {...siteImages.newsFeatured} alt={featured.title} className="rounded-none border-0 border-b" />
        <div
          className="relative flex min-h-56 flex-col justify-between overflow-hidden p-8 text-white sm:p-10"
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
              {featured.company}
            </p>
          </div>
          <h2 className="font-display relative mt-6 text-2xl font-bold leading-snug text-white sm:text-3xl">
            {featured.title}
          </h2>
          <p className="relative mt-4 max-w-xl text-sm leading-7 text-white/80">{featured.excerpt}</p>
          <div className="relative mt-6 flex flex-wrap items-center gap-4">
            {companies.find((c) => c.name === featured.company) && (
              <Link
                to="/about"
                className="inline-flex items-center gap-2 rounded-full bg-(--color-yellow) px-6 py-2.5 text-sm font-bold text-(--color-yellow-ink) shadow-[0_4px_16px_rgba(242,242,49,0.3)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-(--color-yellow-bright)"
              >
                {t("newsPage.readMore")}
              </Link>
            )}
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-2.5 text-sm font-bold text-white backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/20"
            >
              {t("newsPage.askUs")}
            </Link>
          </div>
        </div>
      </article>
    </Reveal>
  );
};

export default FeaturedArticle;
