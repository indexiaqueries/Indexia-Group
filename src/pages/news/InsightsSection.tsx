import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Eyebrow from "../../components/common/Eyebrow";
import Reveal from "../../components/common/Reveal";
import { colors } from "../../lib/theme";
import type { InsightItem } from "./newsData";

type InsightsSectionProps = {
  insights: InsightItem[];
};

const InsightsSection = ({ insights }: InsightsSectionProps) => {
  const { t } = useTranslation();

  return (
    <section className="relative bg-(--color-mist) px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto mb-12 max-w-2xl text-center">
          <Eyebrow className="mb-3">{t("newsPage.knowledgeEyebrow")}</Eyebrow>
          <h2 className="font-display text-[clamp(24px,4vw,38px)] font-bold text-(--color-ink)">
            {t("newsPage.knowledgeHeading")}
          </h2>
          <p className="mt-4 text-[15px] leading-7 text-(--color-muted)">{t("newsPage.knowledgeSubtitle")}</p>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {insights.map((insight, i) => (
            <Reveal key={insight.key} delay={(i % 4) * 0.08} amount={0.15}>
              <div className="flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                <span className="font-ledger text-sm font-bold" style={{ color: colors.teal }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display mt-3 text-lg font-bold text-slate-900">{insight.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-7 text-slate-600">{insight.body}</p>
                <Link
                  to="/contact"
                  className="mt-4 text-sm font-bold transition-colors"
                  style={{ color: colors.blue }}
                >
                  {t("newsPage.askUs")} →
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InsightsSection;
