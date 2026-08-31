import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowDown, ArrowRight, Clock, Layers, MapPin, Sparkles } from "lucide-react";
import AnimatedCounter from "../common/AnimatedCounter";
import { serviceIcons } from "./serviceIcons";
import Eyebrow from "../common/Eyebrow";
import ImageSlot from "../common/ImageSlot";
import Reveal from "../common/Reveal";
import { siteImages } from "../../data/siteImages";
import EnquiryForm from "../contact/EnquiryForm";
import HeroBackdrop from "../banners/HeroBackdrop";
import { getCompanyImage } from "../../data/companyImages";
import { companyIcons } from "../../data/companyIcons";
import { companies, type Company } from "../../data/companies";
import { accentInk, contrastText } from "../../lib/color";
import { colors } from "../../lib/theme";
import UnipolePricing from "./UnipolePricing";
import WarehousePricing from "./WarehousePricing";
import CompanyHighlights from "./CompanyHighlights";
import CompanySpotlight from "./CompanySpotlight";
import VideoHoverGallery from "./VideoHoverGallery";
import foundationVid2 from "../../assets/company-pages-img/foundation-gallery/vertical1.mp4";
import foundationVid3 from "../../assets/company-pages-img/foundation-gallery/vertical2.mp4";
import foundationVid4 from "../../assets/company-pages-img/foundation-gallery/vertical3.mp4";
import foundationVid5 from "../../assets/company-pages-img/foundation-gallery/vertical4.mp4";
import foundationVid6 from "../../assets/company-pages-img/foundation-gallery/horizontal1.mp4";
import foundationVid7 from "../../assets/company-pages-img/foundation-gallery/horizontal2.mp4";
import type { PricingRow } from "./PricingTable";

type CompanyDetailProps = {
  company: Company;
  showBackLink?: boolean;
};



const CompanyDetail = ({ company: b, showBackLink = false }: CompanyDetailProps) => {
  const { t } = useTranslation();
  const [bookingMessage, setBookingMessage] = useState<string | undefined>(undefined);
  const gallerySectionRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (b.slug !== "foundation") return;
    const section = gallerySectionRef.current;
    const glow = glowRef.current;
    if (!section || !glow) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const progress = -rect.top / (rect.height + window.innerHeight);
        const offset = Math.max(-60, Math.min(60, progress * 120));
        glow.style.transform = `translateY(${offset}px)`;
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [b.slug]);

  const tr = (path: string, fallback: string) => t(`pageContent.companies.${b.slug}.${path}`, { defaultValue: fallback });
  const tag = tr("tag", b.tag);
  const name = tr("name", b.name);
  const tagline = b.tagline ? tr("tagline", b.tagline) : undefined;
  const desc = tr("desc", b.desc);
  const overview = tr("overview", b.overview);
  const index = companies.findIndex((c) => c.name === b.name);
  const entryNo = String(index + 1).padStart(2, "0");
  const Icon = companyIcons[b.name] ?? Sparkles;
  const marqueeItems = [tr("tag", b.tag), ...b.services.map((s, i) => tr(`services.${i}`, s))];
  // Home-hero slide copy for this company, already translated in every locale,
  // unused on this page, and reused for the new impact band + story split.
  const slideHeading = t(`hero.p${index + 1}.heading`, b.tagline ?? b.name);
  const slideSub = t(`hero.p${index + 1}.sub`, b.desc);

  const handleBook = (row: PricingRow) => {
    // Scroll the enquiry form into view first, a remount in the same tick cancels it.
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
        containerClassName="relative mx-auto w-full max-w-7xl px-2 py-12 pt-20 sm:px-3 lg:px-5 lg:py-18"
      >
        <div className="fade-up relative">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-12 -inset-e-2 select-none font-display text-[clamp(110px,20vw,220px)] font-bold leading-none text-white/5 sm:-inset-e-8"
          >
            {entryNo}
          </span>
          {showBackLink && (
            <Link
              to="/about"
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
              {tr("location", b.slug === "warehouse" ? "Shamli, Uttar Pradesh, Part of Delhi NCR" : "Delhi–Dehradun Highway, Shamli")}
            </p>
          )}

          {tagline && (
            <p className="mt-3 sm:mt-4 text-[14px] sm:text-[17px] font-semibold italic text-(--color-yellow)">“{tagline}”</p>
          )}

          <p className="mt-4 sm:mt-5 max-w-2xl text-[14px] sm:text-base leading-7 sm:leading-8 text-white/80">{desc}</p>              <div className="mt-7 sm:mt-9 flex flex-wrap gap-3 sm:gap-4">
            <a
              href="#enquiry"
              className="inline-flex items-center gap-2 rounded-full bg-(--color-yellow) px-5 py-2.5 sm:px-7 sm:py-3 text-[13px] sm:text-sm font-bold text-(--color-yellow-ink) shadow-[0_4px_16px_rgba(242,242,49,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-(--color-yellow-bright)"
            >
              {t("companyDetail.eyebrow")}
              <ArrowRight size={16} strokeWidth={2.5} />
            </a>
            <a
              href="#company-services"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2.5 sm:px-7 sm:py-3 text-[13px] sm:text-sm font-bold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20"
            >
              {t("companyDetail.exploreServices")}
              <ArrowDown size={16} strokeWidth={2.5} />
            </a>
          </div>
        </div>
      </HeroBackdrop>

      {/* Services marquee ribbon */}
      <div
        className="relative overflow-hidden border-y border-white/10"
        style={{ background: "var(--color-ink-deep)" }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 inset-s-0 w-24 bg-linear-to-r from-(--color-ink-deep) to-transparent sm:w-40"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 inset-e-0 w-24 bg-linear-to-l from-(--color-ink-deep) to-transparent sm:w-40"
        />
        <div
          className="infinite-marquee-track py-4"
          style={{ "--marquee-duration": `${Math.max(20, marqueeItems.length * 2.6)}s` } as React.CSSProperties}
        >
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
              {marqueeItems.map((item, i) => (
                <span key={i} className="flex items-center whitespace-nowrap">
                  <span className="mx-5 text-[12px] font-bold uppercase tracking-[0.22em] text-white/75">
                    {item}
                  </span>
                  <Sparkles size={12} strokeWidth={2.4} className="text-(--color-yellow)" aria-hidden="true" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Overview + image split */}
      <section className="section-ruled section-paper relative overflow-hidden py-10 sm:py-14 lg:py-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-e-32 top-8 h-96 w-96 rounded-full opacity-20 blur-3xl"
          style={{ background: `radial-gradient(circle, ${b.color} 0%, transparent 65%)` }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-s-24 bottom-0 h-72 w-72 rounded-full opacity-10 blur-3xl"
          style={{ background: `radial-gradient(circle, ${b.color} 0%, transparent 65%)` }}
        />

        <div className="container grid items-center gap-10 sm:gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal amount={0.2} className="relative">
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-3 rounded-[30px]"
                style={{ background: `linear-gradient(135deg, ${b.color}66, transparent 55%, ${b.color}33)` }}
              />
              <div
                className="group thumb-tilt media-polished relative overflow-hidden rounded-3xl shadow-2xl ring-1 ring-black/10"
              >
                <img
                  src={getCompanyImage(b.slug)}
                  alt={`${name}, ${tag}`}
                  width={1536}
                  height={1024}
                  loading="lazy"
                  decoding="async"
                  className="aspect-4/3 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 img-reveal"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/45 via-transparent to-transparent" />
                <span aria-hidden="true" className="card-shine-lines" />
              </div>

              <div
                className="absolute -bottom-5 inset-s-6 flex items-center gap-2.5 rounded-2xl px-4 py-2.5 shadow-xl ring-1 ring-black/10"
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
            <h2 className="font-display text-[clamp(26px,3.6vw,42px)] font-bold leading-[1.08] text-(--color-ink) text-shimmer">
              {t("companyDetail.overviewTitle", { name })}
            </h2>
            <p className="mt-4 sm:mt-5 max-w-xl text-[14px] sm:text-[15px] leading-7 sm:leading-8 text-(--color-muted)">{overview}</p>

            <div className="mt-7 sm:mt-9 grid max-w-md grid-cols-3 gap-3 sm:gap-4">
              <AnimatedCounter value={String(b.services.length)} label={t("companyDetail.statServices")} color={accentInk(b.color)} labelClassName="mt-1 text-[10px] font-bold uppercase tracking-[0.14em] text-(--color-muted)" />
              <AnimatedCounter value={String(b.highlights.length)} label={t("companyDetail.statHighlights")} color={accentInk(b.color)} labelClassName="mt-1 text-[10px] font-bold uppercase tracking-[0.14em] text-(--color-muted)" />
              <AnimatedCounter value={`${String(index + 1).padStart(2, "0")}/08`} label={t("companyDetail.statRegister")} color={accentInk(b.color)} labelClassName="mt-1 text-[10px] font-bold uppercase tracking-[0.14em] text-(--color-muted)" />
            </div>
          </div>
        </div>
      </section>

      {/* Impact band, full-bleed image as section background */}
      <section className="section-ruled relative overflow-hidden">
        <ImageSlot
          {...siteImages.companyImpact}
          alt={`${name}, ${tag}`}
          aspect="aspect-[21/9]"
          className="absolute inset-0 h-full w-full rounded-none"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-r from-(--color-ink-deep)/95 via-(--color-ink-deep)/70 to-(--color-ink-deep)/30"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-e-20 top-0 h-80 w-80 rounded-full opacity-25 blur-3xl"
          style={{ background: `radial-gradient(circle, ${b.color} 0%, transparent 65%)` }}
        />
        <div className="container relative py-14 lg:py-20">
          <Reveal className="max-w-2xl">
            <Eyebrow color="var(--color-yellow)">{t("companyDetail.entryOf", { no: entryNo })}</Eyebrow>
            <h2 className="font-display mt-4 whitespace-pre-line text-[clamp(30px,4.5vw,54px)] font-bold leading-[1.05] text-white">
              {slideHeading}
            </h2>
          </Reveal>
        </div>
      </section>

      {/* Company-specific spotlight section */}
      <CompanySpotlight company={b} />

      {/* Key entries */}
      <CompanyHighlights
        color={b.color}
        slug={b.slug}
        highlights={b.highlights}
        services={b.services}
      />

      {/* Story split, second image + pull-quote */}
      <section className="section-ruled section-ink relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-s-24 bottom-0 h-80 w-80 rounded-full opacity-20 blur-3xl"
          style={{ background: `radial-gradient(circle, ${b.color} 0%, transparent 65%)` }}
        />
        <div className="container grid items-center gap-6 sm:gap-8 py-6 sm:py-8 lg:grid-cols-2 lg:gap-12">
          <Reveal amount={0.2} className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-3 rounded-[30px]"
              style={{ background: `linear-gradient(135deg, ${b.color}59, transparent 55%, ${b.color}33)` }}
            />
            <ImageSlot
              {...siteImages.companyStory}
              alt={`${name}, ${tag}`}
              aspect="aspect-[4/3]"
              className="relative rounded-3xl shadow-2xl ring-1 ring-white/15"
            />
          </Reveal>

          <div>
            <span
              className="inline-flex rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] shadow-md"
              style={{ background: b.color, color: contrastText(b.color) }}
            >
              {tag}
            </span>
            <h2 className="font-display mt-4 sm:mt-5 text-[clamp(22px,3.2vw,38px)] font-bold leading-[1.15] text-white">
              “{slideSub}”
            </h2>
            <p className="font-ledger mt-4 sm:mt-6 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] sm:tracking-[0.22em] text-white/50">
              {t("companyDetail.registerOf")} · {t("companyDetail.entryOf", { no: entryNo })}
            </p>
            <a
              href="#company-services"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3 text-sm font-bold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20"
            >
              {t("companyDetail.exploreServices")}
              <ArrowDown size={16} strokeWidth={2.5} />
            </a>
          </div>
        </div>
      </section>

      {b.slug === "advertising" && (
        <UnipolePricing color={b.color} onBook={handleBook} />
      )}

      {b.slug === "warehouse" && (
        <WarehousePricing color={b.color} onBook={handleBook} />
      )}

      {/* Services */}
      <section id="company-services" className="section-ruled section-paper scroll-mt-24 py-10 sm:py-14 lg:py-16">
        <div className="container">
          <Reveal className="mx-auto mb-6 sm:mb-8 max-w-2xl text-center">
            <Eyebrow>{t("companyDetail.servicesTitle")}</Eyebrow>
            <div className="mt-4 flex items-center justify-center gap-3">
              <span className="h-px w-8" style={{ background: b.color }} aria-hidden="true" />
              <span
                className="font-ledger text-[10px] font-bold tracking-[0.22em]"
                style={{ color: accentInk(b.color) }}
              >
                {String(b.services.length).padStart(2, "0")}
              </span>
              <span className="h-px w-8" style={{ background: b.color }} aria-hidden="true" />
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {b.services.map((service, i) => {
              const ServiceIcon = serviceIcons[service] ?? Sparkles;
              return (
                <Reveal key={service} delay={(i % 3) * 0.06} amount={0.1}>
                  <div
                    className="spotlight-tile card-premium card-premium-hover group relative flex items-center gap-4 overflow-hidden rounded-2xl p-5"
                    style={{ "--spot-color": `${b.color}24` } as React.CSSProperties}
                  >
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -inset-e-8 -top-8 h-20 w-20 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-70"
                      style={{ background: b.color }}
                    />

                    <span
                      className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105"
                      style={{
                        background: `linear-gradient(135deg, ${b.color}2e, ${b.color}0f)`,
                        color: accentInk(b.color),
                        boxShadow: `inset 0 0 0 1px ${b.color}38, 0 8px 18px ${b.color}1f`,
                      }}
                    >
                      <ServiceIcon size={24} strokeWidth={1.9} />
                    </span>

                    <span
                      aria-hidden="true"
                      className="font-ledger pointer-events-none absolute inset-e-4 top-3 text-[10px] font-bold tracking-[0.14em] text-slate-300 transition-colors duration-300 group-hover:text-slate-400"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <p className="relative text-[14.5px] font-bold leading-snug text-(--color-ink-deep)">
                      {tr(`services.${i}`, service)}
                    </p>

                    <ArrowRight
                      size={15}
                      strokeWidth={2.6}
                      aria-hidden="true"
                      className="pointer-events-none absolute bottom-3 inset-e-4 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                      style={{ color: accentInk(b.color) }}
                    />

                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
                      style={{ background: b.color }}
                    />
                  </div>
                </Reveal>
              );
            })}
          </div>

          <div className="font-ledger mt-6 sm:mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-4 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">
            <span>{t("companyDetail.registerOf")}</span>
            <span>{t("companyDetail.entryOf", { no: entryNo })}</span>
          </div>
        </div>
      </section>

      {/* Foundation Training Gallery */}
      {b.slug === "foundation" && (
        <section ref={gallerySectionRef} className="section-ruled section-ink relative">
          <div ref={glowRef} aria-hidden="true" className="pointer-events-none absolute -inset-e-32 top-0 h-96 w-96 rounded-full opacity-20 blur-3xl transition-transform duration-150 ease-out" style={{ background: `radial-gradient(circle, ${b.color} 0%, transparent 65%)` }} />
          <div className="container relative py-10 lg:py-14">
            <Reveal className="mx-auto mb-6 max-w-3xl text-center">
              <Eyebrow color="var(--color-yellow)">{t("foundationGallery.eyebrow")}</Eyebrow>
              <h2 className="font-display mt-3 text-[clamp(24px,3.2vw,38px)] font-bold leading-[1.1] text-white">
                {t("foundationGallery.title")}
              </h2>
            </Reveal>
            <VideoHoverGallery
              videos={[
                { src: foundationVid2, label: t("foundationGallery.videos.trackTraining.label"), sublabel: t("foundationGallery.videos.trackTraining.sublabel") },
                { src: foundationVid3, label: t("foundationGallery.videos.fieldPractice.label"), sublabel: t("foundationGallery.videos.fieldPractice.sublabel") },
                { src: foundationVid6, label: t("foundationGallery.videos.horizontalTraining1.label"), sublabel: t("foundationGallery.videos.horizontalTraining1.sublabel") },
                { src: foundationVid7, label: t("foundationGallery.videos.horizontalTraining2.label"), sublabel: t("foundationGallery.videos.horizontalTraining2.sublabel") },
                { src: foundationVid4, label: t("foundationGallery.videos.sprintDrills.label"), sublabel: t("foundationGallery.videos.sprintDrills.sublabel") },
                { src: foundationVid5, label: t("foundationGallery.videos.teamSession.label"), sublabel: t("foundationGallery.videos.teamSession.sublabel") },
              ]}
              activeWidth={35}
              gap={0.5}
              perspective={35}
              transitionDuration={0.6}
            />
          </div>
        </section>
      )}

      <section
        id="enquiry"
        className="section-ruled section-paper relative flex min-h-svh scroll-mt-24 items-center overflow-hidden"
        style={{ padding: "clamp(40px, 5vw, 64px) 0" }}
      >
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-(--color-blue)/40 to-transparent" aria-hidden="true" />

        <div className="container grid items-center gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="mx-auto w-full max-w-xl lg:mx-0">
            <Eyebrow className="mb-3">{t("companyDetail.eyebrow")}</Eyebrow>
            <h2 className="font-display text-[clamp(24px,3.6vw,42px)] font-bold leading-[1.08] text-(--color-ink)">
              {t("companyDetail.enquireTitle", { name })}
            </h2>
            <p className="mt-4 sm:mt-5 max-w-md text-[12px] sm:text-[13px] leading-6 text-(--color-muted)">
              {t("companyDetail.enquireSub", { name })}
            </p>

            <div className="group relative mt-8 overflow-hidden rounded-2xl shadow-sm ring-1 ring-slate-200">
              <ImageSlot
                {...siteImages.companyEnquiry}
                alt={`${name} enquiry support`}
                className="relative z-1 transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <span aria-hidden="true" className="card-shine-lines" />
            </div>

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
