import customerImg from "../assets/customer-img.png";

const contactInfo = [
  { icon: "✉", label: "Email Us",       value: "info@indexiagroup.com",  color: "#26ae90" },
  { icon: "✆", label: "Call Us",        value: "+91 00000 00000",         color: "#066a9c" },
  { icon: "⊙", label: "Location",       value: "India",                   color: "#286090" },
  { icon: "🕐", label: "Working Hours", value: "Mon – Sat: 9AM – 6PM",   color: "#26ae90" },
];

const inputStyle: React.CSSProperties = {
  width: "100%",
  border: "1.5px solid #e5e7eb",
  borderRadius: "8px",
  padding: "12px 16px",
  fontSize: "14px",
  outline: "none",
  background: "#fff",
  color: "#111827",
  transition: "border-color 0.2s, box-shadow 0.2s",
  fontFamily: "inherit",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.12em",
  textTransform: "uppercase" as const,
  color: "#6b7280",
  marginBottom: "6px",
};

const Contact = () => (
  <>
    {/* ── Hero ── */}
    <section style={{ background: "linear-gradient(110deg, #044e74 0%, #066a9c 55%, #286090 100%)", padding: "88px 0" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))", gap: "48px", alignItems: "center" }}>
          <div>
            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#f2f231", marginBottom: "14px" }}>Get In Touch</p>
            <h1 style={{ fontSize: "clamp(28px,5vw,52px)", fontWeight: 800, color: "#fff", lineHeight: 1.15, marginBottom: "18px" }}>
              Let's Start a Conversation
            </h1>
            <p style={{ fontSize: "16px", lineHeight: 1.8, color: "rgba(255,255,255,0.82)", maxWidth: "440px" }}>
              Share your requirements and our team will get back to you within 24 hours with a personalised response.
            </p>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              src={customerImg}
              alt="Contact us"
              style={{ width: "100%", maxWidth: "380px", borderRadius: "20px", objectFit: "cover", maxHeight: "300px", boxShadow: "0 16px 48px rgba(0,0,0,0.25)", opacity: 0.92 }}
            />
          </div>
        </div>
      </div>
    </section>

    {/* ── Contact Content ── */}
    <section style={{ background: "#fff", padding: "88px 0" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px,1fr))", gap: "64px", alignItems: "start" }}>

          {/* ── Info panel ── */}
          <div>
            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#26ae90", marginBottom: "12px" }}>Contact Information</p>
            <h2 style={{ fontSize: "clamp(22px,3.5vw,34px)", fontWeight: 800, color: "#111827", marginBottom: "16px" }}>
              We're Here to <span style={{ color: "#066a9c" }}>Help You</span>
            </h2>
            <p style={{ fontSize: "15px", lineHeight: 1.85, color: "#6b7280", marginBottom: "40px" }}>
              Whether you have a question about our services, pricing, or need guidance — our team is ready to answer every question.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "24px", marginBottom: "40px" }}>
              {contactInfo.map(info => (
                <div key={info.label} style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                  <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: info.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", color: "#fff", flexShrink: 0, boxShadow: `0 4px 14px ${info.color}35` }}>
                    {info.icon}
                  </div>
                  <div>
                    <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#9ca3af" }}>{info.label}</p>
                    <p style={{ fontSize: "15px", fontWeight: 600, color: "#111827", marginTop: "2px" }}>{info.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social */}
            <p style={{ fontSize: "12px", fontWeight: 700, color: "#374151", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.08em" }}>Follow Us</p>
            <div style={{ display: "flex", gap: "10px" }}>
              {["LinkedIn", "Twitter", "Facebook"].map(s => (
                <a key={s} href="#" style={{
                  padding: "9px 16px", background: "#066a9c", color: "#fff",
                  borderRadius: "8px", fontSize: "12px", fontWeight: 700,
                  textDecoration: "none", transition: "background 0.2s",
                }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#26ae90")}
                  onMouseLeave={e => (e.currentTarget.style.background = "#066a9c")}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* ── Form ── */}
          <div style={{ background: "#f0f9ff", borderRadius: "20px", padding: "40px 36px", boxShadow: "0 4px 24px rgba(6,106,156,0.08)" }}>
            <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#111827", marginBottom: "6px" }}>Send Us a Message</h3>
            <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "28px" }}>Fill in the form and we'll respond within 24 hours.</p>

            <form style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={labelStyle}>Your Name</label>
                  <input type="text" placeholder="e.g. Rahul Sharma" style={inputStyle}
                    onFocus={e => { e.currentTarget.style.borderColor = "#26ae90"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(38,174,144,0.12)"; }}
                    onBlur={e => { e.currentTarget.style.borderColor = "#e5e7eb"; e.currentTarget.style.boxShadow = "none"; }} />
                </div>
                <div>
                  <label style={labelStyle}>Phone Number</label>
                  <input type="tel" placeholder="+91 00000 00000" style={inputStyle}
                    onFocus={e => { e.currentTarget.style.borderColor = "#26ae90"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(38,174,144,0.12)"; }}
                    onBlur={e => { e.currentTarget.style.borderColor = "#e5e7eb"; e.currentTarget.style.boxShadow = "none"; }} />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Email Address</label>
                <input type="email" placeholder="you@example.com" style={inputStyle}
                  onFocus={e => { e.currentTarget.style.borderColor = "#26ae90"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(38,174,144,0.12)"; }}
                  onBlur={e => { e.currentTarget.style.borderColor = "#e5e7eb"; e.currentTarget.style.boxShadow = "none"; }} />
              </div>

              <div>
                <label style={labelStyle}>Service Interested In</label>
                <select style={inputStyle}
                  onFocus={e => { e.currentTarget.style.borderColor = "#26ae90"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(38,174,144,0.12)"; }}
                  onBlur={e => { e.currentTarget.style.borderColor = "#e5e7eb"; e.currentTarget.style.boxShadow = "none"; }}>
                  <option value="">Select a service</option>
                  <option>Financial Consulting</option>
                  <option>Investment Planning</option>
                  <option>Business Solutions</option>
                  <option>Loan & Credit Advisory</option>
                  <option>Wealth Protection</option>
                </select>
              </div>

              <div>
                <label style={labelStyle}>Your Message</label>
                <textarea rows={4} placeholder="Tell us how we can help..."
                  style={{ ...inputStyle, resize: "none" }}
                  onFocus={e => { e.currentTarget.style.borderColor = "#26ae90"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(38,174,144,0.12)"; }}
                  onBlur={e => { e.currentTarget.style.borderColor = "#e5e7eb"; e.currentTarget.style.boxShadow = "none"; }} />
              </div>

              <button type="submit" style={{
                background: "linear-gradient(110deg, #066a9c 0%, #26ae90 100%)",
                color: "#fff", fontWeight: 700, fontSize: "15px",
                padding: "14px", borderRadius: "8px", border: "none",
                cursor: "pointer", width: "100%",
                boxShadow: "0 4px 16px rgba(6,106,156,0.3)",
                transition: "opacity 0.2s, transform 0.15s",
              }}
                onMouseEnter={e => { (e.currentTarget).style.opacity = "0.92"; (e.currentTarget).style.transform = "translateY(-1px)"; }}
                onMouseLeave={e => { (e.currentTarget).style.opacity = "1"; (e.currentTarget).style.transform = "none"; }}
              >
                Send Message →
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  </>
);

export default Contact;
