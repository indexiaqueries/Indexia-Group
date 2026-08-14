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
    desc: "A multinational fintech providing services globally across four verticals — investor services, FDI, NBFC, and banking funding.",
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
    desc: "We do all kinds of loans under finance — every type of loan, tailored to individuals and businesses.",
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
    desc: "We deal and export refined sugar and all edible items.",
    overview:
      "Indexia Overseas drives global trade in all edible items, with a special focus on sugar exports across 14 South American countries. The company manages sourcing, quality, logistics, and international compliance so that food-grade products move from origin to market reliably and at scale.",
    highlights: [
      "Trade in all edible items — sugar at the core",
      "Established presence across 14 South American markets",
      "End-to-end sourcing, quality and logistics",
    ],
    services: [
      "Sugar Export & Trading",
      "Edible Oils & Pulses",
      "Food Grains & Spices",
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
    desc: "We manufacture organic fertilizers in India and export them globally.",
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
    desc: "Armed commandos and armed security, safeguarding politicians and big business tycoons.",
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
    color: colors.blue,
  },
  {
    name: "Indexia Warehouse",
    slug: "warehouse",
    tag: "Logistics Infrastructure",
    desc: "Warehousing facilities on lease to multinational companies, located in the Delhi NCR region.",
    overview:
      "Indexia Warehouse operates modern warehousing facilities on lease to multinational companies, located in the Delhi NCR region. With secure, scalable storage and seamless logistics integration, the company helps global businesses manage inventory close to one of India's largest consumption markets.",
    highlights: [
      "Facilities on lease to multinational companies",
      "Prime Delhi NCR locations near major corridors",
      "Secure, scalable storage with logistics integration",
    ],
    services: [
      "Warehousing on Lease (MNCs)",
      "Secure & Scalable Storage",
      "Inventory Management",
      "Delhi NCR Locations",
      "Logistics Integration",
      "Cold & Dry Storage Options",
    ],
    color: colors.teal,
  },
  {
    name: "Indexia Advertising",
    slug: "advertising",
    tag: "Highway Advertising",
    desc: "Multiple advertising holdings across highways, giving brands high-visibility campaigns.",
    overview:
      "Indexia Advertising owns multiple advertising holdings across highways, giving brands high-visibility campaigns in high-traffic corridors. From strategic site selection to creative placement, the company ensures maximum exposure for advertisers along major road networks.",
    highlights: [
      "Multiple holdings across highway corridors",
      "High-traffic placements with maximum visibility",
      "Strategic site selection and campaign support",
    ],
    services: [
      "Highway Hoardings & Billboards",
      "Multiple Site Holdings",
      "High-Traffic Corridor Placements",
      "Creative & Campaign Support",
      "Site Analytics & Reporting",
    ],
    color: colors.gray,
  },
  {
    name: "Indexia Foundation",
    slug: "foundation",
    tag: "Athlete Support",
    desc: "Supporting athletes with international-level training, dieting, and all necessary support — right up to the Olympic Games.",
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
    color: colors.blue,
  },
];

export const companyNames = companies.map((company) => company.name);
