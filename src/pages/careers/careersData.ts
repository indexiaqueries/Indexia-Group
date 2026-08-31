import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { careerCulture } from "../../data/careers";

export type RoleItem = {
  _id?: string;
  title: string;
  department: string;
  company: string;
  location: string;
  type: string;
  description?: string;
  requirements?: string[];
};

export const useCareersJsonLd = () => {
  const { t } = useTranslation();
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "JobPosting",
        name: t("jsonLd.careersName", "Open roles at Indexia Group"),
        url: "https://www.indexiagroup.com/careers",
        hiringOrganization: { "@type": "Organization", name: t("jsonLd.orgName", "Indexia Group") },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: t("jsonLd.breadcrumbHome", "Home"), item: "https://www.indexiagroup.com/" },
          { "@type": "ListItem", position: 2, name: t("jsonLd.breadcrumbCareers", "Careers"), item: "https://www.indexiagroup.com/careers" },
        ],
      },
    ],
  };
};

export const useCareersContent = () => {
  const [roles, setRoles] = useState<RoleItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/openings")
      .then((r) => r.json())
      .then((data) => {
        if (data.ok && data.openings) {
          setRoles(data.openings);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const culture = [
    t("careersPage.cultureBody1", careerCulture[0]),
    t("careersPage.cultureBody2", careerCulture[1]),
  ];

  return { roles, culture, loading };
};
