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

const normalize = (name: string): string =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\b(pvt|private|limited|ltd|inc)\b/g, " ")
    .replace(/\s+/g, " ")
    .trim();

export const getCompanyImage = (name: string): string => {
  const key = normalize(name);
  if (!key) return companyImages["Indexia Group"];

  const exact = Object.keys(companyImages).find((k) => normalize(k) === key);
  if (exact) return companyImages[exact];

  const partial = Object.keys(companyImages)
    .filter((k) => key.includes(normalize(k)) || normalize(k).includes(key))
    .sort((a, b) => normalize(b).length - normalize(a).length)[0];
  return partial ? companyImages[partial] : companyImages["Indexia Group"];
};
