import { useTranslation } from "react-i18next";
import Reveal from "../../components/common/Reveal";

const CareersCta = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-white px-5 pb-16 sm:px-6 lg:px-8">
      <Reveal className="mx-auto max-w-4xl">
        <div className="rounded-3xl bg-(--color-navy) px-8 py-10 text-center text-white sm:px-12">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">{t("careersPage.ctaTitle")}</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-white/75">{t("careersPage.ctaBody")}</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href="mailto:hr@indexiafinance.com"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3 text-sm font-bold text-white backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/20"
            >
              hr@indexiafinance.com
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
};

export default CareersCta;
