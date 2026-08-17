import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";
import { getCompanyImage } from "../../data/companyImages";
import type { Company } from "../../data/companies";
import { prefersTouch } from "../../lib/media";

type CompanyLinkCardProps = {
  company: Company;
};

const CompanyLinkCard = ({ company }: CompanyLinkCardProps) => {
  const { t } = useTranslation();
  const [revealed, setRevealed] = useState(false);
  const tag = t(`pageContent.companies.${company.slug}.tag`, { defaultValue: company.tag });

  // On touch devices the card reveals its visit action on first tap and dismisses on a second tap.
  const handleCardClick = (e: React.MouseEvent) => {
    if (!prefersTouch) return;
    e.preventDefault();
    setRevealed((r) => !r);
  };

  const cardContent = (
    <>
      <img
        src={getCompanyImage(company.name)}
        alt={t("companyLinkCard.visualAlt", { name: company.name })}
        width={1536}
        height={1024}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-linear-to-t from-(--color-night) via-(--color-night)/45 to-transparent transition-opacity duration-300 group-hover:opacity-90"
      />

      <span
        aria-hidden="true"
        className={`company-link-chip pointer-events-none absolute inset-e-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-all duration-300 group-hover:bg-(--color-yellow) group-hover:text-(--color-ink-deep) ${
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
        <h3 className="mt-2 text-lg font-extrabold leading-snug text-white">{company.name}</h3>
        <p className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-widest text-white/80 transition-colors duration-300 group-hover:text-(--color-yellow)">
          {t("companyLinkCard.visitPage")}
          <ArrowUpRight size={15} strokeWidth={2.5} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </p>
      </div>

      <div className="company-link-card-reveal pointer-events-none absolute inset-0 z-20 flex scale-95 flex-col items-center justify-center gap-4 p-6 text-center opacity-0 transition-all duration-500 ease-out">
        <p className="rounded-xl border border-white/20 bg-(image:--card-desc-gradient) px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-white/90 shadow-lg backdrop-blur-[2px]">
          {tag}
        </p>
        <span
          className="inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-[13px] font-bold uppercase tracking-[0.08em] text-(--color-ink-deep) shadow-lg transition-colors duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          {t("companyLinkCard.visitPage")}
          <ArrowUpRight size={16} strokeWidth={2.5} aria-hidden="true" />
        </span>
      </div>
    </>
  );

  if (company.link) {
    return (
      <a
        href={company.link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t("companyLinkCard.visitWebsiteAria", { name: company.name })}
        onClick={handleCardClick}
        className={`company-link-card group relative flex h-64 flex-col overflow-hidden rounded-2xl border border-white/60 bg-(--color-ink-deep) shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl${revealed ? " is-revealed" : ""}`}
      >
        {cardContent}
      </a>
    );
  }

  return (
    <Link
      to={`/businesses/${company.slug}`}
      aria-label={t("companyLinkCard.visitPageAria", { name: company.name })}
      onClick={handleCardClick}
      className={`company-link-card group relative flex h-64 flex-col overflow-hidden rounded-2xl border border-white/60 bg-(--color-ink-deep) shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl${revealed ? " is-revealed" : ""}`}
    >
      {cardContent}
    </Link>
  );
};

export default CompanyLinkCard;
