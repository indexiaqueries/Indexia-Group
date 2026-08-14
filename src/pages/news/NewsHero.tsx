import { useTranslation } from "react-i18next";
import Eyebrow from "../../components/common/Eyebrow";
import HeroBackdrop from "../../components/banners/HeroBackdrop";
import newsBg from "../../assets/footer-img.webp";

const NewsHero = () => {
  const { t } = useTranslation();

  return (
    <HeroBackdrop
      image={newsBg}
      radial="radial-gradient(circle at 82% 18%, rgba(38,174,144,0.14), transparent 50%)"
    >
      <div className="mb-4 flex items-center justify-center gap-3">
        <span className="h-px w-8 bg-(--color-yellow)/70" />
        <Eyebrow color="var(--color-yellow)">{t("newsPage.eyebrow")}</Eyebrow>
        <span className="h-px w-8 bg-(--color-yellow)/70" />
      </div>
      <h1 className="font-display mx-auto mb-5 max-w-4xl text-[clamp(32px,6vw,60px)] font-bold leading-tight text-white">
        {t("newsPage.titleStart")}
        <span className="text-(--color-yellow)">{t("newsPage.titleAccent")}</span>
      </h1>
      <p className="mx-auto max-w-2xl text-base leading-8 text-white/80">{t("newsPage.subtitle")}</p>
    </HeroBackdrop>
  );
};

export default NewsHero;
