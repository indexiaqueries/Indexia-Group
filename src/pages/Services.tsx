import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEO from "../components/common/SEO";
import ServicesHero from "../components/banners/ServicesHero";
import { getCompanyImage } from "../data/companyImages";

const services = [
  {
    title: "Indexia Finance",
    tag: "Financial Advisory",
    desc: "Single-director financial consultancy focused on strategic planning, funding, and high-level financial decision-making for individuals and businesses.",
    features: ["Strategic Financial Planning", "Funding & Capital Advisory", "Wealth Management"],
    color: "#26ae90",
  },
  {
    title: "Indexia Finserve",
    tag: "Corporate Finance & Advisory",
    desc: "Multi-director corporate finance arm offering investment planning, wealth management, and end-to-end business solutions for growing enterprises.",
    features: ["Investment Planning", "Wealth Management", "Business Solutions"],
    color: "#e6b658",
  },
  {
    title: "Indexia Securities",
    tag: "Bodyguard & Event Security",
    desc: "Professional bodyguard, bouncer, and event security services protecting people, venues, and high-profile operations around the clock.",
    features: ["Personal Bodyguards", "Event & Venue Security", "VIP Protection"],
    color: "#286090",
  },
  {
    title: "Indexia Overseas",
    tag: "Global Trade & Logistics",
    desc: "Cross-border trade and logistics solutions connecting local businesses to international markets, simplifying import-export at every step.",
    features: ["Import & Export Facilitation", "Global Trade Services", "Market Connections"],
    color: "#066a9c",
  },
  {
    title: "Agro Bio Fertilizers",
    tag: "Sustainable Agriculture",
    desc: "Bio-fertilizer production and agricultural solutions that support sustainable, high-yield farming while protecting soil health and the land.",
    features: ["Bio-Based Fertilizers", "Soil Health Solutions", "Yield Improvement"],
    color: "#e6b658",
  },
  {
    title: "Indexia Warehouse",
    tag: "Logistics Infrastructure",
    desc: "Large-scale warehousing facilities near key ports for seamless supply-chain operations, built to scale with growing logistics demands.",
    features: ["Modern Warehousing", "Supply-Chain Management", "Port-Near Storage"],
    color: "#26ae90",
  },
  {
    title: "Indexia Foundation",
    tag: "Athlete Support",
    desc: "Sports and training programs that mentor, coach, and fund athletes on their journey to peak performance and long-term success.",
    features: ["Athlete Mentorship", "Sports Coaching", "Training Funding"],
    color: "#286090",
  },
  {
    title: "Indexia Advertising",
    tag: "Brand & Media",
    desc: "Strategic advertising and brand visibility solutions across high-impact media channels, helping businesses reach the right audience.",
    features: ["Brand Campaigns", "Media Placement", "High-Impact Visibility"],
    color: "#066a9c",
  },
];

const process = [
  { step: "01", title: "Initial Consultation",  desc: "We start with a conversation to understand your goals, challenges, and the right business fit.",  color: "#26ae90" },
  { step: "02", title: "Tailored Strategy",     desc: "Our experts craft a specialised approach aligned with the business unit that fits your needs.",    color: "#066a9c" },
  { step: "03", title: "Implementation",        desc: "We execute with full transparency and keep you informed at every stage of the process.",          color: "#286090" },
  { step: "04", title: "Ongoing Support",       desc: "Continuous monitoring, reporting, and refinement to keep you on track and growing.",             color: "#e6b658" },
];

const sectionPad = { padding: "clamp(48px, 8vw, 88px) 0" };

const Services = () => (
  <>
    <SEO
      title="Services"
      description="Indexia Group's eight businesses deliver finance, corporate advisory, security, global trade, agro fertilizers, warehousing, athlete support, and advertising across India and beyond."
      keywords="Indexia Group services, financial advisory India, corporate finance, bodyguard security, global trade and logistics, agro fertilizers, warehousing, athlete support, advertising"
      canonicalPath="/services"
    />

    <ServicesHero />

    <section style={{ background: "#f7fbfd", ...sectionPad }}>
      <div className="container">
        <div className="mx-auto mb-14 max-w-[640px] text-center sm:mb-16">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#26ae90]">Our Businesses</p>
          <h2 className="text-[clamp(24px,4vw,38px)] font-extrabold text-[#111827]">
            Eight Businesses, <span className="text-[#066a9c]">One Group</span>
          </h2>
        </div>

        <div className="flex flex-col gap-14 lg:gap-20">
          {services.map((s, i) => {
            const ImageBox = (
              <motion.div
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
                className="relative order-1 lg:order-none"
              >
                <div
                  className="absolute -inset-4 rounded-3xl opacity-25 blur-2xl"
                  style={{ background: `linear-gradient(135deg, ${s.color}, transparent)` }}
                />
                <img
                  src={getCompanyImage(s.title)}
                  alt={s.title}
                  width={1536}
                  height={1024}
                  loading="lazy"
                  decoding="async"
                  className="relative w-full rounded-[22px] object-cover shadow-[0_18px_50px_rgba(0,0,0,0.16)]"
                  style={{ aspectRatio: "4/3", maxHeight: "420px" }}
                />
                <span
                  className="absolute left-4 top-4 rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white shadow-lg"
                  style={{ background: s.color }}
                >
                  {s.tag}
                </span>
              </motion.div>
            );

            const ContentBox = (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="order-2 lg:order-none flex flex-col justify-center"
              >
                <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: s.color }}>
                  {String(i + 1).padStart(2, "0")} · {s.tag}
                </p>
                <h3 className="mb-4 text-2xl font-extrabold leading-tight text-[#111827] sm:text-3xl">
                  {s.title}
                </h3>
                <p className="mb-6 text-[15px] leading-[1.85] text-[#6b7280]">{s.desc}</p>
                <ul className="mb-7 flex flex-col gap-2.5">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-[14px] text-[#374151]">
                      <span
                        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[12px] font-bold text-white"
                        style={{ background: s.color }}
                      >
                        ✓
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="h-[4px] w-14 rounded-sm" style={{ background: s.color }} />
              </motion.div>
            );

            return (
              <div
                key={s.title}
                className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14"
                style={{ direction: i % 2 === 0 ? "ltr" : "rtl" }}
              >
                <div style={{ direction: "ltr" }}>{ImageBox}</div>
                <div style={{ direction: "ltr" }}>{ContentBox}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>

    <section style={{ background: "#fff", ...sectionPad }}>
      <div className="container">
        <div className="mx-auto mb-12 max-w-[520px] text-center sm:mb-14">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#26ae90]">Our Process</p>
          <h2 className="text-[clamp(24px,4vw,38px)] font-extrabold text-[#111827]">
            How We <span className="text-[#066a9c]">Work With You</span>
          </h2>
        </div>
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((p) => (
            <div key={p.step} className="rounded-2xl border border-[#e5e7eb] bg-white p-8 text-center">
              <div
                className="mx-auto mb-5 flex h-[60px] w-[60px] items-center justify-center rounded-full text-lg font-extrabold"
                style={{ background: `${p.color}18`, border: `2px solid ${p.color}`, color: p.color }}
              >
                {p.step}
              </div>
              <h3 className="mb-2.5 text-base font-bold text-[#111827]">{p.title}</h3>
              <p className="text-[13px] leading-[1.8] text-[#6b7280]">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section style={{ background: "#f0f9ff", ...sectionPad }}>
      <div className="container">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#26ae90]">Why It Works</p>
            <h2 className="mb-5 text-[clamp(24px,4vw,36px)] font-extrabold leading-tight text-[#111827]">
              Integrated Strength, <span className="text-[#066a9c]">Specialised Expertise</span>
            </h2>
            <p className="mb-7 text-[15px] leading-[1.85] text-[#6b7280]">
              Because our businesses operate under one group, they collaborate to deliver more than
              any single service could on its own. You get specialised expertise backed by the
              strength and trust of a diversified group.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-[#066a9c] px-7 py-3.5 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#055780]"
            >
              Book Free Consultation →
            </Link>
          </div>
        </div>
      </div>
    </section>

    <section style={{ background: "linear-gradient(110deg, #066a9c 0%, #26ae90 100%)", ...sectionPad }}>
      <div className="container" style={{ textAlign: "center" }}>
        <h2 className="mb-4 text-[clamp(24px,4vw,40px)] font-extrabold text-white">
          Not Sure Which Business Is Right for You?
        </h2>
        <p className="mx-auto mb-9 max-w-[460px] text-base leading-[1.8] text-white/80">
          Our experts are ready to connect you with the right Indexia business for your needs. Book a free consultation today.
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 rounded-lg bg-[#f2f231] px-8 py-3.5 text-sm font-bold text-[#066a9c] shadow-[0_4px_16px_rgba(242,242,49,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#f7f75f]"
        >
          Book Free Consultation →
        </Link>
      </div>
    </section>
  </>
);

export default Services;
