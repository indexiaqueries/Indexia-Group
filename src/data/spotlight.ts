export type StatItem = {
  valueKey: string;
  labelKey: string;
};

export type SpotlightContent = {
  eyebrowKey: string;
  headingKey: string;
  descriptionKey: string;
  stats: StatItem[];
  bulletsKeys: string[];
};

export const SPOTLIGHT_DATA: Record<string, SpotlightContent> = {
  finance: {
    eyebrowKey: "spotlight.finance.eyebrow",
    headingKey: "spotlight.finance.heading",
    descriptionKey: "spotlight.finance.description",
    stats: [
      { valueKey: "spotlight.finance.stats.0.value", labelKey: "spotlight.finance.stats.0.label" },
      { valueKey: "spotlight.finance.stats.1.value", labelKey: "spotlight.finance.stats.1.label" },
      { valueKey: "spotlight.finance.stats.2.value", labelKey: "spotlight.finance.stats.2.label" },
    ],
    bulletsKeys: [
      "spotlight.finance.bullets.0",
      "spotlight.finance.bullets.1",
      "spotlight.finance.bullets.2",
      "spotlight.finance.bullets.3",
    ],
  },
  finserve: {
    eyebrowKey: "spotlight.finserve.eyebrow",
    headingKey: "spotlight.finserve.heading",
    descriptionKey: "spotlight.finserve.description",
    stats: [
      { valueKey: "spotlight.finserve.stats.0.value", labelKey: "spotlight.finserve.stats.0.label" },
      { valueKey: "spotlight.finserve.stats.1.value", labelKey: "spotlight.finserve.stats.1.label" },
      { valueKey: "spotlight.finserve.stats.2.value", labelKey: "spotlight.finserve.stats.2.label" },
    ],
    bulletsKeys: [
      "spotlight.finserve.bullets.0",
      "spotlight.finserve.bullets.1",
      "spotlight.finserve.bullets.2",
      "spotlight.finserve.bullets.3",
    ],
  },
  overseas: {
    eyebrowKey: "spotlight.overseas.eyebrow",
    headingKey: "spotlight.overseas.heading",
    descriptionKey: "spotlight.overseas.description",
    stats: [
      { valueKey: "spotlight.overseas.stats.0.value", labelKey: "spotlight.overseas.stats.0.label" },
      { valueKey: "spotlight.overseas.stats.1.value", labelKey: "spotlight.overseas.stats.1.label" },
      { valueKey: "spotlight.overseas.stats.2.value", labelKey: "spotlight.overseas.stats.2.label" },
    ],
    bulletsKeys: [
      "spotlight.overseas.bullets.0",
      "spotlight.overseas.bullets.1",
      "spotlight.overseas.bullets.2",
      "spotlight.overseas.bullets.3",
    ],
  },
  "agro-bio": {
    eyebrowKey: "spotlight.agro-bio.eyebrow",
    headingKey: "spotlight.agro-bio.heading",
    descriptionKey: "spotlight.agro-bio.description",
    stats: [
      { valueKey: "spotlight.agro-bio.stats.0.value", labelKey: "spotlight.agro-bio.stats.0.label" },
      { valueKey: "spotlight.agro-bio.stats.1.value", labelKey: "spotlight.agro-bio.stats.1.label" },
      { valueKey: "spotlight.agro-bio.stats.2.value", labelKey: "spotlight.agro-bio.stats.2.label" },
    ],
    bulletsKeys: [
      "spotlight.agro-bio.bullets.0",
      "spotlight.agro-bio.bullets.1",
      "spotlight.agro-bio.bullets.2",
      "spotlight.agro-bio.bullets.3",
    ],
  },
  securities: {
    eyebrowKey: "spotlight.securities.eyebrow",
    headingKey: "spotlight.securities.heading",
    descriptionKey: "spotlight.securities.description",
    stats: [
      { valueKey: "spotlight.securities.stats.0.value", labelKey: "spotlight.securities.stats.0.label" },
      { valueKey: "spotlight.securities.stats.1.value", labelKey: "spotlight.securities.stats.1.label" },
      { valueKey: "spotlight.securities.stats.2.value", labelKey: "spotlight.securities.stats.2.label" },
    ],
    bulletsKeys: [
      "spotlight.securities.bullets.0",
      "spotlight.securities.bullets.1",
      "spotlight.securities.bullets.2",
      "spotlight.securities.bullets.3",
    ],
  },
  warehouse: {
    eyebrowKey: "spotlight.warehouse.eyebrow",
    headingKey: "spotlight.warehouse.heading",
    descriptionKey: "spotlight.warehouse.description",
    stats: [
      { valueKey: "spotlight.warehouse.stats.0.value", labelKey: "spotlight.warehouse.stats.0.label" },
      { valueKey: "spotlight.warehouse.stats.1.value", labelKey: "spotlight.warehouse.stats.1.label" },
      { valueKey: "spotlight.warehouse.stats.2.value", labelKey: "spotlight.warehouse.stats.2.label" },
    ],
    bulletsKeys: [
      "spotlight.warehouse.bullets.0",
      "spotlight.warehouse.bullets.1",
      "spotlight.warehouse.bullets.2",
      "spotlight.warehouse.bullets.3",
    ],
  },
  advertising: {
    eyebrowKey: "spotlight.advertising.eyebrow",
    headingKey: "spotlight.advertising.heading",
    descriptionKey: "spotlight.advertising.description",
    stats: [
      { valueKey: "spotlight.advertising.stats.0.value", labelKey: "spotlight.advertising.stats.0.label" },
      { valueKey: "spotlight.advertising.stats.1.value", labelKey: "spotlight.advertising.stats.1.label" },
      { valueKey: "spotlight.advertising.stats.2.value", labelKey: "spotlight.advertising.stats.2.label" },
    ],
    bulletsKeys: [
      "spotlight.advertising.bullets.0",
      "spotlight.advertising.bullets.1",
      "spotlight.advertising.bullets.2",
      "spotlight.advertising.bullets.3",
    ],
  },
  foundation: {
    eyebrowKey: "spotlight.foundation.eyebrow",
    headingKey: "spotlight.foundation.heading",
    descriptionKey: "spotlight.foundation.description",
    stats: [
      { valueKey: "spotlight.foundation.stats.0.value", labelKey: "spotlight.foundation.stats.0.label" },
      { valueKey: "spotlight.foundation.stats.1.value", labelKey: "spotlight.foundation.stats.1.label" },
      { valueKey: "spotlight.foundation.stats.2.value", labelKey: "spotlight.foundation.stats.2.label" },
    ],
    bulletsKeys: [
      "spotlight.foundation.bullets.0",
      "spotlight.foundation.bullets.1",
      "spotlight.foundation.bullets.2",
      "spotlight.foundation.bullets.3",
    ],
  },
};
