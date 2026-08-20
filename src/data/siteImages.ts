import type { ImageSlotData } from "../components/common/ImageSlot";
import contactCorporate from "../assets/contact-img/corporateoffice.webp";
import contactCare from "../assets/contact-img/customercare.webp";
import contactDelhi from "../assets/contact-img/delhioffice.webp";
import contactInternational from "../assets/contact-img/internationaloffice.webp";
import contactMumbai from "../assets/contact-img/mumbaioffice.webp";
import careersHeroNew from "../../public/images/careers/careers-hero.webp";
import careersCultureNew from "../../public/images/careers/careers-culture.webp";
import careersRolesNew from "../../public/images/careers/careers-roles.webp";
import companyEnquiry from "../assets/company-pages-img/common/enquiry-support.webp";
import companyImpact from "../assets/company-pages-img/common/impact-banner.webp";
import companyStory from "../assets/company-pages-img/common/overview-banner.webp";
import newsFeatured from "../assets/news&knowledge-img/featured-story.webp";
import securityFeatures from "../assets/security-img/online-security.webp";
import researchOTGImg from "../../public/images/research/otg-report.webp";
import researchACTImg from "../../public/images/research/act-report.webp";
import researchSpecialImg from "../../public/images/research/special-reports.webp";
import newsFeaturedNew from "../../public/images/news/featured-story.webp";
import securityPracticesImg from "../../public/images/security/online-security.webp";

export const siteImages: Record<string, ImageSlotData> = {
  contactCorporate: {
    src: contactCorporate,
    label: "Corporate office (Fort, Mumbai)",
  },
  contactMumbai: {
    src: contactMumbai,
    label: "Mumbai office (Andheri West)",
  },
  contactDelhi: {
    src: contactDelhi,
    label: "Delhi office (Naraina Vihar)",
  },
  contactInternational: {
    src: contactInternational,
    label: "International office (Ecuador)",
  },
  contactEnquiry: {
    src: contactCare,
    label: "Customer-care representative photo",
  },
  companyImpact: {
    src: companyImpact,
    label: "Company impact photo",
  },
  companyStory: {
    src: companyStory,
    label: "Company story photo",
  },
  companyEnquiry: {
    src: companyEnquiry,
    label: "Company enquiry support photo",
  },
  careersCulture: {
    src: careersCultureNew,
    label: "Office culture photo",
  },
  careersOpenRoles: {
    src: careersRolesNew,
    label: "Team collaboration photo",
  },
  careersHero: {
    src: careersHeroNew,
    label: "Careers hero background",
  },
  newsFeatured: {
    src: newsFeatured,
    label: "Featured story image",
  },
  researchOTG: {
    src: researchOTGImg,
    label: "OTG research report cover",
  },
  researchACT: {
    src: researchACTImg,
    label: "ACT research report cover",
  },
  researchSpecial: {
    src: researchSpecialImg,
    label: "Special research reports cover",
  },
  newsFeaturedNew: {
    src: newsFeaturedNew,
    label: "News featured story image",
  },
  securityPractices: {
    src: securityPracticesImg,
    label: "Security practices illustration",
  },
  securityFeatures: {
    src: securityFeatures,
    label: "Online security illustration",
  },
};
