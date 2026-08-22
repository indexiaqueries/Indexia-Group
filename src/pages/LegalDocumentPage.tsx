import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SEO from "../components/common/SEO";
import Eyebrow from "../components/common/Eyebrow";
import Reveal from "../components/common/Reveal";
import HeroBackdrop from "../components/banners/HeroBackdrop";
import { colors } from "../lib/theme";
import legalBg from "../assets/public-images/heroes/legal-hero.webp";
import { legalDocuments, type LegalDocumentId, type LegalSection } from "../data/legal";

const ROUTES: Record<LegalDocumentId, string> = {
  privacy: "/privacy-policy",
  terms: "/terms",
  termsOfUse: "/terms-of-use",
};

const META_DESCRIPTION: Record<LegalDocumentId, string> = {
  privacy: "legal.metaPrivacyDescription",
  terms: "legal.metaTermsDescription",
  termsOfUse: "legal.metaTermsOfUseDescription",
};

type LegalDocumentPageProps = {
  docId: LegalDocumentId;
};

const LegalDocumentPage = ({ docId }: LegalDocumentPageProps) => {
  const { t, i18n } = useTranslation();
  const doc = legalDocuments[docId];

  const lang = i18n.language.split("-")[0];
  const translated =
    lang !== "en" && i18n.exists(`legalContent.${docId}`)
      ? (t(`legalContent.${docId}`, { returnObjects: true }) as { intro: string[]; sections: LegalSection[] })
      : null;
  const content = translated ?? { intro: doc.intro, sections: doc.sections };

  const path = ROUTES[docId];
  const title = t(`legal.${docId}Title`);
  const descriptionKey = META_DESCRIPTION[docId];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: title,
        url: `https://www.indexiagroup.com${path}`,
        isPartOf: { "@id": "https://www.indexiagroup.com/#website" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.indexiagroup.com/" },
          { "@type": "ListItem", position: 2, name: title, item: `https://www.indexiagroup.com${path}` },
        ],
      },
    ],
  };

  return (
    <main className="bg-white">
      <SEO title={title} description={t(descriptionKey)} canonicalPath={path} jsonLd={jsonLd} />

      <HeroBackdrop
        image={legalBg}
        radial="radial-gradient(circle at 82% 18%, rgba(38,174,144,0.14), transparent 50%)"
      >
        <div className="mb-4 flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-(--color-yellow)/70" />
          <Eyebrow color="var(--color-yellow)">{t("legal.eyebrow")}</Eyebrow>
          <span className="h-px w-8 bg-(--color-yellow)/70" />
        </div>
        <h1 className="font-display mx-auto mb-5 max-w-4xl text-[clamp(32px,6vw,60px)] font-bold leading-tight text-white">
          {title}
        </h1>
        <p className="mx-auto mb-7 max-w-2xl text-base leading-8 text-white/80">{t(`legal.${docId}Subtitle`)}</p>
        <p className="font-ledger text-[11px] font-bold uppercase tracking-[0.22em] text-white/55">
          {t("legal.lastUpdated")}: {doc.lastUpdated}
        </p>
      </HeroBackdrop>

      <section className="relative bg-white px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <div className="mb-12 flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-slate-200 pb-6">
              <Link
                to="/"
                className="text-sm font-semibold text-(--color-blue) transition-colors hover:text-(--color-teal)"
              >
                ← {t("legal.backHome")}
              </Link>
              <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:block" />
              <Link
                to="/contact"
                className="text-sm font-semibold text-(--color-blue) transition-colors hover:text-(--color-teal)"
              >
                {t("legal.contactUs")} →
              </Link>
            </div>
          </Reveal>

          <Reveal>
            <div className="mb-10 flex flex-wrap items-center gap-x-3 gap-y-1.5 rounded-xl border border-slate-200 bg-(--color-soft) px-5 py-3">
              <span className="font-ledger text-[11px] font-bold uppercase tracking-[0.2em] text-(--color-teal)">
                {t("legal.lastUpdated")}
              </span>
              <span aria-hidden="true" className="h-3.5 w-px bg-slate-300" />
              <span className="font-ledger text-[11px] font-bold uppercase tracking-[0.2em] text-slate-600">
                {doc.lastUpdated}
              </span>
            </div>
          </Reveal>

          {content.intro.map((paragraph, index) => (
            <Reveal key={`intro-${index}`} delay={0.05 * index}>
              <p className="text-[15px] leading-8 text-slate-700">{paragraph}</p>
            </Reveal>
          ))}

          {content.sections.map((section, index) => (
            <Reveal key={section.title} delay={0.05 * (index % 3)}>
              <section className="mt-12">
                <div className="flex items-center gap-4">
                  <span className="font-ledger text-sm font-bold" style={{ color: colors.teal }}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="h-px flex-1 bg-slate-200" />
                </div>
                <h2 className="font-display mt-3 text-2xl font-bold text-slate-900 sm:text-3xl">{section.title}</h2>
                <div className="mt-4 space-y-4">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-[15px] leading-8 text-slate-600">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            </Reveal>
          ))}

          <Reveal>
            <div className="mt-16 rounded-2xl border border-slate-200 bg-(--color-soft) p-7 sm:p-8">
              <h3 className="font-display text-xl font-bold text-slate-900">{t("legal.contactHeading")}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">{t("legal.contactBody")}</p>
              <Link
                to="/contact"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-(--color-yellow) px-6 py-2.5 text-sm font-bold text-(--color-yellow-ink) shadow-[0_4px_16px_rgba(242,242,49,0.3)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-(--color-yellow-bright)"
              >
                {t("legal.sendEnquiry")}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
};

export default LegalDocumentPage;
