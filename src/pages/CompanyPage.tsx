import { Navigate, useParams } from "react-router-dom";
import SEO from "../components/common/SEO";
import CompanyDetail from "../components/businesses/CompanyDetail";
import { companies } from "../data/companies";

const CompanyPage = () => {
  const { slug } = useParams();
  const company = companies.find((c) => c.slug === slug);

  if (!company) {
    return <Navigate to="/businesses" replace />;
  }

  return (
    <main className="bg-white">
      <SEO
        title={`${company.name} — ${company.tag}`}
        description={company.desc}
        keywords={`${company.name}, Indexia Group ${company.tag}, ${company.name} services, Indexia Group companies`}
        canonicalPath={`/businesses/${company.slug}`}
      />
      <CompanyDetail company={company} showBackLink />
    </main>
  );
};

export default CompanyPage;
