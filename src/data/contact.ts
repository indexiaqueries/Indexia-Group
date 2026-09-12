type PhoneLink = {
  label: string;
  labelKey?: string;
  number: string;
  href: string;
  /** Render the number in the site's mono font instead of the normal UI font. */
  mono?: boolean;
};

type Branch = {
  key: string;
  name: string;
  addressKey: string;
  phones: PhoneLink[];
};

export type ContactFormData = {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
};

export const initialContactForm: ContactFormData = {
  name: "",
  phone: "",
  email: "",
  subject: "",
  message: "",
};

/**
 * Every public contact email used across the site, in one place.
 * Reference these instead of hardcoding addresses in components.
 */
export const contactEmails = {
  /** General enquiries — footer, contact page and legal documents. */
  generalEnquiries: "contactus@indexiagroup.com",
  /** Business queries shown on company pages and the contact page. */
  queries: "indexia.queries@gmail.com",
  /** Direct line to Vini Malik (contact page, warehouse enquiry block). */
  viniMalik: "Vini.Malik5@gmail.com",
  /** Warehouse project contact (warehouse page enquiry block). */
  bijendraMalik: "bijendra.malik@indexiafinance.com",
  /** Recruitment — primary address (careers page and apply success screen). */
  hr: "hr@indexiafinance.com",
  /** Recruitment — alternate address (careers page and apply success screen). */
  hrAlternate: "hr.indexia@gmail.com",
} as const;

export const phoneNumbers: PhoneLink[] = [
  { label: "Landline", labelKey: "landline", number: "+91 11 4629 1155", href: "tel:+911146291155", mono: true },
  { label: "Mobile", labelKey: "mobile", number: "+91 8928 786 594", href: "tel:+918928786594" },
  { label: "Mobile", labelKey: "mobile", number: "+91 86551 68551", href: "tel:+918655168551", mono: true },
];

/**
 * Booking line shown in the enquiry section of the company pages.
 * Display form keeps digit groups readable; `href` is the callable form.
 */
export const bookingPhone = {
  display: "+91 73 86551 8928",
  href: "+9173865518928",
};

export const branches: Branch[] = [
  {
    key: "corporateOffice",
    name: "Corporate Office",
    addressKey: "addresses.corporateOffice",
    phones: [
      { label: "Mob", labelKey: "mob", number: "+91 73026 47817", href: "tel:+917302647817" },
      { label: "Mob", labelKey: "mob", number: bookingPhone.display, href: `tel:${bookingPhone.href}` },
    ],
  },
  {
    key: "mumbaiOffice",
    name: "Mumbai Office",
    addressKey: "addresses.mumbaiOffice",
    phones: [
      { label: "Mob", labelKey: "mob", number: "+91 73026 47817", href: "tel:+917302647817" },
      { label: "Mob", labelKey: "mob", number: bookingPhone.display, href: `tel:${bookingPhone.href}` },
    ],
  },
  {
    key: "delhiOffice",
    name: "Delhi Office",
    addressKey: "addresses.delhiOffice",
    phones: [
      { label: "Tel", labelKey: "tel", number: "011-46291155", href: "tel:+911146291155" },
      { label: "Mob", labelKey: "mob", number: "+91 8928 786 594", href: "tel:+918928786594" },
    ],
  },
  {
    key: "shamliOffice",
    name: "Shamli Office",
    addressKey: "addresses.shamliOffice",
    phones: [
      { label: "Mob", labelKey: "mob", number: bookingPhone.display, href: `tel:${bookingPhone.href}` },
    ],
  },
  {
    key: "internationalOffice",
    name: "International Office",
    addressKey: "addresses.internationalOffice",
    phones: [],
  },
];
