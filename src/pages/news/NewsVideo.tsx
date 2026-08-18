import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Play } from "lucide-react";
import Eyebrow from "../../components/common/Eyebrow";
import Reveal from "../../components/common/Reveal";

const NewsVideo = () => {
  const { t } = useTranslation();
  const [playVideo, setPlayVideo] = useState(false);

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
            {playVideo ? (
              <iframe
                src="https://www.youtube.com/embed/pnmXG9j8148?autoplay=1"
                title="Indexia Finance TV Ad - News18"
                className="absolute inset-0 h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <button
                type="button"
                onClick={() => setPlayVideo(true)}
                className="group absolute inset-0 flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_50%_35%,rgba(242,242,49,0.2),transparent_32%),linear-gradient(135deg,rgba(12,54,82,0.98),rgba(6,106,156,0.82)_48%,rgba(38,174,144,0.76))] text-white"
                aria-label="Play Indexia Finance TV ad"
              >
                <span className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] bg-size-[42px_42px] opacity-30" />
                <span className="relative flex h-18 w-18 items-center justify-center rounded-full border border-white/35 bg-white/15 text-(--color-yellow) backdrop-blur-md transition-transform duration-300 group-hover:scale-105">
                  <Play size={30} fill="currentColor" strokeWidth={1.5} aria-hidden="true" />
                </span>
              </button>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default NewsVideo;
