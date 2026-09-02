import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ExternalLink, TrendingUp, Warehouse, Globe2, Trophy } from "lucide-react";
import Reveal from "../../components/common/Reveal";
import { colors } from "../../lib/theme";
import type { ArticleItem } from "./newsData";
import { t } from "i18next";

type CategoryNewsSectionProps = {
  articlesByCategory: Record<string, ArticleItem[]>;
};

const CATEGORIES = [
  {
    key: "finance",
    labelKey: "newsHero.sectors.finance",
    icon: TrendingUp,
    color: colors.teal,
    gradient: "from-teal-500/10 to-emerald-500/5",
    accentBg: `${colors.teal}15`,
  },
  {
    key: "warehouse",
    labelKey: "newsHero.sectors.warehouse",
    icon: Warehouse,
    color: colors.blue,
    gradient: "from-blue-500/10 to-sky-500/5",
    accentBg: `${colors.blue}15`,
  },
  {
    key: "export",
    labelKey: "newsHero.sectors.tradeExport",
    icon: Globe2,
    color: "#b45309",
    gradient: "from-amber-500/10 to-orange-500/5",
    accentBg: "#b4530915",
  },
  {
    key: "athlete",
    labelKey: "newsHero.sectors.athlete",
    icon: Trophy,
    color: "#7c3aed",
    gradient: "from-violet-500/10 to-purple-500/5",
    accentBg: "#7c3aed15",
  },
];

const ArticleCard = ({
  article,
  accentColor,
}: {
  article: ArticleItem;
  accentColor: string;
}) => (
  <a
    href={article.articleUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="card-premium card-premium-hover group/card flex flex-col overflow-hidden rounded-2xl"
  >
    {/* Image */}
    {article.image ? (
      <div className="relative h-44 overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 group-hover/card:scale-[1.05]"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/15 to-transparent" />
      </div>
    ) : (
      <div
        className="relative flex h-44 items-center justify-center"
        style={{
          background: `linear-gradient(135deg, ${accentColor}12, ${accentColor}06)`,
        }}
      >
        <span
          className="font-display text-4xl font-bold opacity-15"
          style={{ color: accentColor }}
        >
          {article.title.charAt(0)}
        </span>
      </div>
    )}

    <div className="flex flex-1 flex-col p-5">
      {/* Date + Source */}
      <div className="flex items-center gap-2 text-[10px] text-slate-400">
        {article.sourceIcon && (
          <img
            src={article.sourceIcon}
            alt=""
            className="h-3.5 w-3.5 rounded-full object-contain"
            loading="lazy"
            decoding="async"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        )}
        {article.source && <span className="font-semibold">{article.source}</span>}
        {article.date && (
          <>
            <span className="text-slate-300">·</span>
            <span className="font-ledger uppercase tracking-wider">
              {article.date}
            </span>
          </>
        )}
      </div>

      {/* Title */}
      <h3 className="font-display mt-2.5 text-[15px] font-bold leading-snug text-slate-900 transition-colors group-hover/card:text-slate-700 line-clamp-3">
        {article.title}
      </h3>

      {/* Excerpt */}
      <p className="mt-2 flex-1 text-[13px] leading-6 text-slate-500 line-clamp-3">
        {article.excerpt}
      </p>

      {/* Read More */}
      <div className="mt-4 flex items-center gap-1.5 text-xs font-bold" style={{ color: accentColor }}>
        <span>{t("newsPage.readFullStory")}</span>
        <ExternalLink
          size={12}
          className="transition-transform group-hover/card:translate-x-0.5"
        />
      </div>
    </div>
  </a>
);

const CategoryNewsSection = ({ articlesByCategory }: CategoryNewsSectionProps) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("finance");

  const activeCategory = CATEGORIES.find((c) => c.key === activeTab) ?? CATEGORIES[0];
  const activeArticles = articlesByCategory[activeTab] ?? [];
  const Icon = activeCategory.icon;

  return (
    <section className="section-ruled section-paper px-4 py-6 sm:py-6">
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <Reveal className="mb-5">
          <div className="flex items-center gap-4">
            <span
              className="font-ledger text-sm font-bold"
              style={{ color: colors.teal }}
            >
              {t("newsPage.latestNews", "Latest News")}
            </span>
            <span className="h-px flex-1 bg-slate-200" />
          </div>
        </Reveal>

        {/* Category tabs */}
        <Reveal delay={0.05}>
          <div className="mb-5 flex flex-wrap gap-2 rounded-2xl border border-slate-200/80 bg-white/80 p-2 shadow-sm backdrop-blur-sm">
            {CATEGORIES.map((cat) => {
              const CatIcon = cat.icon;
              const isActive = activeTab === cat.key;
              const count = articlesByCategory[cat.key]?.length ?? 0;
              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setActiveTab(cat.key)}
                  className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-bold transition-all duration-200 ${
                    isActive
                      ? "text-white shadow-lg"
                      : "border border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:text-slate-700"
                  }`}
                  style={
                    isActive
                      ? {
                          backgroundColor: cat.color,
                          boxShadow: `0 4px 20px ${cat.color}40`,
                        }
                      : undefined
                  }
                >
                  <CatIcon size={15} />
                  {t(cat.labelKey)}
                  {count > 0 && (
                    <span
                      className={`ml-0.5 rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                        isActive
                          ? "bg-white/25 text-white"
                          : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Category header bar */}
        <Reveal delay={0.1}>
          <div
            className={`mb-4 flex items-center gap-3 rounded-xl border border-white/70 bg-linear-to-r px-5 py-3 shadow-sm ${activeCategory.gradient}`}
          >
            <div
              className="flex h-9 w-9 items-center justify-center rounded-lg"
              style={{ backgroundColor: activeCategory.accentBg }}
            >
              <Icon size={18} style={{ color: activeCategory.color }} />
            </div>
            <div>
              <h2
                className="font-display text-base font-bold"
                style={{ color: activeCategory.color }}
              >
                {t(activeCategory.labelKey)}
              </h2>
              <p className="text-[11px] text-slate-400">
                {t("newsPage.articleCount", { count: activeArticles.length })}
              </p>
            </div>
          </div>
        </Reveal>

        {/* Article grid */}
        {activeArticles.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {activeArticles.slice(0, 9).map((article, i) => (
              <Reveal key={`${activeTab}-${i}`} delay={i * 0.04}>
                <ArticleCard
                  article={article}
                  accentColor={activeCategory.color}
                />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white/70 py-16 shadow-sm">
            <Icon size={32} className="text-slate-300" />
            <p className="mt-3 text-sm text-slate-400">
              {t("newsPage.noArticlesYet")}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default CategoryNewsSection;
