import type { ReactNode } from "react";
import Eyebrow from "../common/Eyebrow";
import Reveal from "../common/Reveal";
import { accentInk } from "../../lib/color";

export type PricingRow = {
  label: string;
  value: string;
  /** Optional third column (e.g. monthly rate). */
  rate?: string;
  /** Optional per-row CTA label, shows a 'book' button on the row when provided. */
  ctaLabel?: string;
  /** Pre-built booking message, bypasses template interpolation in the handler. */
  message?: string;
};

export type PricingGridItem = {
  label: string;
  value: string;
  /** Optional per-card CTA label. */
  ctaLabel?: string;
  /** Numeric weight, cards grow in proportion to it (e.g. plot acreage). */
  size?: number;
};

type PricingTableProps = {
  /** Company hex color used for accents and chips. */
  color: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  /** Optional column headers, rendered left-aligned with the last one right-aligned. */
  headers?: { label: string; value: string; rate?: string };
  rows: PricingRow[];
  /** Optional chip list (e.g. available plot sizes). */
  chips?: string[];
  /** Optional grid of cards (e.g. available plot sizes) shown below the table. */
  grid?: { title: string; items: PricingGridItem[] };
  callout: { title: ReactNode; body?: ReactNode };
  /** Optional call-to-action button. Scrolls to the plot grid for selection when
   *  scrollToGrid is set, otherwise to the enquiry form (pre-filling a message when provided). */
  cta?: { label: string; message?: string; scrollToGrid?: boolean };
  /** Invoked when a row's or grid card's per-item CTA is clicked. */
  onBook?: (row: PricingRow | PricingGridItem) => void;
  /** Render the section as a dark, single-column "land register board". Only
   *  valid for simple label/value rows; falls back to the stacked layout otherwise. */
  twoColumn?: boolean;
};

const PricingTable = ({
  color,
  eyebrow,
  title,
  subtitle,
  headers,
  rows,
  chips,
  grid,
  callout,
  cta,
  onBook,
  twoColumn = false,
}: PricingTableProps) => {
  const hasRowCta = rows.some((r) => r.ctaLabel);
  const cols = (headers ? (headers.rate ? 3 : 2) : rows.some((r) => r.rate) ? 3 : 2) + (hasRowCta ? 1 : 0);
  const gridClass = cols === 3 ? "grid-cols-3" : cols === 4 ? "grid-cols-4" : "grid-cols-2";

  // The dark board only makes sense for plain label/value summaries — fall back
  // to the stacked light layout when rows carry rates or per-row actions.
  const darkBoard = twoColumn && !headers?.rate && !rows.some((r) => r.rate || r.ctaLabel);

  const plotCard = (item: PricingGridItem) => {
    // Dark board: single-column "deed" rows that take the board's own navy
    // background — hairline borders carry the shape, no fill.
    if (darkBoard) {
      return (
        <div
          key={item.label}
          className="flex flex-col items-center gap-2 rounded-2xl border border-white/10 px-3 py-4 text-center transition-all duration-300 hover:-translate-y-0.5 hover:border-(--color-yellow)/45"
        >
          <span
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-white shadow-sm"
            style={{ background: color }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </span>
          <span className="text-[12.5px] font-bold text-white">{item.label}</span>
          <span className="text-[11.5px] font-medium leading-4 text-white/55">{item.value}</span>
          {item.ctaLabel && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                onBook?.(item);
              }}
              className="mt-auto inline-flex items-center justify-center rounded-full bg-(--color-teal) px-4 py-1.5 pt-1.5 text-[11.5px] font-bold text-white shadow-[0_4px_14px_rgba(38,174,144,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-(--color-teal-deep)"
            >
              {item.ctaLabel}
            </button>
          )}
        </div>
      );
    }

    // Light stacked layout: classic vertical plot cards. The largest plot spans
    // two columns on sm+, keeping the "size follows area" cue in a tidy grid.
    const wide = (item.size ?? 1) >= 8;
    return (
      <div
        key={item.label}
        className={`flex flex-col items-center rounded-2xl border border-slate-100 bg-white px-4 py-4 text-center shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${
          wide ? "sm:col-span-2" : ""
        }`}
      >
        <span
          className="flex h-6 w-6 items-center justify-center rounded-full text-white shadow-sm"
          style={{ background: color }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </span>
        <span
          className="mt-2.5 rounded-full px-3.5 py-1 text-[12.5px] font-bold"
          style={{ background: `${color}1a`, color: accentInk(color) }}
        >
          {item.label}
        </span>
        <p className="mt-2 text-[12px] font-medium text-(--color-muted)">{item.value}</p>
        {item.ctaLabel && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onBook?.(item);
            }}
            className="mt-3 inline-flex items-center justify-center rounded-full border px-4 py-1.5 text-[11.5px] font-bold transition-all duration-200 hover:-translate-y-0.5"
            style={{
              borderColor: `${color}4d`,
              color: accentInk(color),
              background: `${color}14`,
            }}
          >
            {item.ctaLabel}
          </button>
        )}
      </div>
    );
  };

  const ctaButton = (extraClass: string) =>
    cta && (
      <div className={`text-center ${extraClass}`}>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            if (cta.scrollToGrid) {
              document.getElementById("pricing-plots-grid")?.scrollIntoView({ behavior: "smooth", block: "start" });
            } else if (onBook && cta.message) {
              onBook({ label: "", value: "", message: cta.message });
            } else {
              document.getElementById("enquiry")?.scrollIntoView({ behavior: "smooth" });
            }
          }}
          className="inline-flex items-center gap-2 rounded-full bg-(--color-yellow) px-6 py-3 sm:px-8 sm:py-3.5 text-[13px] sm:text-sm font-bold text-(--color-yellow-ink) shadow-[0_4px_16px_rgba(242,242,49,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-(--color-yellow-bright)"
        >
          {cta.label}
        </button>
      </div>
    );

  return (
    <section className={darkBoard ? "section-ink relative overflow-hidden py-5 sm:py-6 lg:py-8" : "bg-(--color-soft) py-4 sm:py-5 lg:py-6"}>
      <div className="container">
        {darkBoard ? (
          <>
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
                  <Eyebrow color="var(--color-yellow)">{eyebrow}</Eyebrow>
                  <h2 className="font-display mt-2.5 text-[clamp(26px,3.6vw,42px)] font-bold leading-[1.08] text-white">
                    {title}
                  </h2>
                  <p className="font-ledger mt-2 text-[10.5px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-white/50">
                    {subtitle}
                  </p>
                </Reveal>

                {/* Ledger rows on the left, yellow price ticket on the right */}
                <div className="grid items-stretch gap-3 sm:gap-4">
                  <div className="rounded-2xl border border-white/10 p-4 sm:p-5">
                    <div className="grid items-center gap-4 sm:grid-cols-2 sm:gap-6">
                      <div className="divide-y divide-white/10">
                        {rows.map((row) => (
                          <div key={row.label} className="flex items-baseline justify-between gap-4 py-2 first:pt-0 sm:py-2.5">
                            <span className="text-[12px] sm:text-[13px] font-semibold uppercase tracking-[0.14em] text-white/55">
                              {row.label}
                            </span>
                            <span className="font-ledger text-[16px] sm:text-[18px] font-bold tracking-[0.02em] text-white">
                              {row.value}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Yellow price ticket */}
                      <div className="relative overflow-hidden rounded-xl bg-(--color-yellow) px-4 py-3 shadow-[0_10px_30px_rgba(242,242,49,0.18)] sm:px-5 sm:py-4">
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute -inset-e-2 -top-3 h-12 w-12 rounded-full bg-white/30 blur-xl"
                        />
                        <p className="relative font-ledger text-[12.5px] sm:text-[13.5px] font-bold tracking-[0.04em] text-(--color-ink-deep)">
                          {callout.title}
                        </p>
                        {callout.body && (
                          <p className="relative mt-1 text-[11.5px] leading-4.5 text-(--color-ink-deep)/70">{callout.body}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {grid && grid.items.length > 0 && (
                    <div id="pricing-plots-grid" className="scroll-mt-24">
                      <p className="font-ledger mb-2.5 text-center text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-white/45">
                        {grid.title}
                      </p>
                      <div className="grid grid-cols-1 items-stretch gap-2.5 sm:grid-cols-3 sm:gap-3 lg:grid-cols-5">
                        {grid.items.map((item) => plotCard(item))}
                      </div>
                    </div>
                  )}
                </div>

                {ctaButton("mt-6 sm:mt-7")}
            </div>
          </>
        ) : (
          <>
            <Reveal className="mx-auto mb-4 sm:mb-6 max-w-2xl text-center">
              <Eyebrow>{eyebrow}</Eyebrow>
              <h2 className="font-display mt-2.5 text-[clamp(26px,3.6vw,42px)] font-bold leading-[1.08] text-(--color-ink)">
                {title}
              </h2>
              <p className="mt-1 text-[12.5px] leading-5 text-(--color-muted)">{subtitle}</p>
            </Reveal>

            <Reveal className="mx-auto max-w-3xl" amount={0.15}>
              <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
                {headers && (
                  <div
                    className={`grid ${gridClass} gap-2 border-b border-slate-100 px-3 py-3 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] sm:tracking-[0.16em] text-slate-500 sm:gap-4 sm:px-6`}
                  >
                    <span>{headers.label}</span>
                    <span>{headers.value}</span>
                    {headers.rate && <span className="text-end">{headers.rate}</span>}
                  </div>
                )}

                {rows.map((row, i) => (
                  <div
                    key={row.label}
                    className={`grid ${gridClass} items-center gap-2 px-3 py-4 sm:gap-4 sm:px-6 sm:py-5 ${
                      i < rows.length - 1 ? "border-b border-slate-100" : ""
                    }`}
                  >
                    <span className="text-[15px] font-semibold text-(--color-ink-deep)">{row.label}</span>
                    {row.rate ? (
                      <span className="text-sm font-medium text-(--color-muted)">{row.value}</span>
                    ) : (
                      <span className="text-[17px] font-bold" style={{ color: accentInk(color) }}>
                        {row.value}
                      </span>
                    )}
                    {row.rate && (
                      <span className="text-end text-[17px] font-bold" style={{ color: accentInk(color) }}>
                        {row.rate}
                      </span>
                    )}
                    {row.ctaLabel && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          onBook?.(row);
                        }}
                        className="inline-flex items-center justify-center rounded-full border px-3 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-[12px] font-bold transition-all duration-200 hover:-translate-y-0.5"
                        style={{
                          borderColor: `${color}4d`,
                          color: accentInk(color),
                          background: `${color}14`,
                        }}
                      >
                        {row.ctaLabel}
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {chips && chips.length > 0 && (
                <div className="mt-6 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                  <ul className="flex flex-wrap items-center justify-center gap-2.5">
                    {chips.map((chip) => (
                      <li
                        key={chip}
                        className="rounded-full px-4 py-2 text-[13px] font-bold"
                        style={{ background: `${color}1a`, color: accentInk(color) }}
                      >
                        {chip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {grid && grid.items.length > 0 && (
                <div id="pricing-plots-grid" className="mt-8 scroll-mt-24">
                  <p className="mb-4 text-center text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">
                    {grid.title}
                  </p>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
                    {grid.items.map((item) => plotCard(item))}
                  </div>
                </div>
              )}

              <div className="mt-6 rounded-xl border border-(--color-yellow)/30 bg-(--color-yellow)/10 px-5 py-4 text-center">
                <p className="text-[14px] font-semibold text-(--color-ink)">{callout.title}</p>
                {callout.body && <p className="mt-1 text-[12px] text-(--color-muted)">{callout.body}</p>}
              </div>

              {ctaButton("mt-6")}
            </Reveal>
          </>
        )}
      </div>
    </section>
  );
};

export default PricingTable;