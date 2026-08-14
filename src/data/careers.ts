/**
 * Careers content — open roles, why-work-with-us values, and the hiring process.
 * Structured English data (like `companies.ts`); page chrome is translated.
 */

export type JobRole = {
  title: string;
  department: string;
  company: string;
  location: string;
  type: string;
  experience: string;
};

export const jobRoles: JobRole[] = [
  {
    title: "Relationship Manager — Loans",
    department: "Finance",
    company: "Indexia Finserve Pvt. Ltd.",
    location: "Mumbai",
    type: "Full-time",
    experience: "2–5 yrs",
  },
  {
    title: "Export Operations Executive",
    department: "Trade",
    company: "Indexia Overseas Pvt. Ltd.",
    location: "Surat",
    type: "Full-time",
    experience: "3–6 yrs",
  },
  {
    title: "Production Supervisor",
    department: "Agriculture",
    company: "Indexia Agro Bio Fertilizers Pvt. Ltd.",
    location: "Shamli, UP",
    type: "Full-time",
    experience: "2–4 yrs",
  },
  {
    title: "Armed Security Officer",
    department: "Security",
    company: "Indexia Securities",
    location: "Delhi NCR",
    type: "Full-time",
    experience: "3+ yrs",
  },
  {
    title: "Warehouse Operations Manager",
    department: "Logistics",
    company: "Indexia Warehouse",
    location: "Delhi NCR",
    type: "Full-time",
    experience: "5+ yrs",
  },
  {
    title: "Media Sales Executive",
    department: "Advertising",
    company: "Indexia Advertising",
    location: "Delhi NCR",
    type: "Full-time",
    experience: "1–3 yrs",
  },
  {
    title: "Finance Analyst",
    department: "Finance",
    company: "Indexia Finance",
    location: "Mumbai",
    type: "Full-time",
    experience: "2–4 yrs",
  },
  {
    title: "Sports Nutritionist",
    department: "Sports",
    company: "Indexia Foundation",
    location: "Delhi",
    type: "Full-time",
    experience: "3+ yrs",
  },
];

export type CareerValue = {
  title: string;
  body: string;
};

export const careerValues: CareerValue[] = [
  {
    title: "Grow across industries",
    body: "Eight businesses under one group — finance, trade, agriculture, security, logistics, media, and sport — mean real room to move and learn.",
  },
  {
    title: "Trust as the default",
    body: "We build on integrity and long relationships: with clients, partners, and the people who work with us.",
  },
  {
    title: "Own your work",
    body: "Small teams, clear ownership, and decisions that actually matter. Your work has a visible impact.",
  },
  {
    title: "Support to perform",
    body: "Fair compensation, structured growth, and the tools you need to do the job properly.",
  },
];

export type ProcessStep = {
  title: string;
  body: string;
};

export const processSteps: ProcessStep[] = [
  {
    title: "Send your application",
    body: "Apply through the enquiry form with your role of interest, or email your CV to careers@indexiagroup.com.",
  },
  {
    title: "We get in touch",
    body: "The relevant group company reviews your profile and reaches out within a few working days.",
  },
  {
    title: "Interview with the team",
    body: "A focused conversation — sometimes two — with the people you'd actually work with.",
  },
  {
    title: "Offer and onboarding",
    body: "A clear offer, a smooth handover, and a first week that sets you up to contribute quickly.",
  },
];
