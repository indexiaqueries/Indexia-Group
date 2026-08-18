import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowDown, ArrowRight, Check, Clock, Layers, MapPin, Sparkles } from "lucide-react";
import { serviceIcons } from "./serviceIcons";
import Eyebrow from "../common/Eyebrow";
import Reveal from "../common/Reveal";
import EnquiryForm from "../contact/EnquiryForm";
import HeroBackdrop from "../banners/HeroBackdrop";
import { getCompanyImage } from "../../data/companyImages";
import { companyIcons } from "../../data/companyIcons";
import { companies, type Company } from "../../data/companies";
import { accentInk, contrastText } from "../../lib/color";
import { colors } from "../../lib/theme";
import UnipolePricing from "./UnipolePricing";
import WarehousePricing from "./WarehousePricing";
import WarehouseContact from "./WarehouseContact";
import AdvertisingContact from "./AdvertisingContact";
import type { PricingRow } from "./PricingTable";

type CompanyDetailProps = {
  company: Company;
  showBackLink?: boolean;
};

const CompanyDetail = ({ company: b, showBackLink = false }: CompanyDetailProps) => {
  const { t } = useTranslation();
  const [bookingMessage, setBookingMessage] = useState<string | undefined>(undefined);

  const tr = (path: string, fallback: string) => t(`pageContent.companies.${b.slug}.${path}`, { defaultValue: fallback });
  const tag = tr("tag", b.tag);
  const name = tr("name", b.name);
  const tagline = b.tagline ? tr("tagline", b.tagline) : undefined;
  const desc = tr("desc", b.desc);
  const overview = tr("overview", b.overview);
  const index = companies.findIndex((c) => c.name === b.name);
  const entryNo = String(index + 1).padStart(2, "0");
  const Icon = companyIcons[b.name] ?? Sparkles;

  const handleBook = (row: PricingRow) => {
    // Scroll the enquiry form into view first — a remount in the same tick cancels it.
    const target = document.getElementById("enquiry");
    if (target) {
      const y = target.getBoundingClientRect().top + window.scrollY - 96;
      window.scrollTo({ top: y, behavior: "auto" });
    }
    // Then update the booking message (remounts the form with the pre-filled text).
    const message =
      row.message ??
      (row.rate
        ? t("unipolePricing.bookMessage", { size: row.label, area: row.value, rate: row.rate })
        : t("warehousePricing.bookMessage", { size: row.label, area: row.value }));
    window.setTimeout(() => setBookingMessage(message), 50);
  };

  return (
    <>
      <HeroBackdrop
        image={getCompanyImage(b.slug)}
        radial={`radial-gradient(circle at 84% 16%, ${b.color}59, transparent 42%), radial-gradient(circle at 10% 90%, ${b.color}33, transparent 40%)`}
        containerClassName="relative mx-auto w-full max-w-7xl px-5 py-24 pt-32 sm:px-6 lg:px-8 lg:py-32"
      >
        <div className="fade-up">
          {showBackLink && (
            <Link
              to="/businesses"
              className="mb-8 inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.18em] text-white/70 transition-colors hover:text-(--color-yellow)"
            >
              <span aria-hidden="true">←</span> {t("companyDetail.backAll")}
            </Link>
          )}

          <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
            <Eyebrow color="var(--color-yellow)">{t("companyDetail.register", { no: entryNo })}</Eyebrow>
            <span
              className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] shadow-md"
              style={{ background: b.color, color: contrastText(b.color) }}
            >
              {tag}
            </span>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <span
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/25 bg-white/10 shadow-lg backdrop-blur-sm sm:h-14 sm:w-14"
              style={{ color: b.color === colors.gray ? "#ffffff" : b.color }}
            >
              <Icon size={24} strokeWidth={2.2} aria-hidden="true" />
            </span>
            <h1 className="font-display text-[clamp(30px,5vw,52px)] font-bold leading-[1.06] text-white">
              {name}
            </h1>
          </div>

          {(b.slug === "warehouse" || b.slug === "advertising") && (
            <p className="mt-3 inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.16em] text-white/75">
              <MapPin size={15} strokeWidth={2.2} aria-hidden="true" />
              {tr("location", b.slug === "warehouse" ? "Shamli, Uttar Pradesh" : "Delhi–Dehradun Highway, Shamli")}
            </p>
          )}

          {tagline && (
            <p className="mt-4 text-[17px] font-semibold italic text-(--color-yellow)">“{tagline}”</p>
          )}

          <p className="mt-5 max-w-2xl text-base leading-8 text-white/80">{desc}</p>

          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href="#enquiry-form"
              className="inline-flex items-center gap-2 rounded-full bg-(--color-yellow) px-7 py-3 text-sm font-bold text-(--color-yellow-ink) shadow-[0_4px_16px_rgba(242,242,49,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-(--color-yellow-bright)"
            >
              {t("companyDetail.eyebrow")}
              <ArrowRight size={16} strokeWidth={2.5} />
            </a>
            <a
              href="#company-services"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3 text-sm font-bold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20"
            >
              {t("companyDetail.exploreServices")}
              <ArrowDown size={16} strokeWidth={2.5} />
            </a>
          </div>
        </div>
      </HeroBackdrop>

      {/* Overview + image split */}
      <section className="relative overflow-hidden bg-white py-20 lg:py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -end-32 top-8 h-96 w-96 rounded-full opacity-20 blur-3xl"
          style={{ background: `radial-gradient(circle, ${b.color} 0%, transparent 65%)` }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -start-24 bottom-0 h-72 w-72 rounded-full opacity-10 blur-3xl"
          style={{ background: `radial-gradient(circle, ${b.color} 0%, transparent 65%)` }}
        />

        <div className="container grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal amount={0.2} className="relative">
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-3 rounded-[30px]"
                style={{ background: `linear-gradient(135deg, ${b.color}66, transparent 55%, ${b.color}33)` }}
              />
              <div className="relative overflow-hidden rounded-3xl shadow-2xl ring-1 ring-black/10">
                <img
                  src={getCompanyImage(b.slug)}
                  alt={`${name} — ${tag}`}
                  width={1536}
                  height={1024}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/45 via-transparent to-transparent" />
              </div>

              <div
                className="absolute -bottom-5 start-6 flex items-center gap-2.5 rounded-2xl px-4 py-2.5 shadow-xl ring-1 ring-black/10"
                style={{ background: b.color, color: contrastText(b.color) }}
              >
                <Layers size={16} strokeWidth={2.5} aria-hidden="true" />
                <span className="text-[11px] font-bold uppercase tracking-[0.16em]">
                  {t("companyDetail.entryOf", { no: entryNo })}
                </span>
              </div>
            </div>
          </Reveal>

          <div>
            <Eyebrow className="mb-3">{t("companyDetail.overviewEyebrow")}</Eyebrow>
            <h2 className="font-display text-[clamp(26px,3.6vw,42px)] font-bold leading-[1.08] text-(--color-ink)">
              {t("companyDetail.overviewTitle", { name })}
            </h2>
            <p className="mt-5 max-w-xl text-[15px] leading-8 text-(--color-muted)">{overview}</p>

            <div className="mt-9 grid max-w-md grid-cols-3 gap-4">
              {[
                { value: b.services.length, label: t("companyDetail.statServices") },
                { value: b.highlights.length, label: t("companyDetail.statHighlights") },
                { value: `${index + 1}/08`, label: t("companyDetail.statRegister") },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-slate-100 bg-(--color-soft) p-4 text-center shadow-sm transition-shadow duration-300 hover:shadow-md"
                >
                  <p className="font-display text-2xl font-bold" style={{ color: accentInk(b.color) }}>
                    {stat.value}
                  </p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.14em] text-(--color-muted)">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="bg-(--color-soft) py-20 lg:py-24">
        <div className="container">
          <Reveal className="mx-auto mb-12 max-w-2xl text-center">
            <Eyebrow>{t("companyDetail.keyEntries")}</Eyebrow>
            <div
              className="mx-auto mt-4 h-1 w-16 rounded-full"
              style={{ background: `linear-gradient(90deg, ${b.color}, var(--color-teal))` }}
            />
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {b.highlights.map((highlight, i) => (
              <Reveal key={highlight} delay={(i % 3) * 0.08} amount={0.15}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <span
                    className="font-display pointer-events-none absolute -end-1 -top-4 text-[64px] font-bold leading-none opacity-10 transition-opacity duration-300 group-hover:opacity-20"
                    style={{ color: b.color }}
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="relative flex h-8 w-8 items-center justify-center rounded-full"
                    style={{ background: `${b.color}1f`, color: accentInk(b.color) }}
                  >
                    <Check size={15} strokeWidth={3} aria-hidden="true" />
                  </span>
                  <p className="relative mt-4 text-[14.5px] font-semibold leading-6 text-(--color-ink-soft)">
                    {tr(`highlights.${i}`, highlight)}
                  </p>
                  <span
                    className="absolute inset-x-6 bottom-0 h-0.5 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
                    style={{ background: b.color }}
                    aria-hidden="true"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {b.slug === "advertising" && (
        <>
          <UnipolePricing color={b.color} onBook={handleBook} />
          <AdvertisingContact color={b.color} />
        </>
      )}

      {b.slug === "warehouse" && (
        <>
          <WarehousePricing color={b.color} onBook={handleBook} />
          <WarehouseContact color={b.color} />
        </>
      )}

      {/* Services */}
      <section id="company-services" className="scroll-mt-24 bg-white py-20 lg:py-24">
        <div className="container">
          <Reveal className="mx-auto mb-12 max-w-2xl text-center">
            <Eyebrow>{t("companyDetail.servicesTitle")}</Eyebrow>
            <div
              className="mx-auto mt-4 h-1 w-16 rounded-full"
              style={{ background: `linear-gradient(90deg, ${b.color}, var(--color-teal))` }}
            />
          </Reveal>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {b.services.map((service, i) => {
              const ServiceIcon = serviceIcons[service] ?? Sparkles;
              return (
                <Reveal key={service} delay={(i % 3) * 0.06} amount={0.1}>
                  <div className="group flex items-center gap-4 rounded-2xl border border-slate-100 bg-(--color-soft) p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                    <span
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                      style={{ background: `${b.color}14`, color: accentInk(b.color) }}
                    >
                      <ServiceIcon size={22} strokeWidth={1.8} />
                    </span>
                    <p className="text-[14px] font-semibold leading-snug text-(--color-ink-deep)">{tr(`services.${i}`, service)}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <div className="font-ledger mt-14 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-4 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">
            <span>{t("companyDetail.registerOf")}</span>
            <span>{t("companyDetail.entryOf", { no: entryNo })}</span>
          </div>
        </div>
      </section>

      <section
        id="enquiry"
        className="relative flex min-h-svh scroll-mt-24 items-center overflow-hidden"
        style={{ background: "var(--color-soft)", padding: "clamp(40px, 5vw, 64px) 0" }}
      >
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-(--color-blue)/40 to-transparent" aria-hidden="true" />

        <div className="container grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="mx-auto w-full max-w-xl lg:mx-0">
            <Eyebrow className="mb-3">{t("companyDetail.eyebrow")}</Eyebrow>
            <h2 className="font-display text-[clamp(26px,3.6vw,42px)] font-bold leading-[1.08] text-(--color-ink)">
              {t("companyDetail.enquireTitle", { name })}
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-7 text-(--color-muted)">
              {t("companyDetail.enquireSub", { name })}
            </p>

            <div className="mt-8 flex items-center gap-6">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-(--color-blue) shadow-[0_4px_14px_rgba(6,106,156,0.18)]">
                <Clock className="h-5 w-5" strokeWidth={2} />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-(--color-muted)">{t("companyDetail.responseTime")}</p>
                <p className="mt-0.5 text-sm font-semibold text-(--color-ink)">{t("companyDetail.responseValue")}</p>
              </div>
            </div>
          </div>

          <div className="w-full">
            <EnquiryForm
              initialCompany={b.name}
              initialCompanyLabel={name}
              companyLocked
              initialMessage={bookingMessage}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default CompanyDetail;
