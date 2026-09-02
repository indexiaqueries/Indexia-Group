type NewsArticle = {
  slug: string;
  title: string;
  category: string;
  company: string;
  date?: string;
  excerpt: string;
  featured?: boolean;
};

export const newsArticles: NewsArticle[] = [
  {
    slug: "yes-bank-sme-funding",
    title: "Yes Bank secures $150 million from US government and Wells Fargo for SME lending",
    category: "Banking",
    company: "Yes Bank",
    excerpt:
      "The third round under the OPIC–Wells Fargo arrangement, backed by US government development finance, will expand credit to small and medium enterprises across India.",
    featured: true,
  },
  {
    slug: "uidai-aadhaar-banks",
    title: "UIDAI asks banks to open Aadhaar enrolment centres on premises",
    category: "Policy",
    company: "UIDAI",
    excerpt:
      "Banks have been asked to run Aadhaar enrolment facilities in at least one of every ten branches, extending enrolment far beyond the 25,000 standalone centres operating today.",
  },
  {
    slug: "demonetisation-digital-payments",
    title: "Demonetisation brings India three years ahead in digital payments: SBI research",
    category: "Digital Payments",
    company: "SBI",
    excerpt:
      "State Bank of India's research wing says POS card transactions rose 88% and mobile banking and prepaid payments rose 122%, with the shift also expected to ease inflation.",
  },
  {
    slug: "sbi-imps-fee-waiver",
    title: "SBI waives charges on IMPS transfers up to ₹1,000",
    category: "Banking",
    company: "SBI",
    excerpt:
      "India's largest bank drops fees on small instant transfers to encourage digital payments; IMPS transfers above ₹1,000 now cost ₹5 plus GST, rising to ₹15 for ₹1–2 lakh.",
  },
  {
    slug: "nakshatra-gili-directors",
    title: "Chawl residents named as directors in Nakshatra and Gili India",
    category: "Markets",
    company: "Gitanjali Group",
    date: "21 Feb 2018",
    excerpt:
      "Ordinary employees and small-time retail investors were persuaded to appear as directors on paper for Gili, Nakshatra and Gitanjali companies, raising questions about corporate governance.",
  },
  {
    slug: "sebi-hdfc-information-leak",
    title: "SEBI asks HDFC Bank to take responsibility for information leak",
    category: "Markets",
    company: "HDFC Bank",
    date: "24 Feb 2018",
    excerpt:
      "The market regulator directed HDFC Bank to run an internal enquiry into how parts of its quarterly results reached stock traders and others through WhatsApp messages.",
  },
];

type KnowledgeInsight = {
  key: string;
  title: string;
  body: string;
};

export const knowledgeInsights: KnowledgeInsight[] = [
  {
    key: "finance-fdi",
    title: "Finance: Navigating FDI and cross-border funding",
    body: "Foreign direct investment in India follows specific entry routes, sectoral caps, and filing requirements. Indexia Finance walks through the main structures, automatic vs. government routes, and the documentation lenders actually review before approving cross-border capital.",
  },
  {
    key: "finserve-loans",
    title: "Finserve: Choosing the right business loan",
    body: "Term loans, working-capital lines, and project finance each serve different stages of growth. Indexia Finserve explains what lenders evaluate, from cash-flow projections to collateral, and how to structure an application that matches your real funding need.",
  },
  {
    key: "overseas-export",
    title: "Overseas: Export compliance and logistics basics",
    body: "Exporting from India involves IEC registration, customs documentation, quality certifications, and freight coordination. Indexia Overseas shares the practical checklist every first-time exporter needs, from product classification to shipment tracking.",
  },
  {
    key: "agro-bio-farming",
    title: "Agro Bio: Transitioning to organic fertilizers",
    body: "Bio-fertilizers restore soil microbial activity and long-term fertility that chemical inputs deplete. Indexia Agro Bio explains how to assess soil health, select the right microbial blends, and manage the switchover without sacrificing yields.",
  },
  {
    key: "securities-risk",
    title: "Securities: Building a security risk programme",
    body: "Professional security starts with a structured risk assessment, not just manpower. Indexia Securities covers threat profiling, access-control design, armed-response protocols, and how to measure programme effectiveness with clear KPIs.",
  },
  {
    key: "warehouse-ops",
    title: "Warehouse: Strategic storage and inventory flow",
    body: "Warehouse location, racking layout, and inventory turnover directly affect working-capital cycles. Indexia Warehouse shares practical guidance on facility planning, safety compliance, and systems that keep stock accurate and moving.",
  },
  {
    key: "advertising-regulations",
    title: "Advertising: Highway billboard regulations and ROI",
    body: "Highway advertising in India is governed by NHAI and state-level licensing rules. Indexia Advertising breaks down permit requirements, structural standards, and how to measure reach and cost-per-impression across different corridor types.",
  },
  {
    key: "foundation-athlete",
    title: "Foundation: Designing athlete development programmes",
    body: "Effective athlete support combines training infrastructure, nutrition science, and financial sponsorship. Indexia Foundation outlines how to structure a programme that identifies talent early, provides structured coaching, and sustains athletes through competitive careers.",
  },
];
