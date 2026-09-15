import { useTranslation } from "react-i18next";
import Eyebrow from "../common/Eyebrow";
import HeroBackdrop from "./shared/HeroBackdrop";

type LegalHeroProps = {
  image: string;
  title: string;
  subtitle: string;
  lastUpdated: string;
};

const LegalHero = ({ image, title, subtitle, lastUpdated }: LegalHeroProps) => {
  const { t } = useTranslation();

  return (
    <HeroBackdrop image={image}>
      <div className="hero-panel-glass relative mx-auto max-w-3xl px-5 py-6 text-center sm:px-10 sm:py-7">
        <div className="mb-4 flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-(--color-yellow)/70" />
          <Eyebrow color="var(--color-yellow)">{t("legal.eyebrow")}</Eyebrow>
          <span className="h-px w-8 bg-(--color-yellow)/70" />
        </div>
        <h1 className="font-display mx-auto mb-5 max-w-3xl text-[clamp(24px,4vw,44px)] font-bold leading-tight text-white">
          {title}
        </h1>
        <p className="mx-auto mb-7 max-w-2xl text-sm leading-7 text-white/80">{subtitle}</p>
        <p className="font-ledger text-xs font-bold uppercase tracking-[0.22em] text-white/55">
          {t("legal.lastUpdated")}: {lastUpdated}
        </p>
      </div>
    </HeroBackdrop>
  );
};

export default LegalHero;
