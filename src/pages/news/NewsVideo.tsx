import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Play } from "lucide-react";
import Eyebrow from "../../components/common/Eyebrow";
import Reveal from "../../components/common/Reveal";

const NewsVideo = () => {
  const { t } = useTranslation();
  const [playVideo, setPlayVideo] = useState(false);

  return (
    <section className="relative overflow-hidden bg-(--color-navy) px-2 py-8 sm:px-3 sm:py-10 lg:px-5 lg:py-12">
      {/* Subtle radial glow behind text */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 h-[420px] w-[420px] rounded-full bg-(--color-teal)/[0.06] blur-[100px]"
      />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Text */}
        <Reveal>
          <Eyebrow className="mb-4" color="var(--color-yellow)">
            {t("newsPage.tvEyebrow")}
          </Eyebrow>
          <div className="flex items-start gap-5">
            <span
              aria-hidden="true"
              className="mt-1 hidden h-[72px] w-[3px] shrink-0 rounded-full bg-gradient-to-b from-(--color-yellow) to-(--color-yellow)/30 sm:block"
            />
            <h2 className="font-display text-[clamp(24px,4vw,38px)] font-bold leading-[1.15] text-white">
              {t("newsPage.tvHeadingStart")}
              <span className="mt-1 block text-(--color-yellow)">{t("newsPage.tvHeadingAccent")}</span>
            </h2>
          </div>
          <p className="mt-5 max-w-md text-[13px] leading-7.5 text-white/55 sm:pl-[28px]">
            {t("newsPage.tvCaption")}
          </p>
        </Reveal>

        {/* Video */}
        <Reveal delay={0.1}>
          <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] shadow-[0_24px_64px_-12px_rgba(2,16,26,0.7),0_0_0_1px_rgba(255,255,255,0.04)_inset]">
            <div className="relative aspect-video">
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
                  className="group absolute inset-0 flex h-full w-full items-center justify-center text-white"
                  aria-label="Play Indexia Finance TV ad"
                >
                  <img
                    src="https://img.youtube.com/vi/pnmXG9j8148/maxresdefault.jpg"
                    alt="Indexia Finance TV Ad - News18"
                    width={1280}
                    height={720}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent transition-colors duration-300 group-hover:from-black/40 group-hover:via-black/15" />

                  {/* On Air badge */}
                  <span className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-black/60 px-3 py-1.5 backdrop-blur-md ring-1 ring-white/10">
                    <span className="relative flex h-2 w-2 motion-reduce:hidden">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.6)]" />
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-white/90">
                      On Air
                    </span>
                  </span>

                  {/* Play button */}
                  <span className="relative flex h-[72px] w-[72px] items-center justify-center rounded-full border border-(--color-yellow)/30 bg-(--color-yellow)/10 text-(--color-yellow) backdrop-blur-xl transition-all duration-300 group-hover:scale-110 group-hover:border-(--color-yellow)/50 group-hover:bg-(--color-yellow)/15 group-hover:shadow-[0_0_40px_rgba(242,242,49,0.25)] sm:h-20 sm:w-20">
                    <Play size={30} fill="currentColor" strokeWidth={0} aria-hidden="true" className="ml-1" />
                  </span>
                </button>
              )}
            </div>

            {/* Bottom bar */}
            <div className="flex items-center justify-between border-t border-white/[0.06] bg-gradient-to-r from-[#0a1929] via-[#0d1f35] to-[#0a1929] px-5 py-3">
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/30">
                TV Commercial
              </span>
              <span className="rounded bg-(--color-yellow)/10 px-2 py-0.5 text-[11px] font-bold uppercase tracking-[0.14em] text-(--color-yellow)">
                News18
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default NewsVideo;