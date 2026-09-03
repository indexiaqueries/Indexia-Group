import type { ReactNode } from "react";
import { colors } from "../../lib/theme";
import { getResponsiveVariants, WIDTHS } from "../../lib/responsiveVariants";

type HeroBackdropProps = {
  image: string;
  children: ReactNode;
  /** Fallback colour painted behind the image (for transparent art / pre-load). */
  background?: string;
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
  containerClassName =
    "relative mx-auto w-full max-w-7xl px-4 py-16 pt-24 text-center sm:px-6 lg:px-8 lg:py-22",
  extra,
}: HeroBackdropProps) => (
  <section
    className="relative flex min-h-[92svh] items-center overflow-hidden sm:min-h-screen"
    style={{ background }}
  >
    <HeroBgImage src={image} />
    <div className={containerClassName}>{children}</div>

    {extra}
  </section>
);

export default HeroBackdrop;
