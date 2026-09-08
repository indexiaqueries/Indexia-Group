import { contactEmails } from "./contact";

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
    lastUpdated: "September 8, 2026",
    intro: [
      "This Privacy Policy explains how Indexia Group and its group companies (together, \"Indexia Group\", \"we\", \"us\" or \"our\") collect, use, disclose and protect personal information when you visit our websites, submit an enquiry or job application, or otherwise interact with us.",
      "By using our websites or providing your information to us, you agree to the practices described in this policy. If you do not agree, please do not submit your personal information or use our services.",
    ],
    sections: [
      {
        title: "Information We Collect",
        paragraphs: [
          "Information you provide: when you use the enquiry form on our Contact page, we collect the details you enter, typically your name, phone number, email address, subject and message. When you apply for a job through the Apply page, we collect your name, email address, phone number, years of experience, your resume or CV file, and the introduction you provide. We also collect any other information you choose to send us by email, phone or post.",
          "Information collected automatically: we do not use tracking cookies, analytics or advertising pixels on this website. Our hosting provider may record standard server logs (such as your IP address and browser type) to operate, secure and troubleshoot the site. Your browser stores the language you select on this device (local storage) so the site can remember it on your next visit.",
        ],
      },
      {
        title: "How We Use Your Information",
        paragraphs: [
          "We use the information you provide to respond to your enquiry and route it to the relevant Indexia Group company, to evaluate job applications, to improve our websites and services, to comply with legal obligations and, only where you have consented, to send you updates about our group companies.",
          "Enquiries and job applications submitted through our forms are stored in our database and are reviewed by our team through a password-protected admin area.",
        ],
      },
      {
        title: "Sharing and Disclosure",
        paragraphs: [
          "We may share your information within the Indexia Group so that the right company can respond to your enquiry or application. We may also share information with service providers who help us operate, such as hosting and communication providers. We may disclose information to regulators, courts or authorities where required by law, and in connection with a merger, acquisition or sale of assets.",
          "We do not sell your personal information to third parties.",
        ],
      },
      {
        title: "Data Security",
        paragraphs: [
          "We apply reasonable technical and organisational measures, including HTTPS encryption in transit, access controls on our admin systems and monitoring, to protect your personal information against unauthorised access, loss or misuse.",
          "No method of transmission or storage is completely secure. While we work to protect your data, we cannot guarantee its absolute security.",
        ],
      },
      {
        title: "Cookies and Local Storage",
        paragraphs: [
          "This website does not use tracking cookies, analytics or advertising technologies. We use your browser's local storage only to remember your language preference; you can clear it at any time through your browser settings.",
          "The site loads fonts from Google Fonts. When a font is fetched, your browser connects to Google's servers and Google may process your IP address in accordance with its own privacy policy.",
        ],
      },
      {
        title: "Data Retention",
        paragraphs: [
          "We keep enquiry records for as long as needed to respond to you and for a reasonable period afterwards for record-keeping purposes. Job applications are retained for the duration of the recruitment process and for a reasonable period afterwards, unless a longer retention is required by law.",
        ],
      },
      {
        title: "Your Rights and Choices",
        paragraphs: [
          "Depending on applicable law, you may have the right to access, correct, update or request deletion of your personal information, and to withdraw consent where processing is based on consent.",
          "To exercise these rights, contact us using the details at the end of this policy. We will respond within the timeframes required by applicable law.",
        ],
      },
      {
        title: "Third-Party Links",
        paragraphs: [
          "Our websites and communications may contain links to external websites, including websites of our group companies (such as company portals) and social media pages. This policy does not apply to those websites, and we encourage you to review their own privacy policies.",
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
          `If you have questions or concerns about this Privacy Policy or how we handle your personal information, please contact us at ${contactEmails.generalEnquiries} or by phone at +91 11 4629 1155.`,
        ],
      },
    ],
  },
  termsOfUse: {
    id: "termsOfUse",
    lastUpdated: "September 8, 2026",
    intro: [
      "These Terms of Use (\"Terms\") govern your use of the Indexia Group website and the pages of its group companies. By accessing or using this website, you agree to be bound by these Terms and by our Privacy Policy. If you do not agree, please do not use the website.",
      "Indexia Group is a diversified Indian business group whose companies provide financial services, securities, global export, agro bio fertilizers, warehousing, advertising and related services. This website is an informational platform for the group and its companies.",
    ],
    sections: [
      {
        title: "Use of This Website",
        paragraphs: [
          "This website is provided for general information about Indexia Group and its group companies, their services, news, research and career opportunities. You agree to use the website only for lawful purposes and in a way that does not interfere with its normal operation or the rights of other users.",
        ],
      },
      {
        title: "No Financial, Investment or Legal Advice",
        paragraphs: [
          "Content on this website, including descriptions of financial services, loans, securities, export and other offerings, is provided for general information only. It does not constitute financial, investment, tax or legal advice, and it is not an offer or solicitation to buy or sell any product or service. You should contact the relevant Indexia Group company directly and obtain professional advice before acting on anything you read here.",
        ],
      },
      {
        title: "Enquiries and Job Applications",
        paragraphs: [
          "When you submit an enquiry or a job application through this website, we may route your information to the Indexia Group company best placed to respond. Submitting an enquiry does not create any obligation on our part. You are responsible for the accuracy of the information you provide and confirm that you are authorised to submit it. Job applications are evaluated at our discretion.",
        ],
      },
      {
        title: "No Online Transactions",
        paragraphs: [
          "This website does not process payments or conclude any contracts online. Any products or services provided by an Indexia Group company are governed by that company's own agreements and terms and conditions, which you should read carefully before engaging. Nothing on this website constitutes a contract between you and Indexia Group.",
        ],
      },
      {
        title: "Intellectual Property",
        paragraphs: [
          "The content of this website, including text, design, layout, graphics, logos and images, is owned by or licensed to Indexia Group and is protected by applicable intellectual property laws. You may view and print content for personal, non-commercial use. Reproduction, distribution or commercial use without our prior written consent is prohibited.",
        ],
      },
      {
        title: "Third-Party Links",
        paragraphs: [
          "This website may contain links to external websites, including the websites of our group companies, social media pages and other resources. We do not control those websites and are not responsible for their content or availability. A link does not imply endorsement.",
        ],
      },
      {
        title: "Disclaimer of Warranties",
        paragraphs: [
          "This website and its content are provided \"as is\" and \"as available\". While we endeavour to keep the information accurate and up to date, we make no representations or warranties of any kind, express or implied, about its completeness, accuracy, reliability or suitability for any purpose.",
        ],
      },
      {
        title: "Limitation of Liability",
        paragraphs: [
          "To the fullest extent permitted by law, Indexia Group and its group companies shall not be liable for any direct, indirect, incidental, consequential or special loss or damage arising out of or in connection with your use of, or inability to use, this website, including loss of data or profits, even if advised of the possibility of such damages.",
        ],
      },
      {
        title: "Governing Law",
        paragraphs: [
          "These Terms are governed by the laws of India. Any dispute arising out of or in connection with your use of this website is subject to the exclusive jurisdiction of the courts of Mumbai.",
        ],
      },
      {
        title: "Contact Us",
        paragraphs: [
          `If you have questions about these Terms of Use, please contact us at ${contactEmails.generalEnquiries} or by phone at +91 11 4629 1155.`,
        ],
      },
    ],
  },
  terms: {
    id: "terms",
    lastUpdated: "September 8, 2026",
    intro: [
      "The Website Owner, including subsidiaries and affiliates, Indexia Group (or \"we\", \"us\" or \"our\"), provides the information contained on this website, or on any of the pages comprising this website, to visitors and applicants (cumulatively referred to as \"you\" or \"your\") subject to the terms and conditions set out in these website terms and conditions, the privacy policy, and any other relevant terms and conditions, policies and notices which may be applicable to a specific section or module of the website.",
      "Welcome to our website. If you continue to browse and use this website, you are agreeing to comply with and be bound by the following terms and conditions of use, which together with our privacy policy govern Indexia Group's relationship with you in relation to this website.",
      "The term \"Indexia Group\" or \"we\" or \"us\" refers to the owner of the website, whose registered office is at 2A, 1402, New Mhada Complex, Near Lokhandwala Circle, Andheri West, Mumbai – 400053. The term \"you\" refers to the user or viewer of our website.",
    ],
    sections: [
      {
        title: "Content and Changes",
        paragraphs: [
          "The content of the pages of this website is for your general information and use only. It is subject to change without notice.",
        ],
      },
      {
        title: "No Warranty",
        paragraphs: [
          "Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials found or offered on this website for any particular purpose. You acknowledge that such information and materials may contain inaccuracies or errors, and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.",
        ],
      },
      {
        title: "Use at Your Own Risk",
        paragraphs: [
          "Your use of any information or materials on this website is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services or information available through this website meet your specific requirements.",
        ],
      },
      {
        title: "Intellectual Property",
        paragraphs: [
          "This website contains material which is owned by or licensed to us. This material includes, but is not limited to, the design, layout, look, appearance and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.",
        ],
      },
      {
        title: "Trade Marks",
        paragraphs: [
          "All trade marks reproduced in this website which are not the property of, or licensed to, the operator are acknowledged on the website.",
        ],
      },
      {
        title: "Unauthorised Use",
        paragraphs: [
          "Unauthorised use of this website may give rise to a claim for damages and/or be a criminal offence.",
        ],
      },
      {
        title: "Third-Party Links",
        paragraphs: [
          "From time to time, this website may also include links to other websites. These links are provided for your convenience to provide further information. They do not signify that we endorse the website(s). We have no responsibility for the content of the linked website(s).",
        ],
      },
      {
        title: "Linking to This Website",
        paragraphs: [
          "You may not create a link to this website from another website or document without Indexia Group's prior written consent.",
        ],
      },
      {
        title: "Governing Law",
        paragraphs: [
          "Your use of this website and any dispute arising out of such use of the website is subject to the laws of India or other regulatory authority.",
        ],
      },
      {
        title: "Financial Services Disclaimer",
        paragraphs: [
          "Indexia Group companies provide financial services, loans, securities, export, warehousing, agro and related services. Information about these services on this website is provided for general informational purposes only. It does not constitute an offer, solicitation, or financial, investment or legal advice, and no liability is accepted for decisions made on the basis of this content. Any products or services you obtain from a group company are subject to that company's own terms and conditions.",
        ],
      },
    ],
  },
};