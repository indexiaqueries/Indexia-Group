import type { MouseEvent } from "react";
import { Link } from "react-router-dom";
import footerBg from "../../assets/footer-img.webp";
import logo from "../../assets/IndexiaGroup_Logo.gif";
import { ArrowUp, ArrowUpRight, Mail, Phone, MapPin, Clock } from "lucide-react";
import { phoneNumbers, branches } from "../../data/contact";

const linkGroups = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/businesses" },
      { label: "Group Companies", href: "/businesses" },
      { label: "Group Website", href: "https://www.indexiagroup.com/", external: true },
      { label: "Advertise With Us", href: "/contact" },
      { label: "Careers", href: "/contact" },
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
  {
    title: "Legal",
    links: [
      { label: "Terms of Use", href: "#" },
      { label: "Terms & Conditions", href: "#" },
      { label: "Privacy Policy", href: "#" },
    ],
  },
];

const headOffice = branches[0];

const contactInfo = [
  { icon: Mail, text: "contactus@indexiagroup.com", href: "mailto:contactus@indexiagroup.com" },
  { icon: Phone, text: phoneNumbers[0]?.number ?? "+91 011 4629 1155", href: phoneNumbers[0]?.href ?? "tel:+911146291155" },
  { icon: MapPin, text: "Mumbai · Delhi · Surat · Ecuador", href: "/contact" },
  { icon: Clock, text: "Mon - Sat: 9 AM - 6 PM", href: undefined },
];

const ColumnHeader = ({ title }: { title: string }) => (
  <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-white/95">{title}</h3>
);

const FooterLink = ({ href, label, external = false }: { href: string; label: string; external?: boolean }) => (
  <li>
    {external ? (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-2 text-sm text-white/70 transition-all duration-200 hover:text-[#f2f231]"
      >
        <span className="text-[#26ae90] transition-transform duration-200 group-hover:translate-x-1">›</span>
        {label}
      </a>
    ) : (
      <Link
        to={href}
        className="group inline-flex items-center gap-2 text-sm text-white/70 transition-all duration-200 hover:text-[#f2f231]"
      >
        <span className="text-[#26ae90] transition-transform duration-200 group-hover:translate-x-1">›</span>
        {label}
      </Link>
    )}
  </li>
);

const Footer = () => {
  const handleBackToTop = (event: MouseEvent) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="footer" className="relative overflow-hidden bg-[#044e74] text-white">
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

      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-16 sm:px-6 sm:pt-20 lg:px-8">
        {/* Top tier — brand, office, contact */}
        <div className="grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="flex flex-col items-start gap-5">
              <div className="flex flex-row items-center gap-3">
                <img src={logo} alt="Indexia Group logo" width={72} height={72} className="h-16 w-16 object-contain sm:h-20 sm:w-20" />
                <div>
                  <div className="flex flex-row items-center gap-1 text-2xl font-extrabold">
                    <span className="text-[#f2f231]">Indexia</span>
                    <span className="text-white">Group</span>
                  </div>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.22em] text-white/55">
                    Diversified Indian Business Group
                  </p>
                </div>
              </div>

              <p className="max-w-sm text-sm leading-7 text-white/68">
                Helping businesses and individuals build a stronger financial future with trusted, result-driven solutions.
              </p>

              <a
                href="https://www.indexiagroup.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 py-2.5 text-[13px] font-bold text-white backdrop-blur-sm transition-all duration-200 hover:border-[#f2f231] hover:bg-[#f2f231] hover:text-[#122029]"
              >
                Visit Group Website
                <ArrowUpRight size={15} strokeWidth={2.5} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-3">
            <ColumnHeader title="Head Office" />
            <div className="mt-3 h-1 w-10 rounded-full bg-[#26ae90]" />

            <div className="mt-6 space-y-4">
              <span className="flex items-start gap-3 text-sm leading-6 text-white/70">
                <span className="mt-0.5 shrink-0 text-[#26ae90]">
                  <MapPin className="h-4 w-4" />
                </span>
                <span className="whitespace-pre-line">{headOffice.address}</span>
              </span>
              <Link
                to="/contact#branches"
                className="group inline-flex items-center gap-2 text-sm text-white/70 transition-all duration-200 hover:text-[#f2f231]"
              >
                <span className="text-[#26ae90] transition-transform duration-200 group-hover:translate-x-1">›</span>
                View all offices
              </Link>
            </div>
          </div>

          <div className="md:col-span-2 lg:col-span-4">
            <ColumnHeader title="Contact Us" />
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
                  <Link key={item.text} to={item.href} className="block">
                    {content}
                  </Link>
                ) : (
                  <div key={item.text}>{content}</div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom tier — link columns */}
        <div className="mt-14 grid gap-x-10 gap-y-10 border-t border-white/12 pt-12 sm:mt-16 md:grid-cols-3">
          {linkGroups.map((group) => (
            <div key={group.title}>
              <ColumnHeader title={group.title} />
              <div className="mt-3 h-1 w-10 rounded-full bg-[#26ae90]" />
              <ul className="mt-6 space-y-3">
                {group.links.map((item) => (
                  <FooterLink key={item.label} href={item.href} label={item.label} external={item.external} />
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-white/12 bg-white/5 px-6 py-6 backdrop-blur-sm sm:px-8">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-white/70">
              Have a question about any of our companies?{" "}
              <Link to="/contact" className="font-bold text-[#f2f231] underline-offset-4 transition-colors hover:text-[#f7f75c] hover:underline">
                Send us an enquiry →
              </Link>
            </p>
            <p className="font-ledger text-[10px] font-bold uppercase tracking-[0.22em] text-white/45">
              Indexia Group · 08 Companies · 04 Locations
            </p>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-12 border-t border-white/10 bg-[#033c58]/50">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 py-5 text-center text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:text-left lg:px-8">
          <p>© 2026 Indexia Group. All rights reserved.</p>

          <div className="flex flex-wrap justify-center gap-5">
            <a
              href="#top"
              onClick={handleBackToTop}
              className="transition-colors hover:text-[#f2f231]"
            >
              Back to Top
            </a>
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
