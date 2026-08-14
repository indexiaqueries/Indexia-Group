import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import SEO from "../components/common/SEO";
import Eyebrow from "../components/common/Eyebrow";
import Reveal from "../components/common/Reveal";
import HeroBackdrop from "../components/banners/HeroBackdrop";
import { colors } from "../lib/theme";
import newsBg from "../assets/footer-img.webp";
import { newsArticles, knowledgeInsights } from "../data/news";
import { companies } from "../data/companies";

const companyColor = (name: string) =>
  companies.find((c) => c.name === name)?.color ?? colors.blue;

const newsJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Blog",
      name: "Indexia Group — News & Knowledge Centre",
      url: "https://www.indexiagroup.com/news",
      blogPost: newsArticles.map((article) => ({
        "@type": "BlogPosting",
        headline: article.title,
        datePublished: article.date,
        description: article.excerpt,
        url: `https://www.indexiagroup.com/news#${article.slug}`,
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.indexiagroup.com/" },
        {
          "@type": "ListItem",
          position: 2,
          name: "News & Knowledge Centre",
          item: "https://www.indexiagroup.com/news",
        },
      ],
    },
  ],
};

const NewsPage = () => {
  const { t } = useTranslation();
  const tr = (path: string, fallback: string) => t(`pageContent.news.${path}`, { defaultValue: fallback });
  const articles = newsArticles.map((a) => ({
    ...a,
    title: tr(`articles.${a.slug}.title`, a.title),
    category: tr(`articles.${a.slug}.category`, a.category),
    excerpt: tr(`articles.${a.slug}.excerpt`, a.excerpt),
  }));
  const insights = knowledgeInsights.map((ins) => ({
    ...ins,
    title: tr(`insights.${ins.key}.title`, ins.title),
    body: tr(`insights.${ins.key}.body`, ins.body),
  }));
  const featured = articles.find((a) => a.featured) ?? articles[0];
  const latest = articles.filter((a) => a !== featured);

  return (
    <main className="bg-white">
      <SEO
        title={t("newsPage.title")}
        description={t("newsPage.metaDescription")}
        keywords="Indexia Group news, Indexia Finance news, Indexia Finserve loans, Indexia Agro Bio Fertilizers, Indexia Warehouse, Indexia Foundation, highway advertising, FDI India"
        canonicalPath="/news"
        jsonLd={newsJsonLd}
      />

      <HeroBackdrop
        image={newsBg}
        radial="radial-gradient(circle at 82% 18%, rgba(38,174,144,0.14), transparent 50%)"
      >
        <div className="mb-4 flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-(--color-yellow)/70" />
          <Eyebrow color="var(--color-yellow)">{t("newsPage.eyebrow")}</Eyebrow>
          <span className="h-px w-8 bg-(--color-yellow)/70" />
        </div>
        <h1 className="font-display mx-auto mb-5 max-w-4xl text-[clamp(32px,6vw,60px)] font-bold leading-tight text-white">
          {t("newsPage.titleStart")}
          <span className="text-(--color-yellow)">{t("newsPage.titleAccent")}</span>
        </h1>
        <p className="mx-auto max-w-2xl text-base leading-8 text-white/80">{t("newsPage.subtitle")}</p>
      </HeroBackdrop>

      <section className="relative bg-white px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="mb-8 flex items-center gap-4">
              <span className="font-ledger text-sm font-bold" style={{ color: colors.teal }}>
                {t("newsPage.featuredLabel")}
              </span>
              <span className="h-px flex-1 bg-slate-200" />
            </div>
          </Reveal>

          <Reveal>
            <article className="group relative overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg">
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
                    {featured.date} · {featured.company}
                  </p>
                </div>
                <h2 className="font-display relative mt-6 text-2xl font-bold leading-snug text-white sm:text-3xl">
                  {featured.title}
                </h2>
                <p className="relative mt-4 max-w-xl text-sm leading-7 text-white/80">{featured.excerpt}</p>
                <div className="relative mt-6 flex flex-wrap items-center gap-4">
                  <Link
                    to={`/businesses/${companies.find((c) => c.name === featured.company)?.slug ?? ""}`}
                    className="inline-flex items-center gap-2 rounded-full bg-(--color-yellow) px-6 py-2.5 text-sm font-bold text-(--color-yellow-ink) shadow-[0_4px_16px_rgba(242,242,49,0.3)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-(--color-yellow-bright)"
                  >
                    {t("newsPage.readMore")}
                  </Link>
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

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
                      <span className="font-ledger text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                        {article.date}
                      </span>
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
        </div>
      </section>

      <section className="relative bg-(--color-mist) px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mx-auto mb-12 max-w-2xl text-center">
            <Eyebrow className="mb-3">{t("newsPage.knowledgeEyebrow")}</Eyebrow>
            <h2 className="font-display text-[clamp(24px,4vw,38px)] font-bold text-(--color-ink)">
              {t("newsPage.knowledgeHeading")}
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-(--color-muted)">{t("newsPage.knowledgeSubtitle")}</p>
          </Reveal>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {insights.map((insight, i) => (
              <Reveal key={insight.key} delay={(i % 4) * 0.08} amount={0.15}>
                <div className="flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                  <span className="font-ledger text-sm font-bold" style={{ color: colors.teal }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display mt-3 text-lg font-bold text-slate-900">{insight.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-7 text-slate-600">{insight.body}</p>
                  <Link
                    to="/contact"
                    className="mt-4 text-sm font-bold transition-colors"
                    style={{ color: colors.blue }}
                  >
                    {t("newsPage.askUs")} →
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-16 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-4xl">
          <div className="rounded-3xl border border-slate-100 bg-(--color-mist) px-8 py-10 text-center sm:px-12">
            <h2 className="font-display text-2xl font-bold text-slate-900 sm:text-3xl">
              {t("newsPage.ctaTitle")}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-600">{t("newsPage.ctaBody")}</p>
            <Link
              to="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-(--color-teal) px-7 py-3 text-sm font-bold text-white shadow-[0_4px_16px_rgba(38,174,144,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-(--color-teal-deep)"
            >
              {t("newsPage.ctaButton")} →
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
};

export default NewsPage;
