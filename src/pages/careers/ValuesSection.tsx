import { useTranslation } from "react-i18next";
import Eyebrow from "../../components/common/Eyebrow";
import Reveal from "../../components/common/Reveal";
import { colors } from "../../lib/theme";
import type { ValueItem } from "./careersData";

type ValuesSectionProps = {
  values: ValueItem[];
};

const ValuesSection = ({ values }: ValuesSectionProps) => {
  const { t } = useTranslation();

  return (
    <section className="relative bg-white px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto mb-12 max-w-2xl text-center">
          <Eyebrow className="mb-3">{t("careersPage.valuesEyebrow")}</Eyebrow>
          <h2 className="font-display text-[clamp(24px,4vw,38px)] font-bold text-(--color-ink)">
            {t("careersPage.valuesHeading")}
          </h2>
          <p className="mt-4 text-[15px] leading-7 text-(--color-muted)">{t("careersPage.valuesSubtitle")}</p>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, i) => (
            <Reveal key={value.key} delay={(i % 4) * 0.08} amount={0.15}>
              <div className="flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <span
                  className="font-ledger text-sm font-bold"
                  style={{ color: i % 2 === 0 ? colors.teal : colors.yellow }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display mt-3 text-lg font-bold text-slate-900">{value.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-7 text-slate-600">{value.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
