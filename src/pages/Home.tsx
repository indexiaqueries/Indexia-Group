import { Link } from "react-router-dom";
import Banner from "../components/common/Banner";
import customerImg from "../assets/customer-img.png";
import productImg from "../assets/product-details.png";

const services = [
  {
    icon: "💼",
    title: "Financial Consulting",
    desc: "Expert advice to optimise financial decisions and build a stable, lasting foundation.",
    color: "#f2f231",
  },
  {
    icon: "📈",
    title: "Investment Planning",
    desc: "Smart, data-driven strategies tailored to your goals and risk appetite.",
    color: "#26ae90",
  },
  {
    icon: "🏢",
    title: "Business Solutions",
    desc: "Comprehensive tools and support to help businesses grow with confidence.",
    color: "#066a9c",
  },
];

const companies = [
  {
    name: "Indexia Finance",
    desc: "Personal financial guidance and structured support for individuals and small businesses.",
    accent: "#26ae90",
  },
  {
    name: "Indexia Finserve Pvt. Ltd.",
    desc: "Corporate headquarters handling broader financial strategy, multi-director leadership, and growth planning.",
    accent: "#066a9c",
  },
  {
    name: "Indexia Overseas Pvt. Ltd.",
    desc: "Global trade and logistics representation with a focus on cargo movement and international operations.",
    accent: "#286090",
  },
  {
    name: "Indexia Agro Bio Fertilizers Pvt. Ltd.",
    desc: "Agricultural and production-led business supporting sustainable growth through agri-based solutions.",
    accent: "#26ae90",
  },
  {
    name: "Indexia Securities",
    desc: "Protecting and strengthening the group’s core operations with a secure, reliable foundation.",
    accent: "#066a9c",
  },
  {
    name: "Indexia Foundation",
    desc: "Our NGO wing focused on community development, impact, and social responsibility.",
    accent: "#286090",
  },
  {
    name: "Indexia Warehouse",
    desc: "Logistics and warehousing support for storage, movement, and operational efficiency.",
    accent: "#26ae90",
  },
  {
    name: "Indexia Advertising",
    desc: "Brand visibility and outreach across highways, media, and public-facing campaigns.",
    accent: "#066a9c",
  },
];

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Business Owner",
    text: "Indexia Group completely transformed how we manage our finances. Incredibly professional and reliable.",
  },
  {
    name: "Priya Mehta",
    role: "Entrepreneur",
    text: "Their investment guidance helped us grow 3× in just two years. I can't recommend them enough.",
  },
  {
    name: "Arjun Patel",
    role: "Startup Founder",
    text: "Responsive, knowledgeable, and genuinely invested in our long-term success.",
  },
];

const stats = [
  { value: "500+", label: "Happy Clients", icon: "👥" },
  { value: "10+", label: "Years in Business", icon: "📅" },
  { value: "50+", label: "Expert Team", icon: "🏆" },
  { value: "98%", label: "Satisfaction Rate", icon: "⭐" },
];

const Home = () => (
  <>
    <Banner
      title="Building a Stronger Financial Future"
      description="Indexia Group delivers trusted financial solutions designed to empower individuals, businesses, and long-term growth across India."
      buttonText="Explore Our Services"
      buttonLink="/services"
    />

    <section className="bg-white py-20 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#26ae90]">
            Why Indexia
          </p>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
            A diversified group built on trust, growth, and long-term value.
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-600">
            We combine financial expertise, operational strength, and community-driven thinking to support clients and businesses at every stage.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {services.map((item) => (
            <div
              key={item.title}
              className="group rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div
                className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl text-3xl"
                style={{ backgroundColor: `${item.color}18` }}
              >
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{item.desc}</p>
              <div
                className="mt-6 h-1.5 w-12 rounded-full transition-all duration-300 group-hover:w-20"
                style={{ backgroundColor: item.color }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="bg-[#f8fcff] py-20 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative">
            <img
              src={customerImg}
              alt="Our clients"
              className="w-full rounded-[28px] object-cover shadow-[0_16px_48px_rgba(6,106,156,0.18)]"
            />
            <div className="absolute -bottom-6 right-4 rounded-2xl bg-[#066a9c] px-6 py-4 shadow-lg">
              <p className="text-3xl font-extrabold leading-none text-[#f2f231]">10+</p>
              <p className="mt-1 text-xs font-semibold text-white/90">Years of Trust</p>
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#26ae90]">
              About Indexia Group
            </p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
              A group of businesses working together with a shared vision.
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-600">
              Indexia Group is built around a multi-company ecosystem that brings together finance, trade, agriculture, logistics, security, social impact, and advertising under one trusted brand.
            </p>
            <p className="mt-4 text-base leading-8 text-slate-600">
              From single-director initiatives to large corporate operations, each entity plays a distinct role in supporting growth, stability, and visibility.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { v: "8", l: "Companies" },
                { v: "500+", l: "Clients" },
                { v: "98%", l: "Satisfaction" },
              ].map((s) => (
                <div key={s.l} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="text-2xl font-extrabold text-[#066a9c]">{s.v}</p>
                  <p className="mt-1 text-xs text-slate-500">{s.l}</p>
                </div>
              ))}
            </div>

            <Link
              to="/about"
              className="mt-8 inline-flex items-center rounded-full bg-[#066a9c] px-6 py-3 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#05557d] hover:shadow-lg"
            >
              Learn About Us →
            </Link>
          </div>
        </div>
      </div>
    </section>

    <section className="bg-white py-20 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#26ae90]">
              Our Companies
            </p>
            <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              The Indexia Group ecosystem
            </h2>
          </div>
          <Link to="/services" className="text-sm font-bold text-[#066a9c] hover:text-[#26ae90]">
            View All Services →
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {companies.map((company) => (
            <div
              key={company.name}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div
                className="mb-4 h-2 w-16 rounded-full"
                style={{ backgroundColor: company.accent }}
              />
              <h3 className="text-lg font-bold text-slate-900">{company.name}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{company.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="bg-[#f8fcff] py-20 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#26ae90]">
              How We Work
            </p>
            <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Smart tools and expert guidance for better decisions.
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-600">
              Our approach combines strategy, transparency, and support so clients can move forward with confidence across every financial and business need.
            </p>

            <ul className="mt-8 space-y-4">
              {[
                "Real-time portfolio tracking",
                "Personalised financial dashboard",
                "Direct advisor access",
                "Secure document management",
              ].map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm text-slate-700">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#26ae90] text-xs font-bold text-white">
                    ✓
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            <Link
              to="/services"
              className="mt-8 inline-flex items-center rounded-full bg-[#26ae90] px-6 py-3 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#20997e] hover:shadow-lg"
            >
              Explore Services →
            </Link>
          </div>

          <div>
            <img
              src={productImg}
              alt="Product details"
              className="w-full rounded-[28px] object-cover shadow-[0_16px_48px_rgba(0,0,0,0.14)]"
            />
          </div>
        </div>
      </div>
    </section>

    <section className="bg-gradient-to-r from-[#044e74] via-[#066a9c] to-[#286090] py-16">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <div className="mb-2 text-3xl">{s.icon}</div>
              <p className="text-4xl font-extrabold leading-none text-[#f2f231]">{s.value}</p>
              <p className="mt-3 text-sm font-medium text-white/75">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="bg-white py-20 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#26ae90]">
            What Clients Say
          </p>
          <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Real stories, real results.
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <div key={t.name} className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div
                className="absolute left-0 top-0 h-1 w-full"
                style={{ backgroundColor: i === 0 ? "#26ae90" : i === 1 ? "#066a9c" : "#286090" }}
              />
              <div className="mb-4 flex gap-1 text-[#f2f231]">
                {"★★★★★".split("").map((star, idx) => (
                  <span key={idx}>{star}</span>
                ))}
              </div>
              <p className="text-sm leading-8 italic text-slate-600">"{t.text}"</p>
              <div className="mt-6 flex items-center gap-3">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold text-white"
                  style={{ backgroundColor: i === 0 ? "#26ae90" : i === 1 ? "#066a9c" : "#286090" }}
                >
                  {t.name[0]}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="bg-gradient-to-r from-[#066a9c] to-[#26ae90] py-20">
      <div className="container mx-auto px-4 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#f2f231]">
          Take The First Step
        </p>
        <h2 className="mt-4 text-3xl font-extrabold text-white sm:text-5xl">
          Ready to build your financial future?
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/80">
          Talk to our experts today and take the first step toward smarter, more confident financial decisions.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            to="/contact"
            className="inline-flex items-center rounded-full bg-[#f2f231] px-7 py-3 text-sm font-bold text-[#066a9c] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#f7f75f] hover:shadow-lg"
          >
            Contact Us Now
          </Link>
          <Link
            to="/services"
            className="inline-flex items-center rounded-full border border-white/50 px-7 py-3 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/10"
          >
            View Services
          </Link>
        </div>
      </div>
    </section>
  </>
);

export default Home;