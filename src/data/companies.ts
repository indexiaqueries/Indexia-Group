import { colors } from "../lib/theme";

export type Company = {
  name: string;
  slug: string;
  founded: number;
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
    founded: 2012,
    tag: "Multinational Fintech",
    desc: "Global fintech across investor services, FDI, NBFC, and banking funding.",
    overview:
      "Indexia Finance is a multinational fintech platform delivering financial services to clients around the world. You may apply to our portal for any kind loan at www.indexiafinance.com, we provide our services globally, and in India we are business partners with 43 banks and NBFCs. Built around four core verticals, investor services, FDI facilitation, NBFC operations, and banking funding, the company connects capital with opportunity, helping investors, businesses, and institutions make confident financial decisions across borders.",
    tagline: "An Entire Loan Destination",
    highlights: [
      "Global fintech reach with India-first execution",
      "Four integrated verticals under one roof",
      "End-to-end funding and support",
    ],
    services: [
      "FDI Facilitation",
      "Investor Services",
      "NBFC Operations",
      "Banking & Institutional Funding",
      "Cross-Border Capital Solutions",
      "Wealth & Asset Management",
    ],
    color: colors.teal,
    link: "https://indexiafinance.com/",
  },
  {
    name: "Indexia Finserve Pvt. Ltd.",
    slug: "finserve",
    founded: 2015,
    tag: "Investment & Finance",
    desc: "Every type of loan, the right bank at your doorstep.",
    overview:
      "Indexia Finserve is the lending arm of the Indexia Group, offering every kind of loan. The company works as a complete loan destination, the right bank at your doorstep. From eligibility to disbursal, Indexia Finserve handles personal, home, business, MSME, and specialised funding with a single, streamlined process.",
    tagline: "The Next Gen Finance Method",
    highlights: [
      "Every loan type under one roof",
      "Streamlined eligibility, documentation and disbursal",
      "Dedicated support at every step",
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
    founded: 2014,
    tag: "Global Edible Export",
    desc: "Premium refined sugar and edible commodities exported to 14 South American countries.",
    overview:
      "Indexia Overseas is the global export arm of the Indexia Group, specializing in the international trade of refined sugar and premium edible commodities. With a strong and growing presence across 14 South American countries, the company has built a reputation for reliability, quality, and efficiency in cross-border food supply chains. From sourcing and quality assurance to international logistics and regulatory compliance, Indexia Overseas manages every stage of the export process, ensuring food-grade products reach global markets on time and at scale. The company's deep understanding of South American trade dynamics, combined with India's competitive production advantages, positions it as a preferred partner for bulk buyers, distributors, and institutional consumers across the continent.",
    highlights: [
      "Premium refined sugar and edible commodity exports",
      "Established trade network across 14 South American countries",
      "Full-cycle export management, sourcing, quality, logistics, compliance",
      "Trusted partner for bulk buyers and institutional consumers",
    ],
    services: [
      "Refined Sugar Export & Trading",
      "Edible Commodity Sourcing",
      "Quality Assurance & Certification",
      "International Freight & Logistics",
      "Regulatory & Compliance Management",
      "South American Market Distribution",
    ],
    color: colors.gray,
  },
  {
    name: "Indexia Agro Bio Fertilizers Pvt. Ltd.",
    slug: "agro-bio",
    founded: 2015,
    tag: "Organic Agriculture Solutions",
    desc: "Scientifically formulated organic fertilizers that restore soil health and maximize crop yield.",
    overview:
      "Indexia Agro Bio Fertilizers is committed to transforming Indian agriculture through scientifically formulated, eco-friendly bio-fertilizers. Operating from its state-of-the-art production facility in Shamli, Uttar Pradesh, strategically located within the Delhi NCR belt, the company manufactures a comprehensive range of organic fertilizers that restore depleted soil, enhance microbial activity, and significantly improve crop productivity. Unlike conventional chemical fertilizers that degrade soil over time, Indexia Agro's bio-based solutions work with nature to build long-term fertility. The company serves farmers across North India with products backed by agronomic research, and provides hands-on support including soil testing, application guidance, and yield optimization programmes. With growing demand for sustainable agriculture, Indexia Agro is expanding its distribution network to serve both domestic and international markets.",
    highlights: [
      "Scientifically formulated bio-fertilizers, no synthetic chemicals",
      "Modern production facility in Shamli, UP (Delhi NCR region)",
      "Proven results, healthier soil, higher yields, lower input costs",
      "End-to-end farmer support, soil testing, application training, yield programmes",
    ],
    services: [
      "Organic Bio-Fertilizer Manufacturing",
      "Customized Fertilizer Blends",
      "Soil Health Assessment & Testing",
      "Crop Yield Optimization Programmes",
      "Farmer Training & Field Support",
      "Domestic & Export Distribution",
    ],
    color: colors.yellow,
  },
  {
    name: "Indexia Securities",
    slug: "securities",
    founded: 2013,
    tag: "Armed Protection & Security",
    desc: "Military-grade armed security for high-profile individuals, corporations, and critical infrastructure.",
    overview:
      "Indexia Securities is a premier security solutions provider specializing in armed protection, commando deployment, and comprehensive security management. The company safeguards high-profile individuals, including politicians, corporate leaders, and public figures, as well as critical infrastructure, corporate facilities, and large-scale events. Staffed by ex-military commandos and rigorously trained security professionals, Indexia Securities delivers military-grade discipline and rapid-response capability to every assignment. The company operates a 24×7 monitoring and response centre, ensuring real-time threat assessment and immediate on-ground deployment when required. From long-term static security at corporate sites to dynamic close-protection details for VIPs, Indexia Securities combines personnel excellence with technology-driven surveillance to deliver security that clients can trust.",
    highlights: [
      "Elite protection, ex-military commandos and trained security professionals",
      "Comprehensive coverage, individuals, corporations, events, and infrastructure",
      "24×7 operations centre with real-time monitoring and rapid deployment",
      "Proven track record protecting high-profile and high-risk clients",
    ],
    services: [
      "Armed Security Guard Deployment",
      "Close Protection & VIP Escort Details",
      "Commando & Rapid Response Units",
      "Corporate & Industrial Site Security",
      "Event & Venue Security Management",
      "24×7 Surveillance & Threat Monitoring",
    ],
    color: colors.navy,
  },
  {
    name: "Indexia Warehouse",
    slug: "warehouse",
    founded: 2022,
    tag: "Strategic Land Investment",
    desc: "21 acres of strategic land investment in Shamli, linked to 8 national expressways and 4 major ports.",
    overview:
      "Indexia Warehouse offers a strategic land investment opportunity built on 21 acres in Shamli, Uttar Pradesh, just ~65 km from Tronica City, Loni, Delhi. The location is a prime connectivity hub: 8 national expressways and 2 major highways connecting 8 states, with direct access to Bhutan and Nepal and a market coverage of 50 crore people. Direct expressway connectivity reaches 4 major ports — Gujarat, Maharashtra, Chennai and Kolkata — while IGI Airport Delhi and Noida International Airport Jewar are both within 1 hour. The land portfolio spans 5 locations with plots of 1, 2, 2.5, 5 and 8 acres, and a modern warehouse with loading docks is being built on a 2-acre plot. Expected price is ₹30 per sq ft, negotiable.",
    highlights: [
      "Prime location, Shamli, UP, ~65 km from Tronica City, Loni, Delhi",
      "8 national expressways + 2 major highways connecting 8 states",
      "Expressway connectivity to Gujarat, Maharashtra, Chennai & Kolkata ports",
      "IGI Airport Delhi & Noida Int'l Airport Jewar within 1 hour",
    ],
    services: [
      "Strategic Land Investment, 1 to 8 Acre Plots",
      "Port Connectivity, Gujarat to Kolkata",
      "Modern Warehouse on 2-Acre Plot with Loading Docks",
      "Expressway & Highway Connectivity, 8 States",
      "Airport Access, IGI Delhi & Jewar Within 1 Hour",
    ],
    color: colors.teal,
  },
  {
    name: "Indexia Advertising",
    slug: "advertising",
    founded: 2022,
    tag: "Premium Unipole Hoardings",
    desc: "Dominate the most strategic highway junction in North India with high-impact outdoor advertising.",
    overview:
      "Indexia Advertising operates premium hoardings on the Indian highways, majorly the Delhi–Dehradun Highway (NH-709B) in Shamli, the hub of North India. Positioned at the junction of 8 national expressways and 2 major highways, our hoardings connect 10 states with a 50 crore population reach and attract 1+ crore daily visibility. Premium height and unobstructed 360° viewing angles give your brand maximum visibility. From printing and installation to maintenance, we handle everything end-to-end.",
    highlights: [
      "Strategic Highway Placement, prime locations on Delhi–Dehradun Highway with maximum vehicular traffic coverage",
      "High daily footfall, access to 10 connected states covering 50 crore population via the Shamli junction",
      "Single-pole unipole for maximum visibility, unobstructed 360° viewing angle with premium height advantage",
      "End-to-end service, printing, installation and maintenance for hassle-free campaigns",
    ],
    services: [
      "Unipole 10×20 ft, ₹25,000/month",
      "Unipole 12×24 ft, ₹36,000/month",
      "Standard Rate, ₹125/sq ft per side per month",
      "Delhi–Dehradun Highway & Shamli Ring Road Placements",
      "Printing, Installation & Maintenance",
      "Long-Term & Bulk Packages",
    ],
    color: colors.gray,
  },
  {
    name: "Indexia Foundation",
    slug: "foundation",
    founded: 2026,
      tag: "Athlete Development & Support",
    desc: "Comprehensive support for Indian athletes, from grassroots talent to the Olympic Games.",
    overview:
      "Indexia Foundation is the social impact arm of the Indexia Group, dedicated to identifying, nurturing, and supporting Indian athletes on their journey from grassroots talent to international competition, including the Olympic Games. The foundation provides a complete support ecosystem that addresses every dimension of an athlete's development: international-level training facilities, structured nutrition and diet planning, expert coaching and mentorship, sports science and medical support, competition funding, and psychological guidance. By removing the financial and logistical barriers that often prevent talented athletes from reaching their potential, Indexia Foundation ensures that skill and dedication, not circumstance, determine who represents India on the world stage. The foundation works across multiple sports and is committed to building a sustainable pipeline of world-class Indian athletes.",
    highlights: [
      "End-to-end athlete development, training, nutrition, coaching, and medical support",
      "Removing financial barriers for talented athletes across India",
      "International-standard facilities and expert coaching staff",
      "Building a sustainable pipeline of Olympic-level Indian athletes",
    ],
    services: [
      "International Training Facility Access",
      "Nutrition & Diet Planning",
      "Expert Coaching & Mentorship",
      "Sports Medicine & Injury Recovery",
      "Competition Funding & Equipment",
      "Psychological Support & Career Guidance",
    ],
    color: colors.tealDeep,
  },
];

