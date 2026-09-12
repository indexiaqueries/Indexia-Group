import type { ImageSlotData } from "../components/common/ImageSlot";
import companyImpact from "../assets/company-pages-img/common/impact-banner.webp";
import companyStory from "../assets/company-pages-img/common/overview-banner.webp";
import contactCorporate from "../assets/contact-img/corporateoffice.webp";
import contactDelhi from "../assets/contact-img/delhioffice.webp";
import contactInternational from "../assets/contact-img/internationaloffice.webp";
import contactMumbai from "../assets/contact-img/mumbaioffice.webp";
import contactShamli from "../assets/company-pages-img/page-specific/unipole-hoarding.webp";
const securityFeatures = "/images/security/online-security.webp";
// Images moved to public/images/, referenced as absolute URL paths
const researchOTGImg = "/images/research/otg-report.webp";
const researchACTImg = "/images/research/act-report.webp";
const researchSpecialImg = "/images/research/special-reports.webp";
const securityProtectDetailsImg = "/images/security/protect-your-details.webp";
const securityKeepSafeImg = "/images/security/keep-you-safe-online.webp";

export const siteImages: Record<string, ImageSlotData> = {
  // Office photos are resolved dynamically in LocationCard via
  // `siteImages["contact" + LocationKey]` — keep the contact* keys in sync
  // with branch keys in data/contact.ts (corporateOffice, mumbaiOffice, …).
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
  contactShamli: {
    src: contactShamli,
    label: "Shamli office (Meerut Karnal Road)",
  },
  contactInternational: {
    src: contactInternational,
    label: "International office (Ecuador)",
  },
  companyImpact: {
    src: companyImpact,
    label: "Company impact photo",
  },
  companyStory: {
    src: companyStory,
    label: "Company story photo",
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
  securityFeatures: {
    src: securityFeatures,
    label: "Online security illustration",
  },
  securityProtectDetails: {
    src: securityProtectDetailsImg,
    label: "Protect your details illustration",
  },
  securityKeepSafe: {
    src: securityKeepSafeImg,
    label: "Keep you safe online illustration",
  },
};
