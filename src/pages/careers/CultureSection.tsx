import { useTranslation } from "react-i18next";
import Eyebrow from "../../components/common/Eyebrow";
import Reveal from "../../components/common/Reveal";
import ImageSlot from "../../components/common/ImageSlot";
import { siteImages } from "../../data/siteImages";
import { colors } from "../../lib/theme";

type CultureSectionProps = {
  culture: string[];
};

const perks = [
  { icon: "🎯", labelKey: "careersPerks.growth" },
  { icon: "🤝", labelKey: "careersPerks.collaboration" },
  { icon: "⚡", labelKey: "careersPerks.innovation" },
  { icon: "🌱", labelKey: "careersPerks.development" },
];

const CultureSection = ({ culture }: CultureSectionProps) => {
  const { t } = useTranslation();

  return (
    <section className="relative bg-white px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <Reveal className="mx-auto mb-14 max-w-2xl text-center">
          <Eyebrow className="mb-3">{t("careersPage.cultureEyebrow")}</Eyebrow>
          <h2 className="font-display text-[clamp(26px,4vw,40px)] font-bold text-(--color-ink)">
            {t("careersPage.cultureHeading")}
          </h2>
        </Reveal>

        {/* Image + Perks Row */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <Reveal delay={0.05} amount={0.15}>
            <ImageSlot {...siteImages.careersCulture} className="rounded-2xl" aspect="aspect-[4/3]" />
          </Reveal>

          <Reveal delay={0.15} amount={0.15}>
            <div className="grid grid-cols-2 gap-4">
              {perks.map((perk, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center gap-3 rounded-2xl border border-slate-100 bg-(--color-soft) p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <span className="text-3xl">{perk.icon}</span>
                  <span className="text-sm font-bold text-slate-700">
                    {t(perk.labelKey, ["Growth Mindset", "Team Collaboration", "Innovation Driven", "Skill Development"][i])}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Culture Paragraphs */}
        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {culture.map((paragraph, i) => (
            <Reveal key={i} delay={i * 0.1} amount={0.2}>
              <div className="flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-7 shadow-sm transition-all duration-300 hover:shadow-md">
                <div className="mb-3 flex items-center gap-3">
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white"
                    style={{ backgroundColor: i % 2 === 0 ? colors.teal : colors.blue }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="h-px flex-1 bg-slate-100" />
                </div>
                <p className="flex-1 text-[15px] leading-8 text-slate-600">{paragraph}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CultureSection;
