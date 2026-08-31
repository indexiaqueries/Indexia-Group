import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SEO from "../components/common/SEO";
import CompanyDetail from "../components/businesses/CompanyDetail";
import { companies } from "../data/companies";

const CompanyPage = ({ slug: slugProp }: { slug?: string } = {}) => {
  const { t } = useTranslation();
  const params = useParams();
  const slug = slugProp ?? params.slug;
  const company = companies.find((c) => c.slug === slug);

  useEffect(() => {
    if (company?.link) {
      window.location.replace(company.link);
    }
  }, [company]);

  if (!company) {
    return <Navigate to="/about" replace />;
  }

  if (company.link) {
    return null;
  }

  const tr = (path: string, fallback: string) => t(`pageContent.companies.${slug}.${path}`, { defaultValue: fallback });
  const name = tr("name", company.name);
  const tag = tr("tag", company.tag);
  const desc = tr("desc", company.desc);
  const canonicalPath = `/${company.slug}`;
  const companyJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: `${name} - ${tag}`,
        url: `https://www.indexiagroup.com${canonicalPath}`,
        description: desc,
        isPartOf: { "@id": "https://www.indexiagroup.com/#website" },
        about: {
          "@type": "Organization",
          name,
          description: desc,
          parentOrganization: {
            "@type": "Organization",
            name: "Indexia Group",
            url: "https://www.indexiagroup.com/",
          },
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: t("jsonLd.breadcrumbHome"), item: "https://www.indexiagroup.com/" },
          { "@type": "ListItem", position: 2, name: t("jsonLd.breadcrumbCompanies"), item: "https://www.indexiagroup.com/about" },
          { "@type": "ListItem", position: 3, name, item: `https://www.indexiagroup.com${canonicalPath}` },
        ],
      },
    ],
  };

  return (
    <main className="bg-white">
      <SEO
        title={`${name} - ${tag}`}
        description={desc}
        keywords={`${name}, Indexia Group ${tag}, ${name} services, Indexia Group companies`}
        canonicalPath={canonicalPath}
        jsonLd={companyJsonLd}
      />
      <CompanyDetail company={company} showBackLink />
    </main>
  );
};

export default CompanyPage;
