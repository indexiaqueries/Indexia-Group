import { useTranslation } from "react-i18next";
import SEO from "../components/common/SEO";
import BusinessesHero from "../components/banners/BusinessesHero";
import SectionHeader from "../components/common/SectionHeader";
import Reveal from "../components/common/Reveal";
import RuledSection from "../components/common/RuledSection";
import BusinessCard from "../components/cards/BusinessCard";
import { getCompanyCardImage } from "../data/companyImages";
import { getCompanyIcon } from "../data/companyIcons";
import { companies } from "../data/companies";

const businessesJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ItemList",
      name: "Indexia Group Businesses",
      description: "Eight businesses under the Indexia Group across finance, loans, security, export, agriculture, logistics, advertising and athlete support.",
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

const businesses = companies.map((company) => ({
  name: company.name,
  slug: company.slug,
  tag: company.tag,
  description: company.desc,
  image: getCompanyCardImage(company.slug),
  icon: getCompanyIcon(company.name),
  link: company.link,
}));

const Businesses = () => {
  const { t } = useTranslation();

  return (
  <>
    <SEO
      title={t("seo.businessesTitle")}
      description={t("seo.businessesDescription")}
      keywords="Indexia Group businesses, Indexia Finance, Indexia Finserve loans, Indexia Securities, sugar export South America, organic fertilizer Shamli UP, warehousing Delhi NCR, highway advertising, Olympic athlete support"
      canonicalPath="/businesses"
      jsonLd={businessesJsonLd}
    />

    <BusinessesHero />

    <RuledSection>
        <Reveal className="mx-auto mb-10 max-w-180 text-center sm:mb-14">
          <SectionHeader
            title={t("home.groupCompanies.title")}
            description={t("home.groupCompanies.description")}
          />
        </Reveal>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {businesses.map((business, i) => (
            <Reveal key={business.name} delay={(i % 4) * 0.08} amount={0.15}>
              <BusinessCard business={business} />
            </Reveal>
          ))}
        </div>
    </RuledSection>
  </>
  );
};

export default Businesses;
