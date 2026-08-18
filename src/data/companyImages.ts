import groupImg from "../assets/company-img/IndexiaGroup.webp";
import financeImg from "../assets/company-img/IndexiaFinance.webp";
import finserveImg from "../assets/company-img/IndexiaFinserve.webp";
import securitiesImg from "../assets/company-img/IndexiaSecurities.webp";
import overseasImg from "../assets/company-img/IndexiaOverseas.webp";
import agroImg from "../assets/company-img/IndexiaAgroBioFertilizers.webp";
import warehouseImg from "../assets/company-img/IndexiaWarehouse.webp";
import foundationImg from "../assets/company-img/IndexiaFoundation.webp";
import advertisingImg from "../assets/company-img/IndexiaAdvertising.webp";

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

export const getCompanyImage = (slug: string): string => companyImages[slug] ?? companyImages.group;
