import { useTranslation } from "react-i18next";
import Eyebrow from "../common/Eyebrow";
import Reveal from "../common/Reveal";
import { accentInk } from "../../lib/color";
import { getCompanyImage } from "../../data/companyImages";
import type { Company } from "../../data/companies";

type StatItem = {
  value: string;
  label: string;
};

type SpotlightContent = {
  eyebrow: string;
  heading: string;
  description: string;
  imageLabel: string;
  stats: StatItem[];
  bullets: string[];
};

const SPOTLIGHT_DATA: Record<string, SpotlightContent> = {
  finance: {
    eyebrow: "Global Fintech",
    heading: "Connecting Capital\nWith Opportunity",
    description:
      "With operations spanning four continents and partnerships with 43 banks and NBFCs in India alone, Indexia Finance bridges the gap between investors and high-growth opportunities across borders.",
    imageLabel: "Global fintech operations centre",
    stats: [
      { value: "43+", label: "Bank Partners" },
      { value: "4", label: "Core Verticals" },
      { value: "∞", label: "Global Reach" },
    ],
    bullets: [
      "FDI advisory across emerging and developed markets",
      "NBFC operations with regulated lending frameworks",
      "Banking & institutional funding for large-scale projects",
      "Cross-border capital solutions for multinational clients",
    ],
  },
  finserve: {
    eyebrow: "Lending Simplified",
    heading: "Every Loan Type\nUnder One Roof",
    description:
      "From personal loans to working capital, Indexia Finserve makes the right bank come to your doorstep — streamlining eligibility, documentation, and disbursal into a single, guided process.",
    imageLabel: "Customer consultation session",
    stats: [
      { value: "12", label: "Loan Products" },
      { value: "24h", label: "Response Time" },
      { value: "100%", label: "Digital Process" },
    ],
    bullets: [
      "Personal, home, and business loans with competitive rates",
      "MSME and project funding with flexible terms",
      "Balance transfer and loan against property options",
      "Dedicated advisor assigned from enquiry to disbursal",
    ],
  },
  overseas: {
    eyebrow: "Global Trade",
    heading: "From India to\n14 Countries",
    description:
      "With an established trade network across 14 South American countries, Indexia Overseas manages every stage of the export cycle — from sourcing and quality assurance to international logistics.",
    imageLabel: "International shipping port operations",
    stats: [
      { value: "14", label: "Countries" },
      { value: "100%", label: "Food-Grade" },
      { value: "24/7", label: "Logistics" },
    ],
    bullets: [
      "Premium refined sugar and edible commodity exports",
      "Full-cycle management — sourcing, QA, logistics, compliance",
      "Trusted partner for bulk buyers and institutional consumers",
      "Deep understanding of South American trade dynamics",
    ],
  },
  "agro-bio": {
    eyebrow: "Sustainable Agriculture",
    heading: "Restoring Soil,\nMaximizing Yield",
    description:
      "Operating from a state-of-the-art facility in Shamli, UP, Indexia Agro Bio manufactures scientifically formulated organic fertilizers that build long-term fertility — not short-term fixes.",
    imageLabel: "Organic fertilizer production facility",
    stats: [
      { value: "100%", label: "Organic" },
      { value: "6", label: "Product Lines" },
      { value: "NCR", label: "Location" },
    ],
    bullets: [
      "Bio-based solutions that work with nature, not against it",
      "Soil health assessment and customized fertilizer blends",
      "Crop yield optimization with hands-on farmer training",
      "Expanding domestic and international distribution network",
    ],
  },
  securities: {
    eyebrow: "Elite Protection",
    heading: "Military-Grade\nSecurity Solutions",
    description:
      "Staffed by ex-military commandos and trained security professionals, Indexia Securities delivers military-grade discipline and rapid-response capability to every assignment — 24/7.",
    imageLabel: "Security team deployment briefing",
    stats: [
      { value: "24/7", label: "Operations" },
      { value: "VIP", label: "Client Focus" },
      { value: "Rapid", label: "Response" },
    ],
    bullets: [
      "Close protection details for politicians and corporate leaders",
      "Corporate, industrial, and event security management",
      "Real-time surveillance with technology-driven monitoring",
      "Rapid deployment commando and response units",
    ],
  },
  warehouse: {
    eyebrow: "Strategic Investment",
    heading: "8 Expressways,\n21 Acres, One Location",
    description:
      "Positioned at the junction of 8 national expressways and 2 major highways, the Shamli land portfolio connects 8 states with a market reach of 50 crore people.",
    imageLabel: "Shamli land portfolio aerial view",
    stats: [
      { value: "21", label: "Acres Total" },
      { value: "8", label: "Expressways" },
      { value: "₹30", label: "Per Sq Ft" },
    ],
    bullets: [
      "5 locations with flexible plots from 1 to 8 acres",
      "Direct access to Gujarat, Maharashtra, Chennai, Kolkata ports",
      "IGI Airport Delhi and Noida Int'l Airport within 1 hour",
      "Modern warehouse planned on 2 acres with loading docks",
    ],
  },
  advertising: {
    eyebrow: "Highway Visibility",
    heading: "50 Crore Reach,\n360° Visibility",
    description:
      "Premium single-pole unipoles on the Delhi–Dehradun Highway give your brand maximum visibility with zero visual clutter — backed by signature Bisleri Green branding.",
    imageLabel: "Premium unipole hoarding on highway",
    stats: [
      { value: "1Cr+", label: "Daily Exposure" },
      { value: "10", label: "States Connected" },
      { value: "360°", label: "Visibility" },
    ],
    bullets: [
      "10×20 ft and 12×24 ft unipole packages available",
      "Strategic placements on NH-709B and Shamli Ring Road",
      "End-to-end service — printing, installation, maintenance",
      "Long-term and bulk packages with negotiable rates",
    ],
  },
  foundation: {
    eyebrow: "Athlete Development",
    heading: "From Grassroots\nto the Olympics",
    description:
      "Indexia Foundation removes the financial and logistical barriers that prevent talented athletes from reaching their potential — ensuring skill and dedication determine who represents India.",
    imageLabel: "Athletes in training session",
    stats: [
      { value: "5", label: "Support Pillars" },
      { value: "100%", label: "Funded" },
      { value: "∞", label: "Potential" },
    ],
    bullets: [
      "International-standard training facilities and expert coaching",
      "Complete nutrition, diet planning, and sports medicine",
      "Competition funding, equipment, and psychological support",
      "Building a sustainable pipeline of world-class athletes",
    ],
  },
};

type CompanySpotlightProps = {
  company: Company;
};

const CompanySpotlight = ({ company }: CompanySpotlightProps) => {
  const { t } = useTranslation();
  const data = SPOTLIGHT_DATA[company.slug];
  if (!data) return null;

  const headingLines = data.heading.split("\n");

  return (
    <section className="relative overflow-hidden bg-white py-20 lg:py-28">
      {/* Ambient glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -start-32 top-10 h-96 w-96 rounded-full opacity-15 blur-[100px]"
        style={{ background: company.color }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -end-24 bottom-10 h-72 w-72 rounded-full opacity-10 blur-[80px]"
        style={{ background: company.color }}
      />

      <div className="container grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/* Content side */}
        <Reveal amount={0.2}>
          <Eyebrow color={accentInk(company.color)} className="mb-3">
            {data.eyebrow}
          </Eyebrow>
          <h2 className="font-display text-[clamp(26px,3.6vw,42px)] font-bold leading-[1.08] text-(--color-ink)">
            {headingLines.map((line, i) => (
              <span key={i} className="block">
                {i === headingLines.length - 1 ? (
                  <span style={{ color: company.color }}>{line}</span>
                ) : (
                  line
                )}
              </span>
            ))}
          </h2>
          <p className="mt-5 max-w-xl text-[15px] leading-8 text-(--color-muted)">
            {data.description}
          </p>

          {/* Stats grid */}
          <div className="mt-8 grid grid-cols-3 gap-3">
            {data.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-slate-100 bg-white p-4 text-center shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
              >
                <p className="font-display text-2xl font-bold" style={{ color: accentInk(company.color) }}>
                  {stat.value}
                </p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.14em] text-(--color-muted)">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Bullet points */}
          <ul className="mt-8 space-y-3">
            {data.bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-3 text-[14px] leading-7 text-(--color-ink-soft)">
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: company.color }}
                />
                {bullet}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Image side */}
        <Reveal amount={0.2} className="relative">
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-3 rounded-[30px]"
              style={{ background: `linear-gradient(135deg, ${company.color}44, transparent 55%, ${company.color}22)` }}
            />
            <img
              src={getCompanyImage(company.slug)}
              alt={`${company.name} — ${company.tag}`}
              width={1536}
              height={1024}
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] w-full rounded-3xl object-cover shadow-2xl ring-1 ring-black/10"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default CompanySpotlight;
