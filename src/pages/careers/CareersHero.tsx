import { useTranslation } from "react-i18next";
import Eyebrow from "../../components/common/Eyebrow";
import { getResponsiveVariants, WIDTHS } from "../../lib/responsiveVariants";
import careerHeroImg from "../../assets/hero-img/CareerHero.png";

const SECTOR_KEYS = [
  "finance",
  "export",
  "agriculture",
  "security",
  "leasing",
  "advertising",
  "athleteDevelopment",
] as const;

const CareerHeroBg = () => {
  const variants = getResponsiveVariants(careerHeroImg);
  if (!variants) {
    return (
      <img
        src={careerHeroImg}
        alt=""
        width={1920}
        height={900}
        loading="eager"
        decoding="async"
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
    );
  }
  const srcSet = WIDTHS.filter((w) => variants[w])
    .map((w) => `${variants[w]} ${w}w`)
    .join(", ");
  return (
    <picture>
      <source type="image/webp" srcSet={srcSet} sizes="100vw" />
      <img
        src={careerHeroImg}
        alt=""
        width={1920}
        height={900}
        loading="eager"
        decoding="async"
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
    </picture>
  );
};

const SectorTicker = () => {
  const { t } = useTranslation();
  const sectors = SECTOR_KEYS.map((key) => t(`careersHero.sectors.${key}`));
  // Doubled for a seamless loop
  const loop = [...sectors, ...sectors];
  return (
    <div className="sector-ticker-mask relative border-t border-white/10 bg-(--color-ink-deep)/60 backdrop-blur-sm">
      <div className="sector-ticker group flex overflow-hidden py-3 sm:py-4">
        <ul className="sector-ticker-track flex shrink-0 items-center gap-8 pr-8 group-hover:[animation-play-state:paused]">
          {loop.map((sector, i) => (
            <li
              key={`${sector}-${i}`}
              className="flex shrink-0 items-center gap-8 text-[11px] font-semibold tracking-[0.18em] text-white/50 sm:text-xs"
            >
              {sector}
              <span className="text-(--color-yellow)/60" aria-hidden="true">
                ◆
              </span>
            </li>
          ))}
        </ul>
        <ul
          aria-hidden="true"
          className="sector-ticker-track flex shrink-0 items-center gap-8 pr-8 group-hover:[animation-play-state:paused]"
        >
          {loop.map((sector, i) => (
            <li
              key={`dup-${sector}-${i}`}
              className="flex shrink-0 items-center gap-8 text-[11px] font-semibold tracking-[0.18em] text-white/50 sm:text-xs"
            >
              {sector}
              <span className="text-(--color-yellow)/60" aria-hidden="true">
                ◆
              </span>
            </li>
          ))}
        </ul>
      </div>
      <style>{`
        .sector-ticker-track {
          animation: sector-ticker-scroll 32s linear infinite;
        }
        @keyframes sector-ticker-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-100%); }
        }
        .sector-ticker-mask {
          -webkit-mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
          mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
        }
        @media (prefers-reduced-motion: reduce) {
          .sector-ticker-track { animation: none; }
        }
      `}</style>
    </div>
  );
};

const CareersHero = () => {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden bg-(--color-ink-deep) min-h-[92svh] sm:min-h-screen flex flex-col">
      <div className="relative flex flex-1 items-center">
        <CareerHeroBg />

        <div className="relative mx-auto w-full max-w-7xl px-2 py-8 pt-16 sm:px-3 sm:py-10 sm:pt-20 lg:px-5 lg:py-14">
          <div className="hero-panel-glass relative max-w-4xl p-5 sm:p-8 lg:p-10">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-(--color-yellow)/60" />
            <Eyebrow color="var(--color-yellow)" size="md">
              {t("careersPage.eyebrow")}
            </Eyebrow>
          </div>

          <div className="flex items-start gap-4 sm:gap-5">
            <span
              aria-hidden="true"
              className="mt-3 hidden h-16 w-0.75 shrink-0 bg-(--color-yellow) sm:block sm:h-20 lg:h-24"
            />
            <h1 className="font-display max-w-4xl text-[clamp(34px,6vw,64px)] font-bold leading-[1.08] text-white">
              {t("careersPage.titleStart")}
              <span className="text-shimmer text-(--color-yellow)">
                {t("careersPage.titleAccent")}
              </span>
            </h1>
          </div>

          <p className="mt-4 max-w-xl text-sm sm:text-[15px] leading-6 sm:leading-7 text-white/70">
            {t("careersHero.description")}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-5">
            <button
              type="button"
              onClick={() =>
                document
                  .getElementById("open-roles")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="group inline-flex items-center gap-2 rounded-full bg-(--color-yellow) px-6 py-3 sm:px-8 sm:py-3.5 text-[13px] sm:text-sm font-bold text-(--color-yellow-ink) shadow-[0_4px_16px_rgba(242,242,49,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-(--color-yellow-bright)"
            >
              {t("careersPage.ctaButton")}
              <svg
                width="15"
                height="15"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                className="transition-transform duration-200 group-hover:translate-y-0.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </button>

            <div className="flex items-center gap-2 text-white/60">
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-xs font-bold text-(--color-yellow)">
                8
              </span>
              <span className="text-[11px] tracking-[0.14em] sm:text-xs">
                {t("careersHero.companiesOneGroup")}
              </span>
            </div>
          </div>
          </div>
        </div>
      </div>

      <SectorTicker />
    </section>
  );
};

export default CareersHero;