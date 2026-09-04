import { useTranslation } from "react-i18next";
import { Check } from "lucide-react";
import Eyebrow from "../common/Eyebrow";
import Reveal from "../common/Reveal";
import { accentInk, contrastText } from "../../lib/color";

type CompanyHighlightsProps = {
  color: string;
  slug: string;
  highlights: string[];
  services: string[];
};

const CompanyHighlights = ({ color, slug, highlights }: CompanyHighlightsProps) => {
  const { t } = useTranslation();
  const tr = (path: string, fallback: string) => t(`pageContent.companies.${slug}.${path}`, { defaultValue: fallback });


  return (
    <section className="relative overflow-hidden bg-(--color-soft) py-4 sm:py-5 lg:py-6">
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-e-40 top-0 h-125 w-125 rounded-full opacity-20 blur-[100px]"
        style={{ background: color }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-s-32 bottom-20 h-80 w-80 rounded-full opacity-10 blur-[80px]"
        style={{ background: color }}
      />

      <div className="container">
        {/* Header */}          <Reveal className="mx-auto mb-6 sm:mb-8 max-w-2xl text-center">
          <Eyebrow>{t("companyDetail.keyEntries")}</Eyebrow>
          <div className="mt-4 flex items-center justify-center gap-3">
            <span className="h-px w-8" style={{ background: color }} aria-hidden="true" />
            <span
              className="font-ledger text-[10px] font-bold tracking-[0.22em]"
              style={{ color: accentInk(color) }}
            >
              {String(highlights.length).padStart(2, "0")}
            </span>
            <span className="h-px w-8" style={{ background: color }} aria-hidden="true" />
          </div>
        </Reveal>

        {/* All key entries in a single row on desktop; the first keeps its coloured finish */}
        <div className={`grid gap-4 sm:grid-cols-2 ${highlights.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}>
          {highlights.map((highlight, idx) => {
            const i = idx + 1;
            const isFeatured = idx === 0;
            return (
              <Reveal key={highlight} delay={(idx % 4) * 0.06} amount={0.15} className="h-full">
                <div
                  className={`group relative flex h-full flex-col overflow-hidden rounded-2xl p-5 transition-all duration-400 hover:-translate-y-1 sm:p-6 ${
                    isFeatured
                      ? "shadow-[0_14px_40px_rgba(2,16,26,0.16)]"
                      : "border border-slate-200/60 bg-white shadow-sm hover:shadow-[0_20px_50px_rgba(2,16,26,0.08)]"
                  }`}
                  style={
                    isFeatured
                      ? { background: `linear-gradient(135deg, ${color}, ${color}aa, ${color}77)`, color: contrastText(color) }
                      : undefined
                  }
                >
                  {/* Subtle background glow on hover (light cards only) */}
                  {!isFeatured && (
                    <div
                      aria-hidden="true"
                      className="absolute -inset-e-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-30"
                      style={{ background: color }}
                    />
                  )}

                  {/* Large ghost number behind content */}
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute -inset-e-1 top-0 font-display text-[64px] font-bold leading-none transition-all duration-400 group-hover:opacity-[0.1] group-hover:-inset-e-2 group-hover:-top-1 ${
                      isFeatured ? "opacity-10" : "opacity-[0.04]"
                    }`}
                    style={{ color: isFeatured ? contrastText(color) : color }}
                  >
                    {String(i).padStart(2, "0")}
                  </span>

                  <div className="relative flex flex-1 flex-col">
                    {/* Number + check row */}
                    <div className="flex items-center gap-3">
                      <span
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110"
                        style={
                          isFeatured
                            ? { background: `${contrastText(color)}33`, color: contrastText(color) }
                            : { background: `linear-gradient(135deg, ${color}18, ${color}08)`, color: accentInk(color) }
                        }
                      >
                        <Check size={16} strokeWidth={2.8} />
                      </span>
                      <span
                        className="font-ledger text-[11px] font-bold tracking-[0.16em]"
                        style={{ color: isFeatured ? contrastText(color) : accentInk(color) }}
                      >
                        {String(i).padStart(2, "0")}
                      </span>
                    </div>

                    <p className={`mt-3 text-[13.5px] font-semibold leading-6 sm:mt-4 sm:text-[14.5px] sm:leading-7 ${isFeatured ? "text-white" : "text-(--color-ink-soft)"}`}>
                      {tr(`highlights.${idx}`, highlight)}
                    </p>

                    {isFeatured && <div className="mt-auto" aria-hidden="true" />}
                  </div>

                  {/* Bottom accent bar (light cards only) */}
                  {!isFeatured && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 transition-transform duration-400 group-hover:scale-x-100"
                      style={{ background: `linear-gradient(90deg, ${color}, ${color}55)` }}
                    />
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CompanyHighlights;
