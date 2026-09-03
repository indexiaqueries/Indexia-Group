import type { HeroPanel } from "../../cards/HeroGalleryThumb";
import { getCompanyImage, getCompanyMobileImage, getCompanyThumbImage } from "../../../data/companyImages";
import { companies } from "../../../data/companies";
import { colors } from "../../../lib/theme";
import groupImg from "../../../assets/company-img/IndexiaGroup.webp";
import groupMobile from "../../../assets/company-img/mobile/IndexiaGroup-mobile.webp";


// Group slide is a special entry not in the companies array
const GROUP_PANEL_ID = 0;

export const makePanels = (t: (key: string) => string): HeroPanel[] => {
  const companyPanels: HeroPanel[] = companies.map((company, index) => ({
    id: index + 1,
    tag: t(`hero.p${index + 1}.tag`),
    heading: t(`hero.p${index + 1}.heading`),
    sub: t(`hero.p${index + 1}.sub`),
    image: getCompanyImage(company.slug),
    mobileImage: getCompanyMobileImage(company.slug),
    thumbImage: getCompanyThumbImage(company.slug),
    color: company.color,
    slug: company.slug,
  }));

  const groupPanel: HeroPanel = {
    id: GROUP_PANEL_ID,
    tag: t("hero.p0.tag"),
    heading: t("hero.p0.heading"),
    sub: t("hero.p0.sub"),
    motto: t("hero.p0.motto"),
    image: groupImg,
    mobileImage: groupMobile,

    thumbImage: getCompanyThumbImage("group"),
    color: colors.teal,
    slug: "",
  };

  return [groupPanel, ...companyPanels];
};
