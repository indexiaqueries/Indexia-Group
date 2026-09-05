import { useState } from "react";
import { useTranslation } from "react-i18next";
import Reveal from "./Reveal";
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
  { slug: "finance", tagDefault: "Multinational Fintech", nameDefault: "Indexia Finance", descKey: "aboutPage.radialFinanceDesc", Icon: Landmark },
  { slug: "finserve", tagDefault: "Lending Arm", nameDefault: "Indexia Finserve", descKey: "aboutPage.radialFinserveDesc", Icon: Coins },
  { slug: "overseas", tagDefault: "Global Export", nameDefault: "Indexia Overseas", descKey: "aboutPage.radialOverseasDesc", Icon: Globe },
  { slug: "agro-bio", tagDefault: "Organic Agriculture", nameDefault: "Indexia Agro Bio", descKey: "aboutPage.radialAgroDesc", Icon: Leaf },
  { slug: "securities", tagDefault: "Armed Protection", nameDefault: "Indexia Securities", descKey: "aboutPage.radialSecuritiesDesc", Icon: Shield },
  { slug: "warehouse", tagDefault: "Strategic Land", nameDefault: "Indexia Warehouse", descKey: "aboutPage.radialWarehouseDesc", Icon: Warehouse },
  { slug: "advertising", tagDefault: "Highway Advertising", nameDefault: "Indexia Advertising", descKey: "aboutPage.radialAdvertisingDesc", Icon: Megaphone },
  { slug: "foundation", tagDefault: "Social Impact", nameDefault: "Indexia Foundation", descKey: "aboutPage.radialFoundationDesc", Icon: Heart },
] as const;

// Shared constants for desktop layout. The SVG uses the SAME coordinate space
// as the CSS percentage positioning below (container is 1000 × 750, 4:3), so
// connector lines reach the card centers exactly instead of stopping short.
const CARD_W = 190;
const CARD_H = 160;
const HUB_SIZE = 200;
const SVG_W = 1000;
const SVG_H = 750;
const CX = SVG_W / 2;
const CY = SVG_H / 2;
const HUB_R = HUB_SIZE / 2; // hub edge, 100px from center
const CARD_RX = 400; // 40% of container width  — card center x
const CARD_RY = 300; // 40% of container height — card center y
const RADIUS_PCT = 40;

export default function RadialCompanies() {
  const { t } = useTranslation();
  const tr = (slug: string, key: string, fallback: string) =>
    t(`pageContent.companies.${slug}.${key}`, { defaultValue: fallback });

  return (
    <>
      {/* Desktop: radial layout */}
      <div className="relative mx-auto hidden lg:block radial-hovers" style={{ width: "100%", maxWidth: 1000, aspectRatio: "4 / 3" }}>
        <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true" viewBox={`0 0 ${SVG_W} ${SVG_H}`} preserveAspectRatio="xMidYMid meet">
          <defs>
            <marker id="radial-arrow" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(38,174,144,0.45)" />
            </marker>
          </defs>
          {COMPANIES.map((c, i) => {
            const angle = (i * 45 - 90) * (Math.PI / 180);
            return (
              <line
                key={c.slug}
                x1={CX + Math.cos(angle) * HUB_R}
                y1={CY + Math.sin(angle) * HUB_R}
                x2={CX + Math.cos(angle) * CARD_RX}
                y2={CY + Math.sin(angle) * CARD_RY}
                stroke="rgba(38,174,144,0.45)"
                strokeWidth="3"
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

      {/* Mobile/tablet: readable register cards */}
      <div className="lg:hidden">
        <div className="mx-auto mb-4 flex max-w-md items-center gap-3 rounded-xl border border-(--color-teal)/15 bg-white p-3 shadow-[0_16px_40px_rgba(15,23,42,0.08)] sm:mb-5 sm:p-4">
          <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-(--color-yellow)/50 sm:h-16 sm:w-16">
            <img src={aboutCompanyImages.group} alt="Indexia Group" loading="lazy" decoding="async" className="h-full w-full object-cover" />
          </div>
          <div className="min-w-0">
            <span className="font-ledger text-[10px] font-bold uppercase tracking-[0.18em] text-(--color-teal)">{t("aboutPage.hubGroupLabel")}</span>
            <h3 className="font-display text-base font-bold leading-tight text-(--color-ink)">Indexia Group</h3>
            <p className="mt-1 text-xs leading-5 text-(--color-muted) sm:text-[13px]">
              {t("aboutPage.hubDescription")}
            </p>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
          {COMPANIES.map((c, index) => (
            <Reveal key={c.slug} delay={index * 0.06} amount={0.12}>
              <MobileCard company={c} index={index} tr={tr} />
            </Reveal>
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
  const { t } = useTranslation();
  const [hovered, setHovered] = useState(false);
  const name = tr(company.slug, "name", company.nameDefault);
  const desc = t(company.descKey);

  const angle = (index * 45 - 90) * (Math.PI / 180);
  const leftPct = 50 + Math.cos(angle) * RADIUS_PCT;
  const topPct = 50 + Math.sin(angle) * RADIUS_PCT;

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
            {desc}
          </p>
        </div>
      </div>
    </div>
  );
}

function MobileCard({
  company,
  index,
  tr,
}: {
  company: (typeof COMPANIES)[number];
  index: number;
  tr: (slug: string, key: string, fallback: string) => string;
}) {
  const { t } = useTranslation();
  const name = tr(company.slug, "name", company.nameDefault);
  const tag = tr(company.slug, "tag", company.tagDefault);
  const desc = t(company.descKey);
  const Icon = company.Icon;

  return (
    <article
      className="group overflow-hidden rounded-xl border border-(--color-line)/80 bg-white shadow-[0_14px_34px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:border-(--color-teal)/35 hover:shadow-[0_18px_44px_rgba(15,23,42,0.12)]"
      aria-label={name}
    >
      <div className="relative h-32 shrink-0 overflow-hidden bg-(--color-mist) sm:h-28">
        <img
          src={aboutCompanyImages[company.slug]}
          alt={name}
          className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/45 via-black/5 to-transparent" />
      </div>
      <div className="flex min-w-0 flex-col p-3 sm:p-4">
        <div className="mb-2 grid grid-cols-[auto_1fr_auto] items-start gap-2">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-(--color-teal)/10 text-(--color-teal)">
            <Icon size={16} strokeWidth={2.25} aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="font-ledger text-[10px] font-bold uppercase tracking-[0.14em] text-(--color-teal) sm:text-[11px]">
              {tag}
            </p>
            <h3 className="font-display text-[15px] font-bold leading-snug text-(--color-ink) sm:text-base">
              {name}
            </h3>
          </div>
          <span className="rounded-full bg-(--color-mist) px-2 py-1 font-ledger text-[10px] font-bold leading-none text-(--color-muted)">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <p className="mt-auto text-xs leading-5 text-(--color-muted) sm:text-[13px] sm:leading-6">
          {desc}
        </p>
      </div>
    </article>
  );
}
