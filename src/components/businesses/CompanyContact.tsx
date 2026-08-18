import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import Eyebrow from "../common/Eyebrow";
import Reveal from "../common/Reveal";
import { accentInk } from "../../lib/color";

export type ContactLine = { text: string; href?: string };

export type CompanyContactProps = {
  /** Company hex color for accents. */
  color: string;
  eyebrow: string;
  title: string;
  rows: {
    icon: LucideIcon;
    label: string;
    lines: ContactLine[];
  }[];
  /** Optional extra action rendered under the title (e.g. brochure link). */
  extra?: ReactNode;
};

const CompanyContact = ({ color, eyebrow, title, rows, extra }: CompanyContactProps) => {
  const linkClass =
    "inline-flex items-center gap-1 text-[13.5px] font-semibold leading-6 text-(--color-ink-deep) underline decoration-slate-300 underline-offset-4 transition-colors duration-200 hover:text-(--color-teal) hover:decoration-(--color-teal)";

  return (
    <section className="bg-white py-20 lg:py-24">
      <div className="container">
        <Reveal className="mx-auto mb-12 max-w-2xl text-center">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="font-display mt-3 text-[clamp(26px,3.6vw,42px)] font-bold leading-[1.08] text-(--color-ink)">
            {title}
          </h2>
          {extra}
        </Reveal>

        <div className="mx-auto grid max-w-4xl gap-5 md:grid-cols-3">
          {rows.map(({ icon: Icon, label, lines }) => (
            <Reveal key={label} className="h-full" amount={0.1}>
              <div className="flex h-full flex-col items-center rounded-2xl border border-slate-100 bg-(--color-soft) p-6 text-center shadow-sm">
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-full"
                  style={{ background: `${color}1a`, color: accentInk(color) }}
                >
                  <Icon size={22} strokeWidth={1.8} />
                </span>
                <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">{label}</p>
                <div className="mt-2 space-y-1">
                  {lines.map((line) => (
                    <p key={line.text}>
                      {line.href ? (
                        <a href={line.href} className={linkClass}>
                          {line.text}
                        </a>
                      ) : (
                        <span className={linkClass}>{line.text}</span>
                      )}
                    </p>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompanyContact;
