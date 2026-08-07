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

import AppButton from "../components/common/AppButton";
import Banner from "../components/banners/HomeHero";
import SEO from "../components/common/SEO";
import SectionHeader from "../components/common/SectionHeader";
import BusinessCard from "../components/cards/BusinessCard";
import PartnerCard from "../components/cards/PartnerCard";
import financeImg from "../assets/customer-img.webp";

const businesses = [
  {
    name: "Indexia Finance",
    tag: "Financial Advisory",
    description:
      "Single-director financial consultancy focused on strategic planning, funding, and high-level financial decision-making.",
    color1: "var(--color-teal)",
    color2: "var(--color-yellow)",
    image: financeImg,
    icon: BadgeDollarSign,
  },
  {
    name: "Indexia Finserve Pvt. Ltd.",
    tag: "Corporate Finance & Advisory",
    description:
      "Multi-director corporate finance arm offering investment planning, wealth management, and business solutions.",
    color1: "var(--color-yellow)",
    color2: "var(--color-gray)",
    image: financeImg,
    icon: Building2,
  },
  {
    name: "Indexia Overseas Pvt. Ltd.",
    tag: "Global Trade & Logistics",
    description:
      "Cross-border trade and logistics solutions moving goods worldwide.",
    color1: "var(--color-gray)",
    color2: "var(--color-teal)",
    image: financeImg,
    icon: Globe2,
  },
  {
    name: "Indexia Agro Bio Fertilizers Pvt. Ltd.",
    tag: "Sustainable Agriculture",
    description:
      "Bio-fertilizer production and agricultural solutions that support sustainable, high-yield farming.",
    color1: "var(--color-teal)",
    color2: "var(--color-yellow)",
    image: financeImg,
    icon: Sprout,
  },
  {
    name: "Indexia Securities",
    tag: "Risk & Compliance",
    description:
      "Security and compliance services protecting assets, data, and operations across the group.",
    color1: "var(--color-yellow)",
    color2: "var(--color-gray)",
    image: financeImg,
    icon: ShieldCheck,
  },
  {
    name: "Indexia Foundation",
    tag: "Social Impact",
    description:
      "Community-focused initiatives, education, and welfare programs driven by Indexia Foundation.",
    color1: "var(--color-gray)",
    color2: "var(--color-teal)",
    image: financeImg,
    icon: HeartHandshake,
  },
  {
    name: "Indexia Warehouse",
    tag: "Logistics Infrastructure",
    description:
      "Large-scale warehousing facilities near key ports for seamless supply-chain operations.",
    color1: "var(--color-teal)",
    color2: "var(--color-yellow)",
    image: financeImg,
    icon: Warehouse,
  },
  {
    name: "Indexia Advertising",
    tag: "Brand & Media",
    description:
      "Strategic advertising and brand visibility solutions across high-impact media channels.",
    color1: "var(--color-yellow)",
    color2: "var(--color-gray)",
    image: financeImg,
    icon: Megaphone,
  },
];

const reasons = [
  {
    title: "Diversified Expertise",
    desc:
      "From finance and logistics to agro and advertising, we bring deep domain knowledge across sectors.",
  },
  {
    title: "Integrated Solutions",
    desc:
      "Our group structure allows businesses to collaborate for end-to-end solutions.",
  },
  {
    title: "Trust & Governance",
    desc:
      "Strong leadership, compliance frameworks, and a focus on long-term value creation.",
  },
  {
    title: "Growth-Oriented",
    desc:
      "Every business is built to scale with clients, partners, and communities.",
  },
];

const Home = () => (
  <main className="bg-white">
    <SEO
      title="Home"
      description="Indexia Group is a diversified holding of companies spanning finance, trade, agriculture, logistics, securities, social impact, and advertising — building businesses that empower clients, partners, and communities."
      keywords="Indexia Group, multi-business group, financial services India, trade and logistics, agro fertilizers, securities, advertising, wealth management"
      canonicalPath="/"
    />

    <Banner title="Indexia Group" description="Multi-business group" />

    <section className="section-pad bg-white">
      <div className="container">
        <SectionHeader
          title="One Group. Multiple Solutions."
          description="Indexia Group is a diversified holding of companies spanning finance, trade, agriculture, logistics, securities, social impact, and advertising. We build businesses that empower clients, partners, and communities to grow with confidence."
        />
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <AppButton to="/services">Explore Our Businesses</AppButton>
          <AppButton to="/about" variant="outline">About Indexia</AppButton>
        </div>
      </div>
    </section>

    <section className="section-pad section-soft">
      <div className="container">
        <SectionHeader
          title="Our Businesses"
          description="Each company under the Indexia umbrella solves specific challenges while contributing to a larger, integrated ecosystem."
        />
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {businesses.map((business) => (
            <BusinessCard key={business.name} business={business} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <AppButton to="/services" variant="blue">View All Services</AppButton>
        </div>
      </div>
    </section>

    <section className="section-pad bg-(--color-deep) text-white">
      <div className="container">
        <SectionHeader
          light
          title="Why Partner With Indexia?"
          description="Our group approach combines specialization with collaboration, delivering more value than any single business could on its own."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason, index) => (
            <PartnerCard key={reason.title} item={reason} index={index} />
          ))}
        </div>
      </div>
    </section>

    <section className="section-pad bg-white">
      <div className="container">
        <SectionHeader
          title="Ready to Explore What Indexia Can Do for You?"
          description="Whether you need financial advisory, logistics support, agricultural solutions, or brand-building services, our group has the right experts for the job."
        />
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <AppButton to="/contact" variant="yellow">Contact Us</AppButton>
          <AppButton to="/services" variant="outline">Our Services</AppButton>
        </div>
      </div>
    </section>
  </main>
);

export default Home;

