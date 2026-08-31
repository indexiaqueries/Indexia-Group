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

const InsightsSection = ({ insights }: InsightsSectionProps) => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex((prev) => (prev === i ? null : i));

  return (
    <section className="section-ruled relative bg-(--color-mist) px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Reveal className="mx-auto mb-6 sm:mb-8 max-w-2xl text-center">
          <Eyebrow className="mb-3">{t("newsPage.knowledgeEyebrow")}</Eyebrow>
          <h2 className="font-display whitespace-nowrap text-[clamp(24px,4vw,38px)] font-bold text-(--color-ink)">
            {t("newsPage.knowledgeHeading")}
          </h2>
          <p className="mt-1 text-[13px] leading-6 text-(--color-muted)">
            {t("newsPage.knowledgeSubtitle")}
          </p>
        </Reveal>

        <div className="card-premium overflow-hidden rounded-2xl">
          {insights.map((insight, i) => {
            const isOpen = openIndex === i;
            return (
              <Reveal key={insight.key} delay={(i % 4) * 0.04} amount={0.15}>
                <div
                  className={`${i !== insights.length - 1 ? "border-b border-slate-100" : ""}`}
                >
                  {/* Header — always visible */}
                  <button
                    type="button"
                    onClick={() => toggle(i)}
                    className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors duration-200 hover:bg-slate-50 sm:px-7 sm:py-5"
                    aria-expanded={isOpen}
                  >
                    <span
                      className="font-ledger flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[13px] font-bold"
                      style={{ backgroundColor: `${colors.teal}12`, color: colors.teal }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="flex-1 font-display text-[15px] font-bold leading-snug text-slate-900 sm:text-base">
                      {insight.title}
                    </h3>
                    <ChevronDown
                      size={18}
                      className={`shrink-0 text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* Body — collapsible */}
                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-5 pb-5 sm:px-7 sm:pb-6">
                        <p className="max-w-2xl text-[13px] leading-7 text-slate-500">
                          {insight.body}
                        </p>
                      </div>
                    </div>
                  </div>
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
