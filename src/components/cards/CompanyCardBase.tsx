import type { ReactNode } from "react";

type CompanyCardBaseProps = {
  image: string;
  imageSm?: string;
  imageAlt: string;
  /** Ghost number shown in top-left, omit to hide */
  cardNo?: string;
  /** Optional gradient tint overlay color, defaults to night */
  tint?: string;
  /** Content rendered on top of the image/overlay */
  children: ReactNode;
  /** Extra class on the outer wrapper */
  className?: string;
};

const CompanyCardBase = ({
  image,
  imageSm,
  imageAlt,
  cardNo,
  tint,
  children,
  className = "",
}: CompanyCardBaseProps) => (
  <div
    className={`group relative flex h-48 sm:h-56 flex-col overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 bg-(--color-ink-deep) shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-white/30 hover:shadow-2xl ${className}`}
  >
    {/* Background image */}
    <div className="absolute inset-0 overflow-hidden">
      <img
        src={image}
        srcSet={imageSm ? `${imageSm} 400w, ${image} 800w` : undefined}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        alt={imageAlt}
        width={760}
        height={426}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />
    </div>

    {/* Gradient tint overlay */}
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 transition-opacity duration-500"
      style={{
        background:
          tint ??
          "linear-gradient(to top, var(--color-night), color-mix(in srgb, var(--color-night) 50%, transparent), transparent)",
      }}
    />

    {/* Shiny glass sweep */}
    <span aria-hidden="true" className="card-shine-lines" />

    {/* Ghost number */}
    {cardNo && (
      <span
        aria-hidden="true"
        className="font-ledger pointer-events-none absolute inset-s-3 sm:inset-s-4 top-2 z-2 text-[28px] sm:text-[36px] font-bold leading-none text-white/12 transition-colors duration-300 group-hover:text-white/20"
      >
        {cardNo}
      </span>
    )}

    {children}
  </div>
);

export default CompanyCardBase;
