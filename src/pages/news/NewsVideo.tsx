import { useTranslation } from "react-i18next";
import Eyebrow from "../../components/common/Eyebrow";
import Reveal from "../../components/common/Reveal";

const NewsVideo = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-(--color-navy) px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <Eyebrow className="mb-3" color="var(--color-yellow)">
            {t("newsPage.tvEyebrow")}
          </Eyebrow>
          <h2 className="font-display text-[clamp(24px,4vw,38px)] font-bold text-white">
            {t("newsPage.tvHeading")}
          </h2>
          <p className="mt-3 text-sm font-bold uppercase tracking-[0.18em] text-(--color-yellow)">
            {t("newsPage.tvCaption")}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative mt-8 aspect-video overflow-hidden rounded-2xl border border-white/15 shadow-[0_20px_50px_rgba(2,16,26,0.5)]">
            <iframe
              src="https://www.youtube.com/embed/pnmXG9j8148"
              title="Indexia Finance TV Ad — News18"
              className="absolute inset-0 h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default NewsVideo;
