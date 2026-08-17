import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import SEO from "../components/common/SEO";
import Eyebrow from "../components/common/Eyebrow";
import Reveal from "../components/common/Reveal";
import HeroBackdrop from "../components/banners/HeroBackdrop";
import { colors } from "../lib/theme";
import researchBg from "../assets/footer-img.webp";
import { researchAreas, researchReports } from "../data/globalResearch";

const researchJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      name: "Global Research — Indexia Group",
      url: "https://www.indexiagroup.com/global-research",
      description:
        "Insightful, relevant analyses and incisive views across macroeconomic, fixed income, currency, and commodity disciplines — with on-the-ground insight across Asia, Africa, and the Middle East.",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.indexiagroup.com/" },
        {
          "@type": "ListItem",
          position: 2,
          name: "Global Research",
          item: "https://www.indexiagroup.com/global-research",
        },
      ],
    },
  ],
};

const GlobalResearchPage = () => {
  const { t } = useTranslation();

  const tr = (path: string, fallback: string) => t(`pageContent.research.${path}`, { defaultValue: fallback });
  const areas = researchAreas.map((a) => ({
    ...a,
    title: tr(`areas.${a.key}.title`, a.title),
    body: tr(`areas.${a.key}.body`, a.body),
  }));
  const reports = researchReports.map((r) => ({
    ...r,
    title: tr(`reports.${r.key}.title`, r.title),
    summary: tr(`reports.${r.key}.summary`, r.summary),
  }));

  return (
    <main className="bg-white">
      <SEO
        title={t("globalResearchPage.title")}
        description={t("globalResearchPage.metaDescription")}
        keywords="Indexia Group research, economic research, global macro strategy, FX, rates, credit, commodities, India investment research"
        canonicalPath="/global-research"
        jsonLd={researchJsonLd}
      />

      <HeroBackdrop
        image={researchBg}
        radial="radial-gradient(circle at 82% 18%, rgba(38,174,144,0.14), transparent 50%)"
      >
        <div className="mb-4 flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-(--color-yellow)/70" />
          <Eyebrow color="var(--color-yellow)">{t("globalResearchPage.eyebrow")}</Eyebrow>
          <span className="h-px w-8 bg-(--color-yellow)/70" />
        </div>
        <h1 className="font-display mx-auto mb-5 max-w-4xl text-[clamp(32px,6vw,60px)] font-bold leading-tight text-white">
          {t("globalResearchPage.titleStart")}
          <span className="text-(--color-yellow)">{t("globalResearchPage.titleAccent")}</span>
        </h1>
        <p className="mx-auto max-w-2xl text-base leading-8 text-white/80">{t("globalResearchPage.subtitle")}</p>
        <button
          type="button"
          onClick={() => document.getElementById("research-areas")?.scrollIntoView({ behavior: "smooth" })}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-(--color-yellow) px-8 py-3.5 text-sm font-bold text-(--color-yellow-ink) shadow-[0_4px_16px_rgba(242,242,49,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-(--color-yellow-bright)"
        >
          {t("globalResearchPage.ctaButton")} ↓
        </button>
      </HeroBackdrop>

      <section id="research-areas" className="scroll-mt-24 bg-white px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mx-auto mb-12 max-w-2xl text-center">
            <Eyebrow className="mb-3">{t("globalResearchPage.areasEyebrow")}</Eyebrow>
            <h2 className="font-display text-[clamp(24px,4vw,38px)] font-bold text-(--color-ink)">
              {t("globalResearchPage.areasHeading")}
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-(--color-muted)">{t("globalResearchPage.areasSubtitle")}</p>
          </Reveal>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {areas.map((area, i) => (
              <Reveal key={area.key} delay={(i % 4) * 0.08} amount={0.15}>
                <div className="flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                  <span className="font-ledger text-sm font-bold" style={{ color: i % 2 === 0 ? colors.teal : colors.blue }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display mt-3 text-lg font-bold text-slate-900">{area.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-7 text-slate-600">{area.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-(--color-mist) px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <Reveal className="mx-auto mb-12 max-w-2xl text-center">
            <Eyebrow className="mb-3">{t("globalResearchPage.reportsEyebrow")}</Eyebrow>
            <h2 className="font-display text-[clamp(24px,4vw,38px)] font-bold text-(--color-ink)">
              {t("globalResearchPage.reportsHeading")}
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-(--color-muted)">{t("globalResearchPage.reportsSubtitle")}</p>
          </Reveal>

          <div className="space-y-4">
            {reports.map((report, i) => (
              <Reveal key={report.key} delay={(i % 3) * 0.06} amount={0.1}>
                <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className="inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em]"
                      style={{ backgroundColor: `${colors.teal}1a`, color: colors.teal }}
                    >
                      {t("globalResearchPage.reportFormat")}
                    </span>
                  </div>
                  <h3 className="font-display mt-3 text-lg font-bold text-slate-900">{report.title}</h3>
                  <p className="mt-1 text-sm leading-7 text-slate-600">{report.summary}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-16 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-4xl">
          <div className="rounded-3xl bg-(--color-navy) px-8 py-10 text-center text-white sm:px-12">
            <h2 className="font-display text-2xl font-bold sm:text-3xl">{t("globalResearchPage.ctaTitle")}</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-white/75">{t("globalResearchPage.ctaBody")}</p>
            <Link
              to="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-(--color-yellow) px-7 py-3 text-sm font-bold text-(--color-yellow-ink) shadow-[0_4px_16px_rgba(242,242,49,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-(--color-yellow-bright)"
            >
              {t("globalResearchPage.ctaButton")} →
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
};

export default GlobalResearchPage;
