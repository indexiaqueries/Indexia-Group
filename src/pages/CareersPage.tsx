import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import SEO from "../components/common/SEO";
import Eyebrow from "../components/common/Eyebrow";
import Reveal from "../components/common/Reveal";
import HeroBackdrop from "../components/banners/HeroBackdrop";
import { colors } from "../lib/theme";
import careersBg from "../assets/BusinessesHero.webp";
import { jobRoles, careerValues, processSteps } from "../data/careers";

const careersJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "JobPosting",
      name: "Open roles at Indexia Group",
      url: "https://www.indexiagroup.com/careers",
      hiringOrganization: { "@type": "Organization", name: "Indexia Group" },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.indexiagroup.com/" },
        {
          "@type": "ListItem",
          position: 2,
          name: "Careers",
          item: "https://www.indexiagroup.com/careers",
        },
      ],
    },
  ],
};

const CareersPage = () => {
  const { t } = useTranslation();

  const tr = (path: string, fallback: string) => t(`pageContent.careers.${path}`, { defaultValue: fallback });
  const roles = jobRoles.map((r) => ({
    ...r,
    title: tr(`roles.${r.key}.title`, r.title),
    department: tr(`roles.${r.key}.department`, r.department),
    type: tr(`roles.${r.key}.type`, r.type),
  }));
  const values = careerValues.map((v) => ({
    ...v,
    title: tr(`values.${v.key}.title`, v.title),
    body: tr(`values.${v.key}.body`, v.body),
  }));
  const steps = processSteps.map((s) => ({
    ...s,
    title: tr(`steps.${s.key}.title`, s.title),
    body: tr(`steps.${s.key}.body`, s.body),
  }));

  return (
    <main className="bg-white">
      <SEO
        title={t("careersPage.title")}
        description={t("careersPage.metaDescription")}
        keywords="Indexia Group careers, jobs at Indexia Finance, finance jobs Mumbai, export jobs Surat, security jobs Delhi NCR, warehouse jobs, advertising sales jobs"
        canonicalPath="/careers"
        jsonLd={careersJsonLd}
      />

      <HeroBackdrop
        image={careersBg}
        radial="radial-gradient(circle at 82% 18%, rgba(242,242,49,0.12), transparent 50%)"
      >
        <div className="mb-4 flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-(--color-yellow)/70" />
          <Eyebrow color="var(--color-yellow)">{t("careersPage.eyebrow")}</Eyebrow>
          <span className="h-px w-8 bg-(--color-yellow)/70" />
        </div>
        <h1 className="font-display mx-auto mb-5 max-w-4xl text-[clamp(32px,6vw,60px)] font-bold leading-tight text-white">
          {t("careersPage.titleStart")}
          <span className="text-(--color-yellow)">{t("careersPage.titleAccent")}</span>
        </h1>
        <p className="mx-auto max-w-2xl text-base leading-8 text-white/80">{t("careersPage.subtitle")}</p>
        <Link
          to="#open-roles"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-(--color-yellow) px-8 py-3.5 text-sm font-bold text-(--color-yellow-ink) shadow-[0_4px_16px_rgba(242,242,49,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-(--color-yellow-bright)"
        >
          {t("careersPage.ctaButton")} ↓
        </Link>
      </HeroBackdrop>

      <section className="relative bg-white px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mx-auto mb-12 max-w-2xl text-center">
            <Eyebrow className="mb-3">{t("careersPage.valuesEyebrow")}</Eyebrow>
            <h2 className="font-display text-[clamp(24px,4vw,38px)] font-bold text-(--color-ink)">
              {t("careersPage.valuesHeading")}
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-(--color-muted)">{t("careersPage.valuesSubtitle")}</p>
          </Reveal>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, i) => (
              <Reveal key={value.key} delay={(i % 4) * 0.08} amount={0.15}>
                <div className="flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                  <span
                    className="font-ledger text-sm font-bold"
                    style={{ color: i % 2 === 0 ? colors.teal : colors.yellow }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display mt-3 text-lg font-bold text-slate-900">{value.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-7 text-slate-600">{value.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="open-roles" className="scroll-mt-24 bg-(--color-mist) px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <Reveal className="mx-auto mb-12 max-w-2xl text-center">
            <Eyebrow className="mb-3">{t("careersPage.rolesEyebrow")}</Eyebrow>
            <h2 className="font-display text-[clamp(24px,4vw,38px)] font-bold text-(--color-ink)">
              {t("careersPage.rolesHeading")}
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-(--color-muted)">{t("careersPage.rolesSubtitle")}</p>
          </Reveal>

          <div className="space-y-4">
            {roles.map((role, i) => (
              <Reveal key={role.key} delay={(i % 3) * 0.06} amount={0.1}>
                <div className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-3">
                      <span
                        className="inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em]"
                        style={{ backgroundColor: `${colors.teal}1a`, color: colors.teal }}
                      >
                        {role.department}
                      </span>
                      <span className="font-ledger text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                        {role.type} · {role.experience}
                      </span>
                    </div>
                    <h3 className="font-display mt-3 text-lg font-bold text-slate-900">{role.title}</h3>
                    <p className="mt-1 text-sm text-slate-500">
                      {role.company} · {role.location}
                    </p>
                  </div>
                  <Link
                    to="/contact"
                    className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-(--color-teal) hover:text-(--color-teal) sm:self-auto"
                  >
                    {t("careersPage.apply")} →
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-white px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <Reveal className="mx-auto mb-12 max-w-2xl text-center">
            <Eyebrow className="mb-3">{t("careersPage.processEyebrow")}</Eyebrow>
            <h2 className="font-display text-[clamp(24px,4vw,38px)] font-bold text-(--color-ink)">
              {t("careersPage.processHeading")}
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <Reveal key={step.key} delay={(i % 4) * 0.08} amount={0.15}>
                <div className="relative flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-6 pt-8 shadow-sm">
                  <span className="absolute -top-4 start-6 flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-white shadow-md" style={{ backgroundColor: i % 2 === 0 ? colors.teal : colors.blue }}>
                    {i + 1}
                  </span>
                  <h3 className="font-display mt-2 text-lg font-bold text-slate-900">{step.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 pb-16 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-4xl">
          <div className="rounded-3xl bg-(--color-navy) px-8 py-10 text-center text-white sm:px-12">
            <h2 className="font-display text-2xl font-bold sm:text-3xl">{t("careersPage.ctaTitle")}</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-white/75">{t("careersPage.ctaBody")}</p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-(--color-yellow) px-7 py-3 text-sm font-bold text-(--color-yellow-ink) shadow-[0_4px_16px_rgba(242,242,49,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-(--color-yellow-bright)"
              >
                {t("careersPage.ctaButton")} →
              </Link>
              <a
                href="mailto:careers@indexiagroup.com"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3 text-sm font-bold text-white backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/20"
              >
                careers@indexiagroup.com
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
};

export default CareersPage;
