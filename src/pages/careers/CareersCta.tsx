import { useTranslation } from "react-i18next";
import ImpactBand from "../../components/common/ImpactBand";
import careersBg from "../../assets/hero-img/BusinessesHero.webp";

const CareersCta = () => {
  const { t } = useTranslation();

  return (
    <ImpactBand
      image={careersBg}
      eyebrow={t("careersPage.eyebrow")}
      title={t("careersPage.ctaTitle")}
      body={t("careersPage.ctaBody")}
      actionLabel="hr@indexiafinance.com"
      href="mailto:hr@indexiafinance.com"
    />
  );
};

export default CareersCta;
