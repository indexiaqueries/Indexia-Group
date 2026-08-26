import { ArrowRight, ExternalLink, MousePointerClick } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useTapReveal } from "../../hooks/useTapReveal";
import RevealActionButton from "./RevealActionButton";
import CompanyCardBase from "./CompanyCardBase";

type BusinessCardItem = {
  name: string;
  slug: string;
  tag: string;
  description: string;
  image: string;
  icon: LucideIcon;
  link?: string;
};

type BusinessCardProps = {
  business: BusinessCardItem;
};

const BusinessCard = ({ business }: BusinessCardProps) => {
  const { t } = useTranslation();
  const { handleCardClick, revealedClass } = useTapReveal();
  const Icon = business.icon;
  const external = Boolean(business.link);
  const href = external ? business.link! : `/${business.slug}`;
  const tag = t(`pageContent.companies.${business.slug}.tag`, { defaultValue: business.tag });
  const description = t(`pageContent.companies.${business.slug}.desc`, { defaultValue: business.description });
  const name = t(`pageContent.companies.${business.slug}.name`, { defaultValue: business.name });
  const label = `${name}, ${tag}. ${external ? "Visit website" : "Visit company page"}`;

  const inner = (
    <>
      <div className="business-card-top flex items-start justify-between gap-3 transition-all duration-500 group-hover:-translate-y-2 group-hover:opacity-0">
        <div className="flex items-center gap-2">
          <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.14em] sm:tracking-[0.16em] text-white/85">
            {tag}
          </p>

          <span className="business-card-tap hidden items-center gap-1 rounded-full bg-(--color-yellow)/20 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-(--color-yellow)">
            <MousePointerClick size={12} strokeWidth={2.5} aria-hidden="true" className="tap-hint-pulse" />
            {t("businessCard.tapToView")}
          </span>
        </div>
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm">
          <Icon size={20} strokeWidth={2.5} aria-hidden="true" />
        </div>
      </div>

      <h3        className="business-card-name mt-auto flex max-w-[90%] items-center gap-1.5 text-lg sm:text-xl font-extrabold leading-tight text-white transition-all duration-500 group-hover:translate-y-2 group-hover:opacity-0">
        {name}
        {external && (
          <ExternalLink size={15} strokeWidth={2.5} aria-hidden="true" className="shrink-0 text-(--color-yellow) drop-shadow-[0_1px_2px_var(--card-icon-shadow)]" />
        )}
      </h3>

      <div className="card-reveal pointer-events-none absolute inset-0 z-60 flex scale-95 flex-col items-center justify-center gap-4 p-6 text-center opacity-0 transition-all duration-500 ease-out group-focus-within:scale-100 group-focus-within:opacity-100 group-hover:scale-100 group-hover:opacity-100">
        <p className="max-w-md rounded-xl border border-white/20 bg-(image:--card-desc-gradient) px-4 py-3 text-sm font-medium leading-6 text-white shadow-lg backdrop-blur-[2px]">
          {description}
        </p>
        <RevealActionButton
          label={t("businessCard.readMore")}
          icon={external ? ExternalLink : ArrowRight}
          className="group-hover:bg-(--color-blue) group-hover:text-white"
        />
      </div>
    </>
  );

  return (
    <article
      className={`business-card group relative flex h-56 sm:h-65 overflow-hidden rounded-xl sm:rounded-2xl${revealedClass}`}
    >
      <CompanyCardBase
        image={business.image}
        imageAlt={`${name} visual`}
        tint="var(--card-tint)"
        className="h-full border-0 rounded-none hover:translate-y-0 hover:border-0 hover:shadow-none"
      >
        {/* Content layer */}
        {external ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            onClick={handleCardClick}
            className="relative z-50 flex h-full w-full flex-col justify-between p-4 sm:p-5"
          >
            {inner}
          </a>
        ) : (
          <Link
            to={href}
            aria-label={label}
            onClick={handleCardClick}
            className="relative z-50 flex h-full w-full flex-col justify-between p-4 sm:p-5"
          >
            {inner}
          </Link>
        )}
      </CompanyCardBase>
    </article>
  );
};

export default BusinessCard;
