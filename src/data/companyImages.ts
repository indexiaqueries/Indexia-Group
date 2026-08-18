import groupImg from "../assets/company-img/IndexiaGroup.webp";
import financeImg from "../assets/company-img/IndexiaFinance.webp";
import finserveImg from "../assets/company-img/IndexiaFinserve.webp";
import securitiesImg from "../assets/company-img/IndexiaSecurities.webp";
import overseasImg from "../assets/company-img/IndexiaOverseas.webp";
import agroImg from "../assets/company-img/IndexiaAgroBioFertilizers.webp";
import warehouseImg from "../assets/company-img/IndexiaWarehouse.webp";
import foundationImg from "../assets/company-img/IndexiaFoundation.webp";
import advertisingImg from "../assets/company-img/IndexiaAdvertising.webp";
import groupCard from "../assets/company-img/cards/IndexiaGroup-card.webp";
import financeCard from "../assets/company-img/cards/IndexiaFinance-card.webp";
import finserveCard from "../assets/company-img/cards/IndexiaFinserve-card.webp";
import securitiesCard from "../assets/company-img/cards/IndexiaSecurities-card.webp";
import overseasCard from "../assets/company-img/cards/IndexiaOverseas-card.webp";
import agroCard from "../assets/company-img/cards/IndexiaAgroBioFertilizers-card.webp";
import warehouseCard from "../assets/company-img/cards/IndexiaWarehouse-card.webp";
import foundationCard from "../assets/company-img/cards/IndexiaFoundation-card.webp";
import advertisingCard from "../assets/company-img/cards/IndexiaAdvertising-card.webp";
import groupThumb from "../assets/company-img/thumbs/IndexiaGroup-thumb.webp";
import financeThumb from "../assets/company-img/thumbs/IndexiaFinance-thumb.webp";
import finserveThumb from "../assets/company-img/thumbs/IndexiaFinserve-thumb.webp";
import securitiesThumb from "../assets/company-img/thumbs/IndexiaSecurities-thumb.webp";
import overseasThumb from "../assets/company-img/thumbs/IndexiaOverseas-thumb.webp";
import agroThumb from "../assets/company-img/thumbs/IndexiaAgroBioFertilizers-thumb.webp";
import warehouseThumb from "../assets/company-img/thumbs/IndexiaWarehouse-thumb.webp";
import foundationThumb from "../assets/company-img/thumbs/IndexiaFoundation-thumb.webp";
import advertisingThumb from "../assets/company-img/thumbs/IndexiaAdvertising-thumb.webp";

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

export const companyCardImages: Record<string, string> = {
  group: groupCard,
  finance: financeCard,
  finserve: finserveCard,
  securities: securitiesCard,
  overseas: overseasCard,
  "agro-bio": agroCard,
  warehouse: warehouseCard,
  foundation: foundationCard,
  advertising: advertisingCard,
};

export const companyThumbImages: Record<string, string> = {
  group: groupThumb,
  finance: financeThumb,
  finserve: finserveThumb,
  securities: securitiesThumb,
  overseas: overseasThumb,
  "agro-bio": agroThumb,
  warehouse: warehouseThumb,
  foundation: foundationThumb,
  advertising: advertisingThumb,
};

export const getCompanyImage = (slug: string): string => companyImages[slug] ?? companyImages.group;
export const getCompanyCardImage = (slug: string): string => companyCardImages[slug] ?? companyCardImages.group;
export const getCompanyThumbImage = (slug: string): string => companyThumbImages[slug] ?? companyThumbImages.group;
