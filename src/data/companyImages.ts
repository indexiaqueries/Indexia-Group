import groupImg from "../assets/company-images/IndexiaGroup.png";
import financeImg from "../assets/company-images/IndexiaFinance.png";
import finserveImg from "../assets/company-images/IndexiaFinserve.png";
import securitiesImg from "../assets/company-images/IndexiaSecurities.png";
import overseasImg from "../assets/company-images/IndexiaOverseas.png";
import agroImg from "../assets/company-images/IndexiaAgroBioFertilizers.png";
import warehouseImg from "../assets/company-images/IndexiaWarehouse.png";
import foundationImg from "../assets/company-images/IndexiaFoundation.png";
import advertisingImg from "../assets/company-images/IndexiaAdvertising.png";

export const companyImages: Record<string, string> = {
  "Indexia Group": groupImg,
  "Indexia Finance": financeImg,
  "Indexia Finserve": finserveImg,
  "Indexia Securities": securitiesImg,
  "Indexia Overseas": overseasImg,
  "Agro Bio Fertilizers": agroImg,
  "Indexia Warehouse": warehouseImg,
  "Indexia Foundation": foundationImg,
  "Indexia Advertising": advertisingImg,
};

export const getCompanyImage = (name: string): string =>
  companyImages[name] ?? companyImages["Indexia Group"];
