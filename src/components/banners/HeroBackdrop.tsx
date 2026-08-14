import type { CSSProperties, ReactNode } from "react";
import { colors } from "../../lib/theme";

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

const HeroBackdrop = ({
  image,
  children,
  background = `linear-gradient(115deg, ${colors.navyDeep} 0%, ${colors.navy} 55%, ${colors.navyMid} 100%)`,
  overlay = `linear-gradient(115deg, ${colors.navyDeep}d9 0%, ${colors.navy}b3 55%, ${colors.navyMid}8c 100%)`,
  radial,
  ruledClassName = "pointer-events-none absolute inset-0 ruled opacity-80",
  ruledStyle,
  containerClassName =
    "relative mx-auto w-full max-w-7xl px-5 py-20 pt-28 text-center sm:px-6 lg:px-8 lg:py-24",
  extra,
}: HeroBackdropProps) => (
  <section
    className="relative overflow-hidden min-h-[92svh] sm:min-h-screen flex items-center"
    style={{ background }}
  >
    <img
      aria-hidden="true"
      src={image}
      alt=""
      width={1717}
      height={916}
      decoding="async"
      fetchPriority="high"
      className="absolute inset-0 h-full w-full object-cover object-center"
    />
    <div className="pointer-events-none absolute inset-0" style={{ background: overlay }} />
    <div className={ruledClassName} style={ruledStyle} />
    {radial && <div className="pointer-events-none absolute inset-0" style={{ background: radial }} />}

    <div className={containerClassName}>{children}</div>

    {extra}
  </section>
);

export default HeroBackdrop;
