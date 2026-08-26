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
import { companyImages } from "../../data/companyImages";

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

const CARD_SIZE = 80;
const RADIUS = 180;

export default function RadialCompanies() {
  const { t } = useTranslation();
  const tr = (slug: string, key: string, fallback: string) =>
    t(`pageContent.companies.${slug}.${key}`, { defaultValue: fallback });

  return (
    <>
      {/* Desktop: radial layout */}
      <div className="relative mx-auto hidden lg:block" style={{ width: RADIUS * 2 + CARD_SIZE + 40, height: RADIUS * 2 + CARD_SIZE + 40 }}>
        {/* Spoke lines */}
        <svg
          className="pointer-events-none absolute inset-0"
          width="100%"
          height="100%"
          aria-hidden="true"
        >
          {COMPANIES.map((c, i) => {
            const angle = (i * 45 - 90) * (Math.PI / 180);
            const cx = RADIUS * 2 + CARD_SIZE + 40;
            const cy = RADIUS * 2 + CARD_SIZE + 40;
            const hubR = 44;
            const cardCenter = RADIUS;
            const x1 = cx + Math.cos(angle) * hubR;
            const y1 = cy + Math.sin(angle) * hubR;
            const x2 = cx + Math.cos(angle) * cardCenter;
            const y2 = cy + Math.sin(angle) * cardCenter;
            return (
              <line
                key={c.slug}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="rgba(148,163,184,0.3)"
                strokeWidth="1"
                strokeDasharray="4 4"
                className="spoke-line transition-all duration-300"
              />
            );
          })}
        </svg>

        {/* Center hub */}
        <div
          className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
          style={{ width: 88, height: 88 }}
        >
          <div className="relative h-full w-full overflow-hidden rounded-2xl border-2 border-(--color-yellow) shadow-lg ring-4 ring-white/20">
            <img
              src={companyImages.group}
              alt="Indexia Group"
              className="h-full w-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
            <span className="absolute bottom-2 inset-x-0 text-center font-display text-[9px] font-bold text-white drop-shadow-lg">
              Indexia Group
            </span>
          </div>
        </div>

        {/* Company cards */}
        {COMPANIES.map((c, i) => (
          <RadialCard key={c.slug} company={c} index={i} tr={tr} />
        ))}
      </div>

      {/* Mobile: 2-col grid with hub banner */}
      <div className="lg:hidden">
        {/* Hub banner */}
        <div className="mx-auto mb-4 flex max-w-xs items-center gap-3 rounded-xl border-2 border-(--color-yellow)/30 bg-white/5 p-3 shadow-lg backdrop-blur-sm">
          <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl border-2 border-(--color-yellow)/30">
            <img src={companyImages.group} alt="Indexia Group" className="h-full w-full object-cover" />
          </div>
          <div>
            <span className="font-ledger text-[9px] font-bold uppercase tracking-[0.18em] text-(--color-yellow)">Hub</span>
            <h3 className="font-display text-sm font-bold text-white">Indexia Group</h3>
          </div>
        </div>
        {/* Company grid */}
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
  const angle = (index * 45 - 90) * (Math.PI / 180);

  const centerOffset = RADIUS * 2 + CARD_SIZE + 40;
  const x = centerOffset + Math.cos(angle) * RADIUS - CARD_SIZE / 2;
  const y = centerOffset + Math.sin(angle) * RADIUS - CARD_SIZE / 2;

  return (
    <div
      className="absolute z-10"
      style={{ left: x, top: y, width: CARD_SIZE, height: CARD_SIZE }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={`group relative h-full w-full cursor-pointer overflow-hidden rounded-xl border-2 shadow-lg transition-all duration-300 ${
          hovered
            ? "border-(--color-yellow) shadow-[0_0_20px_rgba(219,183,63,0.3)] scale-110 z-30"
            : "border-white/30 hover:border-(--color-yellow)/50"
        }`}
      >
        {/* Background image */}
        <img
          src={companyImages[company.slug]}
          alt={name}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />

        {/* Dark overlay (always visible) */}
        <div className={`absolute inset-0 bg-gradient-to-t transition-all duration-300 ${
          hovered
            ? "from-black/80 via-black/50 to-black/40"
            : "from-black/70 via-black/30 to-black/20"
        }`} />

        {/* Icon badge (top-left) */}
        <div className="absolute left-1.5 top-1.5 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm">
          <Icon size={11} strokeWidth={2.5} className="text-white" />
        </div>

        {/* Company name (visible by default, fades on hover) */}
        <div className={`absolute inset-x-0 bottom-0 flex flex-col items-center justify-end px-1 pb-2 pt-6 transition-all duration-300 ${
          hovered ? "opacity-0" : "opacity-100"
        }`}>
          <span className="font-display text-[9px] font-bold leading-tight text-white text-center line-clamp-2 drop-shadow-lg">
            {name}
          </span>
        </div>

        {/* Description overlay (hidden by default, appears on hover) */}
        <div className={`absolute inset-0 flex flex-col items-center justify-center px-2 text-center transition-all duration-300 ${
          hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
        }`}>
          <span className="inline-block rounded-full bg-white/15 px-1.5 py-0.5 text-[7px] font-bold uppercase tracking-wide text-(--color-yellow) backdrop-blur-sm">
            {tag}
          </span>
          <p className="mt-1 text-[8px] leading-3 text-white/85 line-clamp-4">
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
      className="group relative h-28 overflow-hidden rounded-xl border border-white/10 shadow-md cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={companyImages[company.slug]}
        alt={name}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
      />
      <div className={`absolute inset-0 bg-gradient-to-t transition-all duration-300 ${
        hovered
          ? "from-black/80 via-black/50 to-black/40"
          : "from-black/70 via-black/30 to-black/20"
      }`} />

      {/* Icon badge */}
      <div className="absolute left-2 top-2 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm">
        <Icon size={11} strokeWidth={2.5} className="text-white" />
      </div>

      {/* Name */}
      <div className={`absolute inset-x-0 bottom-0 flex flex-col items-center justify-end px-2 pb-2 pt-6 transition-all duration-300 ${
        hovered ? "opacity-0" : "opacity-100"
      }`}>
        <span className="font-display text-[10px] font-bold leading-tight text-white text-center line-clamp-2 drop-shadow-lg">
          {name}
        </span>
      </div>

      {/* Description on hover */}
      <div className={`absolute inset-0 flex flex-col items-center justify-center px-2.5 text-center transition-all duration-300 ${
        hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
      }`}>
        <span className="inline-block rounded-full bg-white/15 px-2 py-0.5 text-[8px] font-bold uppercase tracking-wide text-(--color-yellow) backdrop-blur-sm">
          {tag}
        </span>
        <p className="mt-1 text-[9px] leading-3.5 text-white/85 line-clamp-3">
          {company.desc}
        </p>
      </div>
    </div>
  );
}
