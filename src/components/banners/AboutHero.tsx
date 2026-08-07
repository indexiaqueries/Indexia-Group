import { motion } from "framer-motion";
import { ArrowRight, Award, Building2, Users } from "lucide-react";

import AppButton from "../common/AppButton";
import { displayFont, eyebrowClass, monoFont, palette } from "../../data/contact";

const stats = [
  { icon: Users, value: "500+", label: "Clients Served" },
  { icon: Award, value: "10+", label: "Years Experience" },
  { icon: Building2, value: "8", label: "Group Companies" },
];

const AboutHero = () => (
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

    <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-24 lg:grid-cols-2 lg:px-8">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
      >
        <p className={`${eyebrowClass} mb-4`} style={{ color: palette.goldLight }}>
          About Indexia Group
        </p>

        <h1
          className="max-w-xl text-4xl leading-tight text-white sm:text-5xl lg:text-6xl"
          style={{ ...displayFont, fontWeight: 600 }}
        >
          Creating Better Financial Opportunities
        </h1>

        <p className="mt-6 max-w-xl text-base leading-8 text-white/75">
          A customer-focused financial services group committed to delivering reliable,
          growth-oriented solutions for individuals and businesses across India.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <AppButton to="/contact" variant="yellow">
            Talk to Us
            <ArrowRight size={17} />
          </AppButton>
          <AppButton to="/services" variant="light">
            Explore Services
          </AppButton>
        </div>
      </motion.div>

      {/* Stats visual card */}
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
          className="relative rounded-3xl p-7 shadow-2xl ring-1 ring-black/5"
          style={{ backgroundColor: palette.paper }}
        >
          <div className="flex items-center justify-between border-b border-dashed border-slate-300 pb-4">
            <span
              className="text-[11px] font-bold uppercase tracking-[0.2em]"
              style={{ color: palette.navyMid }}
            >
              Indexia Group · At a Glance
            </span>
            <span
              className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider"
              style={{ backgroundColor: palette.navyDeep, color: palette.goldLight }}
            >
              Since 2014
            </span>
          </div>

          <div className="mt-6 space-y-5">
            {stats.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
                >
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{ backgroundColor: `${palette.teal}18`, color: palette.navyMid }}
                  >
                    <Icon size={22} />
                  </span>
                  <div>
                    <p
                      className="text-2xl font-extrabold leading-none"
                      style={{ ...monoFont, color: palette.ink }}
                    >
                      {item.value}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">{item.label}</p>
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

export default AboutHero;
