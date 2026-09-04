import { useState, useRef, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDown } from "lucide-react";
import Eyebrow from "../../components/common/Eyebrow";
import Reveal from "../../components/common/Reveal";
import { colors } from "../../lib/theme";
import type { InsightItem } from "./newsData";

type InsightsSectionProps = {
  insights: InsightItem[];
};

/* ── Single FAQ card ────────────────────────────────────────── */

type FaqCardProps = {
  insight: InsightItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  contentHeight: number;
  measureRef: (el: HTMLDivElement | null) => void;
};

const FaqCard = ({ insight, index, isOpen, onToggle, contentHeight, measureRef }: FaqCardProps) => (
  <div
    className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 ${
      isOpen
        ? "border-(--color-teal)/30 shadow-[0_8px_32px_rgba(38,174,144,0.12)]"
        : "border-white/60 shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:border-white/80 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
    }`}
    style={{
      background: "linear-gradient(135deg, rgba(255,255,255,0.7), rgba(255,255,255,0.4))",
      backdropFilter: "blur(16px) saturate(180%)",
      WebkitBackdropFilter: "blur(16px) saturate(180%)",
    }}
  >
    {/* Glass shine */}
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-40"
      style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.6) 0%, transparent 50%, rgba(255,255,255,0.1) 100%)" }}
    />

    <button
      type="button"
      onClick={onToggle}
      aria-expanded={isOpen}
      className="relative flex w-full items-center gap-3 px-4 py-4 text-left sm:px-5 sm:py-5"
    >
      <span
        className="font-ledger flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-[11px] font-bold transition-colors duration-200"
        style={{ backgroundColor: isOpen ? `${colors.teal}20` : `${colors.teal}10`, color: colors.teal }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <h3 className="min-w-0 flex-1 font-display text-[14px] font-bold leading-snug text-slate-800 sm:text-[15px]">
        {insight.title}
      </h3>
      <ChevronDown
        size={16}
        strokeWidth={2.5}
        className={`shrink-0 text-slate-400 transition-transform duration-300 ease-out ${isOpen ? "rotate-180 text-(--color-teal)" : ""}`}
      />
    </button>

    {/* Smooth height transition */}
    <div
      className="overflow-hidden transition-[max-height,opacity] duration-300 ease-out"
      style={{ maxHeight: isOpen ? `${contentHeight}px` : "0px", opacity: isOpen ? 1 : 0 }}
    >
      <div className="border-t border-white/40 px-4 pb-4 pt-3 sm:px-5 sm:pb-5">
        <p className="text-[13px] leading-6 text-slate-500">{insight.body}</p>
      </div>
    </div>

    {/* Hidden measurement div */}
    <div
      ref={measureRef}
      aria-hidden="true"
      className="pointer-events-none absolute left-[-9999px] opacity-0"
      style={{ width: "100%" }}
    >
      <div className="border-t border-white/40 px-4 pb-4 pt-3 sm:px-5 sm:pb-5">
        <p className="text-[13px] leading-6 text-slate-500">{insight.body}</p>
      </div>
    </div>
  </div>
);

/* ── Independent column ─────────────────────────────────────── */

type FaqColumnProps = {
  items: { insight: InsightItem; globalIndex: number }[];
  openGlobalIndex: number | null;
  onToggle: (globalIndex: number) => void;
  heights: Record<number, number>;
  measureRefs: React.MutableRefObject<Map<number, HTMLDivElement>>;
};

const FaqColumn = ({ items, openGlobalIndex, onToggle, heights, measureRefs }: FaqColumnProps) => (
  <div className="flex flex-col gap-3">
    {items.map(({ insight, globalIndex }) => (
      <Reveal key={insight.key} delay={(globalIndex % 4) * 0.04} amount={0.08}>
        <FaqCard
          insight={insight}
          index={globalIndex}
          isOpen={openGlobalIndex === globalIndex}
          onToggle={() => onToggle(globalIndex)}
          contentHeight={heights[globalIndex] ?? 0}
          measureRef={(el) => {
            if (el) measureRefs.current.set(globalIndex, el);
          }}
        />
      </Reveal>
    ))}
  </div>
);

/* ── Main section ───────────────────────────────────────────── */

const InsightsSection = ({ insights }: InsightsSectionProps) => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [heights, setHeights] = useState<Record<number, number>>({});
  const measureRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  const toggle = useCallback((i: number) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  }, []);

  // Measure content heights on mount and resize
  useEffect(() => {
    const measure = () => {
      const newHeights: Record<number, number> = {};
      measureRefs.current.forEach((el, i) => {
        newHeights[i] = el.scrollHeight;
      });
      setHeights(newHeights);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [insights]);

  // Split insights into two independent columns
  const mid = Math.ceil(insights.length / 2);
  const leftItems = insights.slice(0, mid).map((insight, i) => ({ insight, globalIndex: i }));
  const rightItems = insights.slice(mid).map((insight, i) => ({ insight, globalIndex: mid + i }));

  // Build FAQPage JSON-LD from insights
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: insights.map((insight) => ({
      "@type": "Question",
      name: insight.title,
      acceptedAnswer: {
        "@type": "Answer",
        text: insight.body,
      },
    })),
  };

  return (
    <section className="section-ruled relative px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
      <div className="absolute inset-0 bg-linear-to-br from-slate-50 via-white to-slate-100" />

      <div className="relative mx-auto max-w-6xl">
        <Reveal className="mx-auto mb-6 sm:mb-8 max-w-2xl text-center">
          <Eyebrow className="mb-3">{t("newsPage.knowledgeEyebrow")}</Eyebrow>
          {/* No nowrap: this heading must wrap gracefully on small screens and in longer translations. */}
          <h2 className="font-display text-[clamp(24px,4vw,38px)] font-bold text-(--color-ink)">
            {t("newsPage.knowledgeHeading")}
          </h2>
          <p className="mt-1 text-[13px] leading-6 text-(--color-muted)">
            {t("newsPage.knowledgeSubtitle")}
          </p>
        </Reveal>

        {/* Two independent columns — no cross-column layout shift */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
          <FaqColumn
            items={leftItems}
            openGlobalIndex={openIndex}
            onToggle={toggle}
            heights={heights}
            measureRefs={measureRefs}
          />
          <FaqColumn
            items={rightItems}
            openGlobalIndex={openIndex}
            onToggle={toggle}
            heights={heights}
            measureRefs={measureRefs}
          />
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </section>
  );
};

export default InsightsSection;
