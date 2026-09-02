import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SEO from "../components/common/SEO";
import Eyebrow from "../components/common/Eyebrow";
import Reveal from "../components/common/Reveal";
import HeroBackdrop from "../components/banners/HeroBackdrop";
import { colors } from "../lib/theme";
import privacyHero from "../assets/legal-img/PrivacyPolicy.png";
import termsOfUseHero from "../assets/legal-img/TermsofUse.png";
const legalBg = "/images/heroes/legal-hero.webp";
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

const KEYWORDS: Record<LegalDocumentId, string> = {
  privacy: "privacy policy, data protection, personal information, cookies, Indexia Group privacy",
  terms: "terms and conditions, website terms, legal terms, Indexia Group terms",
  termsOfUse: "terms of use, cancellation policy, refund policy, disclaimer, Indexia Group terms of use",
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

  const LEGAL_HERO_IMAGES: Record<LegalDocumentId, string> = {
    privacy: privacyHero,
    terms: legalBg,
    termsOfUse: termsOfUseHero,
  };
  const heroImage = LEGAL_HERO_IMAGES[docId] ?? legalBg;

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
          { "@type": "ListItem", position: 1, name: t("jsonLd.breadcrumbHome"), item: "https://www.indexiagroup.com/" },
          { "@type": "ListItem", position: 2, name: title, item: `https://www.indexiagroup.com${path}` },
        ],
      },
    ],
  };

  return (
    <main className="site-shell">
      <SEO title={title} description={t(descriptionKey)} keywords={KEYWORDS[docId]} canonicalPath={path} jsonLd={jsonLd} />

      <HeroBackdrop
        image={heroImage}
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
        <p className="mx-auto mb-7 max-w-2xl text-sm leading-7 text-white/80">{t(`legal.${docId}Subtitle`)}</p>
        <p className="font-ledger text-[11px] font-bold uppercase tracking-[0.22em] text-white/55">
          {t("legal.lastUpdated")}: {doc.lastUpdated}
        </p>
      </HeroBackdrop>

      <section className="section-ruled section-paper relative px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
        <div className="card-premium mx-auto max-w-5xl rounded-2xl p-4 sm:p-6 lg:p-8">
          <Reveal>
            <div className="mb-3 border-b border-slate-200 pb-3">
              <Link
                to="/"
                className="text-sm font-semibold text-(--color-blue) transition-colors hover:text-(--color-teal)"
              >
                ← {t("legal.backHome")}
              </Link>
            </div>
          </Reveal>

          <Reveal>
            <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 rounded-xl border border-slate-200 bg-(--color-soft) px-4 py-2 shadow-sm">
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
              <p className="text-[14px] leading-6.5 text-slate-700">{paragraph}</p>
            </Reveal>
          ))}

          {content.sections.map((section, index) => (
            <Reveal key={section.title} delay={0.05 * (index % 3)}>
              <section className="mt-5 rounded-xl border border-slate-100 bg-white/70 p-3 sm:p-4">
                <div className="flex items-center gap-4">
                  <span className="font-ledger text-sm font-bold" style={{ color: colors.teal }}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="h-px flex-1 bg-slate-200" />
                </div>
                <h2 className="font-display mt-2 text-lg font-bold text-slate-900 sm:text-xl">{section.title}</h2>
                <div className="mt-2 space-y-2.5">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-[14px] leading-6.5 text-slate-600">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            </Reveal>
          ))}


        </div>
      </section>
    </main>
  );
};

export default LegalDocumentPage;
