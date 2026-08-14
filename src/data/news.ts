

type NewsArticle = {
  slug: string;
  title: string;
  category: string;
  company: string;
  date: string;
  excerpt: string;
  featured?: boolean;
};

export const newsArticles: NewsArticle[] = [
  {
    slug: "fdi-advisory-desk",
    title: "Indexia Finance opens dedicated FDI advisory desk for South Asian investors",
    category: "Finance",
    company: "Indexia Finance",
    date: "August 2026",
    excerpt:
      "A new desk within Indexia Finance will guide foreign investors through entry strategy, regulatory filings, and partner selection — turning cross-border capital into on-ground businesses across India.",
    featured: true,
  },
  {
    slug: "finserve-doorstep-loans",
    title: "Indexia Finserve brings the bank to the doorstep across Delhi NCR",
    category: "Finance",
    company: "Indexia Finserve Pvt. Ltd.",
    date: "July 2026",
    excerpt:
      "The next-gen finance method goes physical: doorstep documentation, eligibility checks, and disbursal support for personal, home, and business loans across the National Capital Region.",
  },
  {
    slug: "agro-first-export",
    title: "Agro Bio Fertilizers ships first organic fertilizer consignment to international buyers",
    category: "Agriculture",
    company: "Indexia Agro Bio Fertilizers Pvt. Ltd.",
    date: "June 2026",
    excerpt:
      "Production from the Shamli facility now reaches export markets, extending the group's organic farming mission beyond India's borders with bio-based, chemical-free formulations.",
  },
  {
    slug: "warehouse-ncr-expansion",
    title: "Indexia Warehouse expands Delhi NCR footprint with a second facility",
    category: "Logistics",
    company: "Indexia Warehouse",
    date: "June 2026",
    excerpt:
      "Multinational tenants gain additional secure, scalable storage close to India's largest consumption corridors, with cold-storage options now available.",
  },
  {
    slug: "foundation-olympic-camp",
    title: "Indexia Foundation athletes begin Olympic qualification camp",
    category: "Sports",
    company: "Indexia Foundation",
    date: "May 2026",
    excerpt:
      "Trained athletes entered an intensive qualification phase combining international-level coaching, structured nutrition, and sports medicine — the foundation's full support model in action.",
  },
  {
    slug: "advertising-highway-network",
    title: "Indexia Advertising rolls out a new highway media corridor",
    category: "Media",
    company: "Indexia Advertising",
    date: "May 2026",
    excerpt:
      "Brands gain high-visibility placements along a newly acquired highway stretch, backed by site analytics and campaign reporting from the group's media holdings.",
  },
];

type KnowledgeInsight = {
  key: string;
  title: string;
  body: string;
};

export const knowledgeInsights: KnowledgeInsight[] = [
  {
    key: "understanding-fdi",
    title: "Understanding FDI in India",
    body: "A practical primer on entry routes, sectoral caps, and the filings involved in bringing foreign capital into an Indian business — and where advisory help matters most.",
  },
  {
    key: "choosing-loan",
    title: "Choosing the right loan",
    body: "Personal, home, business, or project finance: how to match your need to the right product, and what a lender actually evaluates before approval.",
  },
  {
    key: "organic-farming",
    title: "Organic farming, explained",
    body: "What bio-fertilizers do to soil health and yield, why chemical-free production matters, and how growers make the switch in practice.",
  },
  {
    key: "securing-operations",
    title: "Securing high-value operations",
    body: "From armed guards to commando units: how professional security assessment turns risk into a managed, measurable programme.",
  },
];
