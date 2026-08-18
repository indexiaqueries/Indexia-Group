import { useTranslation } from "react-i18next";
import PricingTable, { type PricingGridItem, type PricingRow } from "./PricingTable";

type WarehousePricingProps = {
  color: string;
  onBook: (row: PricingRow | PricingGridItem) => void;
};

const WarehousePricing = ({ color, onBook }: WarehousePricingProps) => {
  const { t } = useTranslation();
  const enquireLabel = t("warehousePricing.enquire");

  const plots: PricingGridItem[] = [
    { label: t("warehousePricing.plot1"), value: t("warehousePricing.plotArea1"), ctaLabel: enquireLabel, size: 1 },
    { label: t("warehousePricing.plot2"), value: t("warehousePricing.plotArea2"), ctaLabel: enquireLabel, size: 2 },
    { label: t("warehousePricing.plot2_5"), value: t("warehousePricing.plotArea2_5"), ctaLabel: enquireLabel, size: 2.5 },
    { label: t("warehousePricing.plot5"), value: t("warehousePricing.plotArea5"), ctaLabel: enquireLabel, size: 5 },
    { label: t("warehousePricing.plot8"), value: t("warehousePricing.plotArea8"), ctaLabel: enquireLabel, size: 8 },
  ];

  return (
    <PricingTable
      color={color}
      onBook={onBook}
      eyebrow={t("warehousePricing.eyebrow")}
      title={t("warehousePricing.title")}
      subtitle={t("warehousePricing.subtitle")}
      headers={{
        label: t("warehousePricing.portfolioCol"),
        value: t("warehousePricing.valueCol"),
      }}
      rows={[
        { label: t("warehousePricing.locations"), value: t("warehousePricing.locationsValue") },
        { label: t("warehousePricing.total"), value: t("warehousePricing.totalValue") },
      ]}
      grid={{
        title: t("warehousePricing.plotCol"),
        items: plots,
      }}
      callout={{
        title: t("warehousePricing.standardRate"),
        body: t("warehousePricing.note"),
      }}
      cta={{ label: t("warehousePricing.bookNow"), scrollToGrid: true }}
    />
  );
};

export default WarehousePricing;
