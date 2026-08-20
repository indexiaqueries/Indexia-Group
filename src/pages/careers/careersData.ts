import { useTranslation } from "react-i18next";
import { jobRoles, careerCulture } from "../../data/careers";

export type RoleItem = (typeof jobRoles)[number];

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
  const { t } = useTranslation();
  const tr = (path: string, fallback: string) => t(`pageContent.careers.${path}`, { defaultValue: fallback });

  const roles = jobRoles.map((r) => ({
    ...r,
    title: tr(`roles.${r.key}.title`, r.title),
    department: tr(`roles.${r.key}.department`, r.department),
    type: tr(`roles.${r.key}.type`, r.type),
  }));
  const culture = careerCulture.map((p, i) => tr(`culture.${i}`, p));

  return { roles, culture };
};
