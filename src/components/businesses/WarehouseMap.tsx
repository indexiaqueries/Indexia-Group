import { useTranslation } from "react-i18next";
import { MapPin } from "lucide-react";
import Eyebrow from "../common/Eyebrow";
import Reveal from "../common/Reveal";

/**
 * Google Maps embed of the Shamli land portfolio (Indexia Warehouse page).
 * The coordinates pin the Meerut Karnal Road site shown on the pricing table.
 */
const WarehouseMap = () => {
  const { t } = useTranslation();

  return (
    <section className="section-ruled section-paper relative overflow-hidden py-5 sm:py-7 lg:py-8">
      {/* Ambient glows, mirroring the other paper sections on this page */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-e-32 top-10 h-80 w-80 rounded-full opacity-15 blur-[90px]"
        style={{ background: "var(--color-blue)" }}
      />

      <div className="container relative">
        <Reveal className="mx-auto mb-7 sm:mb-9 max-w-2xl text-center">
          <Eyebrow>{t("warehouseMap.eyebrow")}</Eyebrow>
          <h2 className="font-display mt-3 text-[clamp(24px,3.6vw,42px)] font-bold leading-[1.08] text-(--color-blue)">
            {t("warehouseMap.title")}
          </h2>
          <p className="mt-4 text-[13px] sm:text-sm leading-6 sm:leading-7 text-(--color-muted)">
            {t("warehouseMap.desc")}
          </p>
        </Reveal>

        <Reveal amount={0.15}>
          <div className="relative overflow-hidden rounded-3xl border border-(--color-line)/70 bg-white shadow-[0_18px_44px_rgba(2,16,26,0.14)] ring-1 ring-black/5">
            <iframe
              src="https://www.google.com/maps?q=29.378084182739258,77.29234313964844&z=17&hl=en&output=embed"
              title={t("warehouseMap.mapTitle")}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="block aspect-20/5 w-full border-0"
            />
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[12px] sm:text-[13px] text-(--color-muted)">
            <MapPin size={14} className="text-(--color-blue)" aria-hidden="true" />
            <span>{t("addresses.shamliOffice")}</span>
            <a
              href="https://www.google.com/maps?q=29.378084182739258,77.29234313964844&z=17&hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-bold text-(--color-blue) underline-offset-4 transition-colors hover:text-(--color-teal-deep) hover:underline"
            >
              {t("warehouseMap.directions")}
              <MapPin size={13} strokeWidth={2.4} aria-hidden="true" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default WarehouseMap;
