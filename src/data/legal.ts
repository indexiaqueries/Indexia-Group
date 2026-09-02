export type LegalDocumentId = "privacy" | "terms" | "termsOfUse";

export type LegalSection = {
  title: string;
  paragraphs: string[];
};

type LegalDocument = {
  id: LegalDocumentId;
  lastUpdated: string;
  intro: string[];
  sections: LegalSection[];
};

export const legalDocuments: Record<LegalDocumentId, LegalDocument> = {
  privacy: {
    id: "privacy",
    lastUpdated: "August 14, 2026",
    intro: [
      "This Privacy Policy explains how Indexia Group and its group companies (\"Indexia Group\", \"we\", \"us\" or \"our\") collect, use, disclose and protect your personal information when you visit our websites, submit an enquiry, or use our services.",
      "By using our websites or providing your information to us, you agree to the practices described in this policy.",
    ],
    sections: [
      {
        title: "Information We Collect",
        paragraphs: [
          "We collect information you provide directly (name, email, phone, company, enquiry details) and information collected automatically through cookies (IP address, browser type, pages visited, referring URLs).",
        ],
      },
      {
        title: "How We Use Your Information",
        paragraphs: [
          "We use your information to respond to enquiries, deliver services, verify identity, improve our websites, comply with legal obligations, and — with your consent — send updates about our group companies. We rely on consent, contract performance, legal compliance, and legitimate business interest as our legal bases for processing.",
        ],
      },
      {
        title: "Sharing and Disclosure",
        paragraphs: [
          "We may share your information within the Indexia Group, with service providers who help us operate, with regulators where required by law, and in connection with a merger or sale of assets. We do not sell your personal information to third parties.",
        ],
      },
      {
        title: "Data Security & Retention",
        paragraphs: [
          "We apply reasonable technical and organisational measures — including access controls, encryption, and monitoring — to protect your data. No method of transmission is completely secure. We retain your information only as long as necessary to fulfil the purposes described here, comply with legal requirements, and resolve disputes.",
        ],
      },
      {
        title: "Cookies",
        paragraphs: [
          "Our websites use essential cookies to function and analytics cookies to understand usage. You can control cookies through your browser settings, though some features may not work without them.",
        ],
      },
      {
        title: "Your Rights",
        paragraphs: [
          "Depending on applicable law, you may have the right to access, correct, update, or delete your personal information and to withdraw consent. To exercise these rights, contact us using the details below.",
        ],
      },
      {
        title: "Children's Privacy",
        paragraphs: [
          "Our services are not directed to children under 18. We do not knowingly collect information from children. If you believe a child has provided us with information, please contact us so we can remove it.",
        ],
      },
      {
        title: "Changes to This Policy",
        paragraphs: [
          "We may update this policy from time to time. Changes will be posted on this page with an updated revision date.",
        ],
      },
      {
        title: "Contact Us",
        paragraphs: [
          "Questions about this policy? Contact us at contactus@indexiagroup.com or call +91 011 4629 1155.",
        ],
      },
    ],
  },
  termsOfUse: {
    id: "termsOfUse",
    lastUpdated: "August 14, 2026",
    intro: [],
    sections: [
      {
        title: "Cancellation Policy",
        paragraphs: [
          "Cancellations are considered only if requested within 72 hours of payment and before the payment has been processed by the vendor. No cancellations are accepted for same-day services, special occasion offers, or perishable services. Complaints about services must be reported within 24 hours of receipt; issues with third-party services must be reported within 21 days.",
        ],
      },
      {
        title: "Refund Policy",
        paragraphs: [
          "Refund requests must be submitted within 90 days of payment with your payment details and order number. Refunds are not provided for services delivered in full (e.g. installation, hosting). Refunds are processed within 21 business days.",
        ],
      },
      {
        title: "Disclaimer",
        paragraphs: [
          "The information on this website is provided for general purposes only. We make no representations or warranties about completeness, accuracy, reliability, or suitability of the content. Any reliance on this information is at your own risk.",
          "We are not liable for any loss or damage arising from use of this website, including indirect or consequential losses. Links to external websites are provided for convenience; we have no control over or responsibility for their content. We do not guarantee uninterrupted website availability.",
        ],
      },
    ],
  },
  terms: {
    id: "terms",
    lastUpdated: "August 14, 2026",
    intro: [
      "Welcome to the Indexia Group website. By browsing and using this website, you agree to comply with these terms and conditions, which together with our privacy policy govern Indexia Group's relationship with you.",
      "\"Indexia Group\" refers to the website owner, registered at 2A, 1402, New Mhada Complex, Near Lokhandwala Circle, Andheri West, Mumbai-400053.",
    ],
    sections: [
      {
        title: "Content and Changes",
        paragraphs: [
          "Website content is for general information and is subject to change without notice.",
        ],
      },
      {
        title: "No Warranty",
        paragraphs: [
          "We provide no warranty regarding the accuracy, timeliness, performance, or suitability of information on this website. You acknowledge that content may contain inaccuracies, and we exclude liability for such errors to the fullest extent permitted by law.",
        ],
      },
      {
        title: "Use at Your Own Risk",
        paragraphs: [
          "Your use of any information or materials on this website is entirely at your own risk. It is your responsibility to ensure that any products, services, or information available through this website meet your specific requirements.",
        ],
      },
      {
        title: "Intellectual Property",
        paragraphs: [
          "This website contains material owned by or licensed to us, including design, layout, appearance, and graphics. Reproduction is prohibited except in accordance with the copyright notice.",
        ],
      },
      {
        title: "Unauthorised Use and Links",
        paragraphs: [
          "Unauthorised use of this website may give rise to a claim for damages and/or be a criminal offence. Third-party links are provided for convenience and do not imply endorsement. You may not create a link to this website without our prior written consent.",
        ],
      },
      {
        title: "Governing Law",
        paragraphs: [
          "Your use of this website and any disputes arising from it are subject to the laws of India.",
        ],
      },
    ],
  },
};
