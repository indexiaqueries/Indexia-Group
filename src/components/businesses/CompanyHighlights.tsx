import { useTranslation } from "react-i18next";
import { Globe, HandCoins, Layers, Leaf, MapPin, Plane, Route, ShieldCheck, Ship, Sparkles, Trophy, Users, Zap } from "lucide-react";
import Eyebrow from "../common/Eyebrow";
import Reveal from "../common/Reveal";

type CompanyHighlightsProps = {
  slug: string;
  highlights: string[];
};

type IconType = React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;

const highlightIcons: Record<string, IconType[]> = {
  warehouse: [MapPin, Route, Ship, Plane],
  advertising: [Zap, Globe, Trophy, Users],
  finance: [Globe, Layers, HandCoins],
  foundation: [Trophy, Sparkles, ShieldCheck, Users],
  securities: [ShieldCheck, Users, Sparkles, Trophy],
  agro: [Sparkles, Leaf, Ship, Globe],
  overseas: [Globe, Ship, Users, Sparkles],
  group: [Sparkles, Globe, Layers, Users],
};

const CompanyHighlights = ({ slug, highlights }: CompanyHighlightsProps) => {
  const { t } = useTranslation();
  const tr = (path: string, fallback: string) => t(`pageContent.companies.${slug}.${path}`, { defaultValue: fallback });
  const icons = highlightIcons[slug] ?? highlightIcons.group;

  // Split each highlight into a short bold heading + supporting text at the
  // first comma/colon, falling back to a single line when there's no split.
  const splitHighlight = (text: string): { title: string; body: string } => {
    const m = text.match(/^(.{3,42}?)[:,]\s+(.+)$/);
    if (m) return { title: m[1], body: m[2] };
    return { title: "", body: text };
  };

  return (
    <section className="relative overflow-hidden bg-(--color-soft) py-4 sm:py-5 lg:py-6">
      {/* Ambient glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-e-40 top-0 h-125 w-125 rounded-full opacity-15 blur-[100px]"
        style={{ background: "var(--color-gray)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-s-32 bottom-20 h-80 w-80 rounded-full opacity-10 blur-[80px]"
        style={{ background: "var(--color-gray)" }}
      />

      <div className="container">
        {/* Header */}
        <Reveal className="mx-auto mb-6 sm:mb-8 max-w-2xl text-center">
          <Eyebrow>{t("companyDetail.keyEntries")}</Eyebrow>
        </Reveal>

        {/* Numbered ledger cards: yellow index tab, icon chip, heading + support text */}
        <div className={`grid gap-4 sm:grid-cols-2 ${highlights.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}>
          {highlights.map((highlight, idx) => {
            const Icon = icons[idx % icons.length];
            const { title, body } = splitHighlight(tr(`highlights.${idx}`, highlight));
            return (
              <Reveal key={highlight} delay={(idx % 4) * 0.07} amount={0.15} className="h-full">
                <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-(--color-line)/60 bg-white transition-all duration-400 hover:-translate-y-1.5 hover:border-transparent hover:shadow-[0_18px_44px_rgba(2,16,26,0.18)]">
                  {/* Yellow index tab */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-e-0 top-0 z-2 flex h-9 w-9 items-center justify-center rounded-bl-2xl font-ledger text-[13px] font-bold text-(--color-ink-deep) transition-all duration-300 group-hover:rounded-bl-none"
                    style={{ background: "var(--color-yellow)" }}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>

                  {/* Hover gradient wash */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-linear-to-br from-(--color-navy-deep)/0 to-(--color-navy-deep)/0 opacity-0 transition-all duration-500 group-hover:from-(--color-navy-deep)/95 group-hover:to-(--color-navy-deep)/85 group-hover:opacity-100"
                  />

                  <div className="relative flex flex-1 flex-col p-5 sm:p-6">
                    {/* Icon chip */}
                    <span
                      className="flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-400 group-hover:bg-white/10 group-hover:text-white"
                      style={{
                        background: "linear-gradient(135deg, rgba(6,106,156,0.14), rgba(6,106,156,0.05))",
                        color: "var(--color-blue)",
                        boxShadow: "inset 0 0 0 1px rgba(6,106,156,0.18)",
                      }}
                    >
                      <Icon size={22} strokeWidth={1.9} />
                    </span>

                    <p className="mt-4 text-[15px] font-bold leading-snug text-(--color-ink-deep) transition-colors duration-400 group-hover:text-white">
                      {title || body}
                    </p>
                    {title && body && (
                      <p className="mt-1.5 flex-1 text-[13px] leading-6 text-(--color-muted) transition-colors duration-400 group-hover:text-white/75">
                        {body}
                      </p>
                    )}
                  </div>

                  {/* Bottom accent bar */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 transition-transform duration-400 group-hover:scale-x-100"
                    style={{ background: "linear-gradient(90deg, var(--color-yellow), rgba(242,242,49,0.33))" }}
                  />
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CompanyHighlights;
