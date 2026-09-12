import { useTranslation } from "react-i18next";
import Eyebrow from "../common/Eyebrow";
import AnimatedCounter from "../common/AnimatedCounter";
import Reveal from "../common/Reveal";
import { getCompanyPageImage } from "../../data/companyPageImages";
import { SPOTLIGHT_DATA } from "../../data/spotlight";
import type { Company } from "../../data/companies";

type CompanySpotlightProps = {
  company: Company;
};

const CompanySpotlight = ({ company }: CompanySpotlightProps) => {
  const { t } = useTranslation();
  const data = SPOTLIGHT_DATA[company.slug];
  if (!data) return null;

  const eyebrow = t(data.eyebrowKey);
  const heading = t(data.headingKey);
  const description = t(data.descriptionKey);
  const headingLines = heading.split("\n");

  return (
    <section className="relative overflow-hidden bg-white py-4 sm:py-5 lg:py-6">
      {/* Ambient glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-s-32 top-10 h-96 w-96 rounded-full opacity-15 blur-[100px] float-subtle"
        style={{ background: "var(--color-gray)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-e-24 bottom-10 h-72 w-72 rounded-full opacity-10 blur-[80px]"
        style={{ background: "var(--color-gray)" }}
      />

      <div className="container grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/* Content side */}
        <Reveal amount={0.2}>
          <Eyebrow className="mb-3">
            {eyebrow}
          </Eyebrow>
          <h2 className="font-display text-[clamp(26px,3.6vw,42px)] font-bold leading-[1.08] text-(--color-blue)">
            {headingLines.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </h2>
          <p className="mt-4 sm:mt-5 max-w-xl text-sm sm:text-[15px] leading-7 sm:leading-8 text-(--color-muted)">
            {description}
          </p>          {/* Stats grid */}
          <div className="mt-6 sm:mt-8 grid grid-cols-3 gap-2 sm:gap-3">
            {data.stats.map((stat, i) => (
              <div key={i} className="rounded-2xl border border-(--color-line) bg-white p-3 sm:p-4 text-center shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                <AnimatedCounter
                  value={t(stat.valueKey)}
                  label={t(stat.labelKey)}
                  color="var(--color-blue)"
                  numberClassName="font-ledger text-xl font-bold tabular-nums sm:text-2xl"
                  labelClassName="mt-1 text-[11px] font-bold uppercase tracking-[0.14em] text-(--color-muted)"
                />
              </div>
            ))}
          </div>

          {/* Bullet points */}
          <ul className="mt-6 sm:mt-8 space-y-2 sm:space-y-3">
            {data.bulletsKeys.map((bulletKey) => (
              <li key={bulletKey} className="flex items-start gap-2.5 sm:gap-3 text-sm leading-6 sm:leading-7 text-(--color-ink-soft)">
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: "var(--color-yellow)" }}
                />
                {t(bulletKey)}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Image side */}
        <Reveal amount={0.2} className="relative">
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-3 rounded-3xl"
              style={{ background: "linear-gradient(135deg, rgba(6,106,156,0.27), transparent 55%, rgba(123,123,123,0.13))" }}
            />
            <div className="group relative overflow-hidden rounded-3xl shadow-2xl ring-1 ring-black/10">
              <img
                src={getCompanyPageImage(company.slug)}
                alt={`${company.name}, ${company.tag}`}
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
