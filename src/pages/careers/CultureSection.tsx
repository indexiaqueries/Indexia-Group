import { useTranslation } from "react-i18next";
import Eyebrow from "../../components/common/Eyebrow";
import Reveal from "../../components/common/Reveal";

type CultureSectionProps = {
  culture: string[];
};

const CultureSection = ({ culture }: CultureSectionProps) => {
  const { t } = useTranslation();

  return (
    <section className="relative bg-white px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto mb-12 max-w-2xl text-center">
          <Eyebrow className="mb-3">{t("careersPage.cultureEyebrow")}</Eyebrow>
          <h2 className="font-display text-[clamp(24px,4vw,38px)] font-bold text-(--color-ink)">
            {t("careersPage.cultureHeading")}
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {culture.map((paragraph, i) => (
            <Reveal key={i} delay={i * 0.1} amount={0.2}>
              <div className="flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-7 shadow-sm">
                <span className="font-ledger text-sm font-bold text-(--color-teal)">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-3 flex-1 text-[15px] leading-8 text-slate-600">{paragraph}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CultureSection;
