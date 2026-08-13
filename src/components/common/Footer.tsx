import { Link } from "react-router-dom";
import footerBg from "../../assets/footer-img.webp";
import logo from "../../assets/IndexiaGroup_Logo.gif";
import { ArrowUp, Mail, Phone, MapPin, Clock } from "lucide-react";
import { phoneNumbers, branches } from "../../data/contact";

const linkGroups = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Indexia Group", href: "/" },
      { label: "Group Website", href: "https://www.indexiagroup.com/", external: true },
      { label: "Advertise With Us", href: "/contact" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Careers", href: "/contact" },
      { label: "Product & Services", href: "/businesses" },
      { label: "Terms of Use", href: "#" },
      { label: "Terms & Conditions", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "News & Knowledge Centre", href: "/contact" },
      { label: "Global Research", href: "https://www.indexiafinance.com/", external: true },
      { label: "Security Tips", href: "https://www.indexiafinance.com/", external: true },
      { label: "Track Your Application", href: "https://www.indexiafinance.com/", external: true },
      { label: "Blog", href: "https://www.indexiafinance.com/", external: true },
    ],
  },
];

const headOffice = branches[0];

const contactInfo = [
  { icon: Mail, text: "contactus@indexiagroup.com", href: "mailto:contactus@indexiagroup.com" },
  { icon: Phone, text: phoneNumbers[0]?.number ?? "+91 011 4629 1155", href: phoneNumbers[0]?.href ?? "tel:+911146291155" },
  { icon: MapPin, text: "Mumbai · Delhi · Ecuador", href: "/contact" },
  { icon: Clock, text: "Mon - Sat: 9 AM - 6 PM", href: undefined },
];

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-[#044e74] text-white">
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className="absolute bottom-20 right-5 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-[#f2f231] text-[#044e74] shadow-[0_8px_24px_rgba(2,16,26,0.35)] transition-all duration-200 hover:-translate-y-1 hover:shadow-xl sm:right-8"
      >
        <ArrowUp className="h-5 w-5" strokeWidth={2.5} />
      </button>
      <div className="absolute inset-0">
        <img
          src={footerBg}
          alt=""
          aria-hidden="true"
          width={1376}
          height={678}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-center opacity-[0.3] select-none pointer-events-none"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="rounded-3xl border border-white/12 bg-white/5 p-6 shadow-[0_12px_40px_rgba(2,16,26,0.18)] backdrop-blur-[14px] sm:p-10 lg:p-12">
          <div className="flex flex-col gap-y-10 sm:flex-row sm:flex-wrap sm:items-start sm:justify-evenly sm:gap-x-8">
            <div className="sm:w-[calc(50%-1rem)] lg:w-auto">
              <div className="text-2xl font-extrabold flex flex-col items-center sm:items-start">
                <img src={logo} alt="Indexia Group logo" width={112} height={112} className="h-24 object-contain sm:h-28"/>
                <div className="flex flex-row items-center gap-1">
                  <span className="text-[#f2f231]">Indexia</span>
                  <span className="text-white">Group</span>
                </div>
              </div>

              <p className="mt-6 max-w-sm text-sm leading-7 text-white/68">
                Helping businesses and individuals build a stronger financial future with trusted, result-driven solutions.
              </p>
            </div>

            <div className="sm:w-[calc(50%-1rem)] lg:w-auto">
              <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-white/95">
                Head Office
              </h3>
              <div className="mt-3 h-1 w-10 rounded-full bg-[#26ae90]" />

              <div className="mt-6 space-y-4">
                <span className="flex items-start gap-3 text-sm leading-6 text-white/70">
                  <span className="mt-0.5 shrink-0 text-[#26ae90]">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <span className="whitespace-pre-line">{headOffice.address}</span>
                </span>
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2 text-sm text-white/70 transition-all duration-200 hover:text-[#f2f231]"
                >
                  <span className="text-[#26ae90] transition-transform duration-200 group-hover:translate-x-1">
                    ›
                  </span>
                  View all offices
                </Link>
              </div>
            </div>

            {linkGroups.map((group) => (
              <div key={group.title} className="sm:w-[calc(50%-1rem)] lg:w-auto">
                <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-white/95">
                  {group.title}
                </h3>
                <div className="mt-3 h-1 w-10 rounded-full bg-[#26ae90]" />

                <ul className="mt-6 space-y-3">
                  {group.links.map((item) => (
                    <li key={item.label}>
                      {item.external ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-2 text-sm text-white/70 transition-all duration-200 hover:text-[#f2f231]"
                        >
                          <span className="text-[#26ae90] transition-transform duration-200 group-hover:translate-x-1">
                            ›
                          </span>
                          {item.label}
                        </a>
                      ) : (
                        <Link
                          to={item.href}
                          className="group inline-flex items-center gap-2 text-sm text-white/70 transition-all duration-200 hover:text-[#f2f231]"
                        >
                          <span className="text-[#26ae90] transition-transform duration-200 group-hover:translate-x-1">
                            ›
                          </span>
                          {item.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="sm:w-full lg:w-auto">
              <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-white/95">
                Contact Us
              </h3>
              <div className="mt-3 h-1 w-10 rounded-full bg-[#26ae90]" />

              <div className="mt-6 space-y-4">
                {contactInfo.map((item) => {
                  const Icon = item.icon;
                  const content = (
                    <span className="flex items-start gap-3 text-sm text-white/70">
                      <span className="mt-0.5 shrink-0 text-[#26ae90]">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className={`break-words ${item.href ? "transition-all duration-200 hover:text-[#f2f231]" : ""}`}>{item.text}</span>
                    </span>
                  );
                  return item.href ? (
                    <Link
                      key={item.text}
                      to={item.href}
                      className="block"
                    >
                      {content}
                    </Link>
                  ) : (
                    <div key={item.text}>{content}</div>
                  );
                })}
              </div>

            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 border-t border-white/10 bg-[#033c58]/50">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 py-5 text-center text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:text-left lg:px-8">
          <p>© 2026 Indexia Group. All rights reserved.</p>

          <div className="flex flex-wrap justify-center gap-5">
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
