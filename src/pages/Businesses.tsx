import { useTranslation } from "react-i18next";
import SEO from "../components/common/SEO";
import BusinessesHero from "../components/banners/BusinessesHero";
import Eyebrow from "../components/common/Eyebrow";
import Reveal from "../components/common/Reveal";
import RuledSection from "../components/common/RuledSection";
import CompanyLinkCard from "../components/cards/CompanyLinkCard";
import { companies } from "../data/companies";

const businessesJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ItemList",
      name: "Indexia Group Businesses",
      description: "Eight businesses under the Indexia Group across finance, loans, security, trade, agriculture, logistics, advertising and athlete support.",
      itemListElement: companies.map((company, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: company.name,
        description: company.desc,
        url: company.link ?? `https://www.indexiagroup.com/businesses/${company.slug}`,
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.indexiagroup.com/" },
        {
          "@type": "ListItem",
          position: 2,
          name: "Group Companies",
          item: "https://www.indexiagroup.com/businesses",
        },
      ],
    },
  ],
};

const About = () => {
  const { t } = useTranslation();

  return (
  <>
    <SEO
      title="Group Companies — Finance, Agro, Export & Logistics"
      description="The eight businesses of Indexia Group: finance, loans, security, sugar trade, organic fertilizers, warehousing, advertising and athlete support."
      keywords="Indexia Group businesses, Indexia Finance, Indexia Finserve loans, Indexia Securities, sugar export South America, organic fertilizer Shamli UP, warehousing Delhi NCR, highway advertising, Olympic athlete support"
      canonicalPath="/businesses"
      jsonLd={businessesJsonLd}
    />

    <BusinessesHero />

    <RuledSection>
        <Reveal className="mx-auto mb-10 max-w-[720px] text-center sm:mb-14">
          <Eyebrow className="mb-3">{t("businesses.eyebrow")}</Eyebrow>
          <h2 className="font-display text-[clamp(24px,4vw,38px)] font-bold text-(--color-ink)">
            {t("businesses.titleStart")}
            <span className="text-(--color-blue)">{t("businesses.titleAccent")}</span>
          </h2>
          <p className="mt-4 text-[15px] leading-7 text-(--color-muted)">
            {t("businesses.subtitle")}
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {companies.map((company, i) => (
            <Reveal key={company.name} delay={(i % 4) * 0.08} amount={0.15}>
              <CompanyLinkCard company={company} />
            </Reveal>
          ))}
        </div>
    </RuledSection>
  </>
  );
};

export default About;
