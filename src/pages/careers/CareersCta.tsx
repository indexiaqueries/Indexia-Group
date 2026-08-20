import { useTranslation } from "react-i18next";
import ImpactBand from "../../components/common/ImpactBand";
import { siteImages } from "../../data/siteImages";

const CareersCta = () => {
  const { t } = useTranslation();
  const heroSrc = siteImages.careersHero?.src;

  return (
    <ImpactBand
      image={heroSrc || ""}
      eyebrow={t("careersPage.eyebrow")}
      title={t("careersPage.ctaTitle")}
      body={t("careersPage.ctaBody")}
      actionLabel="hr.indexia@gmail.com"
      href="mailto:hr.indexia@gmail.com"
    />
  );
};

export default CareersCta;
