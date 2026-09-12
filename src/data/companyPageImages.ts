// Page-specific images for company spotlight sections
import athleticsTraining from "../assets/company-pages-img/page-specific/athletics-training.webp";
import organicFertilizer from "../assets/company-pages-img/page-specific/organic-fertilizer.webp";
import securityTeam from "../assets/company-pages-img/page-specific/security-team.webp";
import shamliLand from "../assets/company-pages-img/page-specific/shamli-land.webp";
import shippingPort from "../assets/company-pages-img/page-specific/shipping-port.webp";
import unipoleHoarding from "../assets/company-pages-img/page-specific/unipole-hoarding.webp";
const financeSpotlight = "/images/companies/finance-spotlight.webp";
const finserveSpotlight = "/images/companies/finserve-spotlight.webp";
import overviewBanner from "../assets/company-pages-img/common/overview-banner.webp";

export const companyPageImages: Record<string, string> = {
  finance: financeSpotlight,
  finserve: finserveSpotlight,
  overseas: shippingPort,
  "agro-bio": organicFertilizer,
  securities: securityTeam,
  warehouse: shamliLand,
  advertising: unipoleHoarding,
  foundation: athleticsTraining,
};

export const getCompanyPageImage = (slug: string): string =>
  companyPageImages[slug] ?? overviewBanner;
