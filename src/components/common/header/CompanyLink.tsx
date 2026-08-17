import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { Company } from "../../../data/companies";

const linkClass =
  "flex items-center justify-between gap-2 rounded-lg px-2.5 py-1 text-[13px] font-semibold text-white/85 transition-colors duration-150 hover:bg-white/10 hover:text-white";

type CompanyLinkProps = {
  company: Company;
  onNavigate?: () => void;
};

const CompanyLink = ({ company, onNavigate }: CompanyLinkProps) => {
  const { t } = useTranslation();
  const name = t(`pageContent.companies.${company.slug}.name`, { defaultValue: company.name });

  if (company.link) {
    return (
      <a
        key={company.slug}
        href={company.link}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
        onClick={onNavigate}
      >
        {name}
        <ExternalLink size={12} className="shrink-0 text-(--color-teal)" />
      </a>
    );
  }
  return (
    <Link key={company.slug} to={`/businesses/${company.slug}`} className={linkClass} onClick={onNavigate}>
      {name}
    </Link>
  );
};

export default CompanyLink;
