import { useTranslation } from "react-i18next";
import Eyebrow from "../../components/common/Eyebrow";
import { getResponsiveVariants, WIDTHS } from "../../lib/responsiveVariants";
import careerHeroImg from "../../assets/hero-img/CareerHero.png";

const CareerHeroBg = () => {
  const variants = getResponsiveVariants(careerHeroImg);
  if (!variants) {
    return (
      <img src={careerHeroImg} alt="" width={1920} height={900} decoding="async" fetchPriority="high" className="absolute inset-0 h-full w-full object-cover object-center" />
    );
  }
  const srcSet = WIDTHS.filter((w) => variants[w]).map((w) => `${variants[w]} ${w}w`).join(", ");
  return (
    <picture>
      <source type="image/webp" srcSet={srcSet} sizes="100vw" />
      <img src={careerHeroImg} alt="" width={1920} height={900} decoding="async" fetchPriority="high" className="absolute inset-0 h-full w-full object-cover object-center" />
    </picture>
  );
};

const CareersHero = () => {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden bg-(--color-ink-deep) min-h-[92svh] sm:min-h-screen flex items-center">
      <CareerHeroBg />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-(--color-ink-deep)/70 via-(--color-ink-deep)/50 to-(--color-ink-deep)/80" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, transparent 0px, transparent 35px, rgba(255,255,255,0.03) 35px, rgba(255,255,255,0.03) 36px)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 82% 18%, rgba(242,242,49,0.12), transparent 50%), radial-gradient(circle at 20% 80%, rgba(38,174,144,0.1), transparent 50%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-7xl px-2 py-8 pt-16 sm:px-3 sm:py-10 sm:pt-20 lg:px-5 lg:py-14">
        <div className="mb-5 flex items-center gap-3">
          <span className="h-px w-10 bg-(--color-yellow)/60" />
          <Eyebrow color="var(--color-yellow)" size="md">
            {t("careersPage.eyebrow")}
          </Eyebrow>
          <span className="h-px w-10 bg-(--color-yellow)/60" />
        </div>

        <h1 className="font-display max-w-4xl text-[clamp(34px,6vw,64px)] font-bold leading-[1.08] text-white">
          {t("careersPage.titleStart")}
          <span className="text-shimmer text-(--color-yellow)">
            {t("careersPage.titleAccent")}
          </span>
        </h1>

        <p className="mt-5 max-w-2xl text-[13px] sm:text-[15px] leading-6 sm:leading-7 text-white/80">
          {t("careersPage.subtitle")}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={() => document.getElementById("open-roles")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex items-center gap-2 rounded-full bg-(--color-yellow) px-6 py-3 sm:px-8 sm:py-3.5 text-[13px] sm:text-sm font-bold text-(--color-yellow-ink) shadow-[0_4px_16px_rgba(242,242,49,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-(--color-yellow-bright)"
          >
            {t("careersPage.ctaButton")}
            <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </div>

        <div className="mt-6 sm:mt-10 flex flex-wrap items-center gap-5 sm:gap-8 text-[13px] sm:text-sm text-white/60">
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-(--color-teal)" />
            {t("careersPage.rolesSubtitle")}
          </span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-(--color-yellow)" />
            Mumbai, India
          </span>
        </div>
      </div>
    </section>
  );
};

export default CareersHero;
