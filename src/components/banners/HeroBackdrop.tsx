import type { CSSProperties, ReactNode } from "react";
import { colors } from "../../lib/theme";
import { getResponsiveVariants, WIDTHS } from "../../lib/responsiveVariants";

type HeroBackdropProps = {
  image: string;
  children: ReactNode;
  background?: string;
  overlay?: string;
  radial?: string;
  ruledClassName?: string;
  ruledStyle?: CSSProperties;
  containerClassName?: string;
  extra?: ReactNode;
};

const HeroBgImage = ({ src }: { src: string }) => {
  const variants = getResponsiveVariants(src);
  if (!variants) {
    return (
      <img
        aria-hidden="true"
        src={src}
        alt=""
        width={1717}
        height={916}
        loading="eager"
        decoding="async"
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
    );
  }
  const webpSrcSet = WIDTHS.filter((w) => variants[w])
    .map((w) => `${variants[w]} ${w}w`)
    .join(", ");
  return (
    <picture>
      <source type="image/webp" srcSet={webpSrcSet} sizes="100vw" />
      <img
        aria-hidden="true"
        src={src}
        alt=""
        width={1717}
        height={916}
        loading="eager"
        decoding="async"
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
    </picture>
  );
};

const HeroBackdrop = ({
  image,
  children,
  background = `linear-gradient(115deg, ${colors.navyDeep} 0%, ${colors.navy} 55%, ${colors.navyMid} 100%)`,
  overlay = `linear-gradient(115deg, ${colors.navyDeep}d9 0%, ${colors.navy}b3 55%, ${colors.navyMid}8c 100%)`,
  radial,
  ruledClassName = "pointer-events-none absolute inset-0 opacity-25",
  ruledStyle = {
    backgroundImage:
      "linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(180deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
    backgroundSize: "96px 96px",
  },
  containerClassName =
    "relative mx-auto w-full max-w-7xl px-4 py-16 pt-24 text-center sm:px-6 lg:px-8 lg:py-22",
  extra,
}: HeroBackdropProps) => (
  <section
    className="relative flex min-h-[92svh] items-center overflow-hidden sm:min-h-screen"
    style={{ background }}
  >
    <HeroBgImage src={image} />
    <div className="pointer-events-none absolute inset-0" style={{ background: overlay }} />
    <div className={ruledClassName} style={ruledStyle} />
    {radial && <div className="pointer-events-none absolute inset-0" style={{ background: radial }} />}

    <div className={containerClassName}>{children}</div>

    {extra}
  </section>
);

export default HeroBackdrop;
