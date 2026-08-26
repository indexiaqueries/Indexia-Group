import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Landmark,
  Coins,
  Globe,
  Leaf,
  Shield,
  Warehouse,
  Megaphone,
  Heart,
} from "lucide-react";
import aboutFinance from "../../assets/about-img/Our-Companies/finance.png";
import aboutFinserve from "../../assets/about-img/Our-Companies/finserve.png";
import aboutOverseas from "../../assets/about-img/Our-Companies/overseas.png";
import aboutAgro from "../../assets/about-img/Our-Companies/agro.png";
import aboutSecurities from "../../assets/about-img/Our-Companies/securities.png";
import aboutWarehouse from "../../assets/about-img/Our-Companies/warehouse.png";
import aboutAdvertising from "../../assets/about-img/Our-Companies/advertising.png";
import aboutFoundation from "../../assets/about-img/Our-Companies/foundation.png";
import aboutGroup from "../../assets/about-img/Our-Companies/group.png";

const aboutCompanyImages: Record<string, string> = {
  finance: aboutFinance,
  finserve: aboutFinserve,
  overseas: aboutOverseas,
  "agro-bio": aboutAgro,
  securities: aboutSecurities,
  warehouse: aboutWarehouse,
  advertising: aboutAdvertising,
  foundation: aboutFoundation,
  group: aboutGroup,
};

const COMPANIES = [
  { slug: "finance", tagDefault: "Multinational Fintech", nameDefault: "Indexia Finance", desc: "Multinational fintech platform delivering financial services globally with 43+ bank partnerships", Icon: Landmark },
  { slug: "finserve", tagDefault: "Lending Arm", nameDefault: "Indexia Finserve", desc: "Investment and finance arm specializing in lending and wealth management", Icon: Coins },
  { slug: "overseas", tagDefault: "Global Export", nameDefault: "Indexia Overseas", desc: "Connecting Indian agriculture with global edible export markets across continents", Icon: Globe },
  { slug: "agro-bio", tagDefault: "Organic Agriculture", nameDefault: "Indexia Agro Bio", desc: "Eco-friendly bio-fertilizers restoring soil health and boosting crop productivity", Icon: Leaf },
  { slug: "securities", tagDefault: "Armed Protection", nameDefault: "Indexia Securities", desc: "Professional armed protection services safeguarding people and assets", Icon: Shield },
  { slug: "warehouse", tagDefault: "Strategic Land", nameDefault: "Indexia Warehouse", desc: "21-acre strategic land leasing hub with access to 8 expressways and 8 states", Icon: Warehouse },
  { slug: "advertising", tagDefault: "Highway Advertising", nameDefault: "Indexia Advertising", desc: "Highway billboard advertising reaching millions of commuters daily", Icon: Megaphone },
  { slug: "foundation", tagDefault: "Social Impact", nameDefault: "Indexia Foundation", desc: "Nurturing Indian athletes from grassroots to the Olympic Games", Icon: Heart },
] as const;

export default function RadialCompanies() {
  const { t } = useTranslation();
  const tr = (slug: string, key: string, fallback: string) =>
    t(`pageContent.companies.${slug}.${key}`, { defaultValue: fallback });

  return (
    <>
      {/* Desktop: radial layout using CSS percentage positioning */}
      <div className="relative mx-auto hidden lg:block" style={{ width: "100%", maxWidth: 780, aspectRatio: "4 / 3" }}>
        {/* Spoke lines via SVG, positioned absolutely to fill the container */}
        <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true" viewBox="0 0 780 780" preserveAspectRatio="xMidYMid meet">
          {COMPANIES.map((c, i) => {
            const angle = (i * 45 - 90) * (Math.PI / 180);
            const cx = 390;
            const cy = 390;
            const hubR = 55;
            const cardR = 210;
            return (
              <line
                key={c.slug}
                x1={cx + Math.cos(angle) * hubR}
                y1={cy + Math.sin(angle) * hubR}
                x2={cx + Math.cos(angle) * cardR}
                y2={cy + Math.sin(angle) * cardR}
                stroke="rgba(200,200,200,0.5)"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
            );
          })}
        </svg>

        {/* Center hub, absolutely centered via percentage */}
        <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2" style={{ width: 96, height: 96 }}>
          <div className="relative h-full w-full overflow-hidden rounded-2xl border-2 border-(--color-yellow) shadow-lg ring-4 ring-white/20">
            <img src={aboutCompanyImages.group} alt="Indexia Group" className="h-full w-full object-cover" loading="eager" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
            <span className="absolute bottom-2 inset-x-0 text-center font-display text-[9px] font-bold text-white drop-shadow-lg">
              Indexia Group
            </span>
          </div>
        </div>

        {/* Company cards, positioned via percentage around center */}
        {COMPANIES.map((c, i) => (
          <RadialCard key={c.slug} company={c} index={i} tr={tr} />
        ))}
      </div>
  

      {/* Mobile: 2-col grid with hub banner */}
      <div className="lg:hidden">
        <div className="mx-auto mb-4 flex max-w-xs items-center gap-3 rounded-xl border-2 border-(--color-yellow)/30 bg-white/5 p-3 shadow-lg backdrop-blur-sm">
          <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl border-2 border-(--color-yellow)/30">
            <img src={aboutCompanyImages.group} alt="Indexia Group" className="h-full w-full object-cover" />
          </div>
          <div>
            <span className="font-ledger text-[9px] font-bold uppercase tracking-[0.18em] text-(--color-yellow)">Hub</span>
            <h3 className="font-display text-sm font-bold text-white">Indexia Group</h3>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {COMPANIES.map((c) => (
            <MobileCard key={c.slug} company={c} tr={tr} />
          ))}
        </div>
      </div>
    </>
  );
}

function RadialCard({
  company,
  index,
  tr,
}: {
  company: (typeof COMPANIES)[number];
  index: number;
  tr: (slug: string, key: string, fallback: string) => string;
}) {
  const [hovered, setHovered] = useState(false);
  const name = tr(company.slug, "name", company.nameDefault);
  const tag = tr(company.slug, "tag", company.tagDefault);
  const { Icon } = company;

  // Position each card at equal 45° intervals, starting from top (-90°)
  const angle = (index * 45 - 90) * (Math.PI / 180);
  // Top (0) and bottom (4) stay closer, side cards move further out
  const radiusPct = (index === 0 || index === 4) ? 30 : 36;
  const leftPct = 50 + Math.cos(angle) * radiusPct;
  const topPct = 50 + Math.sin(angle) * radiusPct;

  return (
    <div
      className="absolute z-10"
      style={{
        left: `${leftPct}%`,
        top: `${topPct}%`,
        width: hovered ? 180 : 150,
        aspectRatio: "5 / 4",
        transform: "translate(-50%, -50%)",
        transition: "width 0.3s, height 0.3s",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={`group relative h-full w-full cursor-pointer overflow-hidden rounded-2xl border-2 shadow-lg transition-all duration-300 ${
          hovered
            ? "border-(--color-yellow) shadow-[0_0_24px_rgba(219,183,63,0.35)] z-30"
            : "border-white/30 hover:border-(--color-yellow)/50"
        }`}
      >
        <img
          src={aboutCompanyImages[company.slug]}
          alt={name}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className={`absolute inset-0 bg-gradient-to-t transition-all duration-300 ${
          hovered ? "from-black/85 via-black/60 to-black/40" : "from-black/75 via-black/30 to-black/20"
        }`} />
        <div className="absolute left-2.5 top-2.5 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm">
          <Icon size={14} strokeWidth={2.5} className="text-white" />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 py-3 text-center">
          <span className="inline-block rounded-full bg-white/15 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide text-(--color-yellow) backdrop-blur-sm">
            {tag}
          </span>
          <p className={`mt-2 text-white/90 transition-all duration-300 ${
            hovered ? "text-[11px] leading-5 line-clamp-none opacity-100" : "text-[10px] leading-4 line-clamp-2 opacity-0"
          }`}>
            {company.desc}
          </p>
        </div>
      </div>
    </div>
  );
}

function MobileCard({
  company,
  tr,
}: {
  company: (typeof COMPANIES)[number];
  tr: (slug: string, key: string, fallback: string) => string;
}) {
  const [hovered, setHovered] = useState(false);
  const name = tr(company.slug, "name", company.nameDefault);
  const tag = tr(company.slug, "tag", company.tagDefault);
  const { Icon } = company;

  return (
    <div
      className="group relative overflow-hidden rounded-xl border border-white/10 shadow-md cursor-pointer" style={{ aspectRatio: "5 / 4" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img src={aboutCompanyImages[company.slug]} alt={name} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
      <div className={`absolute inset-0 bg-gradient-to-t transition-all duration-300 ${
        hovered ? "from-black/80 via-black/50 to-black/40" : "from-black/70 via-black/30 to-black/20"
      }`} />
      <div className="absolute left-2 top-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm">
        <Icon size={13} strokeWidth={2.5} className="text-white" />
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center px-3 py-2 text-center transition-all duration-300">
        <span className="inline-block rounded-full bg-white/15 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide text-(--color-yellow) backdrop-blur-sm">{tag}</span>
        <p className={`mt-1.5 text-[11px] leading-5 text-white/90 transition-all duration-300 ${
          hovered ? "line-clamp-none opacity-100" : "line-clamp-2 opacity-0"
        }`}>{company.desc}</p>
      </div>
    </div>
  );
}
