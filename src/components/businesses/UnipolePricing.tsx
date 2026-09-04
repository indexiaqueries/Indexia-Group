import { useTranslation } from "react-i18next";
import { Check } from "lucide-react";
import Eyebrow from "../common/Eyebrow";
import Reveal from "../common/Reveal";
import type { PricingRow } from "./PricingTable";

type UnipolePricingProps = {
  color: string;
  onBook: (row: PricingRow) => void;
};

const UnipolePricing = ({ color, onBook }: UnipolePricingProps) => {
  const { t } = useTranslation();
  const bookLabel = t("unipolePricing.bookSize");
  const note = t("unipolePricing.note");

  const sizes: PricingRow[] = [
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
  ];

  return (
    <section className="section-ink relative overflow-hidden py-5 sm:py-6 lg:py-8">
      {/* Register glows fill the whole section */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-e-24 -top-20 h-72 w-72 rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(38,174,144,0.5) 0%, transparent 65%)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-s-20 bottom-0 h-64 w-64 rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(242,242,49,0.4) 0%, transparent 65%)" }}
      />

      <div className="container relative">
        <Reveal className="mx-auto mb-5 max-w-2xl text-center sm:mb-7">
          <Eyebrow color="var(--color-yellow)">{t("unipolePricing.eyebrow")}</Eyebrow>
          <h2 className="font-display mt-2.5 text-[clamp(26px,3.6vw,42px)] font-bold leading-[1.08] text-white">
            {t("unipolePricing.title")}
          </h2>
          <p className="font-ledger mt-2 text-[10.5px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-white/50">
            {t("unipolePricing.subtitle")}
          </p>
        </Reveal>

        {/* Framed register panel: size deeds on the left, standard-rate ticket on the right */}
        <div className="rounded-2xl border border-white/10 p-4 sm:p-5">
          <div className="grid items-stretch gap-2.5 sm:grid-cols-[1.3fr_1fr] sm:gap-3 lg:gap-4">
            {/* Left: the two size deeds */}
            <div className="grid items-stretch gap-2.5 sm:grid-cols-2 sm:gap-3">
              {sizes.map((row) => (
                <div
                  key={row.label}
                  className="flex flex-col items-center gap-2 rounded-2xl border border-white/10 px-4 py-5 text-center transition-all duration-300 hover:-translate-y-0.5 hover:border-(--color-yellow)/45"
                >
                  <span
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-white shadow-sm"
                    style={{ background: color }}
                  >
                    <Check size={12} strokeWidth={3.4} />
                  </span>
                  <span className="text-[13px] font-bold text-white">{row.label}</span>
                  <span className="text-[11.5px] font-medium leading-4 text-white/55">{row.value}</span>
                  <span className="font-ledger text-[22px] font-bold tracking-[0.02em] text-white">{row.rate}</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      onBook(row);
                    }}
                    className="mt-auto inline-flex items-center justify-center rounded-full bg-(--color-teal) px-5 py-2 text-[12px] font-bold text-white shadow-[0_4px_14px_rgba(38,174,144,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-(--color-teal-deep)"
                  >
                    {row.ctaLabel}
                  </button>
                </div>
              ))}
            </div>

            {/* Right: standard-rate yellow ticket */}
            <div className="relative flex flex-col justify-center overflow-hidden rounded-xl bg-(--color-yellow) px-4 py-3 shadow-[0_10px_30px_rgba(242,242,49,0.18)] sm:px-5 sm:py-5">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -inset-e-2 -top-3 h-12 w-12 rounded-full bg-white/30 blur-xl"
              />
              <p className="relative font-ledger text-[12.5px] sm:text-[13.5px] font-bold tracking-[0.04em] text-(--color-ink-deep)">
                {t("unipolePricing.standardRate")}
              </p>
              {note && <p className="relative mt-1 text-[11.5px] leading-4.5 text-(--color-ink-deep)/70">{note}</p>}
            </div>
          </div>
        </div>

        {/* Book now */}
        <div className="mt-6 text-center sm:mt-7">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("enquiry")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 rounded-full bg-(--color-yellow) px-6 py-3 text-[13px] font-bold text-(--color-yellow-ink) shadow-[0_4px_16px_rgba(242,242,49,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-(--color-yellow-bright) sm:px-8 sm:py-3.5 sm:text-sm"
          >
            {t("unipolePricing.bookNow")}
          </button>
        </div>
      </div>
    </section>
  );
};

export default UnipolePricing;