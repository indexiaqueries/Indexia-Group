import type { ImageSlotData } from "../components/common/ImageSlot";
import contactCorporate from "../assets/contact-img/corporateoffice.webp";
import contactCare from "../assets/contact-img/customercare.webp";
import contactDelhi from "../assets/contact-img/delhioffice.webp";
import contactInternational from "../assets/contact-img/internationaloffice.webp";
import contactMumbai from "../assets/contact-img/mumbaioffice.webp";
import careersHeroNew from "../assets/hero-img/CareerHero.png";
import careersCultureNew from "../assets/careers-img/OurCulture.png";
import careersRolesNew from "../assets/careers-img/OpenPositions.png";
import companyEnquiry from "../assets/company-pages-img/common/enquiry-support.webp";
import companyImpact from "../assets/company-pages-img/common/impact-banner.webp";
import companyStory from "../assets/company-pages-img/common/overview-banner.webp";
import newsFeatured from "../assets/news&knowledge-img/featured-story.webp";
const securityFeatures = "/images/security/online-security.webp";
// Images moved to public/images/, referenced as absolute URL paths
const researchOTGImg = "/images/research/otg-report.webp";
const researchACTImg = "/images/research/act-report.webp";
const researchSpecialImg = "/images/research/special-reports.webp";
const newsFeaturedNew = "/images/news/featured-story.webp";
const featuredEnquiryImg = "/images/news/featured-enquiry.webp";
const researchFooterImg = "/images/research/research-footer.webp";
const securityProtectDetailsImg = "/images/security/protect-your-details.webp";
const securityKeepSafeImg = "/images/security/keep-you-safe-online.webp";
const securityFooterImg = "/images/security/security-footer.webp";

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
  securityFeatures: {
    src: securityFeatures,
    label: "Online security illustration",
  },
  featuredEnquiry: {
    src: featuredEnquiryImg,
    label: "Featured enquiry image",
  },
  researchFooter: {
    src: researchFooterImg,
    label: "Research footer image",
  },
  securityProtectDetails: {
    src: securityProtectDetailsImg,
    label: "Protect your details illustration",
  },
  securityKeepSafe: {
    src: securityKeepSafeImg,
    label: "Keep you safe online illustration",
  },
  securityFooter: {
    src: securityFooterImg,
    label: "Security footer image",
  },
};
