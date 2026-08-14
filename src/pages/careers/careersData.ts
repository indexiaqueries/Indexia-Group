import { useTranslation } from "react-i18next";
import { jobRoles, careerValues, processSteps } from "../../data/careers";

export type RoleItem = (typeof jobRoles)[number];
export type ValueItem = (typeof careerValues)[number];
export type StepItem = (typeof processSteps)[number];

export const careersJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "JobPosting",
      name: "Open roles at Indexia Group",
      url: "https://www.indexiagroup.com/careers",
      hiringOrganization: { "@type": "Organization", name: "Indexia Group" },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.indexiagroup.com/" },
        {
          "@type": "ListItem",
          position: 2,
          name: "Careers",
          item: "https://www.indexiagroup.com/careers",
        },
      ],
    },
  ],
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
  const values = careerValues.map((v) => ({
    ...v,
    title: tr(`values.${v.key}.title`, v.title),
    body: tr(`values.${v.key}.body`, v.body),
  }));
  const steps = processSteps.map((s) => ({
    ...s,
    title: tr(`steps.${s.key}.title`, s.title),
    body: tr(`steps.${s.key}.body`, s.body),
  }));

  return { roles, values, steps };
};
