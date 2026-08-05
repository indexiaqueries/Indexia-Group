import { Link } from "react-router-dom";
import footerBg from "../../assets/footer-img.png";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiClock,
  FiLinkedin,
  FiTwitter,
  FiFacebook,
} from "react-icons/fi";

const quickLinks = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Contact Us", path: "/contact" },
];

const services = [
  "Financial Consulting",
  "Investment Planning",
  "Business Solutions",
  "Loan & Credit Advisory",
  "Wealth Protection",
];

const socials = [
  { icon: FiLinkedin, href: "#" },
  { icon: FiTwitter, href: "#" },
  { icon: FiFacebook, href: "#" },
];

const contactInfo = [
  { icon: FiMail, text: "info@indexiagroup.com" },
  { icon: FiPhone, text: "+91 00000 00000" },
  { icon: FiMapPin, text: "India" },
  { icon: FiClock, text: "Mon–Sat: 9AM–6PM" },
];

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-[#044e74] text-white">
      <div className="absolute inset-0">
        <img
          src={footerBg}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-center opacity-[0.3] select-none pointer-events-none"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="rounded-3xl border border-white/12 bg-white/5 p-8 shadow-[0_12px_40px_rgba(2,16,26,0.18)] backdrop-blur-[14px] sm:p-10 lg:p-12">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <Link
                to="/"
                className="inline-flex items-baseline gap-1 text-2xl font-extrabold tracking-tight transition-opacity duration-200 hover:opacity-90"
              >
                <span className="text-[#f2f231]">Indexia</span>
                <span className="text-white">Group</span>
              </Link>

              <p className="mt-4 max-w-sm text-sm leading-7 text-white/68">
                Helping businesses and individuals build a stronger financial future with trusted, result-driven solutions.
              </p>

              <div className="mt-6 flex items-center gap-3">
                {socials.map((s) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={s.href}
                      href={s.href}
                      aria-label="social link"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#26ae90] hover:border-[#26ae90] hover:shadow-lg"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-white/95">
                Quick Links
              </h3>
              <div className="mt-3 h-1 w-10 rounded-full bg-[#26ae90]" />

              <ul className="mt-6 space-y-3">
                {quickLinks.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.path}
                      className="group inline-flex items-center gap-2 text-sm text-white/70 transition-all duration-200 hover:text-[#f2f231]"
                    >
                      <span className="text-[#26ae90] transition-transform duration-200 group-hover:translate-x-1">
                        ›
                      </span>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-white/95">
                Our Services
              </h3>
              <div className="mt-3 h-1 w-10 rounded-full bg-[#26ae90]" />

              <ul className="mt-6 space-y-3">
                {services.map((service) => (
                  <li
                    key={service}
                    className="group inline-flex items-center gap-2 text-sm text-white/70 transition-colors duration-200 hover:text-[#f2f231]"
                  >
                    <span className="text-[#26ae90] transition-transform duration-200 group-hover:translate-x-1">
                      ›
                    </span>
                    {service}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-white/95">
                Contact Us
              </h3>
              <div className="mt-3 h-1 w-10 rounded-full bg-[#26ae90]" />

              <div className="mt-6 space-y-4">
                {contactInfo.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.text} className="flex items-start gap-3 text-sm text-white/70">
                      <span className="mt-0.5 text-[#26ae90]">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span>{item.text}</span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/95">
                  Stay Updated
                </p>

                <form className="mt-3 flex overflow-hidden rounded-full border border-white/15 bg-white/10 shadow-sm">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-white/45"
                  />
                  <button
                    type="submit"
                    className="rounded-full bg-[#f2f231] px-5 py-3 text-sm font-bold text-[#1f2000] transition-all duration-200 hover:bg-[#f7f75f] hover:shadow-lg"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 border-t border-white/10 bg-[#033c58]/50">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-5 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>© 2026 Indexia Group. All rights reserved.</p>

          <div className="flex flex-wrap gap-5">
            <a href="#" className="transition-colors hover:text-[#f2f231]">
              Privacy Policy
            </a>
            <a href="#" className="transition-colors hover:text-[#f2f231]">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;