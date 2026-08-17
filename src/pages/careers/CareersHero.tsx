import { useTranslation } from "react-i18next";
import Eyebrow from "../../components/common/Eyebrow";
import HeroBackdrop from "../../components/banners/HeroBackdrop";
import careersBg from "../../assets/BusinessesHero.webp";

const CareersHero = () => {
  const { t } = useTranslation();

  return (
    <HeroBackdrop
      image={careersBg}
      radial="radial-gradient(circle at 82% 18%, rgba(242,242,49,0.12), transparent 50%)"
    >
      <div className="mb-4 flex items-center justify-center gap-3">
        <span className="h-px w-8 bg-(--color-yellow)/70" />
        <Eyebrow color="var(--color-yellow)">{t("careersPage.eyebrow")}</Eyebrow>
        <span className="h-px w-8 bg-(--color-yellow)/70" />
      </div>
      <h1 className="font-display mx-auto mb-5 max-w-4xl text-[clamp(32px,6vw,60px)] font-bold leading-tight text-white">
        {t("careersPage.titleStart")}
        <span className="text-(--color-yellow)">{t("careersPage.titleAccent")}</span>
      </h1>
      <p className="mx-auto max-w-2xl text-base leading-8 text-white/80">{t("careersPage.subtitle")}</p>
      <button
        type="button"
        onClick={() => document.getElementById("open-roles")?.scrollIntoView({ behavior: "smooth" })}
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-(--color-yellow) px-8 py-3.5 text-sm font-bold text-(--color-yellow-ink) shadow-[0_4px_16px_rgba(242,242,49,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-(--color-yellow-bright)"
      >
        {t("careersPage.ctaButton")} ↓
      </button>
    </HeroBackdrop>
  );
};

export default CareersHero;
