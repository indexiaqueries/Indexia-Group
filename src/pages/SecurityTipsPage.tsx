import { useTranslation } from "react-i18next";

import SEO from "../components/common/SEO";
import Eyebrow from "../components/common/Eyebrow";
import Reveal from "../components/common/Reveal";
import HeroBackdrop from "../components/banners/HeroBackdrop";
import ImageSlot from "../components/common/ImageSlot";
import ImpactBand from "../components/common/ImpactBand";
import { colors } from "../lib/theme";
import securityBg from "../assets/public-images/heroes/security-hero.webp";
import { siteImages } from "../data/siteImages";
import type { ImageSlotData } from "../components/common/ImageSlot";
import {
  securityFeatures,
  securityPractices,
  securityContacts,
} from "../data/securityTips";

const securityJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      name: "Security Tips - Indexia Group",
      url: "https://www.indexiagroup.com/security-tips",
      description:
        "How Indexia Group protects your accounts online, what you can do on your devices, and who to contact if something goes wrong.",
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

type Tip = { key: string; title: string; body: string };

type SectionProps = {
  eyebrow: string;
  heading: string;
  subtitle: string;
  tips: Tip[];
  contact?: boolean;
  image?: ImageSlotData;
};

const SecuritySection = ({ eyebrow, heading, subtitle, tips, contact, image }: SectionProps) => (
  <div className="mx-auto max-w-6xl">
    <Reveal className="mx-auto mb-12 max-w-2xl text-center">
      <Eyebrow className="mb-3">{eyebrow}</Eyebrow>
      <h2 className="font-display text-[clamp(24px,4vw,38px)] font-bold text-(--color-ink)">
        {heading}
      </h2>
      <p className="mt-4 text-[15px] leading-7 text-(--color-muted)">{subtitle}</p>
    </Reveal>

    {image && (
      <Reveal delay={0.05} amount={0.15}>
        <ImageSlot {...image} className="mb-10" />
      </Reveal>
    )}

    <div
      className={`grid grid-cols-1 gap-5 ${
        tips.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"
      }`}
    >
      {tips.map((tip, i) => (
        <Reveal key={tip.key} delay={(i % 3) * 0.08} amount={0.15} className="h-full">
          <div
            className={`flex h-full flex-col rounded-2xl border p-6 shadow-sm ${
              contact
                ? "border-(--color-yellow)/40 bg-(--color-yellow)/10"
                : "border-slate-100 bg-white"
            }`}
          >
            <span
              className="font-ledger text-sm font-bold"
              style={{ color: i % 2 === 0 ? colors.teal : colors.blue }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="font-display mt-3 text-lg font-bold text-slate-900">{tip.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-7 text-slate-600">{tip.body}</p>
          </div>
        </Reveal>
      ))}
    </div>
  </div>
);

const SecurityTipsPage = () => {
  const { t } = useTranslation();

  const tr = (path: string, fallback: string) => t(`pageContent.security.${path}`, { defaultValue: fallback });
  const features = securityFeatures.map((c) => ({
    ...c,
    title: tr(`features.${c.key}.title`, c.title),
    body: tr(`features.${c.key}.body`, c.body),
  }));
  const practices = securityPractices.map((p) => ({
    ...p,
    title: tr(`practices.${p.key}.title`, p.title),
    body: tr(`practices.${p.key}.body`, p.body),
  }));
  const contacts = securityContacts.map((c) => ({
    ...c,
    title: tr(`contacts.${c.key}.title`, c.title),
    body: tr(`contacts.${c.key}.body`, c.body),
  }));

  return (
    <main className="bg-white">
      <SEO
        title={t("securityTipsPage.title")}
        description={t("securityTipsPage.metaDescription")}
        keywords="security tips, online banking safety, fraud prevention, protect your data, secure connections, customer service hotline"
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
        <button
          type="button"
          onClick={() => document.getElementById("practices")?.scrollIntoView({ behavior: "smooth" })}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-(--color-yellow) px-8 py-3.5 text-sm font-bold text-(--color-yellow-ink) shadow-[0_4px_16px_rgba(242,242,49,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-(--color-yellow-bright)"
        >
          {t("securityTipsPage.ctaButton")} ↓
        </button>
      </HeroBackdrop>

      <section className="relative bg-white px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        <SecuritySection
          eyebrow={t("securityTipsPage.featuresEyebrow")}
          heading={t("securityTipsPage.featuresHeading")}
          subtitle={t("securityTipsPage.featuresSubtitle")}
          tips={features}
          image={siteImages.securityFeatures}
        />
      </section>

      <section id="practices" className="scroll-mt-24 bg-(--color-mist) px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        <SecuritySection
          eyebrow={t("securityTipsPage.practicesEyebrow")}
          heading={t("securityTipsPage.practicesHeading")}
          subtitle={t("securityTipsPage.practicesSubtitle")}
          tips={practices}
          image={siteImages.securityPractices}
        />
      </section>

      <section className="bg-white px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        <SecuritySection
          eyebrow={t("securityTipsPage.contactsEyebrow")}
          heading={t("securityTipsPage.contactsHeading")}
          subtitle={t("securityTipsPage.contactsSubtitle")}
          tips={contacts}
          contact
        />
      </section>

      <ImpactBand
        image={securityBg}
        eyebrow={t("securityTipsPage.contactsEyebrow")}
        title={t("securityTipsPage.ctaTitle")}
        body={t("securityTipsPage.ctaBody")}
        actionLabel={`${t("securityTipsPage.ctaButton")} ->`}
        to="/contact"
      />
    </main>
  );
};

export default SecurityTipsPage;
