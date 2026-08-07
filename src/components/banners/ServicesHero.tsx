import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, Briefcase, LineChart, ShieldCheck } from "lucide-react";

import AppButton from "../common/AppButton";
import { displayFont, eyebrowClass, monoFont, palette } from "../../data/contact";

const highlights = [
  { icon: Briefcase, title: "Financial Consulting", desc: "Personalised guidance for smarter decisions." },
  { icon: LineChart, title: "Investment Planning", desc: "Data-driven strategies built around your goals." },
  { icon: ShieldCheck, title: "Wealth Protection", desc: "Insurance and estate planning for your future." },
];

const ServicesHero = () => (
  <section
    className="relative overflow-hidden min-h-[92svh] sm:min-h-screen flex items-center"
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

    <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 pt-28 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
      >
        <p className={`${eyebrowClass} mb-4`} style={{ color: palette.goldLight }}>
          What We Offer
        </p>

        <h1
          className="max-w-xl text-4xl leading-tight text-white sm:text-5xl lg:text-6xl"
          style={{ ...displayFont, fontWeight: 600 }}
        >
          Financial Solutions That Support Growth
        </h1>

        <p className="mt-6 max-w-xl text-base leading-8 text-white/75">
          From consulting to investment planning, our services are designed to meet you
          wherever you are on your financial journey.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <AppButton to="/contact" variant="yellow">
            Book Free Consultation
            <ArrowRight size={17} />
          </AppButton>
          <AppButton to="/about" variant="light">
            About Indexia
          </AppButton>
        </div>
      </motion.div>

      
      <motion.div
        initial={{ opacity: 0, rotate: -8, y: 30 }}
        animate={{ opacity: 1, rotate: -3, y: 0 }}
        whileHover={{ rotate: 0 }}
        transition={{ duration: 0.8, delay: 0.2, type: "spring", bounce: 0.25 }}
        className="relative mx-auto w-full max-w-sm"
      >
        <div
          className="absolute -inset-6 rounded-4xl blur-2xl"
          style={{ background: `linear-gradient(135deg, ${palette.teal}30, ${palette.gold}20)` }}
        />

        <div
          className="relative rounded-[1.5rem] p-7 shadow-2xl ring-1 ring-black/5"
          style={{ backgroundColor: palette.paper }}
        >
          <div className="flex items-center justify-between border-b border-dashed border-slate-300 pb-4">
            <span
              className="text-[11px] font-bold uppercase tracking-[0.2em]"
              style={{ color: palette.navyMid }}
            >
              Core Services
            </span>
            <span className="flex items-center gap-1 rounded-full bg-[#26ae90]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#066a9c]">
              <BadgeCheck size={12} />
              Trusted
            </span>
          </div>

          <div className="mt-6 space-y-5">
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
                >
                  <span
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                    style={{ backgroundColor: `${palette.teal}18`, color: palette.navyMid }}
                  >
                    <Icon size={22} />
                  </span>
                  <div>
                    <p
                      className="text-[15px] font-bold leading-tight"
                      style={{ ...monoFont, color: palette.ink }}
                    >
                      {item.title}
                    </p>
                    <p className="mt-1 text-[13px] leading-snug text-slate-500">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default ServicesHero;
