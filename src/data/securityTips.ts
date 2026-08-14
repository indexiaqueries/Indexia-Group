

export type SecurityCategory = {
  key: string;
  title: string;
  body: string;
};

export const securityCategories: SecurityCategory[] = [
  {
    key: "phishing",
    title: "Phishing & Fake Messages",
    body: "Banks and lenders never ask for OTPs or passwords by message. Treat unexpected links and 'urgent' requests with suspicion.",
  },
  {
    key: "loan-scams",
    title: "Loan & Advance-Fee Scams",
    body: "A legitimate lender never asks for an upfront fee to release a loan. Verify the company and its credentials before paying anything.",
  },
  {
    key: "card",
    title: "Card & Payment Safety",
    body: "Share card details only on secure checkout pages. Watch for skimming devices at ATMs and always cover your PIN.",
  },
  {
    key: "identity",
    title: "Identity Protection",
    body: "Guard your PAN, Aadhaar, and bank documents. Report lost IDs immediately and never upload them to unofficial sites.",
  },
  {
    key: "social-engineering",
    title: "Social Engineering",
    body: "Fraudsters pose as executives, agents, or officials to extract money or data. Verify identity through a known, official channel.",
  },
  {
    key: "physical",
    title: "Physical & Site Security",
    body: "Protect premises, inventory, and people with controlled access, CCTV, and trained security personnel — the standard our own businesses follow.",
  },
];

export type SecurityPractice = {
  key: string;
  title: string;
  body: string;
};

export const securityPractices: SecurityPractice[] = [
  {
    key: "otp",
    title: "Never share your OTP",
    body: "One-time passwords exist to protect you — no bank, lender, or employee will ever ask for yours.",
  },
  {
    key: "verify",
    title: "Verify before you pay",
    body: "Confirm the company, its licence, and the receiving account before making any payment or advance.",
  },
  {
    key: "passwords",
    title: "Use strong, unique passwords",
    body: "A different password for every account, plus two-factor authentication wherever it is offered.",
  },
  {
    key: "links",
    title: "Check links and senders",
    body: "Hover before you click. Official communications come from official domains — never lookalikes.",
  },
  {
    key: "updates",
    title: "Keep devices updated",
    body: "Install security updates and use reputable antivirus on every device that touches your money or data.",
  },
  {
    key: "report",
    title: "Report suspicious activity",
    body: "If something feels wrong, stop and contact the official helpline — never the number in the suspicious message.",
  },
];
