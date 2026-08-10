import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import AboutHero from "../components/banners/AboutHero";
import SEO from "../components/common/SEO";
import GroupImg from "../assets/company-images/IndexiaGroup.png";

const values = [
  { icon: "🎯", title: "Our Mission", desc: "To build and run diverse businesses that solve real problems across finance, trade, agriculture, logistics, security, sports, and media — creating value for clients, partners, and communities.", color: "#26ae90" },
  { icon: "👁️", title: "Our Vision",  desc: "To be a trusted, diversified group known for integrity, expertise, and a people-first approach in every industry we operate.",          color: "#066a9c" },
  { icon: "💡", title: "Our Values",  desc: "Transparency, responsibility, and innovation drive everything we do. Success is measured by the lasting impact we create together.",     color: "#286090" },
];

const units = [
  { name: "Indexia Finance", tag: "Financial Advisory", desc: "Strategic planning, funding, and high-level financial decision-making.", color: "#26ae90" },
  { name: "Indexia Finserve", tag: "Corporate Finance", desc: "Investment planning, wealth management, and business solutions.", color: "#066a9c" },
  { name: "Indexia Securities", tag: "Bodyguard & Security", desc: "Professional bodyguard, bouncer, and event security services.", color: "#286090" },
  { name: "Indexia Overseas", tag: "Global Trade", desc: "Cross-border trade and logistics connecting local to international markets.", color: "#e6b658" },
  { name: "Agro Bio Fertilizers", tag: "Sustainable Farming", desc: "Bio-based fertilizers that raise yields while protecting the land.", color: "#26ae90" },
  { name: "Indexia Warehouse", tag: "Logistics Infrastructure", desc: "Modern warehousing facilities near key ports for smooth supply chains.", color: "#066a9c" },
  { name: "Indexia Foundation", tag: "Athlete Support", desc: "Sports programs that train, mentor, and fund athletes.", color: "#286090" },
  { name: "Indexia Advertising", tag: "Brand & Media", desc: "High-impact advertising and brand visibility across media channels.", color: "#e6b658" },
];

const sectionPad = { padding: "clamp(48px, 8vw, 88px) 0" };

type CounterProps = {
  value: string;
  label: string;
  color?: string;
};

const Counter = ({ value, label, color = "#066a9c" }: CounterProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const suffix = value.replace(/[\d.,]/g, "");
    const target = parseFloat(value.replace(/[^\d.,]/g, "").replace(/,/g, ""));
    if (Number.isNaN(target)) {
      setDisplay(value);
      return;
    }
    const duration = 1400;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(target * eased);
      setDisplay(`${current.toLocaleString()}${suffix}`);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <div ref={ref}>
      <p className="text-[28px] font-extrabold leading-none" style={{ color }}>{display}</p>
      <p className="mt-1 text-xs text-[#9ca3af]">{label}</p>
    </div>
  );
};

const About = () => (
  <>
    <SEO
      title="About Us"
      description="Indexia Group is a diversified holding of eight companies spanning finance, trade, agriculture, logistics, security, sports, and advertising — building businesses that empower clients, partners, and communities."
      keywords="Indexia Group, about Indexia, diversified business group India, financial services, trade and logistics, agro fertilizers, security, athlete support, advertising"
      canonicalPath="/about"
    />

    <AboutHero />

    <section style={{ background: "#fff", ...sectionPad }}>
      <div className="container">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <div className="relative">
            <img
              src={GroupImg}
              alt="Indexia Group"
              width={1536}
              height={1024}
              loading="lazy"
              decoding="async"
              className="w-full rounded-[20px] object-cover shadow-[0_16px_48px_rgba(6,106,156,0.16)]"
              style={{ maxHeight: "460px" }}
            />
            <div className="absolute -bottom-4 right-3 rounded-[14px] bg-[#26ae90] px-4 py-3 shadow-[0_8px_24px_rgba(38,174,144,0.3)] sm:-bottom-5 sm:right-0 sm:px-6 sm:py-4">
              <p className="text-2xl font-extrabold leading-none text-white sm:text-[26px]">8</p>
              <p className="mt-0.5 text-xs font-semibold text-white/85">Group Companies</p>
            </div>
          </div>

          <div>
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#26ae90]">Our Story</p>
            <h2 className="mb-5 text-[clamp(24px,4vw,38px)] font-extrabold leading-tight text-[#111827]">
              A Group Built on <span className="text-[#066a9c]">Diversity & Trust</span>
            </h2>
            <p className="mb-3.5 text-[15px] leading-[1.85] text-[#6b7280]">
              Indexia Group began with a simple belief: that focused, well-run businesses across
              different industries can create far more value together than apart. Today we operate
              eight companies spanning finance, trade, agriculture, logistics, security, sports, and
              advertising.
            </p>
            <p className="mb-9 text-[15px] leading-[1.85] text-[#6b7280]">
              From our corporate office in Mumbai with branches in Delhi, Surat, and Ecuador, we
              help individuals and enterprises move with confidence — supporting them at every stage
              of their journey.
            </p>
            <div className="flex flex-wrap gap-8 sm:gap-10">
              <Counter value="500+" label="Clients Served" />
              <Counter value="8" label="Businesses" color="#26ae90" />
              <Counter value="4+" label="Locations" color="#286090" />
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
        <div className="mx-auto mb-12 max-w-[640px] text-center sm:mb-14">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#26ae90]">Our Businesses</p>
          <h2 className="text-[clamp(24px,4vw,38px)] font-extrabold text-[#111827]">
            Eight Companies, <span className="text-[#066a9c]">One Group</span>
          </h2>
        </div>
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {units.map((u) => (
            <div key={u.name} className="shared-card accent-card !p-6" style={{ "--card-color": u.color } as React.CSSProperties}>
              <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: u.color }}>{u.tag}</p>
              <h3 className="mb-2 text-lg font-bold leading-snug text-[#111827]">{u.name}</h3>
              <p className="text-sm leading-[1.7] text-[#6b7280]">{u.desc}</p>
              <div className="mt-4 h-[3px] w-10 rounded-sm" style={{ background: u.color }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default About;

