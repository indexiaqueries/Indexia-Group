import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Clock3,
  Landmark,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";

import customerImg from "../assets/customer-img.png";

const display = { fontFamily: "'Fraunces', Georgia, serif" };
const mono = { fontFamily: "'IBM Plex Mono', Menlo, monospace" };

const palette = {
  navyDeep: "#071c2c",
  navy: "#0c3652",
  navyMid: "#0f4a6e",
  teal: "#1f9c82",
  gold: "#c8952f",
  goldLight: "#e6b658",
  paper: "#f8f6f0",
  ink: "#122029",
};

const accent = {
  green: "#26ae90",
  blue: "#066a9c",
  blueDark: "#286090",
  yellow: "#f2f231",
  gray: "#7b7b7b",
};

type FormData = {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
};

const initialForm: FormData = {
  name: "",
  phone: "",
  email: "",
  subject: "",
  message: "",
};

/** ---------- Shared style tokens ---------- */
const eyebrowClass = "text-xs font-bold uppercase tracking-[0.24em]";
const cardBaseClass =
  "rounded-2xl border border-slate-100 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md";
const inputClasses = `
  w-full rounded-xl border border-slate-200
  bg-white px-4 py-3 text-sm text-slate-900
  outline-none transition-all duration-200
  placeholder:text-slate-400
  focus:border-[${accent.green}]
  focus:ring-4 focus:ring-[${accent.green}]/15
`;

/** One motion recipe reused by every scroll-reveal element instead of retyping the object each time */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, delay },
});

/** ---------- Data ---------- */

/** Two tiles only — "Enquiries" and a combined "Location & Hours" tile. */
const contactDetails = [
  {
    icon: Mail,
    label: "Enquiries",
    value: "contactus@indexiagroup.com",
    href: "mailto:contactus@indexiagroup.com",
    color: accent.green,
  },
  {
    icon: MapPin,
    label: "Location & Hours",
    value: "India · Mon – Sat, 9AM – 6PM",
    href: "#branches",
    color: accent.blue,
  },
];

const phoneNumbers = [
  { label: "Landline", number: "011 4629 1155", href: "tel:+911146291155" },
  { label: "Mobile", number: "8928 786 594", href: "tel:+918928786594" },
  { label: "Mobile", number: "86551 68551", href: "tel:+918655168551" },
];

/**
 * Branch data — emails removed here since loans@ and contactus@indexiafinance.com
 * are the same for every office and are now mentioned once, in the Director card.
 */
const branches = [
  {
    name: "Corporate Office",
    address: `Office No. 3, 1st Floor,
Rahimtoola House, Homji Street,
Opposite RBI, Fort,
Mumbai – 400001, Maharashtra`,
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
Mumbai – 400053, Maharashtra`,
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
Naraina Vihar, New Delhi – 110028`,
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
Surat – 394602, Gujarat`,
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

/** ---------- Small reusable pieces ---------- */

const InfoTile = ({
  icon: Icon,
  label,
  value,
  href,
  color,
  delay,
}: (typeof contactDetails)[number] & { delay: number }) => (
  <motion.a
    href={href}
    {...fadeUp(delay)}
    whileHover={{ x: 6 }}
    className={`group flex items-center gap-4 ${cardBaseClass} p-4`}
  >
    <span
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white shadow-lg"
      style={{ backgroundColor: color, boxShadow: `0 6px 18px ${color}35` }}
    >
      <Icon size={20} />
    </span>
    <span>
      <span className="block text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: accent.gray }}>
        {label}
      </span>
      <span
        className="mt-1 block text-sm font-semibold text-slate-800 group-hover:text-[--tone]"
        style={{ "--tone": accent.blueDark } as React.CSSProperties}
      >
        {value}
      </span>
    </span>
  </motion.a>
);

const PhoneTile = ({ label, number, href }: (typeof phoneNumbers)[number]) => (
  <a
    href={href}
    className="group flex items-center gap-4 rounded-xl bg-slate-50 p-4 transition hover:bg-[#eaf6f2]"
  >
    <span
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white shadow-lg"
      style={{ backgroundColor: accent.blueDark, boxShadow: `0 6px 18px ${accent.blueDark}35` }}
    >
      <Phone size={20} />
    </span>
    <span>
      <span className="block text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: accent.gray }}>
        {label}
      </span>
      <span
        className="mt-1 block text-base font-bold text-slate-800 group-hover:text-[#066a9c]"
        style={mono}
      >
        {number}
      </span>
    </span>
  </a>
);

/** Combined Location + Working Hours block, used inside the Contact Information column. */
const LocationHoursTile = () => (
  <motion.div
    {...fadeUp(0.1)}
    className={`flex items-start gap-4 ${cardBaseClass} p-5`}
  >
    <span
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white shadow-lg"
      style={{ backgroundColor: accent.blue, boxShadow: `0 6px 18px ${accent.blue}35` }}
    >
      <MapPin size={20} />
    </span>
    <div>
      <span className="block text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: accent.gray }}>
        Location
      </span>
      <span className="mt-1 block text-sm font-semibold text-slate-800">India</span>

      <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-4">
        <Clock3 size={16} style={{ color: accent.green }} />
        <span className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: accent.gray }}>
          Working Hours
        </span>
      </div>
      <span className="mt-1 block text-sm font-semibold text-slate-800">Mon – Sat: 9AM – 6PM</span>
    </div>
  </motion.div>
);

/**
 * Director card — mentions Bijendra Malik once, and is the single place
 * loans@indexiafinance.com / contactus@indexiafinance.com appear.
 */
const DirectorCard = () => (
  <motion.div
    {...fadeUp(0.15)}
    className="mt-6 rounded-2xl p-6 text-white shadow-xl"
    style={{ backgroundColor: accent.blueDark }}
  >
    <div className="flex items-center gap-3">
      <span
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
        style={{ backgroundColor: accent.yellow, color: accent.blueDark }}
      >
        <BadgeCheck size={20} />
      </span>
      <div>
        <p className={eyebrowClass} style={{ color: accent.yellow, letterSpacing: "0.18em" }}>
          Director
        </p>
        <h3 className="text-lg font-extrabold text-white" style={display}>
          Bijendra Malik
        </h3>
      </div>
    </div>

    <div className="mt-5 space-y-3 border-t border-white/15 pt-4" style={mono}>
      <a
        href="tel:+918691886919"
        className="flex items-center gap-3 text-sm font-semibold text-white/90 transition hover:text-white"
      >
        <Phone size={16} className="shrink-0" style={{ color: accent.green }} />
        0091 86918 86919
      </a>
      <a
        href="mailto:loans@indexiafinance.com"
        className="flex items-center gap-3 break-all text-sm font-semibold text-white/90 transition hover:text-white"
      >
        <Mail size={16} className="shrink-0" style={{ color: accent.green }} />
        loans@indexiafinance.com
      </a>
      <a
        href="mailto:contactus@indexiafinance.com"
        className="flex items-center gap-3 break-all text-sm font-semibold text-white/90 transition hover:text-white"
      >
        <Mail size={16} className="shrink-0" style={{ color: accent.green }} />
        contactus@indexiafinance.com
      </a>
    </div>
  </motion.div>
);

const BranchCard = ({
  branch,
  delay,
}: {
  branch: (typeof branches)[number];
  delay: number;
}) => (
  <motion.article
    {...fadeUp(delay)}
    className="flex h-full flex-col rounded-[1.5rem] border border-slate-100 bg-[#f8fafc] p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
  >
    <div className="flex items-start gap-4">
      <span
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white shadow-lg"
        style={{ backgroundColor: accent.blueDark }}
      >
        <MapPin size={21} />
      </span>
      <h3 className="pt-2 text-xl font-extrabold text-slate-900" style={display}>
        {branch.name}
      </h3>
    </div>

    <div className="mt-6 flex-1">
      <p className="whitespace-pre-line text-sm leading-7 text-slate-600">
        {branch.address}
      </p>

      {branch.phones.length > 0 && (
        <div className="mt-5 space-y-2" style={mono}>
          {branch.phones.map((phone) => (
            <a
              key={`${branch.name}-${phone.label}-${phone.number}`}
              href={phone.href}
              className="flex items-center gap-3 text-sm font-semibold text-slate-700 transition hover:text-[#066a9c]"
            >
              <Phone size={16} className="shrink-0" style={{ color: accent.green }} />
              <span>
                <span
                  className="mr-2 text-xs font-bold uppercase tracking-wider"
                  style={{ color: accent.gray, fontFamily: "inherit" }}
                >
                  {phone.label}:
                </span>
                {phone.number}
              </span>
            </a>
          ))}
        </div>
      )}
    </div>
  </motion.article>
);

/** Signature hero element: a tilted "passbook" card — UNCHANGED, still uses the hero palette. */
const PassbookCard = () => {
  const rows = [
    { label: "Branch offices", value: String(branches.length).padStart(2, "0") },
    { label: "Direct lines", value: String(phoneNumbers.length).padStart(2, "0") },
    { label: "Avg. reply time", value: "< 24 hrs" },
    { label: "Enquiry status", value: "In review" },
  ];

  return (
    <div className="relative mx-auto w-full max-w-sm">
      <div
        className="absolute -inset-6 rounded-[2rem] blur-2xl"
        style={{
          background: `linear-gradient(135deg, ${palette.teal}30, ${palette.gold}20)`,
        }}
      />

      <motion.div
        initial={{ opacity: 0, rotate: -8, y: 30 }}
        animate={{ opacity: 1, rotate: -3, y: 0 }}
        whileHover={{ rotate: 0 }}
        transition={{ duration: 0.8, delay: 0.2, type: "spring", bounce: 0.25 }}
        className="relative rounded-[1.5rem] p-6 shadow-2xl ring-1 ring-black/5 sm:p-7"
        style={{ backgroundColor: palette.paper }}
      >
        {/* punch-hole perforation along the spine */}
        <div className="absolute left-0 top-8 bottom-8 flex -translate-x-1/2 flex-col justify-between">
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={i}
              className="block h-3 w-3 rounded-full shadow-inner"
              style={{ backgroundColor: palette.navyDeep }}
            />
          ))}
        </div>

        <div className="flex items-center justify-between border-b border-dashed border-slate-300 pb-4">
          <div className="flex items-center gap-2">
            <Landmark size={18} style={{ color: palette.navyMid }} />
            <span
              className="text-[11px] font-bold uppercase tracking-[0.2em]"
              style={{ color: palette.navyMid }}
            >
              Indexia Group
            </span>
          </div>
          <img
            src={customerImg}
            alt=""
            aria-hidden="true"
            className="h-12 w-10 rounded-sm object-cover ring-2 ring-white shadow"
          />
        </div>

        <dl className="mt-5 space-y-4 pb-10 pr-14">
          {rows.map((row) => (
            <div key={row.label} className="flex items-baseline justify-between text-sm">
              <dt className="text-slate-500">{row.label}</dt>
              <dd className="whitespace-nowrap font-semibold" style={{ ...mono, color: palette.ink }}>
                {row.value}
              </dd>
            </div>
          ))}
        </dl>

        {/* wax-seal style badge */}
        <div
          className="absolute -bottom-5 -right-5 flex h-20 w-20 -rotate-12 items-center justify-center rounded-full border-2 bg-white text-center shadow-lg"
          style={{ borderColor: palette.gold }}
        >
          <div>
            <BadgeCheck className="mx-auto" size={18} style={{ color: palette.gold }} />
            <span
              className="mt-0.5 block text-[7px] font-bold uppercase leading-tight tracking-widest"
              style={{ color: palette.gold }}
            >
              Verified
              <br />
              Partner
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

/** ---------- Page ---------- */

const Contact = () => {
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const emailSubject = form.subject.trim() || "New enquiry from Indexia Group website";
    const emailBody = `
Name: ${form.name}
Phone: ${form.phone}
Email: ${form.email}
Subject: ${form.subject}

Message:
${form.message}
    `.trim();

    const mailtoUrl =
      `mailto:contactus@indexiagroup.com` +
      `?subject=${encodeURIComponent(emailSubject)}` +
      `&body=${encodeURIComponent(emailBody)}`;

    window.location.href = mailtoUrl;
    setSubmitted(true);
  };

  return (
    <main className="bg-white">
      {/* ---------- Hero — UNCHANGED ---------- */}
      <section
        className="relative overflow-hidden"
        style={{
          background: `linear-gradient(115deg, ${palette.navyDeep} 0%, ${palette.navy} 55%, ${palette.navyMid} 100%)`,
        }}
      >
        {/* faint ruled-ledger texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 36px)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(circle at 85% 15%, ${palette.teal}35, transparent 45%)`,
          }}
        />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className={`${eyebrowClass} mb-4`} style={{ color: palette.goldLight }}>
              Talk to Indexia
            </p>

            <h1
              className="max-w-2xl text-4xl leading-tight text-white sm:text-5xl lg:text-6xl"
              style={{ ...display, fontWeight: 600 }}
            >
              A Direct Line to Our Loans Team
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-white/75">
              From documentation questions to new loan enquiries, every message is
              reviewed and answered by a member of our team — not a queue.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#enquiry-form"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-[#241a03] transition-all duration-300 hover:-translate-y-1"
                style={{ backgroundColor: palette.goldLight }}
              >
                Send Your Enquiry
                <ArrowRight size={17} />
              </a>

              <a
                href="tel:+911146291155"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-bold text-white transition-all duration-300 hover:bg-white hover:text-[#066a9c]"
              >
                <Phone size={17} />
                Call Us Now
              </a>
            </div>

            <div
              className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/10 pt-6 text-sm text-white/70"
              style={mono}
            >
              <span>{String(branches.length).padStart(2, "0")} offices</span>
              <span>{String(phoneNumbers.length).padStart(2, "0")} direct lines</span>
              <span>&lt; 24 hr avg. reply</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <PassbookCard />
          </motion.div>
        </div>
      </section>

      {/* ---------- Contact information + enquiry form ---------- */}
      <section className="bg-[#f8fafc] px-6 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          {/* Contact information */}
          <motion.div {...fadeUp()}>
            <p className={eyebrowClass} style={{ color: accent.green }}>
              Contact Information
            </p>

            <h2 className="mt-3 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
              We&apos;re Here to <span style={{ color: accent.blueDark }}>Help You</span>
            </h2>

            <p className="mt-5 max-w-lg text-sm leading-7 text-slate-500">
              Whether you have a question about our services, need a business
              consultation, or want to explore a partnership, our team is ready to
              assist you.
            </p>

            {/* Enquiries tile + combined Location & Hours tile */}
            <div className="mt-10 space-y-5">
              <InfoTile {...contactDetails[0]} delay={0} />
              <LocationHoursTile />
            </div>

            {/* Phone numbers */}
            <div className="mt-8 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <p className={eyebrowClass} style={{ color: accent.green, letterSpacing: "0.18em" }}>
                Phone Numbers
              </p>
              <div className="mt-5 space-y-4">
                {phoneNumbers.map((phone) => (
                  <PhoneTile key={phone.number} {...phone} />
                ))}
              </div>
            </div>

            {/* Director Bijendra Malik — the single place loans@ / contactus@indexiafinance.com appear */}
            <DirectorCard />
          </motion.div>

          {/* Enquiry form */}
          <motion.div
            id="enquiry-form"
            {...fadeUp(0.1)}
            className="relative overflow-hidden rounded-[2rem] border border-white bg-white p-6 shadow-xl sm:p-10"
          >
            <div
              className="absolute right-0 top-0 h-40 w-40 rounded-full blur-3xl"
              style={{ backgroundColor: `${accent.green}18` }}
            />
            <div
              className="absolute bottom-0 left-0 h-40 w-40 rounded-full blur-3xl"
              style={{ backgroundColor: `${accent.blueDark}18` }}
            />

            <div className="relative">
              <p className={eyebrowClass} style={{ color: accent.green }}>
                Send Your Enquiry
              </p>
              <h2 className="mt-3 text-3xl font-extrabold text-slate-900" style={display}>
                Tell Us How We Can Help
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-500">
                Complete the form below and your enquiry will be addressed by our
                team.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-600">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      required
                      className={inputClasses}
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-600">
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="Your phone number"
                      required
                      className={inputClasses}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-600">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    className={inputClasses}
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-600">
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="What would you like to discuss?"
                    required
                    className={inputClasses}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-600">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Write your enquiry here..."
                    required
                    className={`${inputClasses} resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-1"
                  style={{
                    backgroundColor: accent.blueDark,
                    boxShadow: `0 8px 22px ${accent.blueDark}40`,
                  }}
                >
                  <Send size={17} />
                  Send Enquiry
                </button>

                {submitted && (
                  <p
                    className="rounded-xl px-4 py-3 text-center text-sm font-medium"
                    style={{ backgroundColor: `${accent.green}15`, color: "#14765f" }}
                  >
                    Your email application should open now. Please send the prepared
                    enquiry to{" "}
                    <a href="mailto:contactus@indexiagroup.com" className="font-bold underline">
                      contactus@indexiagroup.com
                    </a>
                    .
                  </p>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---------- Our Locations ---------- */}
      <section id="branches" className="bg-white px-6 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className={eyebrowClass} style={{ color: accent.green }}>
              Our Locations
            </p>
            <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Our <span style={{ color: accent.blueDark }}>Locations</span>
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-500">
              Visit or contact any of our offices for assistance with your
              requirements.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {branches.map((branch, index) => (
              <BranchCard key={branch.name} branch={branch} delay={index * 0.08} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;