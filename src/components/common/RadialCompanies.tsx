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

// Shared constants for desktop layout
const CARD_W = 190;
const CARD_H = 160;
const HUB_SIZE = 200;
const SVG_SIZE = 1400;
const CX = SVG_SIZE / 2;
const CY = SVG_SIZE / 2;
const HUB_R = 60;
// Line lengths: top/bottom shorter, sides/diagonals longer
const CARD_R: Record<number, number> = { 0: 400, 1: 480, 2: 560, 3: 480, 4: 400, 5: 480, 6: 560, 7: 480 };
const CARD_R_DEFAULT = 380;
// Percentage radius for CSS positioning
const RADIUS_PCT: Record<number, number> = { 0: 40, 1: 40, 2: 40, 3: 40, 4: 40, 5: 40, 6: 40, 7: 40 };
const RADIUS_PCT_DEFAULT = 40;

export default function RadialCompanies() {
  const { t } = useTranslation();
  const tr = (slug: string, key: string, fallback: string) =>
    t(`pageContent.companies.${slug}.${key}`, { defaultValue: fallback });

  return (
    <>
      {/* Desktop: radial layout */}
      <div className="relative mx-auto hidden lg:block radial-hovers" style={{ width: "100%", maxWidth: 1000, aspectRatio: "4 / 3" }}>
        <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true" viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`} preserveAspectRatio="xMidYMid meet">
          <defs>
            <marker id="radial-arrow" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="rgb(1,1,1)" />
            </marker>
          </defs>
          {COMPANIES.map((c, i) => {
            const angle = (i * 45 - 90) * (Math.PI / 180);
            const cardR = CARD_R[i] ?? CARD_R_DEFAULT;
            return (
              <line
                key={c.slug}
                x1={CX + Math.cos(angle) * HUB_R}
                y1={CY + Math.sin(angle) * HUB_R}
                x2={CX + Math.cos(angle) * cardR}
                y2={CY + Math.sin(angle) * cardR}
                stroke="rgb(1,1,1)"
                strokeWidth="2"
                strokeDasharray="2 2"
                markerEnd="url(#radial-arrow)"
              />
            );
          })}
        </svg>

        {/* Center hub */}
        <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2" style={{ width: HUB_SIZE, height: HUB_SIZE }}>
          <div className="relative h-full w-full overflow-hidden rounded-2xl border-2 border-(--color-yellow) shadow-lg ring-4 ring-white/20">
            <img src={aboutCompanyImages.group} alt="Indexia Group" className="h-full w-full object-cover" loading="eager" />
          </div>
        </div>

        {COMPANIES.map((c, i) => (
          <RadialCard key={c.slug} company={c} index={i} tr={tr} />
        ))}
      </div>

      {/* Mobile: 2-col grid */}
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

  const angle = (index * 45 - 90) * (Math.PI / 180);
  const radiusPct = RADIUS_PCT[index] ?? RADIUS_PCT_DEFAULT;
  const leftPct = 50 + Math.cos(angle) * radiusPct;
  const topPct = 50 + Math.sin(angle) * radiusPct;

  return (
    <div
      className="absolute z-10"
      style={{
        left: `${leftPct}%`,
        top: `${topPct}%`,
        width: CARD_W,
        height: CARD_H,
        transform: "translate(-50%, -50%)",
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
        <div className={`absolute inset-0 bg-linear-to-t transition-all duration-300 ${
          hovered ? "from-black/85 via-black/60 to-black/40" : "from-black/75 via-black/30 to-black/20"
        }`} />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 py-3 text-center">
          <p className={`text-white/90 transition-all duration-300 ${
            hovered ? "text-[11px] leading-5 line-clamp-none opacity-100" : "opacity-0"
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

  return (
    <div
      className="group relative overflow-hidden rounded-xl border border-white/10 shadow-md cursor-pointer" style={{ aspectRatio: "1 / 1" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img src={aboutCompanyImages[company.slug]} alt={name} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
      <div className={`absolute inset-0 bg-linear-to-t transition-all duration-300 ${
        hovered ? "from-black/80 via-black/50 to-black/40" : "from-black/70 via-black/30 to-black/20"
      }`} />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-3 py-2 text-center transition-all duration-300">
        <p className={`text-[11px] leading-5 text-white/90 transition-all duration-300 ${
          hovered ? "line-clamp-none opacity-100" : "opacity-0"
        }`}>{company.desc}</p>
      </div>
    </div>
  );
}
