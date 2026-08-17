import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SEO from "../components/common/SEO";
import CompanyDetail from "../components/businesses/CompanyDetail";
import { companies } from "../data/companies";

const CompanyPage = () => {
  const { t } = useTranslation();
  const { slug } = useParams();
  const company = companies.find((c) => c.slug === slug);

  useEffect(() => {
    if (company?.link) {
      window.location.replace(company.link);
    }
  }, [company]);

  if (!company) {
    return <Navigate to="/businesses" replace />;
  }

  if (company.link) {
    return null;
  }

  const tr = (path: string, fallback: string) => t(`pageContent.companies.${slug}.${path}`, { defaultValue: fallback });

  return (
    <main className="bg-white">
      <SEO
        title={`${tr("name", company.name)} — ${tr("tag", company.tag)}`}
        description={tr("desc", company.desc)}
        keywords={`${tr("name", company.name)}, Indexia Group ${tr("tag", company.tag)}, ${tr("name", company.name)} services, Indexia Group companies`}
        canonicalPath={`/businesses/${company.slug}`}
      />
      <CompanyDetail company={company} showBackLink />
    </main>
  );
};

export default CompanyPage;
