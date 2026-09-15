import { useTranslation } from "react-i18next";
import Eyebrow from "../common/Eyebrow";
import HeroBackdrop from "./shared/HeroBackdrop";

const securityBg = "/images/heroes/security-hero.webp";

const SecurityHero = () => {
  const { t } = useTranslation();

  return (
    <HeroBackdrop image={securityBg}>
      <div className="hero-panel-glass relative mx-auto max-w-4xl px-5 py-9 text-center sm:px-10 sm:py-11">
        <div className="mb-4 flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-(--color-yellow)/70" />
          <Eyebrow color="var(--color-yellow)">{t("securityTipsPage.eyebrow")}</Eyebrow>
          <span className="h-px w-8 bg-(--color-yellow)/70" />
        </div>
        <h1 className="font-display mx-auto mb-5 max-w-4xl text-[clamp(24px,4vw,44px)] font-bold leading-tight text-white">
          {t("securityTipsPage.titleStart")}
          <span className="text-(--color-yellow)">{t("securityTipsPage.titleAccent")}</span>
        </h1>
        <p className="mx-auto max-w-2xl text-sm leading-7 text-white/80">{t("securityTipsPage.subtitle")}</p>
        <button
          type="button"
          onClick={() => document.getElementById("practices")?.scrollIntoView({ behavior: "smooth" })}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-(--color-yellow) px-8 py-3.5 text-sm font-bold text-(--color-yellow-ink) shadow-[0_4px_16px_rgba(242,242,49,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-(--color-yellow-bright)"
        >
          {t("securityTipsPage.ctaButton")} ↓
        </button>
      </div>
    </HeroBackdrop>
  );
};

export default SecurityHero;
