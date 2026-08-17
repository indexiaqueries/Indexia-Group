import groupImg from "../assets/company-images/IndexiaGroup.webp";
import financeImg from "../assets/company-images/IndexiaFinance.webp";
import finserveImg from "../assets/company-images/IndexiaFinserve.webp";
import securitiesImg from "../assets/company-images/IndexiaSecurities.webp";
import overseasImg from "../assets/company-images/IndexiaOverseas.webp";
import agroImg from "../assets/company-images/IndexiaAgroBioFertilizers.webp";
import warehouseImg from "../assets/company-images/IndexiaWarehouse.webp";
import foundationImg from "../assets/company-images/IndexiaFoundation.webp";
import advertisingImg from "../assets/company-images/IndexiaAdvertising.webp";

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
