import { Link } from "react-router-dom";
import customerImg from "../assets/customer-img.png";
import productImg  from "../assets/product-details.png";

const values = [
  { icon: "🎯", title: "Our Mission", desc: "To provide accessible, reliable, and impactful financial solutions that empower individuals and businesses across India.", color: "#26ae90" },
  { icon: "👁️", title: "Our Vision",  desc: "To become India's most trusted financial partner — known for integrity, expertise, and a client-first approach.",          color: "#066a9c" },
  { icon: "💡", title: "Our Values",  desc: "Transparency, dedication, and innovation drive everything we do. Client success sits at the heart of every decision.",     color: "#286090" },
];

const team = [
  { name: "Ankit Verma",  role: "Founder & CEO",      initial: "A", color: "#26ae90" },
  { name: "Sneha Joshi",  role: "Head of Finance",     initial: "S", color: "#066a9c" },
  { name: "Rohit Kumar",  role: "Business Strategist", initial: "R", color: "#286090" },
  { name: "Neha Singh",   role: "Client Relations",    initial: "N", color: "#26ae90" },
];

const About = () => (
  <>

    {/* ── Hero ── */}
    <section style={{ background: "linear-gradient(110deg, #044e74 0%, #066a9c 55%, #286090 100%)", padding: "88px 0" }}>
      <div className="container" style={{ textAlign: "center" }}>
        <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#f2f231", marginBottom: "14px" }}>
          About Indexia Group
        </p>
        <h1 style={{ fontSize: "clamp(30px,5vw,54px)", fontWeight: 800, color: "#fff", lineHeight: 1.15, marginBottom: "20px" }}>
          Creating Better Financial Opportunities
        </h1>
        <p style={{ fontSize: "17px", lineHeight: 1.8, color: "rgba(255,255,255,0.82)", maxWidth: "580px", margin: "0 auto 32px" }}>
          A customer-focused financial services company committed to delivering reliable, growth-oriented solutions for individuals and businesses.
        </p>
        <Link to="/contact" style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          background: "#26ae90", color: "#fff", fontWeight: 700, fontSize: "14px",
          padding: "13px 28px", borderRadius: "8px", textDecoration: "none",
        }}>
          Talk to Us →
        </Link>
      </div>
    </section>

    {/* ── Story ── */}
    <section style={{ background: "#fff", padding: "88px 0" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px,1fr))", gap: "64px", alignItems: "center" }}>
          {/* Image */}
          <div style={{ position: "relative" }}>
            <img
              src={customerImg}
              alt="Our clients"
              style={{ width: "100%", borderRadius: "20px", objectFit: "cover", maxHeight: "460px", boxShadow: "0 16px 48px rgba(6,106,156,0.16)" }}
            />
            <div style={{
              position: "absolute", bottom: "-18px", right: "-12px",
              background: "#26ae90", borderRadius: "14px",
              padding: "16px 22px", boxShadow: "0 8px 24px rgba(38,174,144,0.3)",
            }}>
              <p style={{ fontSize: "26px", fontWeight: 800, color: "#fff", lineHeight: 1 }}>500+</p>
              <p style={{ fontSize: "12px", fontWeight: 600, color: "rgba(255,255,255,0.85)", marginTop: "2px" }}>Happy Clients</p>
            </div>
          </div>

          {/* Text */}
          <div>
            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#26ae90", marginBottom: "12px" }}>Our Story</p>
            <h2 style={{ fontSize: "clamp(24px,4vw,38px)", fontWeight: 800, color: "#111827", marginBottom: "20px" }}>
              A Decade of <span style={{ color: "#066a9c" }}>Trusted Service</span>
            </h2>
            <p style={{ fontSize: "15px", lineHeight: 1.85, color: "#6b7280", marginBottom: "14px" }}>
              Founded with a vision to bridge the gap between complex financial systems and everyday people, Indexia Group has spent over a decade building trust, delivering results, and supporting clients through every financial milestone.
            </p>
            <p style={{ fontSize: "15px", lineHeight: 1.85, color: "#6b7280", marginBottom: "36px" }}>
              From startups to established enterprises, we've helped hundreds navigate challenges, seize opportunities, and build lasting financial security.
            </p>
            <div style={{ display: "flex", gap: "36px", flexWrap: "wrap" }}>
              {[{ v: "500+", l: "Clients Served" }, { v: "10+", l: "Years Experience" }, { v: "₹100Cr+", l: "Assets Managed" }].map(s => (
                <div key={s.l}>
                  <p style={{ fontSize: "28px", fontWeight: 800, color: "#066a9c", lineHeight: 1 }}>{s.v}</p>
                  <p style={{ fontSize: "12px", color: "#9ca3af", marginTop: "4px" }}>{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ── Values ── */}
    <section style={{ background: "#f0f9ff", padding: "88px 0" }}>
      <div className="container">
        <div style={{ textAlign: "center", maxWidth: "540px", margin: "0 auto 52px" }}>
          <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#26ae90", marginBottom: "12px" }}>What Drives Us</p>
          <h2 style={{ fontSize: "clamp(24px,4vw,38px)", fontWeight: 800, color: "#111827" }}>
            Mission, Vision & <span style={{ color: "#066a9c" }}>Values</span>
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))", gap: "28px" }}>
          {values.map(v => (
            <div key={v.title} className="shared-card accent-card">
              <div style={{ width: "54px", height: "54px", borderRadius: "14px", background: `${v.color}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "26px", marginBottom: "20px" }}>
                {v.icon}
              </div>
              <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#111827", marginBottom: "10px" }}>{v.title}</h3>
              <p style={{ fontSize: "14px", lineHeight: 1.8, color: "#6b7280" }}>{v.desc}</p>
              <div style={{ marginTop: "22px", width: "40px", height: "3px", borderRadius: "2px", background: v.color }} />
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ── How we work (product image) ── */}
    <section style={{ background: "#fff", padding: "88px 0" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px,1fr))", gap: "64px", alignItems: "center" }}>
          <div>
            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#26ae90", marginBottom: "12px" }}>Our Platform</p>
            <h2 style={{ fontSize: "clamp(24px,4vw,38px)", fontWeight: 800, color: "#111827", marginBottom: "18px" }}>
              Technology-Driven <span style={{ color: "#066a9c" }}>Financial Tools</span>
            </h2>
            <p style={{ fontSize: "15px", lineHeight: 1.85, color: "#6b7280", marginBottom: "28px" }}>
              We leverage modern technology to give our clients real-time visibility, transparent reporting, and direct access to expert advisors — all from a single, secure platform.
            </p>
            <ul style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {["Secure client portal", "Real-time financial reporting", "Expert advisor access", "Personalised insights dashboard"].map(f => (
                <li key={f} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "#374151" }}>
                  <span style={{ width: "22px", height: "22px", borderRadius: "50%", background: "#26ae90", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 700, flexShrink: 0 }}>✓</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <img src={productImg} alt="Platform" style={{ width: "100%", borderRadius: "20px", objectFit: "cover", boxShadow: "0 16px 48px rgba(0,0,0,0.12)" }} />
          </div>
        </div>
      </div>
    </section>

    {/* ── Team ── */}
    <section style={{ background: "#f0f9ff", padding: "88px 0" }}>
      <div className="container">
        <div style={{ textAlign: "center", maxWidth: "480px", margin: "0 auto 52px" }}>
          <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#26ae90", marginBottom: "12px" }}>The People Behind It</p>
          <h2 style={{ fontSize: "clamp(24px,4vw,38px)", fontWeight: 800, color: "#111827" }}>
            Meet Our <span style={{ color: "#066a9c" }}>Team</span>
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))", gap: "24px" }}>
          {team.map(m => (
            <div key={m.name} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "16px", padding: "36px 24px", textAlign: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", transition: "box-shadow 0.25s, transform 0.25s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 28px rgba(0,0,0,0.09)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)"; (e.currentTarget as HTMLDivElement).style.transform = "none"; }}
            >
              <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: m.color, color: "#fff", fontWeight: 800, fontSize: "24px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", boxShadow: `0 6px 20px ${m.color}40` }}>
                {m.initial}
              </div>
              <p style={{ fontSize: "15px", fontWeight: 700, color: "#111827" }}>{m.name}</p>
              <p style={{ fontSize: "13px", color: "#7b7b7b", marginTop: "4px" }}>{m.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default About;
