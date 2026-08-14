import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Reveal from "../../components/common/Reveal";

const NewsCta = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-white px-5 py-16 sm:px-6 lg:px-8">
      <Reveal className="mx-auto max-w-4xl">
        <div className="rounded-3xl border border-slate-100 bg-(--color-mist) px-8 py-10 text-center sm:px-12">
          <h2 className="font-display text-2xl font-bold text-slate-900 sm:text-3xl">
            {t("newsPage.ctaTitle")}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-600">{t("newsPage.ctaBody")}</p>
          <Link
            to="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-(--color-teal) px-7 py-3 text-sm font-bold text-white shadow-[0_4px_16px_rgba(38,174,144,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-(--color-teal-deep)"
          >
            {t("newsPage.ctaButton")} →
          </Link>
        </div>
      </Reveal>
    </section>
  );
};

export default NewsCta;
