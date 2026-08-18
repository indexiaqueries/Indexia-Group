import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { NavLink } from "react-router-dom";
import { EllipsisVertical, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import logo from "../../assets/logo/IndexiaGroup_Logo.webp";
import CompaniesMenu from "./header/CompaniesMenu";
import LanguageMenu from "./header/LanguageMenu";
import MobileMenu from "./header/MobileMenu";
import { navPillClass } from "./header/navPill";
import { useHeaderScroll } from "./header/useHeaderScroll";

const navItems = [
  { key: "header.nav.contact", path: "/contact" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [companiesOpen, setCompaniesOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();
  const barRef = useRef<HTMLElement>(null);
  const scrolled = useHeaderScroll();

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

  const closeAll = () => {
    setMenuOpen(false);
    setCompaniesOpen(false);
    setLangOpen(false);
  };

  return (
    <header ref={barRef} className="fixed inset-x-0 top-0 z-999 h-18 pointer-events-none sm:h-23">
      <div
        aria-hidden="true"
        className={`header-scrim pointer-events-none absolute inset-0 transition-opacity duration-300 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
      />

      <NavLink
        to="/"
        aria-label={t("common.homeAria")}
        className="group pointer-events-auto absolute inset-s-3 top-1/2 z-10 block -translate-y-1/2 sm:inset-s-5"
      >
        <img
          src={logo}
          alt={t("common.logoAlt")}
          width={112}
          height={112}
          className="block h-16 object-contain transition-transform duration-300 ease-out group-hover:scale-105 sm:h-20"
        />
      </NavLink>

      <nav className="pointer-events-auto absolute left-1/2 top-1/2 z-20 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-1 min-[900px]:flex">
        <NavLink
          to="/"
          end
          className={({ isActive }) => navPillClass(isActive)}
        >
          {t("header.menu.home")}
        </NavLink>

        <CompaniesMenu
          open={companiesOpen}
          reducedMotion={!!prefersReducedMotion}
          onToggle={setCompaniesOpen}
          onClose={closeAll}
        />

        {navItems.map((item) => (
          <NavLink
            key={item.key}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) => navPillClass(isActive)}
          >
            {t(item.key)}
          </NavLink>
        ))}
      </nav>

      <div className="pointer-events-auto absolute inset-e-3 top-1/2 z-30 flex -translate-y-1/2 items-center gap-2 sm:inset-e-5">
        <LanguageMenu
          open={langOpen}
          reducedMotion={!!prefersReducedMotion}
          onToggle={setLangOpen}
          onClose={closeAll}
        />

        <button
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? t("header.aria.closeMenu") : t("header.aria.toggleMenu")}
          aria-expanded={menuOpen}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md transition-all duration-200 hover:scale-105 hover:bg-white/20 min-[900px]:hidden"
        >
          {menuOpen ? (
            <span key="close" className="icon-in flex" style={{ "--icon-from": "-90deg" } as CSSProperties}>
              <X size={20} strokeWidth={2.5} className="text-(--color-yellow)" />
            </span>
          ) : (
            <span key="menu" className="icon-in flex" style={{ "--icon-from": "90deg" } as CSSProperties}>
              <EllipsisVertical size={20} strokeWidth={2.5} className="text-(--color-yellow)" />
            </span>
          )}
        </button>

        <MobileMenu
          open={menuOpen}
          reducedMotion={!!prefersReducedMotion}
          onClose={closeAll}
        />
      </div>
    </header>
  );
};

export default Header;
