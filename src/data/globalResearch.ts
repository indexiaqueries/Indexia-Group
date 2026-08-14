/**
 * Global Research page content — research focus areas and recent reports.
 * Structured English data (like `companies.ts` and `careers.ts`);
 * page chrome is translated via i18n.
 */

export type ResearchArea = {
  title: string;
  body: string;
};

export const researchAreas: ResearchArea[] = [
  {
    title: "FDI & Cross-Border Investment",
    body: "Tracking how foreign capital enters India — sectoral flows, policy shifts, and the corridors that connect global investors with Indian opportunity.",
  },
  {
    title: "Credit, NBFC & Banking Funding",
    body: "How credit reaches individuals and businesses — from NBFC funding lines to banking partnerships — and what shapes access to capital.",
  },
  {
    title: "Trade, Exports & Agro Markets",
    body: "Commodity flows, export corridors, and the supply chains behind India's edible and agricultural exports.",
  },
  {
    title: "Security, Logistics & Infrastructure",
    body: "The operational backbone of business — warehousing networks, logistics corridors, and the security ecosystems that protect them.",
  },
];

export type ResearchReport = {
  title: string;
  date: string;
  summary: string;
};

export const researchReports: ResearchReport[] = [
  {
    title: "India's FDI Landscape: 2026 Outlook",
    date: "Q1 2026",
    summary: "Sectoral FDI trends, policy changes, and the investment corridors shaping inbound capital.",
  },
  {
    title: "The NBFC Funding Environment",
    date: "Q4 2025",
    summary: "How liquidity, regulation, and bank partnerships are reshaping non-bank lending.",
  },
  {
    title: "Edible Exports: From Farm to Port",
    date: "Q3 2025",
    summary: "Supply chains, quality standards, and market corridors for India's edible exports.",
  },
  {
    title: "Warehousing Demand in the NCR Belt",
    date: "Q2 2025",
    summary: "Lease dynamics and infrastructure trends across Delhi NCR's industrial corridors.",
  },
];
