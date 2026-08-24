import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Eyebrow from "../common/Eyebrow";
import AnimatedCounter from "../common/AnimatedCounter";
import SealStamp from "../common/SealStamp";
import HeroBackdrop from "./HeroBackdrop";
import businessesHeroBg from "../../assets/hero-img/BusinessesHero.webp";
import { colors } from "../../lib/theme";

const BusinessesHero = () => {
  const { t } = useTranslation();

  return (
    <HeroBackdrop
      image={businessesHeroBg}
      overlay="linear-gradient(115deg, rgba(10,34,51,0.88) 0%, rgba(12,54,82,0.72) 55%, rgba(15,74,110,0.55) 100%)"
      radial="radial-gradient(circle at 85% 15%, rgba(242,242,49,0.16), transparent 42%), radial-gradient(circle at 12% 85%, rgba(38,174,144,0.2), transparent 45%), radial-gradient(circle at 55% 50%, rgba(6,106,156,0.2), transparent 55%)"
      extra={
        <>
          {/* Fade into the paper-toned listing section below */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-36 bg-linear-to-t from-(--color-paper)/95 to-transparent"
          />
          <span
            className="seal-stamp-in pointer-events-none absolute bottom-5 end-5 z-10 sm:bottom-10 sm:end-10"
            aria-hidden="true"
          >
            <SealStamp size={96} className="h-16 w-16 sm:h-24 sm:w-24" />
          </span>
        </>
      }
    >
      <div className="mb-4 flex items-center justify-center gap-3">
        <span className="h-px w-8 bg-(--color-yellow)/70" />
        <Eyebrow color="var(--color-yellow)">{t("businessesHero.eyebrow")}</Eyebrow>
        <span className="h-px w-8 bg-(--color-yellow)/70" />
      </div>
      <h1 className="font-display mx-auto mb-6 max-w-4xl text-[clamp(32px,6vw,60px)] font-bold leading-tight text-white">
        {t("businessesHero.titleStart")}
        <span className="text-(--color-yellow)">{t("businessesHero.titleAccent")}</span>
      </h1>
      <p className="mx-auto mb-8 sm:mb-10 max-w-2xl text-[14px] sm:text-base leading-7 sm:leading-8 text-white/80">
        {t("businessesHero.paragraph")}
      </p>

      <div className="mx-auto mb-8 sm:mb-12 grid max-w-2xl grid-cols-2 items-start justify-items-center gap-x-4 gap-y-6 sm:gap-x-6 sm:gap-y-8 sm:flex sm:flex-wrap sm:justify-center sm:gap-x-12 sm:gap-y-7">
        <AnimatedCounter value="500+" label={t("businessesHero.counterClients")} color={colors.white} numberClassName="font-ledger text-[28px] font-bold leading-none" labelClassName="mt-1 text-xs font-semibold text-white/70" />
        <AnimatedCounter value="8" label={t("businessesHero.counterBusinesses")} color={colors.yellow} numberClassName="font-ledger text-[28px] font-bold leading-none" labelClassName="mt-1 text-xs font-semibold text-white/70" />
        <AnimatedCounter value="4+" label={t("businessesHero.counterLocations")} color={colors.white} numberClassName="font-ledger text-[28px] font-bold leading-none" labelClassName="mt-1 text-xs font-semibold text-white/70" />
        <AnimatedCounter value="12+" label={t("businessesHero.counterYears")} color={colors.yellow} numberClassName="font-ledger text-[28px] font-bold leading-none" labelClassName="mt-1 text-xs font-semibold text-white/70" />
      </div>

      <Link
        to="/contact"
        className="inline-flex items-center gap-2 rounded-full bg-(--color-yellow) px-6 py-3 sm:px-8 sm:py-3.5 text-[13px] sm:text-sm font-bold text-(--color-yellow-ink) shadow-[0_4px_16px_rgba(242,242,49,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-(--color-yellow-bright)"
      >
        {t("businessesHero.cta")}
      </Link>
    </HeroBackdrop>
  );
};

export default BusinessesHero;
