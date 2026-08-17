type ResearchArea = {
  key: string;
  title: string;
  body: string;
};

export const researchAreas: ResearchArea[] = [
  {
    key: "economic",
    title: "Economic Research",
    body: "Incisive analysis of global and regional economies, policy shifts, and the drivers of growth.",
  },
  {
    key: "thematic",
    title: "Global Thematic Research",
    body: "Deep dives into globally significant themes and their impact on economies and markets.",
  },
  {
    key: "macro",
    title: "Global Macro Strategy",
    body: "Strategic views and positioning across macroeconomic, fixed income, currency, and commodity disciplines.",
  },
  {
    key: "fx",
    title: "FX",
    body: "Currency analysis and views across the markets we cover.",
  },
  {
    key: "rates",
    title: "Rates",
    body: "Fixed income and interest-rate research across our coverage footprint.",
  },
  {
    key: "credit",
    title: "Credit",
    body: "Credit views and analysis that help clients navigate issuance and spreads.",
  },
  {
    key: "commodities",
    title: "Commodities",
    body: "Commodity research grounded in local insight across Asia, Africa, and the Middle East.",
  },
];

type ResearchReport = {
  key: string;
  title: string;
  summary: string;
};

export const researchReports: ResearchReport[] = [
  {
    key: "otg",
    title: "OTG — On-The-Ground",
    summary: "Our on-the-ground analysis of the dynamic regions we study in depth.",
  },
  {
    key: "act",
    title: "ACT — Actionable Ideas",
    summary: "Actionable market ideas that give our clients a leading edge.",
  },
  {
    key: "special-reports",
    title: "Special Reports",
    summary: "Analyses of globally significant themes and their impact on economies and markets.",
  },
];
