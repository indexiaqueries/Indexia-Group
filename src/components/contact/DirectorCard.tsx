import { motion } from "framer-motion";
import { BadgeCheck, Mail, Phone } from "lucide-react";

import {
  accent,
  displayFont,
  eyebrowClass,
  fadeUp,
  monoFont,
} from "../../data/contact";

const DirectorCard = () => (
  <motion.div
    {...fadeUp(0.15)}
    className="mt-6 flex flex-col gap-4 overflow-hidden rounded-2xl p-5 text-white shadow-xl sm:flex-row sm:items-center sm:gap-6 sm:p-6"
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
        <h3 className="text-lg font-extrabold whitespace-nowrap text-white" style={displayFont}>
          Bijendra Malik
        </h3>
      </div>
    </div>

    <div className="grid flex-1 grid-cols-1 gap-3 border-white/15 sm:grid-cols-3 sm:border-l sm:pl-6">
      {[
        ["tel:+918691886919", "0091 86918 86919", Phone],
        ["mailto:loans@indexiafinance.com", "loans@indexiafinance.com", Mail],
        ["mailto:contactus@indexiafinance.com", "contactus@indexiafinance.com", Mail],
      ].map(([href, text, Icon], index) => (
        <a
          key={String(text)}
          href={String(href)}
          className="group flex items-center gap-3 rounded-xl px-3 py-2 transition-colors hover:bg-white/10"
        >
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
            style={{ backgroundColor: accent.blue, color: accent.yellow }}
          >
            <Icon size={16} />
          </span>
          <span className="min-w-0">
            <span className="block text-[9px] font-bold uppercase tracking-[0.12em] text-white/60">
              {index === 0 ? "Number" : "Mail"}
            </span>
            <span
              className="block truncate text-[13px] font-semibold text-white/95 group-hover:text-white"
              style={monoFont}
            >
              {String(text)}
            </span>
          </span>
        </a>
      ))}
    </div>
  </motion.div>
);

export default DirectorCard;

