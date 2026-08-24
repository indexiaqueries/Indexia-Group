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

  const [featured, ...rest] = highlights;

  return (
    <section className="relative overflow-hidden bg-(--color-soft) py-14 sm:py-20 lg:py-28">
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
        {/* Header */}          <Reveal className="mx-auto mb-10 sm:mb-14 max-w-2xl text-center">
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

        {/* Featured hero card — MAIN POINT */}
        {featured && (
          <Reveal amount={0.15}>
            <div
              className="group relative mb-5 sm:mb-6 overflow-hidden rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-12 transition-all duration-500"
              style={{
                background: `linear-gradient(135deg, ${color}, ${color}aa, ${color}77)`,
                color: contrastText(color),
              }}
            >
              {/* Diagonal shine lines via ::before and ::after */}
              <span aria-hidden="true" className="pointers-main-shine" />
              {/* Ghost number */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -inset-e-4 -top-6 font-display text-[clamp(80px,14vw,180px)] font-bold leading-none opacity-10"
                style={{ color: contrastText(color) }}
              >
                01
              </span>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -inset-s-6 -bottom-10 font-display text-[clamp(60px,10vw,140px)] font-bold leading-none opacity-[0.06]"
                style={{ color: contrastText(color) }}
              >
                ✦
              </span>

              <div className="relative z-1 flex items-start gap-5">
                <span
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition-transform duration-500 group-hover:scale-110"
                  style={{ background: `linear-gradient(135deg, ${contrastText(color)}33, ${contrastText(color)}18)`, color: contrastText(color) }}
                >
                  <Check size={22} strokeWidth={2.8} />
                </span>
                <div>
                  <p className="font-ledger text-[11px] font-bold uppercase tracking-[0.2em] opacity-70">
                    {t("companyDetail.keyEntries")} — 01
                  </p>
                  <p className="mt-2 text-[15px] sm:text-[17px] font-semibold leading-7 sm:leading-8 lg:text-xl">
                    {tr("highlights.0", featured)}
                  </p>
                  <p className="mt-2 font-ledger text-[10px] font-bold uppercase tracking-[0.18em] opacity-50">
                    ★ {t("companyDetail.mainPoint")}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        )}

        {/* Remaining highlights — glass-style grid */}
        {rest.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((highlight, idx) => {
              const i = idx + 1;
              return (
                <Reveal key={highlight} delay={(idx % 3) * 0.08} amount={0.15}>
                  <div className="group relative h-full overflow-hidden rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm transition-all duration-400 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(2,16,26,0.08)]">
                    {/* Subtle background glow on hover */}
                    <div
                      aria-hidden="true"
                      className="absolute -inset-e-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-30"
                      style={{ background: color }}
                    />

                    {/* Large ghost number behind content */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -inset-e-1 top-0 font-display text-[64px] font-bold leading-none opacity-[0.04] transition-all duration-400 group-hover:opacity-[0.1] group-hover:-inset-e-2 group-hover:-top-1"
                      style={{ color }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <div className="relative">
                      {/* Number + check row */}
                      <div className="flex items-center gap-3">
                        <span
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110"
                          style={{
                            background: `linear-gradient(135deg, ${color}18, ${color}08)`,
                            color: accentInk(color),
                          }}
                        >
                          <Check size={16} strokeWidth={2.8} />
                        </span>
                        <span
                          className="font-ledger text-[11px] font-bold tracking-[0.16em] opacity-35 transition-opacity duration-300 group-hover:opacity-70"
                          style={{ color: accentInk(color) }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <p className="mt-3 sm:mt-4 text-[13.5px] sm:text-[14.5px] font-semibold leading-6 sm:leading-7 text-(--color-ink-soft)">
                        {tr(`highlights.${i}`, highlight)}
                      </p>
                    </div>

                    {/* Bottom accent bar */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 transition-transform duration-400 group-hover:scale-x-100"
                      style={{ background: `linear-gradient(90deg, ${color}, ${color}55)` }}
                    />
                  </div>
                </Reveal>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default CompanyHighlights;
