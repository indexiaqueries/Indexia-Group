import { useTranslation } from "react-i18next";
import SEO from "../components/common/SEO";
import CareersHero from "./careers/CareersHero";
import CultureSection from "./careers/CultureSection";
import OpenRoles from "./careers/OpenRoles";
import CareersCta from "./careers/CareersCta";
import { careersJsonLd, useCareersContent } from "./careers/careersData";

const CareersPage = () => {
  const { t } = useTranslation();
  const { roles, culture } = useCareersContent();

  return (
    <main className="bg-white">
      <SEO
        title={t("careersPage.title")}
        description={t("careersPage.metaDescription")}
        keywords="Indexia Group careers, jobs at Indexia Finance, finance jobs Mumbai, export jobs Surat, security jobs Delhi NCR, warehouse jobs, advertising sales jobs"
        canonicalPath="/careers"
        jsonLd={careersJsonLd}
      />

      <CareersHero />
      <CultureSection culture={culture} />
      <OpenRoles roles={roles} />
      <CareersCta />
    </main>
  );
};

export default CareersPage;
