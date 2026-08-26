import { useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { companies } from "../../../data/companies";
import DropdownPanel from "./DropdownPanel";
import CompanyLink from "./CompanyLink";

const menuLinkClass = ({ isActive }: { isActive: boolean }) =>
  `block rounded-full px-5 py-2.5 text-center text-sm font-semibold transition-colors duration-200 ${
    isActive ? "bg-(--color-yellow)/15 text-(--color-yellow)" : "text-white/85 hover:bg-white/10 hover:text-white"
  }`;

type MobileMenuProps = {
  open: boolean;
  reducedMotion: boolean;
  onClose: () => void;
};

const MobileMenu = ({ open, reducedMotion, onClose }: MobileMenuProps) => {
  const { t } = useTranslation();
  const location = useLocation();
  const currentSlug = location.pathname.split("/")[1] ?? "";
  const isCompanyPage = companies.some((c) => c.slug === currentSlug);
  const onBusinesses = isCompanyPage;

  const menuRef = useRef<HTMLDivElement>(null);

  // Focus trap: keep focus inside mobile menu when open
  useEffect(() => {
    if (!open) return;
    const menu = menuRef.current;
    if (!menu) return;

    const focusable = menu.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;

    // Focus first item
    focusable[0].focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    menu.addEventListener("keydown", onKeyDown);
    return () => menu.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <DropdownPanel
      open={open}
      reducedMotion={reducedMotion}
      className="pointer-events-auto inset-e-0 w-72 origin-top-end p-2 min-[900px]:hidden"
      scale={0.92}
      duration={0.18}
    >
      <div ref={menuRef} role="menu">
      <NavLink to="/" end onClick={onClose} className={menuLinkClass}>
        {t("header.menu.home")}
      </NavLink>

      <NavLink to="/about" onClick={onClose} className={menuLinkClass}>
        {t("header.nav.about")}
      </NavLink>

      <NavLink
        to="/about"
        onClick={onClose}
        className={() =>
          `block rounded-full px-5 py-2.5 text-center text-sm font-semibold transition-colors duration-200 ${
            onBusinesses ? "bg-(--color-yellow)/15 text-(--color-yellow)" : "text-white/85 hover:bg-white/10 hover:text-white"
          }`
        }
      >
        {t("header.menu.groupCompanies")}
      </NavLink>

      <div className="mx-3 my-2 space-y-0.5 rounded-xl border border-white/10 bg-white/5 p-2">
        <p className="px-2 pb-0.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white/50">
          {t("header.menu.companies")}
        </p>
        {companies.map((company) => (
          <CompanyLink
            key={company.slug}
            company={company}
            onNavigate={onClose}
            isActive={!!isCompanyPage && currentSlug === company.slug}
          />
        ))}
      </div>

      <NavLink to="/contact" onClick={onClose} className={menuLinkClass}>
        {t("header.menu.contact")}
      </NavLink>
      </div>
    </DropdownPanel>
  );
};

export default MobileMenu;
