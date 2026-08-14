

type JobRole = {
  key: string;
  title: string;
  department: string;
  company: string;
  location: string;
  type: string;
  experience: string;
};

export const jobRoles: JobRole[] = [
  {
    key: "relationship-manager",
    title: "Relationship Manager — Loans",
    department: "Finance",
    company: "Indexia Finserve Pvt. Ltd.",
    location: "Mumbai",
    type: "Full-time",
    experience: "2–5 yrs",
  },
  {
    key: "export-operations",
    title: "Export Operations Executive",
    department: "Trade",
    company: "Indexia Overseas Pvt. Ltd.",
    location: "Surat",
    type: "Full-time",
    experience: "3–6 yrs",
  },
  {
    key: "production-supervisor",
    title: "Production Supervisor",
    department: "Agriculture",
    company: "Indexia Agro Bio Fertilizers Pvt. Ltd.",
    location: "Shamli, UP",
    type: "Full-time",
    experience: "2–4 yrs",
  },
  {
    key: "armed-security",
    title: "Armed Security Officer",
    department: "Security",
    company: "Indexia Securities",
    location: "Delhi NCR",
    type: "Full-time",
    experience: "3+ yrs",
  },
  {
    key: "warehouse-ops",
    title: "Warehouse Operations Manager",
    department: "Logistics",
    company: "Indexia Warehouse",
    location: "Delhi NCR",
    type: "Full-time",
    experience: "5+ yrs",
  },
  {
    key: "media-sales",
    title: "Media Sales Executive",
    department: "Advertising",
    company: "Indexia Advertising",
    location: "Delhi NCR",
    type: "Full-time",
    experience: "1–3 yrs",
  },
  {
    key: "finance-analyst",
    title: "Finance Analyst",
    department: "Finance",
    company: "Indexia Finance",
    location: "Mumbai",
    type: "Full-time",
    experience: "2–4 yrs",
  },
  {
    key: "sports-nutritionist",
    title: "Sports Nutritionist",
    department: "Sports",
    company: "Indexia Foundation",
    location: "Delhi",
    type: "Full-time",
    experience: "3+ yrs",
  },
];

type CareerValue = {
  key: string;
  title: string;
  body: string;
};

export const careerValues: CareerValue[] = [
  {
    key: "grow",
    title: "Grow across industries",
    body: "Eight businesses under one group — finance, trade, agriculture, security, logistics, media, and sport — mean real room to move and learn.",
  },
  {
    key: "trust",
    title: "Trust as the default",
    body: "We build on integrity and long relationships: with clients, partners, and the people who work with us.",
  },
  {
    key: "own",
    title: "Own your work",
    body: "Small teams, clear ownership, and decisions that actually matter. Your work has a visible impact.",
  },
  {
    key: "support",
    title: "Support to perform",
    body: "Fair compensation, structured growth, and the tools you need to do the job properly.",
  },
];

type ProcessStep = {
  key: string;
  title: string;
  body: string;
};

export const processSteps: ProcessStep[] = [
  {
    key: "apply",
    title: "Send your application",
    body: "Apply through the enquiry form with your role of interest, or email your CV to careers@indexiagroup.com.",
  },
  {
    key: "contact",
    title: "We get in touch",
    body: "The relevant group company reviews your profile and reaches out within a few working days.",
  },
  {
    key: "interview",
    title: "Interview with the team",
    body: "A focused conversation — sometimes two — with the people you'd actually work with.",
  },
  {
    key: "offer",
    title: "Offer and onboarding",
    body: "A clear offer, a smooth handover, and a first week that sets you up to contribute quickly.",
  },
];
