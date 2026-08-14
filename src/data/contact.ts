type PhoneLink = {
  label: string;
  number: string;
  href: string;
};

type Branch = {
  name: string;
  address: string;
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
  { label: "Landline", number: "011 4629 1155", href: "tel:+911146291155" },
  { label: "Mobile", number: "8928 786 594", href: "tel:+918928786594" },
  { label: "Mobile", number: "86551 68551", href: "tel:+918655168551" },
];

export const branches: Branch[] = [
  {
    name: "Corporate Office",
    address: `Office No. 3, 1st Floor,
Rahimtoola House, Homji Street,
Opposite RBI, Fort,
Mumbai - 400001, Maharashtra`,
    phones: [
      { label: "Mob", number: "+91 73026 47817", href: "tel:+917302647817" },
      { label: "Mob", number: "+91 86918 86919", href: "tel:+918691886919" },
    ],
  },
  {
    name: "Mumbai Office",
    address: `2A/1402, New Mhada Complex,
Near Lokhandwala Circle,
Andheri West,
Mumbai - 400053, Maharashtra`,
    phones: [
      { label: "Mob", number: "+91 73026 47817", href: "tel:+917302647817" },
      { label: "Mob", number: "+91 86918 86919", href: "tel:+918691886919" },
    ],
  },
  {
    name: "Delhi Office",
    address: `213, Second Floor, Imperial Tower,
Near Gurudwara,
C Block Commercial Complex,
Naraina Vihar, New Delhi - 110028`,
    phones: [
      { label: "Tel", number: "011-46291155", href: "tel:+911146291155" },
      { label: "Mob", number: "+91 8928 786 594", href: "tel:+918928786594" },
    ],
  },
  {
    name: "Surat Office",
    address: `S/47, Sakun Complex,
Post-Baben,
Taluka-Bardoli,
Surat - 394602, Gujarat`,
    phones: [
      { label: "Mob", number: "+91 86551 68551", href: "tel:+918655168551" },
      { label: "Mob", number: "+91 8928 786 594", href: "tel:+918928786594" },
    ],
  },
  {
    name: "International Office",
    address: `Avenida Perez Guerrero OE-375,
y Avenida Quito,
Ecuador, South America`,
    phones: [],
  },
];

