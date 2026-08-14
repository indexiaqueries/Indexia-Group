import { useTranslation } from "react-i18next";
import Eyebrow from "../../components/common/Eyebrow";
import Reveal from "../../components/common/Reveal";
import { colors } from "../../lib/theme";
import type { StepItem } from "./careersData";

type ProcessSectionProps = {
  steps: StepItem[];
};

const ProcessSection = ({ steps }: ProcessSectionProps) => {
  const { t } = useTranslation();

  return (
    <section className="relative bg-white px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Reveal className="mx-auto mb-12 max-w-2xl text-center">
          <Eyebrow className="mb-3">{t("careersPage.processEyebrow")}</Eyebrow>
          <h2 className="font-display text-[clamp(24px,4vw,38px)] font-bold text-(--color-ink)">
            {t("careersPage.processHeading")}
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <Reveal key={step.key} delay={(i % 4) * 0.08} amount={0.15}>
              <div className="relative flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-6 pt-8 shadow-sm">
                <span
                  className="absolute -top-4 start-6 flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-white shadow-md"
                  style={{ backgroundColor: i % 2 === 0 ? colors.teal : colors.blue }}
                >
                  {i + 1}
                </span>
                <h3 className="font-display mt-2 text-lg font-bold text-slate-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
