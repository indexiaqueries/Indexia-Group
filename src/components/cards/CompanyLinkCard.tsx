import { Link } from "react-router-dom";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";
import { getCompanyCardImage, getCompanyCardSmImage } from "../../data/companyImages";
import type { Company } from "../../data/companies";
import CompanyCardBase from "./CompanyCardBase";

type CompanyLinkCardProps = {
  company: Company;
  index?: number;
};

const CompanyLinkCard = ({ company, index = 0 }: CompanyLinkCardProps) => {
  const { t } = useTranslation();
  const tag = t(`pageContent.companies.${company.slug}.tag`, { defaultValue: company.tag });
  const name = t(`pageContent.companies.${company.slug}.name`, { defaultValue: company.name });
  const cardNo = String(index + 1).padStart(2, "0");

  const content = (
    <>
      {/* Icon chip */}
      <span
        aria-hidden="true"
        className={`company-link-chip pointer-events-none absolute inset-e-5 top-5 z-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-all duration-300 group-hover:bg-(--color-yellow) group-hover:text-(--color-ink-deep) ${
          company.link ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
      >
        {company.link ? (
          <ExternalLink size={19} strokeWidth={2.5} />
        ) : (
          <ArrowUpRight size={19} strokeWidth={2.5} />
        )}
      </span>

      {/* Text content */}
      <div className="company-link-card-content relative z-10 mt-auto p-3 sm:p-4">
        <p className="font-ledger text-[10px] font-bold uppercase tracking-[0.18em] text-(--color-yellow)">
          {tag}
        </p>
        <h3 className="mt-1.5 text-[15px] sm:text-lg font-extrabold leading-snug text-white">{name}</h3>
        <p className="mt-2 inline-flex items-center gap-1.5 font-ledger text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] text-white/80 transition-colors duration-300 group-hover:text-(--color-yellow)">
          {t("companyLinkCard.visitPage")}
          <ArrowUpRight size={15} strokeWidth={2.5} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </p>
      </div>
    </>
  );

  const card = (
    <CompanyCardBase
      image={getCompanyCardImage(company.slug)}
      imageSm={getCompanyCardSmImage(company.slug)}
      imageAlt={t("companyLinkCard.visualAlt", { name })}
      cardNo={cardNo}
    >
      {content}
    </CompanyCardBase>
  );

  if (company.link) {
    return (
      <a
        href={company.link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t("companyLinkCard.visitWebsiteAria", { name })}
      >
        {card}
      </a>
    );
  }

  return (
    <Link
      to="/about"
      aria-label={t("companyLinkCard.visitPageAria", { name })}
    >
      {card}
    </Link>
  );
};

export default CompanyLinkCard;
