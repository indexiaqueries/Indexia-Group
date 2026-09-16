/**
 * Dedicated enquiry line per group company, as printed on the company pages.
 * Display form keeps digit groups readable; `href` is the callable form.
 */
export type DedicatedPhone = {
  display: string;
  href: string;
};

export const dedicatedPhones: Record<string, DedicatedPhone> = {
  finance: { display: "+91 86551 68551", href: "+918655168551" },
  finserve: { display: "+91 86551 68551", href: "+918655168551" },
  advertising: { display: "+91 8928 786 594", href: "+918928786594" },
  "agro-bio": { display: "+91 8928 786 594", href: "+918928786594" },
  securities: { display: "+91 8928 786 594", href: "+918928786594" },
  warehouse: { display: "+91 73026 47817", href: "+917302647817" },
  overseas: { display: "+91 73026 47817", href: "+917302647817" },
  foundation: { display: "+91 86918 86919", href: "+918691886919" },
};

/** Fallback for any company without its own dedicated line. */
export const defaultDedicatedPhone: DedicatedPhone = {
  display: "+91 8928 786 594",
  href: "+918928786594",
};

export const getDedicatedPhone = (slug: string): DedicatedPhone =>
  dedicatedPhones[slug] ?? defaultDedicatedPhone;

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
  /** Address pieces used to build a Google Maps search link for this branch. */
  mapQuery: string;
};

/** Google Maps search URL for an office, opened in a new tab. */
export const branchMapsUrl = ({ mapQuery }: { mapQuery: string }): string =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`;

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
  /** Recruitment — primary address (careers page and apply success screen). */
  hr: "hr@indexiafinance.com",
  /** Recruitment — alternate address (careers page and apply success screen). */
  hrAlternate: "hr.indexia@gmail.com",
} as const;

export const phoneNumbers: PhoneLink[] = [
  { label: "Landline", labelKey: "landline", number: "+91 11 4629 1155", href: "tel:+911146291155", mono: true },
  { label: "Mobile", labelKey: "mobile", number: "+91 8928 786 594", href: "tel:+918928786594", mono: true  },
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
    mapQuery: "Rahimtoola House, Homji Street, Fort, Mumbai 400001",
    phones: [
      { label: "Mob", labelKey: "mob", number: "+91 73026 47817", href: "tel:+917302647817" },
      { label: "Mob", labelKey: "mob", number: bookingPhone.display, href: `tel:${bookingPhone.href}` },
    ],
  },
  {
    key: "mumbaiOffice",
    name: "Mumbai Office",
    addressKey: "addresses.mumbaiOffice",
    mapQuery: "New Mhada Complex, Lokhandwala Circle, Andheri West, Mumbai 400053",
    phones: [
      { label: "Mob", labelKey: "mob", number: "+91 73026 47817", href: "tel:+917302647817" },
      { label: "Mob", labelKey: "mob", number: bookingPhone.display, href: `tel:${bookingPhone.href}` },
    ],
  },
  {
    key: "delhiOffice",
    name: "Delhi Office",
    addressKey: "addresses.delhiOffice",
    mapQuery: "Imperial Tower, C Block Commercial Complex, Naraina Vihar, New Delhi 110028",
    phones: [
      { label: "Tel", labelKey: "tel", number: "011-46291155", href: "tel:+911146291155" },
      { label: "Mob", labelKey: "mob", number: "+91 8928 786 594", href: "tel:+918928786594" },
    ],
  },
  {
    key: "shamliOffice",
    name: "Shamli Office",
    addressKey: "addresses.shamliOffice",
    mapQuery: "Meerut Karnal Road, Shamli, Uttar Pradesh 247776",
    phones: [
      { label: "Mob", labelKey: "mob", number: bookingPhone.display, href: `tel:${bookingPhone.href}` },
    ],
  },
  {
    key: "internationalOffice",
    name: "International Office",
    addressKey: "addresses.internationalOffice",
    mapQuery: "Avenida Perez Guerrero, Quito, Ecuador",
    phones: [],
  },
];
