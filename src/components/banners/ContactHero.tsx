import { ArrowRight, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";

import { branches, phoneNumbers } from "../../data/contact";
import { colors, displayFont, monoFont } from "../../lib/theme";
import Eyebrow from "../common/Eyebrow";
import PassbookCard from "../contact/PassbookCard";
import HeroBackdrop from "./HeroBackdrop";
import contactHeroBg from "../../assets/hero-img/ContactHero.webp";

const ContactHero = () => {
  const { t } = useTranslation();

  return (
    <HeroBackdrop
      image={contactHeroBg}
      containerClassName="relative mx-auto grid max-w-7xl items-center gap-6 px-2 py-10 pt-20 sm:px-3 lg:grid-cols-2 lg:px-5 lg:py-14 lg:gap-10"
    >
      <div className="slide-in-left rounded-[28px] bg-(--color-ink-deep)/65 p-6 shadow-2xl ring-1 ring-white/15 backdrop-blur-xs sm:p-9">
        <Eyebrow size="md" color={colors.yellow} className="mb-4">
          {t("contactHero.eyebrow")}
        </Eyebrow>

        <h1
          className="max-w-2xl text-4xl leading-tight text-white sm:text-5xl lg:text-6xl"
          style={{ ...displayFont, fontWeight: 600 }}
        >
          {t("contactHero.title")}
        </h1>

        <p className="mt-4 sm:mt-5 max-w-xl text-[13px] sm:text-[14px] leading-6 sm:leading-7 text-white/75">
          {t("contactHero.paragraph")}
        </p>

        <div className="mt-5 sm:mt-6 flex flex-wrap gap-3 sm:gap-4">
          <a
            href="#enquiry-form"
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 sm:px-6 sm:py-3 text-[13px] sm:text-sm font-bold text-(--color-yellow-ink) transition-all duration-300 hover:-translate-y-1"
            style={{ backgroundColor: colors.yellow }}
          >
            {t("contactHero.sendEnquiry")}
            <ArrowRight size={17} />
          </a>

          <a
            href="tel:+918655168551"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 sm:px-6 sm:py-3 text-[13px] sm:text-sm font-bold text-white transition-all duration-300 hover:bg-white hover:text-(--color-blue)"
          >
            <Phone size={17} />
            {t("contactHero.callNow")}
          </a>
        </div>

        <div
          className="mt-6 sm:mt-8 flex flex-wrap gap-x-5 sm:gap-x-8 gap-y-2 sm:gap-y-3 border-t border-white/10 pt-4 sm:pt-5 text-[12px] sm:text-[13px] text-white/70"
          style={monoFont}
        >
          <span>{t("contactHero.offices", { count: String(branches.length).padStart(2, "0") })}</span>
          <span>{t("contactHero.directLines", { count: String(phoneNumbers.length).padStart(2, "0") })}</span>
          <span>{t("contactHero.reply")}</span>
        </div>
      </div>

      <div>
        <PassbookCard />
      </div>
    </HeroBackdrop>
  );
};

export default ContactHero;
