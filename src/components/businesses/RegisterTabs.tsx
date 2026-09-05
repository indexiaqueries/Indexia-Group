import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";
import { companies } from "../../data/companies";

type RegisterTabsProps = {
  activeSlug?: string;
  className?: string;
};

const stripBrand = (name: string) => {
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
      className={`overflow-x-auto border-t border-(--color-line) bg-white scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${className}`}
    >
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