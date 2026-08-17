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

import { useTranslation } from "react-i18next";
import Banner from "../components/banners/HomeHero";
import SEO from "../components/common/SEO";
import SectionHeader from "../components/common/SectionHeader";
import Reveal from "../components/common/Reveal";
import BusinessCard from "../components/cards/BusinessCard";
import { getCompanyImage } from "../data/companyImages";
import { companies } from "../data/companies";
import { colors } from "../lib/theme";

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
    case colors.teal:
      return "var(--color-teal)";
    case colors.yellow:
      return "var(--color-yellow)";
    case colors.blue:
      return "var(--color-blue)";
    default:
      return "var(--color-gray)";
  }
};

const businesses = companies.map((company, index) => {
  const next = companies[(index + 1) % companies.length];
  return {
    name: company.name,
    slug: company.slug,
    tag: company.tag,
    description: company.desc,
    color1: colorVar(company.color),
    color2: colorVar(next.color),
    image: getCompanyImage(company.name),
    icon: icons[company.name] ?? Building2,
    link: company.link,
  };
});

const Home = () => {
  const { t } = useTranslation();

  return (
  <main className="bg-white">
    <SEO
      title={t("seo.homeTitle")}
      description={t("seo.homeDescription")}
      keywords="Indexia Group, financial services India, NBFC loans, personal and business loans Mumbai, global trade sugar export, organic fertilizer manufacturers Shamli, warehousing Delhi NCR, armed security services, highway advertising India, athlete support"
      canonicalPath="/"
    />

    <Banner />

    <section className="section-pad section-soft">
      <div className="container">
        <Reveal>
          <SectionHeader
            title={t("home.groupCompanies.title")}
            description={t("home.groupCompanies.description")}
          />
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {businesses.map((business, i) => (
            <Reveal key={business.name} delay={(i % 4) * 0.08} amount={0.15}>
              <BusinessCard business={business} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  </main>
  );
};

export default Home;
