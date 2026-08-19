import { Link, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { companies } from "../../../data/companies";
import DropdownPanel from "./DropdownPanel";
import CompanyLink from "./CompanyLink";
import { navPillClass } from "./navPill";

type CompaniesMenuProps = {
  open: boolean;
  reducedMotion: boolean;
  onToggle: (open: boolean) => void;
  onClose: () => void;
};

const CompaniesMenu = ({ open, reducedMotion, onToggle, onClose }: CompaniesMenuProps) => {
  const { t } = useTranslation();
  const location = useLocation();
  const onBusinesses = location.pathname.startsWith("/businesses");
  const currentSlug = location.pathname.replace("/businesses/", "");
  const isCompanyPage = onBusinesses && currentSlug && currentSlug !== "/businesses";

  return (
    <div
      className="relative"
      onMouseEnter={() => onToggle(true)}
      onMouseLeave={() => onToggle(false)}
    >
      <button
        type="button"
        onClick={() => onToggle(!open)}
        aria-expanded={open}
        className={`flex items-center gap-1.5 ${navPillClass(onBusinesses)}`}
      >
        {t("header.menu.groupCompanies")}
        <ChevronDown
          size={13}
          strokeWidth={2.5}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <DropdownPanel open={open} reducedMotion={reducedMotion} className="inset-s-0 w-80 p-3">
        <p className="px-2.5 pb-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white/50">
          {t("header.menu.groupCompanies")}
        </p>
        <div className="grid gap-0">
          {companies.map((company) => (
            <CompanyLink
              key={company.slug}
              company={company}
              onNavigate={onClose}
              isActive={!!isCompanyPage && currentSlug === company.slug}
            />
          ))}
        </div>
        <div className="mt-1.5 border-t border-white/10 pt-1.5">
          <Link
            to="/businesses"
            onClick={onClose}
            className="block rounded-lg px-2.5 py-1 text-[13px] font-bold text-(--color-yellow) transition-colors hover:bg-white/10"
          >
            {t("header.menu.viewAllCompanies")}
          </Link>
        </div>
      </DropdownPanel>
    </div>
  );
};

export default CompaniesMenu;
