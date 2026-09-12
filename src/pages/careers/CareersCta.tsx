import { useTranslation } from "react-i18next";
import ImpactBand from "../../components/common/ImpactBand";
import { contactEmails } from "../../data/contact";
import mailUsImg from "../../assets/careers-img/MailUs.webp";

const CareersCta = () => {
  const { t } = useTranslation();

  return (
    <ImpactBand
      image={mailUsImg}
      eyebrow={t("careersPage.eyebrow")}
      title={t("careersPage.ctaTitle")}
      body={t("careersPage.ctaBody")}
      actionLabel={contactEmails.hrAlternate}
      href={`mailto:${contactEmails.hrAlternate}`}
      secondaryActionLabel={contactEmails.hr}
      secondaryActionHref={`mailto:${contactEmails.hr}`}
    />
  );
};

export default CareersCta;
