import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";

import {
  branches,
  displayFont,
  eyebrowClass,
  monoFont,
  palette,
  phoneNumbers,
} from "../../data/contact";
import PassbookCard from "./PassbookCard";

const ContactHero = () => (
  <section
    className="relative overflow-hidden min-h-screen flex items-center"
    style={{
      background: `linear-gradient(115deg, ${palette.navyDeep} 0%, ${palette.navy} 55%, ${palette.navyMid} 100%)`,
    }}
  >
    <div
      className="pointer-events-none absolute inset-0 opacity-70"
      style={{
        backgroundImage:
          "repeating-linear-gradient(to bottom, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 36px)",
      }}
    />
    <div
      className="pointer-events-none absolute inset-0"
      style={{ background: `radial-gradient(circle at 85% 15%, ${palette.teal}35, transparent 45%)` }}
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
          style={{ ...displayFont, fontWeight: 600 }}
        >
          A Direct Line to Our Loans Team
        </h1>

        <p className="mt-6 max-w-xl text-base leading-8 text-white/75">
          From documentation questions to new loan enquiries, every message is reviewed and answered by a
          member of our team - not a queue.
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
            className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-bold text-white transition-all duration-300 hover:bg-white hover:text-(--color-blue)"
          >
            <Phone size={17} />
            Call Us Now
          </a>
        </div>

        <div
          className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/10 pt-6 text-sm text-white/70"
          style={monoFont}
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
);

export default ContactHero;
