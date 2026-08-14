

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
      "This Privacy Policy explains how Indexia Group and its group companies (together, \"Indexia Group\", \"we\", \"us\" or \"our\") collect, use, disclose and protect your personal information when you visit our websites, submit an enquiry, or use our services.",
      "By using our websites or providing your information to us, you agree to the practices described in this policy. If you do not agree, please do not provide your personal information or use our services.",
    ],
    sections: [
      {
        title: "Information We Collect",
        paragraphs: [
          "Information you provide: we collect the details you give us directly, such as your name, email address, phone number, company name, and the content of your enquiry or application.",
          "Information collected automatically: when you visit our websites, we may collect device and usage information such as your IP address, browser type, pages visited, and referring URLs, through cookies and similar technologies.",
        ],
      },
      {
        title: "How We Use Your Information",
        paragraphs: [
          "We use your information to respond to enquiries, assess and deliver our services, verify identity where required, improve our websites and services, comply with legal obligations, and — where you have consented — send you updates about our group companies.",
          "We rely on the following legal bases for processing: your consent, performance of a contract, compliance with a legal obligation, and our legitimate interest in operating and improving our business.",
        ],
      },
      {
        title: "Sharing and Disclosure",
        paragraphs: [
          "We may share your information within the Indexia Group so that the right company can respond to your enquiry. We may also share information with service providers who help us operate (such as hosting and communication providers), with regulators or authorities where required by law, and in connection with a merger, acquisition or sale of assets.",
          "We do not sell your personal information to third parties.",
        ],
      },
      {
        title: "Data Security",
        paragraphs: [
          "We apply reasonable technical and organisational measures — including access controls, encryption in transit, and monitoring — to protect your personal information against unauthorised access, loss, or misuse.",
          "No method of transmission or storage is completely secure. While we work to protect your data, we cannot guarantee its absolute security.",
        ],
      },
      {
        title: "Cookies and Similar Technologies",
        paragraphs: [
          "Our websites use essential cookies to function correctly and may use analytics cookies to understand how visitors use our sites. You can control or disable cookies through your browser settings; however, some parts of our websites may not work as intended without them.",
        ],
      },
      {
        title: "Data Retention",
        paragraphs: [
          "We keep your personal information only for as long as necessary to fulfil the purposes described in this policy, comply with legal and regulatory requirements, and resolve disputes.",
        ],
      },
      {
        title: "Your Rights and Choices",
        paragraphs: [
          "Depending on applicable law, you may have the right to access, correct, update, or request deletion of your personal information, and to withdraw consent where processing is based on consent.",
          "To exercise these rights, contact us using the details at the end of this policy. We will respond within the timeframes required by applicable law.",
        ],
      },
      {
        title: "Third-Party Links",
        paragraphs: [
          "Our websites and communications may contain links to external websites operated by our group companies or other third parties. This policy does not apply to those websites, and we encourage you to review their own privacy policies.",
        ],
      },
      {
        title: "Children's Privacy",
        paragraphs: [
          "Our services are not directed to children under the age of 18, and we do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us so we can remove it.",
        ],
      },
      {
        title: "Changes to This Policy",
        paragraphs: [
          "We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. Material changes will be highlighted where practical.",
        ],
      },
      {
        title: "Contact Us",
        paragraphs: [
          "If you have questions or concerns about this Privacy Policy or how we handle your personal information, please contact us at contactus@indexiagroup.com or by phone at +91 011 4629 1155.",
        ],
      },
    ],
  },
  termsOfUse: {
    id: "termsOfUse",
    lastUpdated: "August 14, 2026",
    intro: [
      "These Terms of Use (\"Terms of Use\") set out the rules for accessing and browsing the websites operated by Indexia Group and its group companies (together, \"Indexia Group\", \"we\", \"us\" or \"our\").",
      "Please read these Terms of Use carefully before using our websites. By accessing or browsing our websites, you agree to be bound by them. If you do not agree, please do not use our websites.",
    ],
    sections: [
      {
        title: "Acceptance of These Terms of Use",
        paragraphs: [
          "By accessing or browsing our websites, you confirm that you have read, understood, and agree to these Terms of Use. You must be at least 18 years of age to use our websites.",
          "These Terms of Use are separate from, and supplement, any specific terms & conditions that govern the services offered by individual Indexia Group companies.",
        ],
      },
      {
        title: "Access to the Website",
        paragraphs: [
          "We grant you a limited, revocable, non-exclusive right to access and browse our websites for personal, non-commercial purposes. We may restrict, suspend, or terminate access to all or part of our websites at any time, with or without notice.",
          "You are responsible for ensuring that your device and connection meet the requirements needed to access our websites, and for any costs you incur in doing so.",
        ],
      },
      {
        title: "Acceptable Use",
        paragraphs: [
          "You agree not to misuse our websites. This includes, without limitation: attempting to gain unauthorised access to our systems, introducing viruses or other malicious code, interfering with the operation of our websites, scraping or harvesting content at scale, and using our websites to commit or facilitate unlawful activity.",
          "You must not impersonate any person or entity, or misrepresent your affiliation with us or any of our group companies.",
        ],
      },
      {
        title: "User Submissions",
        paragraphs: [
          "When you submit an enquiry, feedback, or other content through our websites, you are responsible for the accuracy and lawfulness of that content. You grant us a non-exclusive, royalty-free licence to use, store, and process your submission solely for the purpose of responding to you and operating our websites.",
          "Do not submit confidential or sensitive information that you are not authorised to share.",
        ],
      },
      {
        title: "Intellectual Property",
        paragraphs: [
          "All content on our websites — including text, graphics, logos, images, and software — is the property of Indexia Group or its licensors and is protected by applicable intellectual property laws.",
          "You may view and print content for personal, non-commercial use only. Any other use, including reproduction or distribution, requires our prior written consent.",
        ],
      },
      {
        title: "Third-Party Links",
        paragraphs: [
          "Our websites may link to external websites operated by our group companies or other third parties. We are not responsible for the content, availability, or practices of those websites. Following such links is at your own risk and is subject to the terms and policies of the linked website.",
        ],
      },
      {
        title: "Disclaimer of Warranties",
        paragraphs: [
          "Our websites and their content are provided on an \"as is\" and \"as available\" basis, without warranties of any kind, whether express or implied, including implied warranties of merchantability, fitness for a particular purpose, and non-infringement.",
          "We do not warrant that our websites will be uninterrupted, secure, error-free, or free of viruses or other harmful components.",
        ],
      },
      {
        title: "Limitation of Liability",
        paragraphs: [
          "To the maximum extent permitted by law, Indexia Group and its group companies shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits, data, or goodwill, arising out of or in connection with your use of, or inability to use, our websites.",
          "Nothing in these Terms of Use limits or excludes liability that cannot be limited or excluded under applicable law.",
        ],
      },
      {
        title: "Termination",
        paragraphs: [
          "We may suspend or terminate your access to our websites if you breach these Terms of Use, or for any other reason at our discretion.",
          "On termination, the provisions of these Terms of Use that by their nature should survive — including disclaimers, limitations of liability, and governing law — will continue to apply.",
        ],
      },
      {
        title: "Governing Law and Jurisdiction",
        paragraphs: [
          "These Terms of Use are governed by the laws of India. Any dispute arising out of or in connection with these Terms of Use shall be subject to the exclusive jurisdiction of the courts of Mumbai, India.",
        ],
      },
      {
        title: "Changes to These Terms of Use",
        paragraphs: [
          "We may revise these Terms of Use at any time by updating this page. Your continued use of our websites after changes are posted constitutes acceptance of the revised Terms of Use.",
        ],
      },
      {
        title: "Contact Us",
        paragraphs: [
          "If you have any questions about these Terms of Use, please contact us at contactus@indexiagroup.com or by phone at +91 011 4629 1155.",
        ],
      },
    ],
  },
  terms: {
    id: "terms",
    lastUpdated: "August 14, 2026",
    intro: [
      "These Terms & Conditions (\"Terms\") govern your access to and use of the websites operated by Indexia Group and its group companies (together, \"Indexia Group\", \"we\", \"us\" or \"our\"), and the services described on them.",
      "Please read these Terms carefully before using our websites. By accessing or using our websites, you agree to be bound by these Terms. If you do not agree, please do not use our websites.",
    ],
    sections: [
      {
        title: "Acceptance of These Terms",
        paragraphs: [
          "By accessing our websites, submitting an enquiry, or otherwise using our services, you confirm that you have read, understood, and agree to these Terms. You must be at least 18 years of age to use our websites.",
        ],
      },
      {
        title: "Use of the Website",
        paragraphs: [
          "You agree to use our websites only for lawful purposes and in a way that does not infringe the rights of, or restrict or inhibit the use of our websites by, any third party.",
          "You must not misuse our websites by introducing malicious code, attempting unauthorised access, scraping content at scale, or interfering with their normal operation.",
        ],
      },
      {
        title: "Intellectual Property",
        paragraphs: [
          "All content on our websites — including text, graphics, logos, images, and software — is the property of Indexia Group or its licensors and is protected by applicable intellectual property laws.",
          "You may view and print content for personal, non-commercial use only. Any other use, including reproduction or distribution, requires our prior written consent.",
        ],
      },
      {
        title: "Services and Information",
        paragraphs: [
          "Information on our websites is provided for general information and does not constitute financial, legal, or investment advice. Applications for loans, credit, or other financial products are subject to eligibility checks and approval by the relevant Indexia Group company.",
          "We may change, suspend, or withdraw any service described on our websites at any time without notice.",
        ],
      },
      {
        title: "Enquiries and Communications",
        paragraphs: [
          "When you submit an enquiry, you agree to provide accurate and complete information and to keep it up to date. By submitting an enquiry, you consent to being contacted by the relevant Indexia Group company by phone, email, or other means in connection with your enquiry.",
          "You are responsible for the accuracy of the information you provide, and for any consequences arising from information that is false or incomplete.",
        ],
      },
      {
        title: "Third-Party Websites",
        paragraphs: [
          "Our websites may link to external websites operated by our group companies or other third parties. We are not responsible for the content, availability, or practices of those websites, and your use of them is subject to their own terms and policies.",
        ],
      },
      {
        title: "Disclaimers",
        paragraphs: [
          "Our websites and their content are provided on an \"as is\" and \"as available\" basis, without warranties of any kind, whether express or implied, including implied warranties of merchantability, fitness for a particular purpose, and non-infringement.",
          "We do not warrant that our websites will be uninterrupted, secure, or error-free.",
        ],
      },
      {
        title: "Limitation of Liability",
        paragraphs: [
          "To the maximum extent permitted by law, Indexia Group shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or data, arising out of or in connection with your use of our websites.",
          "Nothing in these Terms limits or excludes liability that cannot be limited or excluded under applicable law.",
        ],
      },
      {
        title: "Indemnification",
        paragraphs: [
          "You agree to indemnify and hold harmless Indexia Group and its group companies, officers, and employees from and against any claims, losses, liabilities, and expenses arising out of your breach of these Terms or your misuse of our websites.",
        ],
      },
      {
        title: "Governing Law and Jurisdiction",
        paragraphs: [
          "These Terms are governed by the laws of India. Any dispute arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of Mumbai, India.",
        ],
      },
      {
        title: "Changes to These Terms",
        paragraphs: [
          "We may revise these Terms at any time by updating this page. Your continued use of our websites after changes are posted constitutes acceptance of the revised Terms.",
        ],
      },
      {
        title: "Contact Us",
        paragraphs: [
          "If you have any questions about these Terms, please contact us at contactus@indexiagroup.com or by phone at +91 011 4629 1155.",
        ],
      },
    ],
  },
};
