type SecurityTip = {
  key: string;
  title: string;
  body: string;
};

// What Indexia does to keep customers safe online.
export const securityFeatures: SecurityTip[] = [
  {
    key: "tech",
    title: "Strong Technologies",
    body: "Our banking systems are managed by skilled experts and protected by the best security technology available. Manage your money online with confidence and security.",
  },
  {
    key: "monitor",
    title: "Secure Systems",
    body: "Indexia Finance constantly monitors all threats and online activities round the clock to detect fraud early and take preventive measures to ensure your accounts are safe.",
  },
];

// Simple things you can do on your everyday devices.
export const securityPractices: SecurityTip[] = [
  {
    key: "devices",
    title: "Protect Your Devices",
    body: "Ensure all your computers, mobile phones, portable devices, operating systems and Internet browsers, especially those used for online banking, are regularly updated with the latest software.",
  },
  {
    key: "connections",
    title: "Secure Your Connections",
    body: "A well-designed and managed network keeps traffic and transactions free from intrusion.",
  },
  {
    key: "data",
    title: "Secure Your Data",
    body: "Operating systems and web browsers do a good job of keeping your information secure and private, but you may want to consider adding additional layers of security to your computer.",
  },
];

// What to do if something goes wrong.
export const securityContacts: SecurityTip[] = [
  {
    key: "control",
    title: "Control Your Online Security",
    body: "We will never request your account information or password over the phone, via email or SMS. Contact us if you have accidentally disclosed your account details or been subject to fraud.",
  },
  {
    key: "report",
    title: "Contact Us",
    body: "If you suspect any unauthorized access or transactions, call our Customer Service Hotline to immediately terminate your online banking access and any other access channels to your accounts, such as ATM cards.",
  },
];
