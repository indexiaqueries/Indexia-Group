import { motion } from "framer-motion";
import { Clock3, Mail, MapPin, Phone } from "lucide-react";

import {
  accent,
  cardBaseClass,
  eyebrowClass,
  fadeUp,
  monoFont,
  phoneNumbers,
} from "../../data/contact";

const InfoTile = () => (
  <motion.a
    href="mailto:contactus@indexiagroup.com"
    {...fadeUp(0)}
    whileHover={{ x: 6 }}
    className={`group flex items-center gap-4 ${cardBaseClass} p-4`}
  >
    <span
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white shadow-lg"
      style={{ backgroundColor: accent.green, boxShadow: `0 6px 18px rgba(38,174,144,.22)` }}
    >
      <Mail size={20} />
    </span>
    <span>
      <span className="block text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: accent.gray }}>
        Enquiries
      </span>
      <span
        className="mt-1 block text-sm font-semibold text-slate-800 group-hover:text-(--color-blue)"
      >
        contactus@indexiagroup.com
      </span>
    </span>
  </motion.a>
);

const PhoneTile = ({ label, number, href }: (typeof phoneNumbers)[number]) => (
  <a href={href} className="group flex items-center gap-4 py-3.5 first:pt-1 last:pb-1">
    <span
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white shadow-lg"
      style={{ backgroundColor: accent.blue, boxShadow: `0 6px 18px rgba(6,106,156,.22)` }}
    >
      <Phone size={20} />
    </span>
    <span>
      <span className="block text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: accent.gray }}>
        {label}
      </span>
      <span className="mt-1 block text-base font-bold text-slate-800 group-hover:text-(--color-blue)" style={monoFont}>
        {number}
      </span>
    </span>
  </a>
);

const LocationHoursTile = () => (
  <motion.div {...fadeUp(0.1)} className={`flex items-start gap-4 ${cardBaseClass} p-5`}>
    <span
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white shadow-lg"
      style={{ backgroundColor: accent.blue, boxShadow: `0 6px 18px rgba(6,106,156,.22)` }}
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
      <span className="mt-1 block text-sm font-semibold text-slate-800">Mon - Sat: 9AM - 6PM</span>
    </div>
  </motion.div>
);

const ContactInfo = () => (
  <motion.div {...fadeUp()} className="flex h-full flex-col">
    <p className={eyebrowClass} style={{ color: accent.green }}>
      Send Your Enquiry
    </p>
    <h2 className="font-display mt-3 text-[clamp(26px,3.4vw,40px)] font-bold leading-[1.08] text-slate-900">
      Enquire About <span style={{ color: accent.blue }}>Indexia Company</span>
    </h2>
    <p className="mt-5 max-w-lg text-sm leading-7 text-slate-500">
      Whether you have a question about our services, need a business consultation, or want to explore a
      partnership, our team is ready to assist you — we reply within 24 hours.
    </p>

    <div className="mt-10 flex flex-1 flex-col justify-center gap-5">
      <InfoTile />
      <LocationHoursTile />
    </div>

<div className="mt-8 rounded-2xl border border-[#ddd6c4] bg-(--color-paper) p-5 shadow-sm">
      <p className={eyebrowClass} style={{ color: accent.green, letterSpacing: "0.18em" }}>
        Phone Numbers
      </p>
      <div className="mt-2 divide-y divide-[#e3dcc9]">
        {phoneNumbers.map((phone) => (
          <PhoneTile key={phone.number} {...phone} />
        ))}
      </div>
    </div>
  </motion.div>
);

export default ContactInfo;
