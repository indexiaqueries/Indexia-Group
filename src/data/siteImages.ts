import type { ImageSlotData } from "../components/common/ImageSlot";
import contactCorporate from "../assets/contact-img/corporateoffice.webp";
import contactCare from "../assets/contact-img/customercare.webp";
import contactDelhi from "../assets/contact-img/delhioffice.webp";
import contactInternational from "../assets/contact-img/internationaloffice.webp";
import contactMumbai from "../assets/contact-img/mumbaioffice.webp";
import careersCulture from "../assets/careers-img/office-culture.webp";
import careersOpenRoles from "../assets/careers-img/team-collaboration.webp";
import companyEnquiry from "../assets/pages-img/company-enquiry-support.webp";
import companyImpact from "../assets/pages-img/company-impact.webp";
import companyStory from "../assets/pages-img/company-story.webp";
import newsFeatured from "../assets/news&knowledge-img/featured-story.webp";
import securityFeatures from "../assets/security-img/online-security.webp";

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
    src: careersCulture,
    label: "Office culture photo",
  },
  careersOpenRoles: {
    src: careersOpenRoles,
    label: "Team collaboration photo",
  },
  newsFeatured: {
    src: newsFeatured,
    label: "Featured story image",
  },
  researchOTG: {
    src: "",
    label: "OTG report cover",
  },
  researchACT: {
    src: "",
    label: "ACT report cover",
  },
  researchSpecial: {
    src: "",
    label: "Special Reports cover",
  },
  securityFeatures: {
    src: securityFeatures,
    label: "Online security illustration",
  },
};
