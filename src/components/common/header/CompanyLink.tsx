import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { Company } from "../../../data/companies";

const getLinkClass = (isActive: boolean) =>
  `flex items-center justify-between gap-2 rounded-lg px-2.5 py-1 text-[13px] font-semibold transition-colors duration-150 ${
    isActive
      ? "bg-(--color-yellow)/15 text-(--color-yellow)"
      : "text-white/85 hover:bg-white/10 hover:text-white"
  }`;

type CompanyLinkProps = {
  company: Company;
  onNavigate?: () => void;
  isActive?: boolean;
};

const CompanyLink = ({ company, onNavigate, isActive = false }: CompanyLinkProps) => {
  const { t } = useTranslation();
  const name = t(`pageContent.companies.${company.slug}.name`, { defaultValue: company.name });

  if (company.link) {
    return (
      <a
        key={company.slug}
        href={company.link}
        target="_blank"
        rel="noopener noreferrer"
        className={getLinkClass(isActive)}
        onClick={onNavigate}
      >
        {name}
        <ExternalLink size={12} className="shrink-0 text-(--color-teal)" />
      </a>
    );
  }
  return (
    <Link key={company.slug} to={`/${company.slug}`} className={getLinkClass(isActive)} onClick={onNavigate}>
      {name}
    </Link>
  );
};

export default CompanyLink;
