import { motion } from "framer-motion";
import { BadgeCheck, Clock3, Mail, MapPin, Phone } from "lucide-react";
import type { CSSProperties } from "react";

import {
  accent,
  cardBaseClass,
  displayFont,
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
        className="mt-1 block text-sm font-semibold text-slate-800 group-hover:text-[--tone]"
        style={{ "--tone": accent.blueDark } as CSSProperties}
      >
        contactus@indexiagroup.com
      </span>
    </span>
  </motion.a>
);

const PhoneTile = ({ label, number, href }: (typeof phoneNumbers)[number]) => (
  <a href={href} className="group flex items-center gap-4 rounded-xl bg-slate-50 p-4 hover:bg-[#eaf6f2]">
    <span
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white shadow-lg"
      style={{ backgroundColor: accent.blueDark, boxShadow: `0 6px 18px rgba(40,96,144,.22)` }}
    >
      <Phone size={20} />
    </span>
    <span>
      <span className="block text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: accent.gray }}>
        {label}
      </span>
      <span className="mt-1 block text-base font-bold text-slate-800 group-hover:text-[var(--color-blue)]" style={monoFont}>
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

const DirectorCard = () => (
  <motion.div {...fadeUp(0.15)} className="mt-6 rounded-2xl p-6 text-white shadow-xl" style={{ backgroundColor: accent.blueDark }}>
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
        <h3 className="text-lg font-extrabold text-white" style={displayFont}>
          Bijendra Malik
        </h3>
      </div>
    </div>

    <div className="mt-5 space-y-3 border-t border-white/15 pt-4" style={monoFont}>
      {[
        ["tel:+918691886919", "0091 86918 86919", Phone],
        ["mailto:loans@indexiafinance.com", "loans@indexiafinance.com", Mail],
        ["mailto:contactus@indexiafinance.com", "contactus@indexiafinance.com", Mail],
      ].map(([href, text, Icon]) => (
        <a
          key={String(text)}
          href={String(href)}
          className="flex items-center gap-3 break-all text-sm font-semibold text-white/90 hover:text-white"
        >
          <Icon size={16} className="shrink-0" style={{ color: accent.green }} />
          {String(text)}
        </a>
      ))}
    </div>
  </motion.div>
);

const ContactInfo = () => (
  <motion.div {...fadeUp()}>
    <p className={eyebrowClass} style={{ color: accent.green }}>
      Contact Information
    </p>
    <h2 className="mt-3 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
      We&apos;re Here to <span style={{ color: accent.blueDark }}>Help You</span>
    </h2>
    <p className="mt-5 max-w-lg text-sm leading-7 text-slate-500">
      Whether you have a question about our services, need a business consultation, or want to explore a
      partnership, our team is ready to assist you.
    </p>

    <div className="mt-10 space-y-5">
      <InfoTile />
      <LocationHoursTile />
    </div>

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

    <DirectorCard />
  </motion.div>
);

export default ContactInfo;
