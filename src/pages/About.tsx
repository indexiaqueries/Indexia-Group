import AboutHero from "../components/banners/AboutHero";
import SEO from "../components/common/SEO";
import customerImg from "../assets/customer-img.webp";
import productImg from "../assets/product-details.webp";

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

const sectionPad = { padding: "clamp(48px, 8vw, 88px) 0" };

const About = () => (
  <>
    <SEO
      title="About Us"
      description="Discover Indexia Group — a customer-focused financial services group delivering reliable, growth-oriented financial solutions for individuals and businesses across India since 2014."
      keywords="Indexia Group, about Indexia, financial services group India, financial advisory company, trusted financial partner"
      canonicalPath="/about"
    />

    <AboutHero />

    <section style={{ background: "#fff", ...sectionPad }}>
      <div className="container">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <div className="relative">
            <img
              src={customerImg}
              alt="Our clients"
              width={1536}
              height={1024}
              loading="lazy"
              decoding="async"
              className="w-full rounded-[20px] object-cover shadow-[0_16px_48px_rgba(6,106,156,0.16)]"
              style={{ maxHeight: "460px" }}
            />
            <div className="absolute -bottom-4 right-3 rounded-[14px] bg-[#26ae90] px-4 py-3 shadow-[0_8px_24px_rgba(38,174,144,0.3)] sm:-bottom-5 sm:right-0 sm:px-6 sm:py-4">
              <p className="text-2xl font-extrabold leading-none text-white sm:text-[26px]">500+</p>
              <p className="mt-0.5 text-xs font-semibold text-white/85">Happy Clients</p>
            </div>
          </div>

          <div>
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#26ae90]">Our Story</p>
            <h2 className="mb-5 text-[clamp(24px,4vw,38px)] font-extrabold leading-tight text-[#111827]">
              A Decade of <span className="text-[#066a9c]">Trusted Service</span>
            </h2>
            <p className="mb-3.5 text-[15px] leading-[1.85] text-[#6b7280]">
              Founded with a vision to bridge the gap between complex financial systems and everyday people, Indexia Group has spent over a decade building trust, delivering results, and supporting clients through every financial milestone.
            </p>
            <p className="mb-9 text-[15px] leading-[1.85] text-[#6b7280]">
              From startups to established enterprises, we&apos;ve helped hundreds navigate challenges, seize opportunities, and build lasting financial security.
            </p>
            <div className="flex flex-wrap gap-8 sm:gap-10">
              {[{ v: "500+", l: "Clients Served" }, { v: "10+", l: "Years Experience" }, { v: "₹100Cr+", l: "Assets Managed" }].map(s => (
                <div key={s.l}>
                  <p className="text-[28px] font-extrabold leading-none text-[#066a9c]">{s.v}</p>
                  <p className="mt-1 text-xs text-[#9ca3af]">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    <section style={{ background: "#f0f9ff", ...sectionPad }}>
      <div className="container">
        <div className="mx-auto mb-12 max-w-[540px] text-center sm:mb-14">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#26ae90]">What Drives Us</p>
          <h2 className="text-[clamp(24px,4vw,38px)] font-extrabold text-[#111827]">
            Mission, Vision & <span className="text-[#066a9c]">Values</span>
          </h2>
        </div>
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((v) => (
            <div key={v.title} className="shared-card accent-card">
              <div
                className="mb-5 flex h-[54px] w-[54px] items-center justify-center rounded-[14px] text-[26px]"
                style={{ background: `${v.color}18` }}
              >
                {v.icon}
              </div>
              <h3 className="mb-2.5 text-lg font-bold text-[#111827]">{v.title}</h3>
              <p className="text-sm leading-[1.8] text-[#6b7280]">{v.desc}</p>
              <div className="mt-5 h-[3px] w-10 rounded-sm" style={{ background: v.color }} />
            </div>
          ))}
        </div>
      </div>
    </section>

    <section style={{ background: "#fff", ...sectionPad }}>
      <div className="container">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#26ae90]">Our Platform</p>
            <h2 className="mb-5 text-[clamp(24px,4vw,38px)] font-extrabold leading-tight text-[#111827]">
              Technology-Driven <span className="text-[#066a9c]">Financial Tools</span>
            </h2>
            <p className="mb-7 text-[15px] leading-[1.85] text-[#6b7280]">
              We leverage modern technology to give our clients real-time visibility, transparent reporting, and direct access to expert advisors — all from a single, secure platform.
            </p>
            <ul className="flex flex-col gap-3">
              {["Secure client portal", "Real-time financial reporting", "Expert advisor access", "Personalised insights dashboard"].map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-[#374151]">
                  <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-[#26ae90] text-xs font-bold text-white">✓</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <img src={productImg} alt="Platform" width={1374} height={577} loading="lazy" decoding="async" className="w-full rounded-[20px] object-cover shadow-[0_16px_48px_rgba(0,0,0,0.12)]" />
          </div>
        </div>
      </div>
    </section>

    <section style={{ background: "#f0f9ff", ...sectionPad }}>
      <div className="container">
        <div className="mx-auto mb-12 max-w-[480px] text-center sm:mb-14">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#26ae90]">The People Behind It</p>
          <h2 className="text-[clamp(24px,4vw,38px)] font-extrabold text-[#111827]">
            Meet Our <span className="text-[#066a9c]">Team</span>
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m) => (
            <div
              key={m.name}
              className="rounded-2xl border border-[#e5e7eb] bg-white p-8 text-center shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(0,0,0,0.09)]"
            >
              <div
                className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full text-2xl font-extrabold text-white"
                style={{ background: m.color, boxShadow: `0 6px 20px ${m.color}40` }}
              >
                {m.initial}
              </div>
              <p className="text-[15px] font-bold text-[#111827]">{m.name}</p>
              <p className="mt-1 text-[13px] text-[#7b7b7b]">{m.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default About;
