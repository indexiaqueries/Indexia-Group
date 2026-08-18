import { useTranslation } from "react-i18next";
import PricingTable, { type PricingRow } from "./PricingTable";

type UnipolePricingProps = {
  color: string;
  onBook: (row: PricingRow) => void;
};

const UnipolePricing = ({ color, onBook }: UnipolePricingProps) => {
  const { t } = useTranslation();
  const bookLabel = t("unipolePricing.bookSize");

  return (
    <PricingTable
      color={color}
      onBook={onBook}
      eyebrow={t("unipolePricing.eyebrow")}
      title={t("unipolePricing.title")}
      subtitle={t("unipolePricing.subtitle")}
      headers={{
        label: t("unipolePricing.sizeCol"),
        value: t("unipolePricing.areaCol"),
        rate: t("unipolePricing.rateCol"),
      }}
      rows={[
        {
          label: t("unipolePricing.sizeSmall"),
          value: t("unipolePricing.areaSmall"),
          rate: t("unipolePricing.rateSmall"),
          ctaLabel: bookLabel,
        },
        {
          label: t("unipolePricing.sizeLarge"),
          value: t("unipolePricing.areaLarge"),
          rate: t("unipolePricing.rateLarge"),
          ctaLabel: bookLabel,
        },
      ]}
      callout={{
        title: t("unipolePricing.standardRate"),
        body: t("unipolePricing.note"),
      }}
      cta={{ label: t("unipolePricing.bookNow") }}
    />
  );
};

export default UnipolePricing;
