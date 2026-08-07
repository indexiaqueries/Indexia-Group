import { Link } from "react-router-dom";
import SEO from "../components/common/SEO";
import ServicesHero from "../components/services/ServicesHero";
import productImg from "../assets/product-details.png";

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

const Services = () => (
  <>
    <SEO
      title="Services"
      description="Explore Indexia Group's financial services — financial consulting, investment planning, business solutions, loan & credit advisory, and wealth protection for individuals and businesses across India."
      keywords="Indexia Group services, financial consulting India, investment planning, business solutions, loan advisory, wealth protection, financial services"
      canonicalPath="/services"
    />

    <ServicesHero />

    {/* ── Services Grid ── */}
    <section style={{ background: "#f0f9ff", padding: "88px 0" }}>
      <div className="container">
        <div style={{ textAlign: "center", maxWidth: "560px", margin: "0 auto 56px" }}>
          <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#26ae90", marginBottom: "12px" }}>Our Services</p>
          <h2 style={{ fontSize: "clamp(24px,4vw,38px)", fontWeight: 800, color: "#111827" }}>
            Everything You Need, <span style={{ color: "#066a9c" }}>All in One Place</span>
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px,1fr))", gap: "28px" }}>
          {services.map(s => (
            <div
              key={s.title}
              className="shared-card accent-card"
              style={{ "--card-color": s.color } as React.CSSProperties}
            >
              <div style={{ width: "58px", height: "58px", borderRadius: "14px", background: `${s.color}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px", marginBottom: "20px" }}>
                {s.icon}
              </div>
              <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#111827", marginBottom: "10px" }}>{s.title}</h3>
              <p style={{ fontSize: "14px", lineHeight: 1.8, color: "#6b7280", marginBottom: "20px" }}>{s.desc}</p>
              <ul style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "22px" }}>
                {s.features.map(f => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#374151" }}>
                    <span style={{ width: "20px", height: "20px", borderRadius: "50%", background: s.color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 700, flexShrink: 0 }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <div style={{ height: "3px", width: "40px", borderRadius: "2px", background: s.color }} />
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ── How it works ── */}
    <section style={{ background: "#fff", padding: "88px 0" }}>
      <div className="container">
        <div style={{ textAlign: "center", maxWidth: "520px", margin: "0 auto 56px" }}>
          <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#26ae90", marginBottom: "12px" }}>Our Process</p>
          <h2 style={{ fontSize: "clamp(24px,4vw,38px)", fontWeight: 800, color: "#111827" }}>
            How We <span style={{ color: "#066a9c" }}>Work With You</span>
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))", gap: "28px" }}>
          {process.map(p => (
            <div key={p.step} style={{ textAlign: "center", padding: "36px 24px", border: "1px solid #e5e7eb", borderRadius: "16px", background: "#fff" }}>
              <div style={{ width: "60px", height: "60px", borderRadius: "50%", background: `${p.color}18`, border: `2px solid ${p.color}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: "18px", fontWeight: 800, color: p.color }}>
                {p.step}
              </div>
              <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#111827", marginBottom: "10px" }}>{p.title}</h3>
              <p style={{ fontSize: "13px", lineHeight: 1.8, color: "#6b7280" }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ── Platform image strip ── */}
    <section style={{ background: "#f0f9ff", padding: "88px 0" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px,1fr))", gap: "64px", alignItems: "center" }}>
          <div>
            <img src={productImg} alt="Our platform" style={{ width: "100%", borderRadius: "20px", objectFit: "cover", boxShadow: "0 16px 48px rgba(0,0,0,0.12)" }} />
          </div>
          <div>
            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#26ae90", marginBottom: "12px" }}>Why It Works</p>
            <h2 style={{ fontSize: "clamp(24px,4vw,36px)", fontWeight: 800, color: "#111827", marginBottom: "18px" }}>
              Built for Results, <span style={{ color: "#066a9c" }}>Backed by Expertise</span>
            </h2>
            <p style={{ fontSize: "15px", lineHeight: 1.85, color: "#6b7280", marginBottom: "28px" }}>
              Every service we offer is designed around a single goal: your financial success. We combine cutting-edge tools with hands-on advisory to deliver real, measurable outcomes.
            </p>
            <Link to="/contact" style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "#066a9c", color: "#fff", fontWeight: 700, fontSize: "14px",
              padding: "13px 28px", borderRadius: "8px", textDecoration: "none",
            }}>
              Book Free Consultation →
            </Link>
          </div>
        </div>
      </div>
    </section>

    {/* ── CTA ── */}
    <section style={{ background: "linear-gradient(110deg, #066a9c 0%, #26ae90 100%)", padding: "88px 0" }}>
      <div className="container" style={{ textAlign: "center" }}>
        <h2 style={{ fontSize: "clamp(24px,4vw,40px)", fontWeight: 800, color: "#fff", marginBottom: "16px" }}>
          Not Sure Which Service Is Right for You?
        </h2>
        <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.82)", maxWidth: "460px", margin: "0 auto 36px", lineHeight: 1.8 }}>
          Our experts are ready to help you find the perfect fit. Book a free consultation today.
        </p>
        <Link to="/contact" style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          background: "#f2f231", color: "#066a9c", fontWeight: 700, fontSize: "14px",
          padding: "14px 32px", borderRadius: "8px", textDecoration: "none",
          boxShadow: "0 4px 16px rgba(242,242,49,0.35)",
        }}>
          Book Free Consultation →
        </Link>
      </div>
    </section>
  </>
);

export default Services;
