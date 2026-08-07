import { Link } from "react-router-dom";
import SEO from "../components/common/SEO";
import ServicesHero from "../components/banners/ServicesHero";
import productImg from "../assets/product-details.webp";

const services = [
  { icon: "💼", title: "Financial Consulting",   desc: "Professional, personalised guidance to help you make smarter financial decisions and achieve long-term stability.", features: ["Budget Planning", "Risk Assessment", "Tax Advisory"],           color: "#26ae90" },
  { icon: "📈", title: "Investment Planning",    desc: "Data-driven investment strategies crafted around your goals, timeline, and specific risk tolerance.",                features: ["Portfolio Management", "Equity & Debt", "Mutual Funds"],       color: "#066a9c" },
  { icon: "🏢", title: "Business Solutions",     desc: "End-to-end business support — from strategy to execution — to scale your operations with full confidence.",         features: ["Business Strategy", "Operational Support", "Growth Planning"],  color: "#286090" },
  { icon: "🤝", title: "Dedicated Support",      desc: "Our relationship managers are always available to guide you through every step of your financial journey.",          features: ["1-on-1 Consultations", "24/7 Helpdesk", "Progress Tracking"],   color: "#26ae90" },
  { icon: "🏦", title: "Loan & Credit Advisory", desc: "Navigate loans, credit facilities, and financing options with trusted expert advisory at your side.",                features: ["Loan Structuring", "Credit Improvement", "EMI Planning"],        color: "#066a9c" },
  { icon: "🔒", title: "Wealth Protection",      desc: "Safeguard your assets and future with comprehensive insurance and estate planning solutions.",                        features: ["Insurance Planning", "Estate Planning", "Asset Protection"],     color: "#286090" },
];

const process = [
  { step: "01", title: "Initial Consultation",  desc: "We start with a free consultation to understand your financial goals and current situation.",  color: "#26ae90" },
  { step: "02", title: "Personalised Strategy", desc: "Our experts craft a tailored financial strategy aligned precisely with your goals.",             color: "#066a9c" },
  { step: "03", title: "Implementation",        desc: "We implement the strategy with full transparency and keep you informed at every step.",          color: "#286090" },
  { step: "04", title: "Ongoing Support",       desc: "Continuous monitoring, reporting, and refinement to ensure you stay on track.",                 color: "#26ae90" },
];

const sectionPad = { padding: "clamp(48px, 8vw, 88px) 0" };

const Services = () => (
  <>
    <SEO
      title="Services"
      description="Explore Indexia Group's financial services — financial consulting, investment planning, business solutions, loan & credit advisory, and wealth protection for individuals and businesses across India."
      keywords="Indexia Group services, financial consulting India, investment planning, business solutions, loan advisory, wealth protection, financial services"
      canonicalPath="/services"
    />

    <ServicesHero />

    <section style={{ background: "#f0f9ff", ...sectionPad }}>
      <div className="container">
        <div className="mx-auto mb-12 max-w-[560px] text-center sm:mb-14">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#26ae90]">Our Services</p>
          <h2 className="text-[clamp(24px,4vw,38px)] font-extrabold text-[#111827]">
            Everything You Need, <span className="text-[#066a9c]">All in One Place</span>
          </h2>
        </div>
        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.title}
              className="shared-card accent-card"
              style={{ "--card-color": s.color } as React.CSSProperties}
            >
              <div
                className="mb-5 flex h-[58px] w-[58px] items-center justify-center rounded-[14px] text-[28px]"
                style={{ background: `${s.color}18` }}
              >
                {s.icon}
              </div>
              <h3 className="mb-2.5 text-lg font-bold text-[#111827]">{s.title}</h3>
              <p className="mb-5 text-sm leading-[1.8] text-[#6b7280]">{s.desc}</p>
              <ul className="mb-5 flex flex-col gap-2">
                {s.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-[13px] text-[#374151]">
                    <span
                      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white"
                      style={{ background: s.color }}
                    >
                      ✓
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <div className="h-[3px] w-10 rounded-sm" style={{ background: s.color }} />
            </div>
          ))}
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
            <img src={productImg} alt="Our platform" width={1374} height={577} loading="lazy" decoding="async" className="w-full rounded-[20px] object-cover shadow-[0_16px_48px_rgba(0,0,0,0.12)]" />
          </div>
          <div>
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#26ae90]">Why It Works</p>
            <h2 className="mb-5 text-[clamp(24px,4vw,36px)] font-extrabold leading-tight text-[#111827]">
              Built for Results, <span className="text-[#066a9c]">Backed by Expertise</span>
            </h2>
            <p className="mb-7 text-[15px] leading-[1.85] text-[#6b7280]">
              Every service we offer is designed around a single goal: your financial success. We combine cutting-edge tools with hands-on advisory to deliver real, measurable outcomes.
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
          Not Sure Which Service Is Right for You?
        </h2>
        <p className="mx-auto mb-9 max-w-[460px] text-base leading-[1.8] text-white/80">
          Our experts are ready to help you find the perfect fit. Book a free consultation today.
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
