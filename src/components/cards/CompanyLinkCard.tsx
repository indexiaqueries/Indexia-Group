import { Link } from "react-router-dom";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";
import { getCompanyCardImage } from "../../data/companyImages";
import type { Company } from "../../data/companies";

type CompanyLinkCardProps = {
  company: Company;
  index?: number;
};

const CompanyLinkCard = ({ company, index = 0 }: CompanyLinkCardProps) => {
  const { t } = useTranslation();
  const tag = t(`pageContent.companies.${company.slug}.tag`, { defaultValue: company.tag });
  const name = t(`pageContent.companies.${company.slug}.name`, { defaultValue: company.name });
  const cardNo = String(index + 1).padStart(2, "0");

  const cardContent = (
    <>
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={getCompanyCardImage(company.slug)}
          alt={t("companyLinkCard.visualAlt", { name })}
          width={760}
          height={426}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
      </div>
      {/* Gradient overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-linear-to-t from-(--color-night) via-(--color-night)/50 to-transparent transition-opacity duration-500"
      />
      {/* Color overlay on hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `linear-gradient(135deg, ${company.color}cc, ${company.color}66)` }}
      />

      {/* Diagonal shine lines */}
      <span aria-hidden="true" className="card-shine-lines" />

      {/* Ghost number */}
      <span
        aria-hidden="true"
        className="font-display pointer-events-none absolute start-4 top-2 z-[2] text-[54px] font-bold leading-none text-white/15 transition-colors duration-300 group-hover:text-white/25"
      >
        {cardNo}
      </span>

      <span
        aria-hidden="true"
        className={`company-link-chip pointer-events-none absolute inset-e-5 top-5 z-[3] flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-all duration-300 group-hover:bg-(--color-yellow) group-hover:text-(--color-ink-deep) ${
          company.link ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
      >
        {company.link ? (
          <ExternalLink size={19} strokeWidth={2.5} />
        ) : (
          <ArrowUpRight size={19} strokeWidth={2.5} />
        )}
      </span>

      <div className="company-link-card-content relative z-10 mt-auto p-5">
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-(--color-yellow)">
          {tag}
        </p>
        <h3 className="mt-2 text-lg font-extrabold leading-snug text-white">{name}</h3>
        <p className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-widest text-white/80 transition-colors duration-300 group-hover:text-(--color-yellow)">
          {t("companyLinkCard.visitPage")}
          <ArrowUpRight size={15} strokeWidth={2.5} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </p>
      </div>

    </>
  );

  if (company.link) {
    return (
      <a
        href={company.link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t("companyLinkCard.visitWebsiteAria", { name })}
        className="company-link-card group relative flex h-64 flex-col overflow-hidden rounded-2xl border border-white/10 bg-(--color-ink-deep) shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-white/30 hover:shadow-2xl"
      >
        {cardContent}
      </a>
    );
  }

  return (
    <Link
      to={`/businesses/${company.slug}`}
      aria-label={t("companyLinkCard.visitPageAria", { name })}
      className="company-link-card group relative flex h-64 flex-col overflow-hidden rounded-2xl border border-white/60 bg-(--color-ink-deep) shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      {cardContent}
    </Link>
  );
};

export default CompanyLinkCard;
