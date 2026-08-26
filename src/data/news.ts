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
    key: "understanding-fdi",
    title: "Understanding FDI in India",
    body: "A practical primer on entry routes, sectoral caps, and the filings involved in bringing foreign capital into an Indian business, and where expert guidance matters most.",
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
