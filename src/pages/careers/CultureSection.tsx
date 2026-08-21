import { useTranslation } from "react-i18next";
import Eyebrow from "../../components/common/Eyebrow";
import Reveal from "../../components/common/Reveal";
import ourCultureImg from "../../assets/careers-img/OurCulture.png";
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

        {/* Image with floating perk cards */}
        <Reveal amount={0.15}>
          <div className="relative overflow-hidden rounded-3xl">
            {/* Full-width image */}
            <img
              src={ourCultureImg}
              alt="Indexia Group culture and team"
              width={1200}
              height={800}
              loading="lazy"
              decoding="async"
              className="aspect-[16/9] w-full object-cover sm:aspect-[21/9]"
            />
            {/* Gradient overlays for card readability */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-linear-to-br from-black/40 via-transparent to-black/40" />
            <span aria-hidden="true" className="card-shine-lines" />

            {/* Floating perk cards — 4 corners */}
            {perks.map((perk, i) => {
              const labels = [
                t(perk.labelKey, "Growth Mindset"),
                t(perk.labelKey, "Team Collaboration"),
                t(perk.labelKey, "Innovation Driven"),
                t(perk.labelKey, "Skill Development"),
              ];
              const positions = [
                "top-4 left-4 sm:top-6 sm:left-8",
                "bottom-4 left-4 sm:bottom-6 sm:left-8",
                "top-4 right-4 sm:top-6 sm:right-8",
                "bottom-4 right-4 sm:bottom-6 sm:right-8",
              ];
              return (
                <div
                  key={i}
                  className={`absolute ${positions[i]} flex flex-col items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-4 py-4 text-center shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/20 hover:shadow-2xl sm:px-6 sm:py-5 sm:gap-3`}
                >
                  <span className="text-2xl sm:text-3xl drop-shadow-md">{perk.icon}</span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-white drop-shadow sm:text-xs">
                    {labels[i]}
                  </span>
                </div>
              );
            })}
          </div>
        </Reveal>

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
