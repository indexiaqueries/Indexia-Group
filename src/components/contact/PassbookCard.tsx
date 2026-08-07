import { motion } from "framer-motion";
import { BadgeCheck, Landmark } from "lucide-react";

import customerImg from "../../assets/customer-img.webp";
import { branches, monoFont, palette, phoneNumbers } from "../../data/contact";

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
        className="absolute -inset-6 rounded-4xl blur-2xl"
        style={{ background: `linear-gradient(135deg, ${palette.teal}30, ${palette.gold}20)` }}
      />

      <motion.div
        initial={{ opacity: 0, rotate: -8, y: 30 }}
        animate={{ opacity: 1, rotate: -3, y: 0 }}
        whileHover={{ rotate: 0 }}
        transition={{ duration: 0.8, delay: 0.2, type: "spring", bounce: 0.25 }}
        className="relative rounded-3xl p-6 shadow-2xl ring-1 ring-black/5 sm:p-7"
        style={{ backgroundColor: palette.paper }}
      >
        <div className="absolute bottom-8 left-0 top-8 flex -translate-x-1/2 flex-col justify-between">
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
            width={40}
            height={48}
            loading="lazy"
            decoding="async"
            className="h-12 w-10 rounded-sm object-cover shadow ring-2 ring-white"
          />
        </div>

        <dl className="mt-5 space-y-4 pb-10 pr-14">
          {rows.map((row) => (
            <div key={row.label} className="flex items-baseline justify-between text-sm">
              <dt className="text-slate-500">{row.label}</dt>
              <dd className="whitespace-nowrap font-semibold" style={{ ...monoFont, color: palette.ink }}>
                {row.value}
              </dd>
            </div>
          ))}
        </dl>

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

export default PassbookCard;
