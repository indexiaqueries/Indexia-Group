import SEO from "../components/common/SEO";
import BusinessesHero from "../components/banners/BusinessesHero";
import Reveal from "../components/common/Reveal";
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
        url: `https://www.indexiagroup.com/businesses/${company.slug}`,
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

const About = () => (
  <>
    <SEO
      title="Group Companies — Finance, Agro, Export & Logistics"
      description="The eight businesses of Indexia Group: finance, loans, security, sugar trade, organic fertilizers, warehousing, advertising and athlete support."
      keywords="Indexia Group businesses, Indexia Finance, Indexia Finserve loans, Indexia Securities, sugar export South America, organic fertilizer Shamli UP, warehousing Delhi NCR, highway advertising, Olympic athlete support"
      canonicalPath="/businesses"
      jsonLd={businessesJsonLd}
    />

    <BusinessesHero />

    <section
      className="relative overflow-hidden"
      style={{ background: "var(--color-paper)", padding: "clamp(56px, 8vw, 96px) 0" }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, transparent 0px, transparent 47px, rgba(18,32,41,0.045) 47px, rgba(18,32,41,0.045) 48px)",
        }}
      />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#26ae90]/50 to-transparent" aria-hidden="true" />

      <div className="container relative z-10">
        <Reveal className="mx-auto mb-10 max-w-[720px] text-center sm:mb-14">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#26ae90]">Group Companies</p>
          <h2 className="font-display text-[clamp(24px,4vw,38px)] font-bold text-[#111827]">
            Eight Companies, <span className="text-[#066a9c]">One Group</span>
          </h2>
          <p className="mt-4 text-[15px] leading-7 text-[#6b7280]">
            Choose a company to visit its own page — then send your enquiry to the right team.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {companies.map((company, i) => (
            <Reveal key={company.name} delay={(i % 4) * 0.08} amount={0.15}>
              <CompanyLinkCard company={company} entryNo={i + 1} total={companies.length} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default About;
