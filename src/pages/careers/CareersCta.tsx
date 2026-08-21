import { useTranslation } from "react-i18next";
import ImpactBand from "../../components/common/ImpactBand";
import mailUsImg from "../../assets/careers-img/MailUs.png";

const CareersCta = () => {
  const { t } = useTranslation();

  return (
    <ImpactBand
      image={mailUsImg}
      eyebrow={t("careersPage.eyebrow")}
      title={t("careersPage.ctaTitle")}
      body={t("careersPage.ctaBody")}
      actionLabel="hr.indexia@gmail.com"
      href="mailto:hr.indexia@gmail.com"
    />
  );
};

export default CareersCta;
