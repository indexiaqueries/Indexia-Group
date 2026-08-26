

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
          "We use your information to respond to enquiries, assess and deliver our services, verify identity where required, improve our websites and services, comply with legal obligations, and, where you have consented, send you updates about our group companies.",
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
          "We apply reasonable technical and organisational measures, including access controls, encryption in transit, and monitoring, to protect your personal information against unauthorised access, loss, or misuse.",
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
    intro: [],
    sections: [
      {
        title: "Cancellation & Refund Policy",
        paragraphs: [
          "Merchant businesses' return and cancellation policy must be made available to customers on the website, and they have to agree to its terms during the payment process. Customers have to click on an \"Accept\" or \"Agree\" for return and cancellation button before submitting their payment information. Once the payment has been made, the policy can be sent to customers with the payment confirmation email.",
        ],
      },
      {
        title: "Cancellation Policy",
        paragraphs: [
          "Indexia Group believes in helping its customers as far as possible, and has therefore a liberal cancellation policy. Under this policy:",
          "Cancellations will be considered only if the request is made within 72 hours of the payment. However, the cancellation request will not be entertained if the payment details have been communicated to the vendors/merchants and they have initiated the process of payment.",
          "There is no cancellation of payment made under the Same Day service category.",
          "No cancellations are entertained for payments that Indexia Group has obtained on special occasions like Pongal, Diwali, and Valentine's Day, etc. These are limited occasion offers and therefore cancellations are not possible.",
          "Indexia Group does not accept cancellation requests for perishable services. Even a refund cannot be made if the customer establishes that the quality of service is not good.",
          "In case the services and related information are not related to you, please report the same to our support team. The request will, however, be entertained once the merchant has checked and determined the same at his own end. This should be reported within 21 days of receipt of the services.",
          "In case you feel that the service offered is not as shown on the site or as per your expectations, you must bring it to the notice of our support service within 24 hours of receiving the service. The Support Service Team, after looking into your complaint, will take an appropriate decision.",
          "In case of complaints regarding services that come with a specified time frame, please refer to us at contactus@indexiagroup.com.",
        ],
      },
      {
        title: "Refund Policy",
        paragraphs: [
          "When you enjoy our services, your payment is not covered by a money-back guarantee. If you are, for any reason, not entirely happy with our service, we will take this issue very seriously and will try to resolve it as soon as possible. To request a refund, simply contact us with your payment details within ninety (90) days of your payment. Please include your payment details and order number (sent to you via email after payment) and optionally tell us why you're requesting a refund, we take customer feedback very seriously and use it to constantly improve our products and quality of service. Refunds are not provided for services delivered in full, such as installation services and knowledge base hosting services. Refunds are processed within a 21-day period.",
        ],
      },
      {
        title: "BO Clause",
        paragraphs: [
          "We, as a service provider, shall be under no liability whatsoever in respect of any loss or damage arising directly or indirectly out of the decline of authorisation for any transaction, on account of the cardholder having exceeded the preset limit mutually agreed by us with our acquiring bank from time to time.",
        ],
      },
      {
        title: "Disclaimer Policy",
        paragraphs: [
          "A disclaimer may specify mutually-agreed and privately-arranged terms and conditions as part of a contract; or may specify warnings or expectations to the general public (or some other class of persons) in order to fulfil a duty of care owed to prevent unreasonable risk of harm or injury. Some disclaimers are intended to limit exposure to damages after harm or injury has already been suffered. Additionally, some kinds of disclaimers may represent a voluntary waiver of a right or obligation that may be owed to the disclaiming party.",
          "Disclaimers vary in terms of their uniformity. Some may vary depending on the specific context and parties involved, while other types of disclaimers may strictly adhere to a uniform and established set of formalities that are rarely or never modified, except under official authority.",
          "The website disclaimer covers the following: no warranties, limitations of liability, exceptions, reasonableness, other parties, and unenforceable provisions.",
        ],
      },
      {
        title: "This Website Disclaimer",
        paragraphs: [
          "The information contained in this website is for general information purposes only. The information is provided by Indexia Group and, while we endeavour to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose. Any reliance you place on such information is therefore strictly at your own risk.",
          "In no event will we be liable for any loss or damage including, without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this website.",
          "Through this website you are able to link to other websites which are not under the control of Indexia Group. We have no control over the nature, content and availability of those sites. The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them.",
          "Every effort is made to keep the website up and running smoothly. However, Indexia Group takes no responsibility for, and will not be liable for, the website being temporarily unavailable due to technical issues beyond our control.",
        ],
      },
    ],
  },
  terms: {
    id: "terms",
    lastUpdated: "August 14, 2026",
    intro: [
      "The Website Owner, including subsidiaries and affiliates, Indexia Group (or \"we\", \"us\" or \"our\"), provides the information contained on this website, or on any of the pages comprising this website, to visitors and applicants (cumulatively referred to as \"you\" or \"your\") subject to the terms and conditions set out in these website terms and conditions, the privacy policy, and any other relevant terms and conditions, policies and notices which may be applicable to a specific section or module of the website.",
      "Welcome to our website. If you continue to browse and use this website, you are agreeing to comply with and be bound by the following terms and conditions of use, which together with our privacy policy govern Indexia Group's relationship with you in relation to this website.",
      "The term \"Indexia Group\" or \"we\" or \"us\" refers to the owner of the website, whose registered office is at 2A, 1402, New Mhada Complex, Near Lokhandwala Circle, Andheri West, Mumbai-400053. The term \"you\" refers to the user or viewer of our website.",
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
        title: "Card Transaction Liability",
        paragraphs: [
          "\"We, as a service provider, shall be under no liability whatsoever in respect of any loss or damage arising directly or indirectly out of the decline of authorization for any transaction, on account of the cardholder having exceeded the preset limit mutually agreed by us with our acquiring bank from time to time\".",
        ],
      },
    ],
  },
};
