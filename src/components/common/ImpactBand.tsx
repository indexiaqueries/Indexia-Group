import { Link } from "react-router-dom";
import Reveal from "./Reveal";
import Eyebrow from "./Eyebrow";

type ImpactBandProps = {
  image: string;
  eyebrow?: string;
  title: string;
  body: string;
  actionLabel: string;
  to?: string;
  href?: string;
  accent?: "teal" | "yellow";
  className?: string;
};

const ImpactBand = ({
  image,
  eyebrow,
  title,
  body,
  actionLabel,
  to,
  href,
  accent = "yellow",
  className = "",
}: ImpactBandProps) => {
  const isTeal = accent === "teal";

  const actionClass = isTeal
    ? "bg-(--color-teal) text-white shadow-[0_4px_16px_rgba(38,174,144,0.35)] hover:bg-(--color-teal-deep)"
    : "bg-(--color-yellow) text-(--color-yellow-ink) shadow-[0_4px_16px_rgba(242,242,49,0.35)] hover:bg-(--color-yellow-bright)";
  const action = `mt-8 inline-flex items-center gap-2 rounded-full px-5 py-2.5 sm:px-7 sm:py-3 text-[13px] sm:text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 ${actionClass}`;

  const accentBar = isTeal ? "bg-(--color-teal)" : "bg-(--color-yellow)";
  const accentLine = isTeal ? "bg-(--color-teal)/35" : "bg-(--color-yellow)/35";
  const accentTick = isTeal ? "bg-(--color-teal)/60" : "bg-(--color-yellow)/60";

  return (
    <section className={`relative overflow-hidden px-2 py-10 sm:px-3 sm:py-14 lg:px-5 ${className}`}>
      <img
        src={image}
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-r from-(--color-ink-deep)/95 via-(--color-ink-deep)/76 to-(--color-ink-deep)/34"
      />

      {/* Hairline frame — same device as the rest of the site, in place of a glow */}
      <span aria-hidden="true" className={`absolute inset-x-0 top-0 h-px ${accentLine}`} />
      <span aria-hidden="true" className={`absolute inset-x-0 bottom-0 h-px ${accentLine}`} />

      <div className="container relative">
        <Reveal className="max-w-2xl">
          {eyebrow && (
            <div className="mb-1 flex items-center gap-3">
              <span aria-hidden="true" className={`h-px w-8 ${accentTick}`} />
              <Eyebrow color={isTeal ? "var(--color-teal)" : "var(--color-yellow)"}>
                {eyebrow}
              </Eyebrow>
            </div>
          )}
          <div className="mt-3 flex items-start gap-4">
            <span
              aria-hidden="true"
              className={`mt-2 hidden h-14 w-0.75 shrink-0 sm:block ${accentBar}`}
            />
            <h2 className="font-display text-[clamp(28px,4.3vw,50px)] font-bold leading-[1.08] text-white">
              {title}
            </h2>
          </div>
          <p className="mt-5 max-w-xl text-[14px] sm:text-[15px] leading-7 sm:leading-8 text-white/78">
            {body}
          </p>
          {to ? (
            <Link to={to} className={action}>
              {actionLabel}
            </Link>
          ) : (
            <a href={href} className={action}>
              {actionLabel}
            </a>
          )}
        </Reveal>
      </div>
    </section>
  );
};

export default ImpactBand;