export type StatItem = {
  value: string;
  label: string;
};

export type SpotlightContent = {
  eyebrow: string;
  heading: string;
  description: string;
  stats: StatItem[];
  bullets: string[];
};

export const SPOTLIGHT_DATA: Record<string, SpotlightContent> = {
  finance: {
    eyebrow: "Global Fintech",
    heading: "Connecting Capital\nWith Opportunity",
    description:
      "With operations spanning four continents and partnerships with 43 banks and NBFCs in India alone, Indexia Finance bridges the gap between investors and high-growth opportunities across borders.",
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
