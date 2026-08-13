import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, EllipsisVertical, ExternalLink, Globe, X } from "lucide-react";
import logo from "../../assets/IndexiaGroup_Logo.gif";
import { companies } from "../../data/companies";

const navItems = [
  { name: "Contact Us", path: "/contact" },
];

const languages = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
  { code: "it", label: "Italiano" },
  { code: "pt", label: "Português" },
  { code: "nl", label: "Nederlands" },
  { code: "sv", label: "Svenska" },
  { code: "pl", label: "Polski" },
  { code: "ru", label: "Русский" },
  { code: "el", label: "Ελληνικά" },
  { code: "tr", label: "Türkçe" },
  { code: "ar", label: "العربية" },
  { code: "fa", label: "فارسی" },
  { code: "hi", label: "हिन्दी" },
  { code: "mr", label: "मराठी" },
  { code: "gu", label: "ગુજરાતી" },
  { code: "bn", label: "বাংলা" },
  { code: "ta", label: "தமிழ்" },
  { code: "te", label: "తెలుగు" },
  { code: "kn", label: "ಕನ್ನಡ" },
  { code: "ml", label: "മലയാളം" },
  { code: "pa", label: "ਪੰਜਾਬੀ" },
  { code: "ur", label: "اردو" },
  { code: "or", label: "ଓଡ଼ିଆ" },
  { code: "as", label: "অসমীয়া" },
  { code: "zh", label: "中文" },
  { code: "ja", label: "日本語" },
  { code: "ko", label: "한국어" },
  { code: "th", label: "ไทย" },
  { code: "vi", label: "Tiếng Việt" },
  { code: "id", label: "Bahasa Indonesia" },
];

const displayName = (name: string) => name.replace(" Pvt. Ltd.", "");

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [companiesOpen, setCompaniesOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [lang, setLang] = useState("en");
  const prefersReducedMotion = useReducedMotion();
  const barRef = useRef<HTMLElement>(null);
  const location = useLocation();
  const onBusinesses = location.pathname.startsWith("/businesses");

  useEffect(() => {
    if (!menuOpen && !companiesOpen && !langOpen) return;
    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      if (barRef.current && !barRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
        setCompaniesOpen(false);
        setLangOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setCompaniesOpen(false);
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen, companiesOpen, langOpen]);

  const selectLang = (code: string) => {
    setLang(code);
    setLangOpen(false);
    document.documentElement.lang = code;
  };

  const renderCompanyLink = (company: (typeof companies)[number], onNavigate?: () => void) => {
    const cls =
      "flex items-center justify-between gap-2 rounded-lg px-2.5 py-1.5 text-[13px] font-semibold text-white/85 transition-colors duration-150 hover:bg-white/10 hover:text-white";
    if (company.link) {
      return (
        <a
          key={company.slug}
          href={company.link}
          target="_blank"
          rel="noopener noreferrer"
          className={cls}
          onClick={onNavigate}
        >
          {displayName(company.name)}
          <ExternalLink size={12} className="shrink-0 text-[#26ae90]" />
        </a>
      );
    }
    return (
      <Link key={company.slug} to={`/businesses/${company.slug}`} className={cls} onClick={onNavigate}>
        {displayName(company.name)}
      </Link>
    );
  };

  return (
    <header ref={barRef} className="fixed inset-x-0 top-0 z-999 pointer-events-none">
      <NavLink
        to="/"
        aria-label="Indexia Group home"
        className="group pointer-events-auto absolute left-3 top-2 z-10 block sm:left-5 sm:top-3"
      >
        <img
          src={logo}
          alt="Indexia Group logo"
          width={112}
          height={112}
          className="block h-16 object-contain transition-transform duration-300 ease-out group-hover:scale-105 sm:h-20"
        />
      </NavLink>

      <nav className="pointer-events-auto absolute left-1/2 top-2.5 z-20 hidden -translate-x-1/2 items-center gap-1 min-[900px]:flex">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `rounded-full px-4.5 py-2 text-[13.5px] font-semibold whitespace-nowrap transition-all duration-200 ${
              isActive
                ? "bg-[#f2f231]/20 text-[#f2f231] backdrop-blur-md"
                : "bg-white/10 text-white/85 backdrop-blur-md hover:bg-white/20 hover:text-white"
            }`
          }
        >
          Home
        </NavLink>

            <div
              className="relative"
              onMouseEnter={() => setCompaniesOpen(true)}
              onMouseLeave={() => setCompaniesOpen(false)}
            >
              <button
                type="button"
                onClick={() => setCompaniesOpen((o) => !o)}
                aria-expanded={companiesOpen}
                className={`flex items-center gap-1.5 rounded-full px-4.5 py-2 text-[13.5px] font-semibold whitespace-nowrap transition-all duration-200 ${
                  onBusinesses
                    ? "bg-[#f2f231]/20 text-[#f2f231] backdrop-blur-md"
                    : "bg-white/10 text-white/85 backdrop-blur-md hover:bg-white/20 hover:text-white"
                }`}
              >
                Group Companies
                <ChevronDown
                  size={13}
                  strokeWidth={2.5}
                  className={`transition-transform duration-200 ${companiesOpen ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {companiesOpen && (
                  <motion.div
                    key="companies"
                    className="absolute left-0 top-full z-30 mt-2 w-80 origin-top-left rounded-2xl border border-white/15 bg-[#043249]/95 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_16px_40px_rgba(2,16,26,0.45)] backdrop-blur-2xl backdrop-saturate-150"
                    initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.94, y: -6 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.94, y: -6 }}
                    transition={{ duration: 0.16, ease: "easeOut" }}
                  >
                    <p className="px-2.5 pb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/50">
                      Group Companies
                    </p>
                    <div className="grid gap-0.5">
                      {companies.map((company) => renderCompanyLink(company, () => setCompaniesOpen(false)))}
                    </div>
                    <div className="mt-2 border-t border-white/10 pt-2">
                      <Link
                        to="/businesses"
                        onClick={() => setCompaniesOpen(false)}
                        className="block rounded-lg px-2.5 py-1.5 text-[13px] font-bold text-[#f2f231] transition-colors hover:bg-white/10"
                      >
                        View all companies →
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `rounded-full px-4.5 py-2 text-[13.5px] font-semibold whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? "bg-[#f2f231]/20 text-[#f2f231] backdrop-blur-md"
                      : "bg-white/10 text-white/85 backdrop-blur-md hover:bg-white/20 hover:text-white"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
      </nav>

      <div className="pointer-events-auto absolute right-3 top-2.5 z-30 flex items-center gap-2 sm:right-5 sm:top-3">
            <div
              className="relative"
              onMouseEnter={() => setLangOpen(true)}
              onMouseLeave={() => setLangOpen(false)}
            >
              <button
                type="button"
                onClick={() => setLangOpen((o) => !o)}
                aria-expanded={langOpen}
                aria-label="Select language"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3.5 py-2 text-[12.5px] font-bold uppercase text-white/90 backdrop-blur-md transition-all duration-200 hover:bg-white/20 hover:scale-105"
              >
                <Globe size={14} strokeWidth={2.2} className="text-[#f2f231]" />
                {lang}
                <ChevronDown
                  size={12}
                  strokeWidth={2.5}
                  className={`transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    key="lang"
                    className="absolute right-0 top-full z-30 mt-2 w-56 origin-top-right rounded-2xl border border-white/15 bg-[#043249]/95 p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_16px_40px_rgba(2,16,26,0.45)] backdrop-blur-2xl backdrop-saturate-150"
                    initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.94, y: -6 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.94, y: -6 }}
                    transition={{ duration: 0.16, ease: "easeOut" }}
                  >
                    <div className="max-h-[min(60vh,440px)] overflow-y-auto overscroll-contain pr-0.5 [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.25)_transparent]">
                      {languages.map((l) => (
                        <button
                          key={l.code}
                          type="button"
                          onClick={() => selectLang(l.code)}
                          className={`block w-full rounded-lg px-3 py-1.5 text-left text-[13px] font-semibold transition-colors duration-150 ${
                            lang === l.code
                              ? "bg-[#f2f231]/15 text-[#f2f231]"
                              : "text-white/85 hover:bg-white/10 hover:text-white"
                          }`}
                        >
                          {l.label}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Close menu" : "Toggle menu"}
              aria-expanded={menuOpen}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md transition-all duration-200 hover:scale-105 hover:bg-white/20 min-[900px]:hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                {menuOpen ? (
                  <motion.span
                    key="close"
                    initial={prefersReducedMotion ? false : { rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={prefersReducedMotion ? undefined : { rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex"
                  >
                    <X size={20} strokeWidth={2.5} className="text-[#f2f231]" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={prefersReducedMotion ? false : { rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={prefersReducedMotion ? undefined : { rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex"
                  >
                    <EllipsisVertical size={20} strokeWidth={2.5} className="text-[#f2f231]" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <AnimatePresence>
              {menuOpen && (
              <motion.div
                key="dropdown"
                className="pointer-events-auto absolute right-0 top-full z-20 mt-2 w-72 origin-top-right rounded-2xl border border-white/15 bg-[#043249]/90 p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_16px_40px_rgba(2,16,26,0.45)] backdrop-blur-2xl backdrop-saturate-150 min-[900px]:hidden"
                initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.92, y: -6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.92, y: -6 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
              >
                <NavLink
                  to="/"
                  end
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `block rounded-full px-5 py-2.5 text-center text-sm font-semibold transition-colors duration-200 ${
                      isActive ? "bg-[#f2f231]/15 text-[#f2f231]" : "text-white/85 hover:bg-white/10 hover:text-white"
                    }`
                  }
                >
                  Home
                </NavLink>

                <NavLink
                  to="/businesses"
                  end
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `block rounded-full px-5 py-2.5 text-center text-sm font-semibold transition-colors duration-200 ${
                      isActive ? "bg-[#f2f231]/15 text-[#f2f231]" : "text-white/85 hover:bg-white/10 hover:text-white"
                    }`
                  }
                >
                  Group Companies
                </NavLink>

                <div className="mx-3 my-2 space-y-1 rounded-xl border border-white/10 bg-white/5 p-2">
                  <p className="px-2 pb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/50">
                    Companies
                  </p>
                  {companies.map((company) => renderCompanyLink(company, () => setMenuOpen(false)))}
                </div>

                <NavLink
                  to="/contact"
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `block rounded-full px-5 py-2.5 text-center text-sm font-semibold transition-colors duration-200 ${
                      isActive ? "bg-[#f2f231]/15 text-[#f2f231]" : "text-white/85 hover:bg-white/10 hover:text-white"
                    }`
                  }
                >
                  Contact Us
                </NavLink>

                <div className="mt-2 border-t border-white/10 pt-2">
                  <p className="px-2 pb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/50">
                    Language
                  </p>
                  <div className="max-h-44 overflow-y-auto overscroll-contain rounded-xl border border-white/10 bg-white/5 p-1 [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.25)_transparent]">
                    {languages.map((l) => (
                      <button
                        key={l.code}
                        type="button"
                        onClick={() => selectLang(l.code)}
                        className={`block w-full rounded-lg px-3 py-1.5 text-left text-[12.5px] font-semibold transition-colors duration-150 ${
                          lang === l.code ? "bg-[#f2f231]/15 text-[#f2f231]" : "text-white/80 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        {l.label}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
