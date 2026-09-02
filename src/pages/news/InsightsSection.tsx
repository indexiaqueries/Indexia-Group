import { useCallback } from "react";
import { useTranslation } from "react-i18next";
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

  /* Spotlight cursor-tracking */
  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  }, []);

  return (
    <section className="section-ruled relative bg-(--color-mist) px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto max-w-6xl">
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

        {/* Card grid */}
        <div className="grid gap-3 sm:grid-cols-2 lg:gap-4">
          {insights.map((insight, i) => {
            const { tag, heading } = splitInsight(insight.title);
            return (
              <Reveal key={insight.key} delay={(i % 4) * 0.06} amount={0.12}>
                <div
                  className="spotlight-tile card-premium card-premium-hover group relative flex flex-col rounded-2xl p-4 sm:p-5"
                  onMouseMove={handleMove}
                >
                  {/* Top row: badge + tag */}
                  <div className="mb-2 flex items-center gap-3">
                    <span
                      className="font-ledger flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[12px] font-bold"
                      style={{ backgroundColor: `${colors.teal}14`, color: colors.teal }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {tag && (
                      <span className="rounded-full bg-(--color-mist) px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-(--color-muted)">
                        {tag}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="font-display mb-1.5 text-[16px] font-bold leading-snug text-slate-900 sm:text-[17px]">
                    {heading}
                  </h3>

                  {/* Body */}
                  <p className="flex-1 text-[13px] leading-6 text-slate-500">
                    {insight.body}
                  </p>

                  {/* Bottom accent line on hover */}
                  <div className="mt-3 h-px w-full bg-gradient-to-r from-transparent via-(--color-teal) to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-40" />
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
