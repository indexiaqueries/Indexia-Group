import groupImg from "../assets/company-img/IndexiaGroup.webp";
import financeImg from "../assets/company-img/IndexiaFinance.webp";
import finserveImg from "../assets/company-img/IndexiaFinserve.webp";
import securitiesImg from "../assets/company-img/IndexiaSecurities.webp";
import overseasImg from "../assets/company-img/IndexiaOverseas.webp";
import agroImg from "../assets/company-img/IndexiaAgroBioFertilizers.webp";
import warehouseImg from "../assets/company-img/IndexiaWarehouse.webp";
import foundationImg from "../assets/company-img/IndexiaFoundation.webp";
import advertisingImg from "../assets/company-img/IndexiaAdvertising.webp";
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
export const getCompanyThumbImage = (slug: string): string => companyThumbImages[slug] ?? companyThumbImages.group;
