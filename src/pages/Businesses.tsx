import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import SEO from "../components/common/SEO";
import BusinessesHero from "../components/banners/BusinessesHero";
import CompanyDetail from "../components/businesses/CompanyDetail";
import Reveal from "../components/common/Reveal";
import { companies } from "../data/companies";
import { contrastText } from "../lib/color";

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
        ...(company.link ? { url: company.link } : {}),
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
  const [searchParams, setSearchParams] = useSearchParams();
  const companyParam = searchParams.get("company");
  const paramIndex = companyParam ? companies.findIndex((c) => c.name === companyParam) : -1;
  const [selected, setSelected] = useState(paramIndex >= 0 ? paramIndex : 0);
  const [lastParamIndex, setLastParamIndex] = useState(paramIndex);
  if (paramIndex !== lastParamIndex) {
    setLastParamIndex(paramIndex);
    if (paramIndex >= 0) setSelected(paramIndex);
  }
  const b = companies[selected];

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

      <section
        className="relative flex min-h-[50svh] items-center overflow-hidden"
        style={{ background: "var(--color-paper)", padding: "clamp(48px, 8vw, 88px) 0" }}
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
          <Reveal className="mx-auto mb-8 max-w-[720px] text-center sm:mb-10">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#26ae90]">Group Companies</p>
            <h2 className="font-display text-[clamp(24px,4vw,38px)] font-bold text-[#111827]">
              Eight Companies, <span className="text-[#066a9c]">One Group</span>
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-[#6b7280]">
              Choose a company to open its register entry — then send your enquiry to the right team.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mx-auto mb-4 flex max-w-5xl flex-wrap justify-center gap-2.5 sm:mb-6">
            {companies.map((company, i) => {
              const active = i === selected;
              return (
                <button
                  key={company.name}
                  type="button"
                  onClick={() => {
                    setSelected(i);
                    setSearchParams({ company: company.name }, { replace: true });
                  }}
                  aria-pressed={active}
                  className={`rounded-full border px-4 py-2 text-[13px] font-bold transition-all duration-200 ${
                    active
                      ? "border-transparent text-white"
                      : "border-[#d8d2c2] bg-white/60 text-[#374151] hover:-translate-y-0.5 hover:border-[#c9c2ae] hover:shadow-md"
                  }`}
                  style={
                    active
                      ? { backgroundColor: company.color, color: contrastText(company.color), boxShadow: `0 8px 20px ${company.color}40` }
                      : undefined
                  }
                >
                  {company.name.replace(" Pvt. Ltd.", "")}
                </button>
              );
            })}
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-center text-[12px] font-medium text-[#6b7280]">
              Finance &amp; Finserve link to <span className="font-semibold text-[#066a9c]">indexiafinance.com</span> · other companies have their own pages
            </p>
          </Reveal>
        </div>
      </section>

      <CompanyDetail company={b} key={b.name} />
    </>
  );
};

export default About;
