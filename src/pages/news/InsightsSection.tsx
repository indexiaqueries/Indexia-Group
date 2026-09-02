import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDown } from "lucide-react";
import Eyebrow from "../../components/common/Eyebrow";
import Reveal from "../../components/common/Reveal";
import { colors } from "../../lib/theme";
import type { InsightItem } from "./newsData";

type InsightsSectionProps = {
  insights: InsightItem[];
};

/* Split "Company: Title" into tag + heading */
function splitInsight(raw: string) {
  const idx = raw.indexOf(":");
  if (idx > 0 && idx < 30) {
    return { tag: raw.slice(0, idx).trim(), heading: raw.slice(idx + 1).trim() };
  }
  return { tag: "", heading: raw };
}

const InsightsSection = ({ insights }: InsightsSectionProps) => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="section-ruled relative bg-(--color-mist) px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <Reveal className="mx-auto mb-5 sm:mb-6 max-w-2xl text-center">
          <Eyebrow className="mb-3">{t("newsPage.knowledgeEyebrow")}</Eyebrow>
          <h2 className="font-display whitespace-nowrap text-[clamp(24px,4vw,38px)] font-bold text-(--color-ink)">
            {t("newsPage.knowledgeHeading")}
          </h2>
          <p className="mt-1 text-[13px] leading-6 text-(--color-muted)">
            {t("newsPage.knowledgeSubtitle")}
          </p>
        </Reveal>

        {/* FAQ accordion */}
        <div className="space-y-2">
          {insights.map((insight, i) => {
            const { tag, heading } = splitInsight(insight.title);
            const isOpen = openIndex === i;
            return (
              <Reveal key={insight.key} delay={(i % 4) * 0.04} amount={0.08}>
                <div className="card-premium overflow-hidden rounded-xl border border-slate-200/60">
                  <button
                    type="button"
                    onClick={() => toggle(i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center gap-3 px-4 py-3.5 text-left sm:px-5 sm:py-4"
                  >
                    <span
                      className="font-ledger flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[11px] font-bold"
                      style={{ backgroundColor: `${colors.teal}14`, color: colors.teal }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0 flex-1">
                      {tag && (
                        <span className="mb-0.5 block rounded-full bg-(--color-mist) px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-(--color-muted) w-fit">
                          {tag}
                        </span>
                      )}
                      <h3 className="font-display text-[14px] font-bold leading-snug text-slate-900 sm:text-[15px]">
                        {heading}
                      </h3>
                    </div>
                    <ChevronDown
                      size={16}
                      strokeWidth={2.5}
                      className={`shrink-0 text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {isOpen && (
                    <div className="border-t border-slate-100 px-4 pb-4 pt-3 sm:px-5 sm:pb-5">
                      <p className="text-[13px] leading-6 text-slate-500">
                        {insight.body}
                      </p>
                    </div>
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

export default InsightsSection;
