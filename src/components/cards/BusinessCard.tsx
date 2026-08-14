import { ArrowRight, ExternalLink, MousePointerClick } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export type BusinessCardItem = {
  name: string;
  slug: string;
  tag: string;
  description: string;
  color1: string;
  color2: string;
  image: string;
  icon: LucideIcon;
  /** Company's own website — when set, the card opens it directly instead of an internal page. */
  link?: string;
};

type BusinessCardProps = {
  business: BusinessCardItem;
};

const BusinessCard = ({ business }: BusinessCardProps) => {
  const { t } = useTranslation();
  const Icon = business.icon;
  const external = Boolean(business.link);
  const href = external ? business.link! : `/businesses/${business.slug}`;
  const tag = t(`pageContent.companies.${business.slug}.tag`, { defaultValue: business.tag });
  const description = t(`pageContent.companies.${business.slug}.desc`, { defaultValue: business.description });
  const label = `${business.name} — ${tag}. ${external ? "Visit website" : "Visit company page"}`;

  const inner = (
    <>
      <div className="flex items-start justify-between gap-3 transition-all duration-500 group-hover:-translate-y-2 group-hover:opacity-0">
        <div className="flex items-center gap-2">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/85">
            {tag}
          </p>
          {/* Touch-only "whole card is tappable" hint — shown via CSS in the
              (hover: none) block, hidden on hover-capable devices. */}
          <span className="business-card-tap hidden items-center gap-1 rounded-full bg-(--color-yellow)/20 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-(--color-yellow)">
            <MousePointerClick size={12} strokeWidth={2.5} aria-hidden="true" className="tap-hint-pulse" />
            {t("businessCard.tapToVisit")}
          </span>
        </div>
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm">
          <Icon size={20} strokeWidth={2.5} aria-hidden="true" />
        </div>
      </div>

      <h3 className="business-card-name mt-auto flex max-w-[90%] items-center gap-1.5 text-xl font-extrabold leading-tight text-white transition-all duration-500 group-hover:translate-y-2 group-hover:opacity-0">
        {business.name}
        {external && (
          <ExternalLink size={15} strokeWidth={2.5} aria-hidden="true" className="shrink-0 text-(--color-yellow) drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]" />
        )}
      </h3>

      <div className="business-card-desc pointer-events-none absolute inset-0 z-60 flex scale-95 flex-col items-center justify-center gap-4 p-6 text-center opacity-0 transition-all duration-500 ease-out group-focus-within:scale-100 group-focus-within:opacity-100 group-hover:scale-100 group-hover:opacity-100">
        <p className="max-w-md text-sm font-medium leading-6 text-white drop-shadow-lg">
          {description}
        </p>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-[13px] font-bold uppercase tracking-[0.08em] text-(--color-ink-deep) shadow-lg transition-colors duration-200 group-hover:bg-(--color-blue) group-hover:text-white">
          {t("businessCard.readMore")}
          {external ? (
            <ExternalLink size={16} strokeWidth={2.5} aria-hidden="true" />
          ) : (
            <ArrowRight size={16} strokeWidth={2.5} aria-hidden="true" />
          )}
        </span>
      </div>
    </>
  );

  return (
    <article className="business-card group relative flex h-65 overflow-hidden rounded-2xl border border-white/60 bg-white shadow-sm transition-shadow duration-500 hover:shadow-xl">
      <img
        src={business.image}
        alt={`${business.name} visual`}
        width={1536}
        height={1024}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {/* Dark overlay lifts on hover so the photo and colour wash show through */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-black/35 transition-opacity duration-500 group-hover:opacity-0" />

      {/* Colour wash fades in on hover */}
      <div
        className="pointer-events-none absolute inset-0 z-20 opacity-0 mix-blend-screen transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at 30% 25%, ${business.color1} 0%, transparent 42%),
            radial-gradient(circle at 75% 70%, ${business.color2} 0%, transparent 44%),
            linear-gradient(135deg, ${business.color1}, var(--color-blue), ${business.color2})`,
        }}
      />

      {/* Teal radial tint fades in on hover */}
      <div className="pointer-events-none absolute inset-0 z-30 bg-[radial-gradient(circle_at_center,var(--color-teal)_0%,rgba(6,106,156,0.8)_48%,rgba(4,78,116,0.95)_100%)] opacity-0 transition-opacity duration-500 group-hover:opacity-35" />

      {/* Bottom legibility gradient lifts on hover */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 h-44 bg-linear-to-t from-black/75 via-black/30 to-transparent transition-opacity duration-500 group-hover:opacity-0" />

      {external ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="relative z-50 flex h-full w-full flex-col justify-between p-5"
        >
          {inner}
        </a>
      ) : (
        <Link to={href} aria-label={label} className="relative z-50 flex h-full w-full flex-col justify-between p-5">
          {inner}
        </Link>
      )}
    </article>
  );
};

export default BusinessCard;
