import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, EllipsisVertical, ExternalLink, Globe, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import logo from "../../assets/IndexiaGroup_Logo.gif";
import { companies } from "../../data/companies";
import { LANGUAGES } from "../../i18n/languages";
import { preloadLocale } from "../../i18n";

const navItems = [
  { key: "header.nav.contact", path: "/contact" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [companiesOpen, setCompaniesOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const prefersReducedMotion = useReducedMotion();
  const barRef = useRef<HTMLElement>(null);
  const heroThresholdRef = useRef(window.innerHeight);
  const location = useLocation();
  const onBusinesses = location.pathname.startsWith("/businesses");

  const measureHero = () => {
    const hero = document.querySelector("main section");
    heroThresholdRef.current = hero ? hero.getBoundingClientRect().height : window.innerHeight * 0.8;
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > heroThresholdRef.current);
    measureHero();
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measureHero);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measureHero);
    };
  }, []);

  useEffect(() => {
    measureHero();
  }, [location.pathname]);

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

  const selectLang = async (code: string) => {
    if (code !== i18n.language) {
      await preloadLocale(code).catch(() => undefined);
    }
    i18n.changeLanguage(code);
    setLangOpen(false);
    setMenuOpen(false);
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
          {company.name}
          <ExternalLink size={12} className="shrink-0 text-(--color-teal)" />
        </a>
      );
    }
    return (
      <Link key={company.slug} to={`/businesses/${company.slug}`} className={cls} onClick={onNavigate}>
        {company.name}
      </Link>
    );
  };

  return (
    <header ref={barRef} className="fixed inset-x-0 top-0 z-999 h-[72px] pointer-events-none sm:h-[92px]">

      <div
        aria-hidden="true"
        className={`header-scrim pointer-events-none absolute inset-0 border-b border-white/10 shadow-[0_6px_24px_rgba(2,16,26,0.32),0_2px_6px_rgba(2,16,26,0.18)] backdrop-blur-md transition-opacity duration-300 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
      />

      <NavLink
        to="/"
        aria-label="Indexia Group home"
        className="group pointer-events-auto absolute start-3 top-1/2 z-10 block -translate-y-1/2 sm:start-5"
      >
        <img
          src={logo}
          alt="Indexia Group logo"
          width={112}
          height={112}
          className="block h-16 object-contain transition-transform duration-300 ease-out group-hover:scale-105 sm:h-20"
        />
      </NavLink>

      <nav className="pointer-events-auto absolute left-1/2 top-1/2 z-20 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-1 min-[900px]:flex">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `rounded-full px-4.5 py-2 text-[13.5px] font-semibold whitespace-nowrap transition-all duration-200 ${
              isActive
                ? "bg-(--color-yellow)/20 text-(--color-yellow) backdrop-blur-md"
                : "bg-white/10 text-white/85 backdrop-blur-md hover:bg-white/20 hover:text-white"
            }`
          }
        >
          {t("header.menu.home")}
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
                    ? "bg-(--color-yellow)/20 text-(--color-yellow) backdrop-blur-md"
                    : "bg-white/10 text-white/85 backdrop-blur-md hover:bg-white/20 hover:text-white"
                }`}
              >
                {t("header.menu.groupCompanies")}
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
                    className="absolute start-0 top-full z-30 mt-2 w-80 origin-top-start rounded-2xl border border-white/15 bg-(--color-navy-black)/95 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_6px_24px_rgba(2,16,26,0.32),0_2px_6px_rgba(2,16,26,0.18)] backdrop-blur-2xl backdrop-saturate-150"
                    initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.94, y: -6 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.94, y: -6 }}
                    transition={{ duration: 0.16, ease: "easeOut" }}
                  >
                    <p className="px-2.5 pb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/50">
                      {t("header.menu.groupCompanies")}
                    </p>
                    <div className="grid gap-0.5">
                      {companies.map((company) => renderCompanyLink(company, () => setCompaniesOpen(false)))}
                    </div>
                    <div className="mt-2 border-t border-white/10 pt-2">
                      <Link
                        to="/businesses"
                        onClick={() => setCompaniesOpen(false)}
                        className="block rounded-lg px-2.5 py-1.5 text-[13px] font-bold text-(--color-yellow) transition-colors hover:bg-white/10"
                      >
                        {t("header.menu.viewAllCompanies")}
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navItems.map((item) => (
              <NavLink
                key={item.key}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `rounded-full px-4.5 py-2 text-[13.5px] font-semibold whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? "bg-(--color-yellow)/20 text-(--color-yellow) backdrop-blur-md"
                      : "bg-white/10 text-white/85 backdrop-blur-md hover:bg-white/20 hover:text-white"
                  }`
                }
              >
                {t(item.key)}
              </NavLink>
            ))}
      </nav>

      <div className="pointer-events-auto absolute end-3 top-1/2 z-30 flex -translate-y-1/2 items-center gap-2 sm:end-5">
            <div
              className="relative"
              onMouseEnter={() => setLangOpen(true)}
              onMouseLeave={() => setLangOpen(false)}
            >
              <button
                type="button"
                onClick={() => setLangOpen((o) => !o)}
                aria-expanded={langOpen}
                aria-label={t("header.aria.selectLanguage")}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3.5 py-2 text-[12.5px] font-bold uppercase text-white/90 backdrop-blur-md transition-all duration-200 hover:bg-white/20 hover:scale-105"
              >
                <Globe size={14} strokeWidth={2.2} className="text-(--color-yellow)" />
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
                    className="absolute end-0 top-full z-30 mt-2 w-56 origin-top-end rounded-2xl border border-white/15 bg-(--color-navy-black)/95 p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_6px_24px_rgba(2,16,26,0.32),0_2px_6px_rgba(2,16,26,0.18)] backdrop-blur-2xl backdrop-saturate-150"
                    initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.94, y: -6 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.94, y: -6 }}
                    transition={{ duration: 0.16, ease: "easeOut" }}
                  >
                    <div className="max-h-[min(60vh,440px)] overflow-y-auto overscroll-contain pr-0.5 [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.25)_transparent]">
                      {LANGUAGES.map((l) => (
                        <button
                          key={l.code}
                          type="button"
                          onClick={() => selectLang(l.code)}
                          className={`block w-full rounded-lg px-3 py-1.5 text-start text-[13px] font-semibold transition-colors duration-150 ${
                            lang === l.code
                              ? "bg-(--color-yellow)/15 text-(--color-yellow)"
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
              aria-label={menuOpen ? t("header.aria.closeMenu") : t("header.aria.toggleMenu")}
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
                    <X size={20} strokeWidth={2.5} className="text-(--color-yellow)" />
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
                    <EllipsisVertical size={20} strokeWidth={2.5} className="text-(--color-yellow)" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <AnimatePresence>
              {menuOpen && (
              <motion.div
                key="dropdown"
                className="pointer-events-auto absolute end-0 top-full z-20 mt-2 w-72 origin-top-end rounded-2xl border border-white/15 bg-(--color-navy-black)/90 p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_6px_24px_rgba(2,16,26,0.32),0_2px_6px_rgba(2,16,26,0.18)] backdrop-blur-2xl backdrop-saturate-150 min-[900px]:hidden"
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
                      isActive ? "bg-(--color-yellow)/15 text-(--color-yellow)" : "text-white/85 hover:bg-white/10 hover:text-white"
                    }`
                  }
                >
                  {t("header.menu.home")}
                </NavLink>

                <NavLink
                  to="/businesses"
                  end
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `block rounded-full px-5 py-2.5 text-center text-sm font-semibold transition-colors duration-200 ${
                      isActive ? "bg-(--color-yellow)/15 text-(--color-yellow)" : "text-white/85 hover:bg-white/10 hover:text-white"
                    }`
                  }
                >
                  {t("header.menu.groupCompanies")}
                </NavLink>

                <div className="mx-3 my-2 space-y-1 rounded-xl border border-white/10 bg-white/5 p-2">
                  <p className="px-2 pb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/50">
                    {t("header.menu.companies")}
                  </p>
                  {companies.map((company) => renderCompanyLink(company, () => setMenuOpen(false)))}
                </div>

                <NavLink
                  to="/contact"
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `block rounded-full px-5 py-2.5 text-center text-sm font-semibold transition-colors duration-200 ${
                      isActive ? "bg-(--color-yellow)/15 text-(--color-yellow)" : "text-white/85 hover:bg-white/10 hover:text-white"
                    }`
                  }
                >
                  {t("header.menu.contact")}
                </NavLink>
              </motion.div>
            )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
