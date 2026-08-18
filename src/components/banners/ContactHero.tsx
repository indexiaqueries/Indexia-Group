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
      overlay={`linear-gradient(115deg, ${colors.navyDeep}d9 0%, ${colors.navy}b3 55%, ${colors.navyMid}8c 100%)`}
      radial={`radial-gradient(circle at 85% 15%, ${colors.teal}35, transparent 45%)`}
      ruledClassName="pointer-events-none absolute inset-0 opacity-70"
      ruledStyle={{
        backgroundImage:
          "repeating-linear-gradient(to bottom, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 36px)",
      }}
      containerClassName="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 pt-28 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-28"
    >
      <div className="slide-in-left">
        <Eyebrow size="md" color={colors.yellow} className="mb-4">
          {t("contactHero.eyebrow")}
        </Eyebrow>

        <h1
          className="max-w-2xl text-4xl leading-tight text-white sm:text-5xl lg:text-6xl"
          style={{ ...displayFont, fontWeight: 600 }}
        >
          {t("contactHero.title")}
        </h1>

        <p className="mt-6 max-w-xl text-base leading-8 text-white/75">
          {t("contactHero.paragraph")}
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="#enquiry-form"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-(--color-yellow-ink) transition-all duration-300 hover:-translate-y-1"
            style={{ backgroundColor: colors.yellow }}
          >
            {t("contactHero.sendEnquiry")}
            <ArrowRight size={17} />
          </a>

          <a
            href="tel:+918655168551"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-bold text-white transition-all duration-300 hover:bg-white hover:text-(--color-blue)"
          >
            <Phone size={17} />
            {t("contactHero.callNow")}
          </a>
        </div>

        <div
          className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/10 pt-6 text-sm text-white/70"
          style={monoFont}
        >
          <span>{t("contactHero.offices", { count: String(branches.length).padStart(2, "0") })}</span>
          <span>{t("contactHero.directLines", { count: String(phoneNumbers.length).padStart(2, "0") })}</span>
          <span>{t("contactHero.reply")}</span>
        </div>
      </div>

      <div className="scale-in" style={{ animationDelay: "0.1s" }}>
        <PassbookCard />
      </div>
    </HeroBackdrop>
  );
};

export default ContactHero;
