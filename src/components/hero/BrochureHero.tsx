import { useTranslation } from "react-i18next";
import logo from "../../assets/logo/IndexiaGroup_Logo.webp";

type BrochureHeroProps = {
  name: string;
  tag: string;
  founded: number | string;
  band: string;
  locationLabel: string;
};

/** Header band of the printable brochure sheet — title, tags and location. */
const BrochureHero = ({ name, tag, founded, band, locationLabel }: BrochureHeroProps) => {
  const { t } = useTranslation();

  return (
    <header className="px-5 py-8 text-white sm:px-8 sm:py-10" style={{ background: band }}>
      <div className="flex items-center gap-3">
        <img
          src={logo}
          alt={t("common.logoAlt")}
          width={44}
          height={44}
          className="h-11 w-11 rounded-full object-contain"
          style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.3))" }}
        />
        <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/80">Indexia Group</p>
      </div>
      <h1 className="mt-6 text-[clamp(24px,4vw,44px)] font-extrabold leading-tight">{name}</h1>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <span className="rounded-full border border-white/30 bg-black/20 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-sm">
          Est. {founded}
        </span>
        <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-white/90">{tag}</p>
      </div>
      <p className="mt-1.5 text-[15px] font-medium text-white/80">{locationLabel}</p>
    </header>
  );
};

export default BrochureHero;
