import { useTranslation } from "react-i18next";
import ImpactBand from "../../components/common/ImpactBand";
const newsBg = "/images/heroes/news-hero.webp";

const NewsCta = () => {
  const { t } = useTranslation();

  return (
    <ImpactBand
      image={newsBg}
      eyebrow={t("newsPage.featuredLabel")}
      title={t("newsPage.ctaTitle")}
      body={t("newsPage.ctaBody")}
      actionLabel={`${t("newsPage.ctaButton")} ->`}
      to="/contact"
      accent="teal"
    />
  );
};

export default NewsCta;
