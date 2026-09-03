type PhoneLink = {
  label: string;
  labelKey?: string;
  number: string;
  href: string;
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

export const phoneNumbers: PhoneLink[] = [
  { label: "Landline", labelKey: "landline", number: "+91 11 4629 1155", href: "tel:+911146291155" },
  { label: "Mobile", labelKey: "mobile", number: "+91 8928 786 594", href: "tel:+918928786594" },
  { label: "Mobile", labelKey: "mobile", number: "+91 86551 68551", href: "tel:+918655168551" },
];

export const branches: Branch[] = [
  {
    key: "corporateOffice",
    name: "Corporate Office",
    addressKey: "addresses.corporateOffice",
    phones: [
      { label: "Mob", labelKey: "mob", number: "+91 73026 47817", href: "tel:+917302647817" },
      { label: "Mob", labelKey: "mob", number: "+91 86918 86919", href: "tel:+9186918 86919" },
    ],
  },
  {
    key: "mumbaiOffice",
    name: "Mumbai Office",
    addressKey: "addresses.mumbaiOffice",
    phones: [
      { label: "Mob", labelKey: "mob", number: "+91 73026 47817", href: "tel:+917302647817" },
      { label: "Mob", labelKey: "mob", number: "+91 86918 86919", href: "+9186918 86919" },
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
      { label: "Mob", labelKey: "mob", number: "+91 86918 86919", href: "tel:+918691886919" },
    ],
  },
  {
    key: "internationalOffice",
    name: "International Office",
    addressKey: "addresses.internationalOffice",
    phones: [],
  },
];
