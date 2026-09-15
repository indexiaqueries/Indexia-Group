import { useTranslation } from "react-i18next";
import { ArrowDown, ArrowRight, FileText, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import HeroBackdrop from "./shared/HeroBackdrop";
import type { Company } from "../../data/companies";

type CompanyHeroProps = {
  company: Company;
  /** Translated name, tag and description (page content overrides). */
  name: string;
  tag: string;
  tagline?: string;
  desc: string;
  /** Tag + services strings used by the bottom marquee band. */
  marqueeItems: string[];
  image: string;
  showBackLink?: boolean;
  onEnquiryClick: () => void;
  eyebrowLabel: string;
  exploreServicesLabel: string;
  brochureLabel?: string;
  brochureTo?: string;
};

const CompanyHero = ({
  company: b,
  name,
  tag,
  tagline,
  desc,
  marqueeItems,
  image,
  showBackLink = false,
  onEnquiryClick,
  eyebrowLabel,
  exploreServicesLabel,
  brochureLabel,
  brochureTo,
}: CompanyHeroProps) => {
  const { t } = useTranslation();

  return (
    <HeroBackdrop
      image={image}
      imagePosition="top"
      containerClassName="relative w-full max-w-7xl px-2 py-10 pt-20 sm:px-3 lg:px-10"
      extra={
        <div
          aria-hidden="true"
          className="marquee-band absolute inset-x-0 bottom-0 border-t border-white/10 bg-(--color-ink-deep)/85 backdrop-blur-sm"
        >
          <div
            className="infinite-marquee-track py-3.5"
            style={{ "--marquee-duration": `${Math.max(20, marqueeItems.length * 2.6)}s` } as React.CSSProperties}
          >
            {[0, 1].map((copy) => (
              <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
                {marqueeItems.map((item, i) => (
                  <span key={i} className="flex items-center whitespace-nowrap">
                    <span className="mx-5 text-xs font-bold tracking-[0.22em] text-white/75">
                      {item}
                    </span>
                    <Sparkles size={12} strokeWidth={2.4} className="text-(--color-yellow)" aria-hidden="true" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      }
    >
      <div className="hero-panel-glass fade-up relative max-w-5xl p-5 sm:p-8 lg:max-w-[calc(100%-34rem)] lg:p-10 lg:ml-0 lg:mr-auto">
        {showBackLink && (
          <Link
            to="/about"
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/25 bg-(--color-navy-deep)/45 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-white backdrop-blur-sm transition-colors hover:bg-(--color-navy-deep)/70 hover:text-(--color-yellow)"
          >
            <span aria-hidden="true">←</span> {t("companyDetail.backAll")}
          </Link>
        )}

        <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
          <span
            className="rounded-full bg-(--color-gray) px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-white shadow-md"
          >
            {tag}
          </span>
          <span
            className="rounded-full border border-white/30 bg-(--color-navy-deep)/45 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-white shadow-md backdrop-blur-sm"
          >
            Est. {b.founded}
          </span>
        </div>

        <h1 className="font-display text-[clamp(24px,4vw,44px)] font-bold leading-[1.06] text-white">
          {name}
        </h1>

        {(b.slug === "warehouse" || b.slug === "advertising") && (
          <p className="mt-3 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-white/75">
            {b.slug === "warehouse"
              ? t("pageContent.companies.warehouse.location", { defaultValue: "Shamli, Uttar Pradesh, Part of Delhi NCR" })
              : t("pageContent.companies.advertising.location", { defaultValue: "Delhi–Dehradun Highway, Shamli" })}
          </p>
        )}

        {tagline && (
          <p className="mt-3 sm:mt-4 text-sm sm:text-lg font-semibold italic text-(--color-yellow)">“{tagline}”</p>
        )}

        <p className="mt-4 sm:mt-5 max-w-2xl text-[14px] sm:text-base leading-7 sm:leading-8 text-white/80">{desc}</p>

        <div className="mt-7 sm:mt-9 flex flex-wrap gap-3 sm:gap-4">
          <a
            href="#enquiry"
            onClick={(e) => {
              // Prevent the native same-hash jump (which browsers ignore on
              // repeat clicks) and always scroll via scrollIntoView instead.
              e.preventDefault();
              onEnquiryClick();
            }}
            className="inline-flex items-center gap-2 rounded-full bg-(--color-yellow) px-5 py-2.5 sm:px-7 sm:py-3 text-sm font-bold text-(--color-yellow-ink) shadow-[0_4px_16px_rgba(242,242,49,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-(--color-yellow-bright)"
          >
            {eyebrowLabel}
            <ArrowRight size={16} strokeWidth={2.5} />
          </a>
          <a
            href="#company-services"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2.5 sm:px-7 sm:py-3 text-sm font-bold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20"
          >
            {exploreServicesLabel}
            <ArrowDown size={16} strokeWidth={2.5} />
          </a>
          {(b.slug === "warehouse" || b.slug === "advertising") && (
            <Link
              to={brochureTo ?? `/${b.slug}-brochure`}
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2.5 sm:px-7 sm:py-3 text-sm font-bold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20"
            >
              <FileText size={16} strokeWidth={2.2} />
              {brochureLabel ?? t("companyDetail.brochure", "View Brochure")}
            </Link>
          )}
        </div>
      </div>
    </HeroBackdrop>
  );
};

export default CompanyHero;
