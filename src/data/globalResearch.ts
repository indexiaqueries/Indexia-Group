

type ResearchArea = {
  key: string;
  title: string;
  body: string;
};

export const researchAreas: ResearchArea[] = [
  {
    key: "fdi",
    title: "FDI & Cross-Border Investment",
    body: "Tracking how foreign capital enters India — sectoral flows, policy shifts, and the corridors that connect global investors with Indian opportunity.",
  },
  {
    key: "credit",
    title: "Credit, NBFC & Banking Funding",
    body: "How credit reaches individuals and businesses — from NBFC funding lines to banking partnerships — and what shapes access to capital.",
  },
  {
    key: "trade",
    title: "Trade, Exports & Agro Markets",
    body: "Commodity flows, export corridors, and the supply chains behind India's edible and agricultural exports.",
  },
  {
    key: "security",
    title: "Security, Logistics & Infrastructure",
    body: "The operational backbone of business — warehousing networks, logistics corridors, and the security ecosystems that protect them.",
  },
];

type ResearchReport = {
  key: string;
  title: string;
  date: string;
  summary: string;
};

export const researchReports: ResearchReport[] = [
  {
    key: "fdi-2026",
    title: "India's FDI Landscape: 2026 Outlook",
    date: "Q1 2026",
    summary: "Sectoral FDI trends, policy changes, and the investment corridors shaping inbound capital.",
  },
  {
    key: "nbfc",
    title: "The NBFC Funding Environment",
    date: "Q4 2025",
    summary: "How liquidity, regulation, and bank partnerships are reshaping non-bank lending.",
  },
  {
    key: "edible-exports",
    title: "Edible Exports: From Farm to Port",
    date: "Q3 2025",
    summary: "Supply chains, quality standards, and market corridors for India's edible exports.",
  },
  {
    key: "warehousing",
    title: "Warehousing Demand in the NCR Belt",
    date: "Q2 2025",
    summary: "Lease dynamics and infrastructure trends across Delhi NCR's industrial corridors.",
  },
];
