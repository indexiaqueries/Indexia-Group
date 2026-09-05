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
    <section className="section-ruled section-paper relative px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-(--color-teal)/35 to-transparent"
      />

      <div className="mx-auto max-w-5xl">
        <Reveal className="mb-2 max-w-2xl">
          <Eyebrow className="mb-1.5">{t("careersPage.cultureEyebrow")}</Eyebrow>
          <h2 className="font-display text-[clamp(20px,3.5vw,32px)] font-bold text-(--color-ink)">
            {t("careersPage.cultureHeading")}
          </h2>
        </Reveal>

        <div className="space-y-10 sm:space-y-14">
          {items.map((item, i) => (
            <Reveal key={i} delay={i * 0.06} amount={0.12}>
              <div className="card-premium grid grid-cols-1 gap-6 rounded-2xl p-5 sm:grid-cols-[1fr_1px_1.15fr] sm:gap-10 sm:p-7">
                <div>
                  <span
                    aria-hidden="true"
                    className="mb-3 block h-1.5 w-6 rounded-full bg-(--color-teal)"
                  />
                  <p className="font-display text-lg leading-7 sm:leading-8 text-(--color-ink)">
                    {item.title}
                  </p>
                </div>

                <span
                  aria-hidden="true"
                  className="hidden sm:block sm:w-px sm:bg-(--color-line)"
                />

                <p className="text-sm sm:text-[15px] leading-6 sm:leading-7.5 text-(--color-muted) sm:pt-1">
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
