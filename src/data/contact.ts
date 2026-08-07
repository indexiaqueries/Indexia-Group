export type PhoneLink = {
  label: string;
  number: string;
  href: string;
};

export type Branch = {
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

export const displayFont = { fontFamily: "'Fraunces', Georgia, serif" };
export const monoFont = { fontFamily: "'IBM Plex Mono', Menlo, monospace" };

export const palette = {
  navyDeep: "#071c2c",
  navy: "#0c3652",
  navyMid: "#0f4a6e",
  teal: "#1f9c82",
  gold: "#c8952f",
  goldLight: "#e6b658",
  paper: "#f8f6f0",
  ink: "#122029",
};

export const accent = {
  green: "var(--color-teal)",
  blue: "var(--color-blue)",
  blueDark: "var(--color-blue-2)",
  yellow: "var(--color-yellow)",
  gray: "var(--color-gray)",
};

export const eyebrowClass = "text-xs font-bold uppercase tracking-[0.24em]";
export const cardBaseClass =
  "rounded-2xl border border-slate-100 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md";
export const inputClasses =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-[var(--color-teal)] focus:ring-4 focus:ring-[var(--color-teal)]/15";

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
      { label: "Tel", number: "+91 73026 47817", href: "tel:+917302647817" },
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
      { label: "Tel", number: "+91 73026 47817", href: "tel:+917302647817" },
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

export const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, delay },
});
