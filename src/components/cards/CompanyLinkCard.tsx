import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { getCompanyImage } from "../../data/companyImages";
import type { Company } from "../../data/companies";
import { contrastText } from "../../lib/color";

type CompanyLinkCardProps = {
  company: Company;
  entryNo: number;
  total: number;
};

/**
 * A link-only company card for the Group Companies directory.
 * Deliberately shows no description — it exists purely to link
 * a visitor through to the company's own page.
 */
const CompanyLinkCard = ({ company, entryNo, total }: CompanyLinkCardProps) => {
  const iconColor = contrastText(company.color);

  return (
    <Link
      to={`/businesses/${company.slug}`}
      aria-label={`Visit ${company.name} page`}
      className="group relative flex h-64 flex-col justify-between overflow-hidden rounded-2xl border border-white/60 bg-[#122029] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <img
        src={getCompanyImage(company.name)}
        alt={`${company.name} visual`}
        width={1536}
        height={1024}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#02101a] via-[#02101a]/45 to-transparent transition-opacity duration-300 group-hover:opacity-90"
      />

      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-5 top-5 rounded-full px-3 py-1 font-ledger text-[10px] font-bold uppercase tracking-[0.18em] shadow-md transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundColor: company.color, color: iconColor }}
      >
        Nº {String(entryNo).padStart(2, "0")}/{String(total).padStart(2, "0")}
      </span>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 group-hover:bg-[#f2f231] group-hover:text-[#122029]"
      >
        <ArrowUpRight size={19} strokeWidth={2.5} />
      </span>

      <div className="relative z-10 p-5">
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#f2f231]">
          {company.tag}
        </p>
        <h3 className="mt-2 text-lg font-extrabold leading-snug text-white">{company.name}</h3>
        <p className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-[0.1em] text-white/80 transition-colors duration-300 group-hover:text-[#f2f231]">
          Visit page
          <ArrowUpRight size={15} strokeWidth={2.5} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </p>
      </div>
    </Link>
  );
};

export default CompanyLinkCard;
