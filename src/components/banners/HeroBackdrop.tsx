import type { CSSProperties, ReactNode } from "react";
import { colors } from "../../lib/theme";

type HeroBackdropProps = {
  image: string;
  children: ReactNode;
  /** Base gradient behind the image — defaults to the navy brand gradient. */
  background?: string;
  /** Dark gradient over the image for legibility. */
  overlay?: string;
  /** Optional accent radial tint. */
  radial?: string;
  /** Classes for the ruled-line layer (defaults to `.ruled` at 80% opacity). */
  ruledClassName?: string;
  /** Optional inline style for the ruled layer (e.g. a custom line pattern). */
  ruledStyle?: CSSProperties;
  /** Classes for the inner max-w-7xl content wrapper. */
  containerClassName?: string;
  /** Extra elements rendered at the section level (e.g. a stamp badge). */
  extra?: ReactNode;
};

/**
 * Full-screen hero shell shared by the page heroes: navy gradient background,
 * full-bleed photo, dark legibility overlay, ruled lines and an optional
 * radial accent. Content goes in the centered max-w-7xl wrapper.
 */
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
