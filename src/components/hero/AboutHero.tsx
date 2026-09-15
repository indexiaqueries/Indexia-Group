import type { CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import Eyebrow from "../common/Eyebrow";
import HeroBackdrop from "./shared/HeroBackdrop";
import aboutBg from "../../assets/hero-img/AboutHero.webp";

const AboutHero = () => {
  const { t } = useTranslation();
  const tr = (path: string, fallback: string) => t(`aboutPage.${path}`, { defaultValue: fallback });

  return (
    <HeroBackdrop image={aboutBg}>
      <div className="hero-panel-glass relative mx-auto max-w-2xl px-5 py-9 text-center sm:px-10 sm:py-11">
        <div className="fade-up mb-4 flex items-center justify-center gap-3" style={{ animationDelay: "0.05s" } as CSSProperties}>
          <span className="h-px w-8 bg-(--color-yellow)/70" />
          <Eyebrow color="var(--color-yellow)">{tr("eyebrow", "About Us")}</Eyebrow>
          <span className="h-px w-8 bg-(--color-yellow)/70" />
        </div>
        <h1 className="fade-up font-display mx-auto mb-3 max-w-2xl text-[clamp(24px,4vw,44px)] font-bold leading-tight text-white" style={{ animationDelay: "0.14s" } as CSSProperties}>
          {tr("titleStart", "Some steps to ")}<br />
          <span className="text-(--color-yellow)">{tr("titleAccent", "serve the nation")}</span>
        </h1>
        <p className="fade-up mx-auto mb-2 max-w-2xl font-ledger text-[11px] sm:text-sm tracking-[0.18em] sm:tracking-[0.2em] text-(--color-yellow)/80" style={{ animationDelay: "0.23s" } as CSSProperties}>
          {tr("taglineSecondary", "Diverse Ventures. Unified Vision.")}
        </p>
        <p className="fade-up mx-auto max-w-2xl text-[12px] sm:text-sm leading-6 sm:leading-7 text-white/80" style={{ animationDelay: "0.32s" } as CSSProperties}>
          {tr("subtitle", "Diverse Ventures. Unified Vision.")}
        </p>
      </div>
    </HeroBackdrop>
  );
};

export default AboutHero;
