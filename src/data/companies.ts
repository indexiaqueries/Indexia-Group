import { colors } from "../lib/theme";

export type Company = {
  name: string;
  slug: string;
  tag: string;
  desc: string;
  overview: string;
  highlights: string[];
  tagline?: string;
  services: string[];
  color: string;
  link?: string;
};

export const companies: Company[] = [
  {
    name: "Indexia Finance",
    slug: "finance",
    tag: "Multinational Fintech",
    desc: "Global fintech across investor services, FDI, NBFC, and banking funding.",
    overview:
      "Indexia Finance is a multinational fintech platform delivering financial services to clients around the world. You may apply to our portal for any kind loan at www.indexiafinance.com — we provide our services globally, and in India we are business partners with 43 banks and NBFCs. Built around four core verticals — investor services, FDI advisory, NBFC operations, and banking funding — the company connects capital with opportunity, helping investors, businesses, and institutions make confident financial decisions across borders.",
    tagline: "An Entire Loan Destination",
    highlights: [
      "Global fintech reach with India-first execution",
      "Four integrated verticals under one roof",
      "End-to-end funding and advisory support",
    ],
    services: [
      "FDI Advisory & Facilitation",
      "Investor Services",
      "NBFC Operations",
      "Banking & Institutional Funding",
      "Cross-Border Capital Solutions",
      "Wealth & Asset Advisory",
    ],
    color: colors.teal,
    link: "https://indexiafinance.com/",
  },
  {
    name: "Indexia Finserve Pvt. Ltd.",
    slug: "finserve",
    tag: "Loans & Finance",
    desc: "Every type of loan, tailored to individuals and businesses.",
    overview:
      "Indexia Finserve is the lending arm of the Indexia Group, offering every kind of loan under finance. Now the right bank will come at your doorstep — the company works as a complete loan destination, guiding clients through eligibility, documentation, and disbursal for personal, home, business, MSME, and specialised funding with a single, streamlined process.",
    tagline: "The Next Gen Finance Method",
    highlights: [
      "Every loan type under one roof",
      "Streamlined eligibility, documentation and disbursal",
      "Dedicated advisory at every step",
    ],
    services: [
      "Personal Loan",
      "Business Loan",
      "Home Loan",
      "Loan Against Property",
      "Balance Transfer",
      "Car Loan",
      "Credit Card",
      "Education Loan",
      "Project Loan",
      "Commercial Purchase",
      "Lease R Discounting",
      "Working Capital",
    ],
    color: colors.yellow,
    link: "https://indexiafinance.com/",
  },
  {
    name: "Indexia Overseas Pvt. Ltd.",
    slug: "overseas",
    tag: "Edible Exporter",
    desc: "Exporting refined sugar and all edible items worldwide.",
    overview:
      "Indexia Overseas drives the global export of all edible items, with a special focus on sugar exports across 14 South American countries. The company manages sourcing, quality, logistics, and international compliance so that food-grade products move from origin to market reliably and at scale.",
    highlights: [
      "Export of all edible items — sugar at the core",
      "Established presence across 14 South American markets",
      "End-to-end sourcing, quality and logistics",
    ],
    services: [
      "Sugar Export & Trading",
      "Sourcing & Quality Control",
      "International Logistics",
      "14 South American Markets",
    ],
    color: colors.gray,
  },
  {
    name: "Indexia Agro Bio Fertilizers Pvt. Ltd.",
    slug: "agro-bio",
    tag: "Organic Fertilizer Production",
    desc: "Organic fertilizers, made in India and exported globally.",
    overview:
      "Indexia Agro Bio Fertilizers manufactures organic fertilizers at its production facility in Shamli, Uttar Pradesh — part of the Delhi NCR region. The company's bio-based products improve soil health, boost crop yield, and support sustainable farming for growers across North India.",
    highlights: [
      "Organic, bio-based production — no harsh chemicals",
      "Shamli, UP facility in the Delhi NCR belt",
      "Better soil health, higher crop yield",
    ],
    services: [
      "Organic Fertilizer Production",
      "Bio-Fertilizer Blends",
      "Soil Health Solutions",
      "Yield Improvement Programmes",
      "Farmer Support & Training",
      "Shamli, UP Facility (Delhi NCR)",
    ],
    color: colors.yellow,
  },
  {
    name: "Indexia Securities",
    slug: "securities",
    tag: "Armed Security & Commandos",
    desc: "Armed commandos and guards protecting leaders and businesses.",
    overview:
      "Indexia Securities provides the best armed security and commando protection available, safeguarding people, property, and high-profile operations around the clock. From trained commandos and armed guards to VIP escorts and event security, the company brings military-grade discipline to every assignment.",
    highlights: [
      "Best-in-class armed and commando protection",
      "Trained commandos with rapid-response discipline",
      "24×7 monitoring and on-ground response",
    ],
    services: [
      "Armed Security Guards",
      "Commando Protection Units",
      "VIP & Dignitary Escorts",
      "Event & Venue Security",
      "Corporate & Site Security",
      "24×7 Monitoring & Rapid Response",
    ],
    color: colors.navy,
  },
  {
    name: "Indexia Warehouse",
    slug: "warehouse",
    tag: "Strategic Land Investment",
    desc: "21 acres of strategic land in Shamli, linked to 8 national expressways.",
    overview:
      "Indexia Warehouse offers a strategic land investment opportunity in Shamli, Uttar Pradesh — just ~65 km from Tronica City, Loni, Delhi. The location is a connectivity hub: 8 national expressways and 2 major highways connecting 8 states, with direct access to Bhutan and Nepal and a market reach of 50 crore people. Four major ports (Gujarat, Maharashtra, Chennai, Kolkata) are directly reachable via expressways, and both IGI Airport Delhi and Noida Int'l Airport, Jewar are within one hour. The land portfolio spans 5 locations and 21 acres total, with flexible plots of 1, 2, 2.5, 5 and 8 acres, and a modern warehouse to be built on 2 acres with loading docks. Expected price is ₹30 per sq ft, negotiable.",
    highlights: [
      "Prime location — Shamli, UP, ~65 km from Delhi",
      "8 national expressways + 2 major highways connecting 8 states",
      "21 acres across 5 locations — plots of 1, 2, 2.5, 5 & 8 acres",
      "₹30 per sq ft, negotiable",
    ],
    services: [
      "Land Plots — 1, 2, 2.5, 5 & 8 Acres",
      "21 Acres Across 5 Locations",
      "Warehouse Construction on 2-Acre Plot",
      "Expressway & Highway Connectivity",
      "Port Access — Gujarat, Maharashtra, Chennai, Kolkata",
      "Airport Access — Delhi & Jewar Within 1 Hour",
    ],
    color: colors.teal,
  },
  {
    name: "Indexia Advertising",
    slug: "advertising",
    tag: "Premium Unipole Hoardings",
    desc: "Premium highway hoardings at North India's busiest junction.",
    overview:
      "Indexia Advertising operates premium single-pole unipole hoardings on the Delhi–Dehradun Highway (NH-709B) in Shamli — the hub of North India. Positioned at the junction of 8 national expressways and 2 major highways, our unipoles connect 10 states with a 50 crore population reach and attract 1+ crore daily exposure. Single-pole unipoles with premium height and unobstructed 360° viewing angles give your brand maximum visibility with zero visual clutter, backed by a signature Bisleri Green branding. From printing and installation to maintenance, we handle everything end-to-end. Book a 10×20 ft unipole at ₹25,000/month or a 12×24 ft unipole at ₹36,000/month — standard rate ₹125/sq ft per side per month, negotiable for long-term packages. For bookings call 86918 86919 or 011 4629 1155, or email indexia.queries@gmail.com.",
    highlights: [
      "Strategic placements on NH-709B, the Delhi–Dehradun highway",
      "10 connected states — 50 crore population reach, 1+ crore daily exposure",
      "Single-pole unipoles with 360° visibility and premium height",
      "End-to-end service — printing, installation and maintenance",
    ],
    services: [
      "Unipole 10×20 ft — ₹25,000/month",
      "Unipole 12×24 ft — ₹36,000/month",
      "Standard Rate — ₹125/sq ft per side per month",
      "Delhi–Dehradun Highway & Shamli Ring Road Placements",
      "Printing, Installation & Maintenance",
      "Long-Term & Bulk Packages",
    ],
    color: colors.gray,
  },
  {
    name: "Indexia Foundation",
    slug: "foundation",
    tag: "Athlete Support",
    desc: "International-level training and support, right up to the Olympics.",
    overview:
      "Indexia Foundation supports athletes by providing all possible backing — international-level training, structured dieting and nutrition, expert coaching, and every kind of assistance needed on the journey to the Olympic Games. The foundation stands with sportspersons from early promise to the world's biggest stage.",
    highlights: [
      "International-level training and expert coaching",
      "Structured diet and nutrition programmes",
      "Complete support all the way to the Olympics",
    ],
    services: [
      "International-Level Training",
      "Diet & Nutrition Programmes",
      "Expert Coaching & Mentorship",
      "Competition Funding & Gear",
      "Sports Medicine & Recovery",
      "Olympic-Grade Support",
    ],
    color: colors.tealDeep,
  },
];

