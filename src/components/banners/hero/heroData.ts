import type { HeroPanel } from "../../cards/HeroGalleryThumb";
import { getCompanyImage } from "../../../data/companyImages";

export const makePanels = (t: (key: string) => string): HeroPanel[] => [
  {
    id: 0,
    tag: t("hero.p0.tag"),
    heading: t("hero.p0.heading"),
    sub: t("hero.p0.sub"),
    image: getCompanyImage("group"),
  },
  {
    id: 1,
    tag: t("hero.p1.tag"),
    heading: t("hero.p1.heading"),
    sub: t("hero.p1.sub"),
    image: getCompanyImage("finance"),
  },
  {
    id: 2,
    tag: t("hero.p2.tag"),
    heading: t("hero.p2.heading"),
    sub: t("hero.p2.sub"),
    image: getCompanyImage("finserve"),
  },
  {
    id: 3,
    tag: t("hero.p3.tag"),
    heading: t("hero.p3.heading"),
    sub: t("hero.p3.sub"),
    image: getCompanyImage("overseas"),
  },
  {
    id: 4,
    tag: t("hero.p4.tag"),
    heading: t("hero.p4.heading"),
    sub: t("hero.p4.sub"),
    image: getCompanyImage("agro-bio"),
  },
  {
    id: 5,
    tag: t("hero.p5.tag"),
    heading: t("hero.p5.heading"),
    sub: t("hero.p5.sub"),
    image: getCompanyImage("securities"),
  },
  {
    id: 6,
    tag: t("hero.p6.tag"),
    heading: t("hero.p6.heading"),
    sub: t("hero.p6.sub"),
    image: getCompanyImage("warehouse"),
  },
  {
    id: 7,
    tag: t("hero.p7.tag"),
    heading: t("hero.p7.heading"),
    sub: t("hero.p7.sub"),
    image: getCompanyImage("advertising"),
  },
  {
    id: 8,
    tag: t("hero.p8.tag"),
    heading: t("hero.p8.heading"),
    sub: t("hero.p8.sub"),
    image: getCompanyImage("foundation"),
  },
];
