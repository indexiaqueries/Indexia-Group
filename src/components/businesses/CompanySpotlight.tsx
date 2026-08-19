import { useTranslation } from "react-i18next";
import Eyebrow from "../common/Eyebrow";
import Reveal from "../common/Reveal";
import { accentInk } from "../../lib/color";
import { getCompanyPageImage } from "../../data/companyPageImages";
import { SPOTLIGHT_DATA } from "../../data/spotlight";
import type { Company } from "../../data/companies";

type CompanySpotlightProps = {
  company: Company;
};

const CompanySpotlight = ({ company }: CompanySpotlightProps) => {
  useTranslation();
  const data = SPOTLIGHT_DATA[company.slug];
  if (!data) return null;

  const headingLines = data.heading.split("\n");

  return (
    <section className="relative overflow-hidden bg-white py-20 lg:py-28">
      {/* Ambient glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-s-32 top-10 h-96 w-96 rounded-full opacity-15 blur-[100px] float-subtle"
        style={{ background: company.color }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-e-24 bottom-10 h-72 w-72 rounded-full opacity-10 blur-[80px]"
        style={{ background: company.color }}
      />

      <div className="container grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/* Content side */}
        <Reveal amount={0.2}>
          <Eyebrow color={accentInk(company.color)} className="mb-3">
            {data.eyebrow}
          </Eyebrow>
          <h2 className="font-display text-[clamp(26px,3.6vw,42px)] font-bold leading-[1.08] text-(--color-ink)">
            {headingLines.map((line, i) => (
              <span key={i} className="block">
                {i === headingLines.length - 1 ? (
                  <span style={{ color: company.color }}>{line}</span>
                ) : (
                  line
                )}
              </span>
            ))}
          </h2>
          <p className="mt-5 max-w-xl text-[15px] leading-8 text-(--color-muted)">
            {data.description}
          </p>

          {/* Stats grid */}
          <div className="mt-8 grid grid-cols-3 gap-3">
            {data.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-slate-100 bg-white p-4 text-center shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
              >
                <p className="font-display text-2xl font-bold" style={{ color: accentInk(company.color) }}>
                  {stat.value}
                </p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.14em] text-(--color-muted)">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Bullet points */}
          <ul className="mt-8 space-y-3">
            {data.bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-3 text-[14px] leading-7 text-(--color-ink-soft)">
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: company.color }}
                />
                {bullet}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Image side */}
        <Reveal amount={0.2} className="relative">
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-3 rounded-[30px]"
              style={{ background: `linear-gradient(135deg, ${company.color}44, transparent 55%, ${company.color}22)` }}
            />
            <div className="group relative overflow-hidden rounded-3xl shadow-2xl ring-1 ring-black/10">
              <img
                src={getCompanyPageImage(company.slug)}
                alt={`${company.name} — ${company.tag}`}
                width={1536}
                height={1024}
                loading="lazy"
                decoding="async"
                className="aspect-4/3 w-full object-cover transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-110 group-hover:-rotate-2 img-reveal"
              />
              <span aria-hidden="true" className="card-shine-lines" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default CompanySpotlight;
