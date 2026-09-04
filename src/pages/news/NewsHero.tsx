import { useTranslation } from "react-i18next";
import Eyebrow from "../../components/common/Eyebrow";
import HeroBackdrop from "../../components/banners/HeroBackdrop";
const newsBg = "/images/heroes/news-hero.webp";

// Sections the group publishes across, same source of truth as the careers page ticker.
const SECTIONS_KEYS = ["finance", "tradeExport", "agriculture", "security", "advertising", "sport"] as const;

const NewsHero = () => {
  const { t } = useTranslation();

  return (
    <HeroBackdrop
      image={newsBg}
      extra={
        <div className="absolute inset-x-0 bottom-0 border-t border-white/15 bg-(--color-navy-deep)/25 backdrop-blur-sm">
          <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-center gap-x-4 gap-y-2 px-2 py-3 sm:justify-between sm:px-3 lg:px-5">
            <span className="flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5 motion-reduce:hidden">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-(--color-teal) opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-(--color-teal)" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-white/50">
                {t("newsHero.latestLabel")}
              </span>
            </span>

            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
              {SECTIONS_KEYS.map((s, i) => (
                <span key={s} className="flex items-center gap-3">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-white/40">
                    {t(`newsHero.sectors.${s}`)}
                  </span>
                  {i !== SECTIONS_KEYS.length - 1 && (
                    <span aria-hidden="true" className="text-white/20">
                      /
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
      }
    >
      <div className="hero-panel-glass relative mx-auto max-w-4xl px-5 py-9 text-center sm:px-10 sm:py-11">
        <div className="mb-4 flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-(--color-yellow)/70" />
          <Eyebrow color="var(--color-yellow)">{t("newsPage.eyebrow")}</Eyebrow>
          <span className="h-px w-8 bg-(--color-yellow)/70" />
        </div>
        <h1 className="font-display mx-auto mb-5 max-w-4xl text-[clamp(32px,6vw,60px)] font-bold leading-tight text-white">
          {t("newsPage.titleStart")}
          <div className="text-(--color-yellow)">{t("newsPage.titleAccent")}</div>
        </h1>
        <p className="mx-auto max-w-2xl text-sm leading-7 text-white/80">{t("newsPage.subtitle")}</p>
      </div>
    </HeroBackdrop>
  );
};

export default NewsHero;