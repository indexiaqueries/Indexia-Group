import { useTranslation } from "react-i18next";
import Eyebrow from "../../components/common/Eyebrow";
import Reveal from "../../components/common/Reveal";

type CultureSectionProps = {
  culture: string[];
};

const CultureSection = ({ culture }: CultureSectionProps) => {
  const { t } = useTranslation();

  const items: { title: string; desc: string }[] = [];
  for (let i = 0; i < culture.length; i += 2) {
    items.push({ title: culture[i] || "", desc: culture[i + 1] || "" });
  }

  return (
    <section className="relative bg-white px-2 py-5 sm:px-3 sm:py-5 lg:px-5">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-(--color-teal)/35 to-transparent"
      />

      <div className="mx-auto max-w-5xl">
        <Reveal className="mb-10 sm:mb-14 max-w-2xl">
          <Eyebrow className="mb-1.5">{t("careersPage.cultureEyebrow")}</Eyebrow>
          <h2 className="font-display text-[clamp(20px,3.5vw,32px)] font-bold text-(--color-ink)">
            {t("careersPage.cultureHeading")}
          </h2>
        </Reveal>

        <div className="space-y-10 sm:space-y-14">
          {items.map((item, i) => (
            <Reveal key={i} delay={i * 0.06} amount={0.12}>
              <div
                className={`grid grid-cols-1 gap-6 sm:grid-cols-[1fr_1px_1.15fr] sm:gap-10 ${
                  i !== items.length - 1
                    ? "border-b border-slate-100 pb-10 sm:pb-14"
                    : ""
                }`}
              >
                <div>
                  <span
                    aria-hidden="true"
                    className="mb-3 block h-1.5 w-6 rounded-full bg-(--color-teal)"
                  />
                  <p className="font-display text-[17px] sm:text-[20px] leading-7 sm:leading-8 text-slate-900">
                    {item.title}
                  </p>
                </div>

                <span
                  aria-hidden="true"
                  className="hidden sm:block sm:w-px sm:bg-slate-200"
                />

                <p className="text-[13px] sm:text-[14.5px] leading-6 sm:leading-7.5 text-slate-500 sm:pt-1">
                  {item.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CultureSection;