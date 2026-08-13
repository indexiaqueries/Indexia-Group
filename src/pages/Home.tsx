import {
  BadgeDollarSign,
  Building2,
  Globe2,
  Sprout,
  ShieldCheck,
  HeartHandshake,
  Warehouse,
  Megaphone,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import AppButton from "../components/common/AppButton";
import Banner from "../components/banners/HomeHero";
import SEO from "../components/common/SEO";
import SectionHeader from "../components/common/SectionHeader";
import Reveal from "../components/common/Reveal";
import BusinessCard from "../components/cards/BusinessCard";
import { getCompanyImage } from "../data/companyImages";
import { companies } from "../data/companies";

const icons: Record<string, LucideIcon> = {
  "Indexia Finance": BadgeDollarSign,
  "Indexia Finserve Pvt. Ltd.": Building2,
  "Indexia Securities": ShieldCheck,
  "Indexia Overseas Pvt. Ltd.": Globe2,
  "Indexia Agro Bio Fertilizers Pvt. Ltd.": Sprout,
  "Indexia Warehouse": Warehouse,
  "Indexia Advertising": Megaphone,
  "Indexia Foundation": HeartHandshake,
};

const colorVar = (hex: string): string => {
  switch (hex) {
    case "#26ae90":
      return "var(--color-teal)";
    case "#f2f231":
      return "var(--color-yellow)";
    case "#066a9c":
      return "var(--color-blue)";
    default:
      return "var(--color-gray)";
  }
};

const businesses = companies.map((company, index) => {
  const next = companies[(index + 1) % companies.length];
  return {
    name: company.name,
    tag: company.tag,
    description: company.desc,
    color1: colorVar(company.color),
    color2: colorVar(next.color),
    image: getCompanyImage(company.name),
    icon: icons[company.name] ?? Building2,
  };
});

const Home = () => (
  <main className="bg-white">
    <SEO
      title="Financial Services, Loans, Export & Logistics"
      description="Diversified Indian business group: financial services, NBFC loans, global trade, agro fertilizers, warehousing & security. Offices in Mumbai, Delhi and Surat."
      keywords="Indexia Group, financial services India, NBFC loans, personal and business loans Mumbai, global trade sugar export, organic fertilizer manufacturers Shamli, warehousing Delhi NCR, armed security services, highway advertising India, athlete support"
      canonicalPath="/"
    />

    <Banner />

    <section className="section-pad section-soft">
      <div className="container">
        <Reveal>
          <SectionHeader
            title="Group Companies"
            description="Indexia Group is a diversified holding of companies spanning Finance, Trade, Agriculture, Warehouse, Securities, Social Impact, and Advertising. We build businesses that empower Clients, Partners, and Communities to grow with confidence."
          />
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {businesses.map((business, i) => (
            <Reveal key={business.name} delay={(i % 4) * 0.08} amount={0.15}>
              <BusinessCard business={business} />
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2}>
          <div className="mt-10 text-center">
            <AppButton to="/businesses" variant="blue">
              View All Group Companies
            </AppButton>
          </div>
        </Reveal>
      </div>
    </section>
  </main>
);

export default Home;
