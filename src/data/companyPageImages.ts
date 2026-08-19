// Page-specific images for company spotlight sections
import athleticsTraining from "../assets/company-pages-img/page-specific/athletics-training.png";
import organicFertilizer from "../assets/company-pages-img/page-specific/organic-fertilizer.png";
import securityTeam from "../assets/company-pages-img/page-specific/security-team.png";
import shamliLand from "../assets/company-pages-img/page-specific/shamli-land.png";
import shippingPort from "../assets/company-pages-img/page-specific/shipping-port.png";
import unipoleHoarding from "../assets/company-pages-img/page-specific/unipole-hoarding.png";

// Common images used across all company pages
import enquirySupport from "../assets/company-pages-img/common/enquiry-support.webp";
import impactBanner from "../assets/company-pages-img/common/impact-banner.webp";
import overviewBanner from "../assets/company-pages-img/common/overview-banner.webp";

export const companyPageImages: Record<string, string> = {
  finance: overviewBanner,
  finserve: overviewBanner,
  overseas: shippingPort,
  "agro-bio": organicFertilizer,
  securities: securityTeam,
  warehouse: shamliLand,
  advertising: unipoleHoarding,
  foundation: athleticsTraining,
};

export const commonImages = {
  enquirySupport,
  impactBanner,
  overviewBanner,
};

export const getCompanyPageImage = (slug: string): string =>
  companyPageImages[slug] ?? overviewBanner;
