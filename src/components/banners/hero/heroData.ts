import type { HeroPanel } from "../../cards/HeroGalleryThumb";
import { getCompanyImage, getCompanyThumbImage } from "../../../data/companyImages";
import { companies } from "../../../data/companies";
import { colors } from "../../../lib/theme";

const COLOR_BY_SLUG: Record<string, string> = Object.fromEntries(
  companies.map((c) => [c.slug, c.color]),
);
COLOR_BY_SLUG.group = colors.teal;

export const makePanels = (t: (key: string) => string): HeroPanel[] => [
  {
    id: 0,
    tag: t("hero.p0.tag"),
    heading: t("hero.p0.heading"),
    sub: t("hero.p0.sub"),
    image: getCompanyImage("group"),
    thumbImage: getCompanyThumbImage("group"),
    color: COLOR_BY_SLUG.group,
  },
  {
    id: 1,
    tag: t("hero.p1.tag"),
    heading: t("hero.p1.heading"),
    sub: t("hero.p1.sub"),
    image: getCompanyImage("finance"),
    thumbImage: getCompanyThumbImage("finance"),
    color: COLOR_BY_SLUG.finance,
  },
  {
    id: 2,
    tag: t("hero.p2.tag"),
    heading: t("hero.p2.heading"),
    sub: t("hero.p2.sub"),
    image: getCompanyImage("finserve"),
    thumbImage: getCompanyThumbImage("finserve"),
    color: COLOR_BY_SLUG.finserve,
  },
  {
    id: 3,
    tag: t("hero.p3.tag"),
    heading: t("hero.p3.heading"),
    sub: t("hero.p3.sub"),
    image: getCompanyImage("overseas"),
    thumbImage: getCompanyThumbImage("overseas"),
    color: COLOR_BY_SLUG.overseas,
  },
  {
    id: 4,
    tag: t("hero.p4.tag"),
    heading: t("hero.p4.heading"),
    sub: t("hero.p4.sub"),
    image: getCompanyImage("agro-bio"),
    thumbImage: getCompanyThumbImage("agro-bio"),
    color: COLOR_BY_SLUG["agro-bio"],
  },
  {
    id: 5,
    tag: t("hero.p5.tag"),
    heading: t("hero.p5.heading"),
    sub: t("hero.p5.sub"),
    image: getCompanyImage("securities"),
    thumbImage: getCompanyThumbImage("securities"),
    color: COLOR_BY_SLUG.securities,
  },
  {
    id: 6,
    tag: t("hero.p6.tag"),
    heading: t("hero.p6.heading"),
    sub: t("hero.p6.sub"),
    image: getCompanyImage("warehouse"),
    thumbImage: getCompanyThumbImage("warehouse"),
    color: COLOR_BY_SLUG.warehouse,
  },
  {
    id: 7,
    tag: t("hero.p7.tag"),
    heading: t("hero.p7.heading"),
    sub: t("hero.p7.sub"),
    image: getCompanyImage("advertising"),
    thumbImage: getCompanyThumbImage("advertising"),
    color: COLOR_BY_SLUG.advertising,
  },
  {
    id: 8,
    tag: t("hero.p8.tag"),
    heading: t("hero.p8.heading"),
    sub: t("hero.p8.sub"),
    image: getCompanyImage("foundation"),
    thumbImage: getCompanyThumbImage("foundation"),
    color: COLOR_BY_SLUG.foundation,
  },
];
