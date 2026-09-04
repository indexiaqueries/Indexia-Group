import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";
import { companies } from "../../data/companies";

type RegisterTabsProps = {
  /** Slug of the company currently open (no active tab on group pages). */
  activeSlug?: string;
  className?: string;
};

/**
 * The catalogue edge — the group's eight entries as an index spine.
 *
 * A continuous navy rule (the register spine) runs beneath the entries.
 * Each entry is a quiet numbered line standing on the spine; the open entry
 * is a yellow folder tab resting on it, so a visitor always knows where they
 * stand in the register (entry 4 of 8). Companies with their own external
 * portal open in a new tab.
 */
const stripBrand = (name: string) => {
  // "Indexia Finserve Pvt. Ltd." → "Finserve"; "إندكسيا فاينانس" → "فاينانس"
  const rest = name.trim().split(/\s+/).slice(1);
  const cleaned = rest
    .filter((w) => !/^(pvt|private|limited|ltd|inc|corp|group)\.?$/i.test(w))
    .join(" ");
  return cleaned || name;
};

const RegisterTabs = ({ activeSlug, className = "" }: RegisterTabsProps) => {
  const { t } = useTranslation();
  const registerLabel = t("companyDetail.registerOf", "Indexia Group · Register of Companies");

  return (
    <nav
      aria-label={registerLabel}
      className={`overflow-x-auto border-t border-(--color-line) bg-white [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${className}`}
    >
      {/* The register spine — entries stand on this rule; the folder tab rests on it.
          The entries center on the spine when they fit and scroll from the start
          (RTL-aware) when the viewport is too narrow. */}
      <div className="flex w-max min-w-full items-end justify-center gap-1 border-b-2 border-(--color-navy) px-2 pt-2 sm:gap-2 sm:px-4">
        {companies.map((company, i) => {
          const no = String(i + 1).padStart(2, "0");
          const isActive = company.slug === activeSlug;
          const isExternal = Boolean(company.link);
          const fullName = t(`pageContent.companies.${company.slug}.name`, { defaultValue: company.name });
          const label = stripBrand(fullName);

          const linkClass = `group inline-flex items-baseline gap-2 whitespace-nowrap rounded-t-md px-3 py-2.5 transition-colors duration-200 sm:px-4 ${
            isActive
              ? "bg-(--color-yellow) text-(--color-navy-deep)"
              : "text-(--color-navy) hover:bg-(--color-soft) hover:text-(--color-teal-deep)"
          }`;

          const inner = (
            <>
              <span
                aria-hidden="true"
                className={`font-ledger text-[10px] font-bold ${
                  isActive ? "text-(--color-navy-deep)/60" : "text-(--color-navy)/45"
                }`}
              >
                {no}
              </span>
              <span className="text-[11px] font-bold sm:text-xs">{label}</span>
              {isExternal && (
                <ExternalLink
                  size={11}
                  aria-hidden="true"
                  className={`shrink-0 self-center transition-opacity duration-200 ${
                    isActive ? "opacity-70" : "opacity-0 group-hover:opacity-70"
                  }`}
                />
              )}
            </>
          );

          if (isExternal) {
            return (
              <a
                key={company.slug}
                href={company.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("companyLinkCard.visitWebsiteAria", { name: fullName })}
                className={linkClass}
              >
                {inner}
              </a>
            );
          }
          return (
            <Link
              key={company.slug}
              to={`/${company.slug}`}
              aria-label={isActive ? fullName : t("companyLinkCard.visitPageAria", { name: fullName })}
              aria-current={isActive ? "page" : undefined}
              className={linkClass}
            >
              {inner}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default RegisterTabs;