import groupImg from "../assets/company-img/IndexiaGroup.webp";
import financeImg from "../assets/company-img/IndexiaFinance.webp";
import finserveImg from "../assets/company-img/IndexiaFinserve.webp";
import securitiesImg from "../assets/company-img/IndexiaSecurities.webp";
import overseasImg from "../assets/company-img/IndexiaOverseas.webp";
import agroImg from "../assets/company-img/IndexiaAgroBioFertilizers.webp";
import warehouseImg from "../assets/company-img/IndexiaWarehouse.webp";
import foundationImg from "../assets/company-img/IndexiaFoundation.webp";
import advertisingImg from "../assets/company-img/IndexiaAdvertising.webp";
import groupMobile from "../assets/company-img/mobile/IndexiaGroup-mobile.webp";
import financeMobile from "../assets/company-img/mobile/IndexiaFinance-mobile.webp";
import finserveMobile from "../assets/company-img/mobile/IndexiaFinserve-mobile.webp";
import securitiesMobile from "../assets/company-img/mobile/IndexiaSecurities-mobile.webp";
import overseasMobile from "../assets/company-img/mobile/IndexiaOverseas-mobile.webp";
import agroMobile from "../assets/company-img/mobile/IndexiaAgroBioFertilizers-mobile.webp";
import warehouseMobile from "../assets/company-img/mobile/IndexiaWarehouse-mobile.webp";
import foundationMobile from "../assets/company-img/mobile/IndexiaFoundation-mobile.webp";
import advertisingMobile from "../assets/company-img/mobile/IndexiaAdvertising-mobile.webp";
import warehouseCardImg from "../assets/company-img/cards/IndexiaWarehouse-card.webp";
import advertisingCardImg from "../assets/company-img/cards/IndexiaAdvertising-card.webp";
import warehouseThumbImg from "../assets/company-img/thumbs/IndexiaWarehouse-thumb.webp";
import advertisingThumbImg from "../assets/company-img/thumbs/IndexiaAdvertising-thumb.webp";
import groupCard from "../assets/company-img/cards/IndexiaGroup-card.webp";
import financeCard from "../assets/company-img/cards/IndexiaFinance-card.webp";
import finserveCard from "../assets/company-img/cards/IndexiaFinserve-card.webp";
import securitiesCard from "../assets/company-img/cards/IndexiaSecurities-card.webp";
import overseasCard from "../assets/company-img/cards/IndexiaOverseas-card.webp";
import agroCard from "../assets/company-img/cards/IndexiaAgroBioFertilizers-card.webp";
import foundationCard from "../assets/company-img/cards/IndexiaFoundation-card.webp";
import groupThumb from "../assets/company-img/thumbs/IndexiaGroup-thumb.webp";
import financeThumb from "../assets/company-img/thumbs/IndexiaFinance-thumb.webp";
import finserveThumb from "../assets/company-img/thumbs/IndexiaFinserve-thumb.webp";
import securitiesThumb from "../assets/company-img/thumbs/IndexiaSecurities-thumb.webp";
import overseasThumb from "../assets/company-img/thumbs/IndexiaOverseas-thumb.webp";
import agroThumb from "../assets/company-img/thumbs/IndexiaAgroBioFertilizers-thumb.webp";
import foundationThumb from "../assets/company-img/thumbs/IndexiaFoundation-thumb.webp";

export const companyImages: Record<string, string> = {
  group: groupImg,
  finance: financeImg,
  finserve: finserveImg,
  securities: securitiesImg,
  overseas: overseasImg,
  "agro-bio": agroImg,
  warehouse: warehouseImg,
  foundation: foundationImg,
  advertising: advertisingImg,
};

export const companyMobileImages: Record<string, string> = {
  group: groupMobile,
  finance: financeMobile,
  finserve: finserveMobile,
  securities: securitiesMobile,
  overseas: overseasMobile,
  "agro-bio": agroMobile,
  warehouse: warehouseMobile,
  foundation: foundationMobile,
  advertising: advertisingMobile,
};

export const companyCardImages: Record<string, string> = {
  group: groupCard,
  finance: financeCard,
  finserve: finserveCard,
  securities: securitiesCard,
  overseas: overseasCard,
  "agro-bio": agroCard,
  warehouse: warehouseCardImg,
  foundation: foundationCard,
  advertising: advertisingCardImg,
};

export const companyThumbImages: Record<string, string> = {
  group: groupThumb,
  finance: financeThumb,
  finserve: finserveThumb,
  securities: securitiesThumb,
  overseas: overseasThumb,
  "agro-bio": agroThumb,
  warehouse: warehouseThumbImg,
  foundation: foundationThumb,
  advertising: advertisingThumbImg,
};

export const getCompanyImage = (slug: string): string => companyImages[slug] ?? companyImages.group;
export const getCompanyMobileImage = (slug: string): string => companyMobileImages[slug] ?? companyMobileImages.group;
export const getCompanyCardImage = (slug: string): string => companyCardImages[slug] ?? companyCardImages.group;
export const getCompanyThumbImage = (slug: string): string => companyThumbImages[slug] ?? companyThumbImages.group;
