import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import SEO from "../components/common/SEO";
import Eyebrow from "../components/common/Eyebrow";
import Reveal from "../components/common/Reveal";
import HeroBackdrop from "../components/banners/HeroBackdrop";
import { colors } from "../lib/theme";
import securityBg from "../assets/BusinessesHero.webp";
import { securityCategories, securityPractices } from "../data/securityTips";

const securityJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      name: "Security Tips — Indexia Group",
      url: "https://www.indexiagroup.com/security-tips",
      description:
        "Practical guidance from Indexia Group on avoiding fraud, phishing, and financial scams.",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.indexiagroup.com/" },
        {
          "@type": "ListItem",
          position: 2,
          name: "Security Tips",
          item: "https://www.indexiagroup.com/security-tips",
        },
      ],
    },
  ],
};

const SecurityTipsPage = () => {
  const { t } = useTranslation();

  const tr = (path: string, fallback: string) => t(`pageContent.security.${path}`, { defaultValue: fallback });
  const categories = securityCategories.map((c) => ({
    ...c,
    title: tr(`categories.${c.key}.title`, c.title),
    body: tr(`categories.${c.key}.body`, c.body),
  }));
  const practices = securityPractices.map((p) => ({
    ...p,
    title: tr(`practices.${p.key}.title`, p.title),
    body: tr(`practices.${p.key}.body`, p.body),
  }));

  return (
    <main className="bg-white">
      <SEO
        title={t("securityTipsPage.title")}
        description={t("securityTipsPage.metaDescription")}
        keywords="security tips, avoid phishing, loan scam, fraud prevention, OTP safety, payment security, identity theft India"
        canonicalPath="/security-tips"
        jsonLd={securityJsonLd}
      />

      <HeroBackdrop
        image={securityBg}
        radial="radial-gradient(circle at 82% 18%, rgba(242,242,49,0.12), transparent 50%)"
      >
        <div className="mb-4 flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-(--color-yellow)/70" />
          <Eyebrow color="var(--color-yellow)">{t("securityTipsPage.eyebrow")}</Eyebrow>
          <span className="h-px w-8 bg-(--color-yellow)/70" />
        </div>
        <h1 className="font-display mx-auto mb-5 max-w-4xl text-[clamp(32px,6vw,60px)] font-bold leading-tight text-white">
          {t("securityTipsPage.titleStart")}
          <span className="text-(--color-yellow)">{t("securityTipsPage.titleAccent")}</span>
        </h1>
        <p className="mx-auto max-w-2xl text-base leading-8 text-white/80">{t("securityTipsPage.subtitle")}</p>
        <Link
          to="#practices"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-(--color-yellow) px-8 py-3.5 text-sm font-bold text-(--color-yellow-ink) shadow-[0_4px_16px_rgba(242,242,49,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-(--color-yellow-bright)"
        >
          {t("securityTipsPage.ctaButton")} ↓
        </Link>
      </HeroBackdrop>

      <section className="relative bg-white px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mx-auto mb-12 max-w-2xl text-center">
            <Eyebrow className="mb-3">{t("securityTipsPage.categoriesEyebrow")}</Eyebrow>
            <h2 className="font-display text-[clamp(24px,4vw,38px)] font-bold text-(--color-ink)">
              {t("securityTipsPage.categoriesHeading")}
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-(--color-muted)">{t("securityTipsPage.categoriesSubtitle")}</p>
          </Reveal>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, i) => (
              <Reveal key={category.key} delay={(i % 3) * 0.08} amount={0.15}>
                <div className="flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                  <span className="font-ledger text-sm font-bold" style={{ color: i % 2 === 0 ? colors.teal : colors.blue }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display mt-3 text-lg font-bold text-slate-900">{category.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-7 text-slate-600">{category.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="practices" className="scroll-mt-24 bg-(--color-mist) px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mx-auto mb-12 max-w-2xl text-center">
            <Eyebrow className="mb-3">{t("securityTipsPage.practicesEyebrow")}</Eyebrow>
            <h2 className="font-display text-[clamp(24px,4vw,38px)] font-bold text-(--color-ink)">
              {t("securityTipsPage.practicesHeading")}
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-(--color-muted)">{t("securityTipsPage.practicesSubtitle")}</p>
          </Reveal>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {practices.map((practice, i) => (
              <Reveal key={practice.key} delay={(i % 3) * 0.08} amount={0.15}>
                <div className="relative flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-6 pt-8 shadow-sm">
                  <span
                    className="absolute -top-4 start-6 flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-white shadow-md"
                    style={{ backgroundColor: i % 2 === 0 ? colors.teal : colors.blue }}
                  >
                    {i + 1}
                  </span>
                  <h3 className="font-display mt-2 text-lg font-bold text-slate-900">{practice.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{practice.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-16 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-4xl">
          <div className="rounded-3xl border border-(--color-yellow)/40 bg-(--color-yellow)/10 px-8 py-10 text-center sm:px-12">
            <h2 className="font-display text-2xl font-bold text-(--color-ink) sm:text-3xl">
              {t("securityTipsPage.warningTitle")}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-(--color-muted)">{t("securityTipsPage.warningBody")}</p>
          </div>
        </Reveal>
      </section>

      <section className="bg-white px-5 pb-16 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-4xl">
          <div className="rounded-3xl bg-(--color-navy) px-8 py-10 text-center text-white sm:px-12">
            <h2 className="font-display text-2xl font-bold sm:text-3xl">{t("securityTipsPage.ctaTitle")}</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-white/75">{t("securityTipsPage.ctaBody")}</p>
            <Link
              to="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-(--color-yellow) px-7 py-3 text-sm font-bold text-(--color-yellow-ink) shadow-[0_4px_16px_rgba(242,242,49,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-(--color-yellow-bright)"
            >
              {t("securityTipsPage.ctaButton")} →
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
};

export default SecurityTipsPage;
