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
  const actionClass =
    accent === "teal"
      ? "bg-(--color-teal) text-white shadow-[0_4px_16px_rgba(38,174,144,0.35)] hover:bg-(--color-teal-deep)"
      : "bg-(--color-yellow) text-(--color-yellow-ink) shadow-[0_4px_16px_rgba(242,242,49,0.35)] hover:bg-(--color-yellow-bright)";
  const action = `mt-8 inline-flex items-center gap-2 rounded-full px-5 py-2.5 sm:px-7 sm:py-3 text-[13px] sm:text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 ${actionClass}`;

  return (
    <section className={`relative overflow-hidden px-2 py-8 sm:px-3 sm:py-10 lg:px-5 ${className}`}>
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
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -end-20 top-0 h-80 w-80 rounded-full bg-(--color-teal)/25 blur-3xl"
      />
      <div className="container relative">
        <Reveal className="max-w-2xl">
          {eyebrow && <Eyebrow color="var(--color-yellow)">{eyebrow}</Eyebrow>}
          <h2 className="font-display mt-4 text-[clamp(28px,4.3vw,50px)] font-bold leading-[1.08] text-white">
            {title}
          </h2>
          <p className="mt-5 max-w-xl text-[14px] sm:text-[15px] leading-7 sm:leading-8 text-white/78">{body}</p>
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
