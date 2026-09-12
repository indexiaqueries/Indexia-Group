import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { ArrowDown, ArrowRight, Clock, FileText, Mail, MapPin, Phone, Sparkles } from "lucide-react";
import { serviceIcons } from "./serviceIcons";
import Eyebrow from "../common/Eyebrow";
import ImageSlot from "../common/ImageSlot";
import Reveal from "../common/Reveal";
import { siteImages } from "../../data/siteImages";
import EnquiryForm from "../contact/EnquiryForm";
import HeroBackdrop from "../banners/HeroBackdrop";
import { getCompanyImage } from "../../data/companyImages";
import { companies, type Company } from "../../data/companies";
import { accent, monoFont } from "../../lib/theme";

import { bookingPhone, branches, contactEmails, phoneNumbers } from "../../data/contact";
import UnipolePricing from "./UnipolePricing";
import WarehousePricing from "./WarehousePricing";
import BookingModal, { type BookingContext } from "./BookingModal";
import CompanyHighlights from "./CompanyHighlights";
import CompanySpotlight from "./CompanySpotlight";
import FoundationGallery from "./FoundationGallery";
import RegisterTabs from "./RegisterTabs";

// Auto-import all media from foundation-gallery/ folder
const foundationMedia = import.meta.glob(
  "../../assets/company-pages-img/foundation-gallery/*",
  { eager: true },
) as Record<string, { default: string }>;
const foundationVideos = Object.values(foundationMedia)
  .map((mod) => mod.default)
  .sort();
import type { PricingRow } from "./PricingTable";

type CompanyDetailProps = {
  company: Company;
  showBackLink?: boolean;
};



const CompanyDetail = ({ company: b, showBackLink = false }: CompanyDetailProps) => {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();
  const [booking, setBooking] = useState<{ context: BookingContext; variant: "warehouse" | "advertising" } | null>(null);

  const tr = (path: string, fallback: string) => t(`pageContent.companies.${b.slug}.${path}`, { defaultValue: fallback });
  const tag = tr("tag", b.tag);
  const name = tr("name", b.name);
  // Enquiry heading "Get in Touch with {{name}}" with the company name
  // highlighted in the blue accent, mirroring the Contact page heading.
  const enquiryHeading = t("companyDetail.enquireTitle", { name });
  const enquiryNameIndex = enquiryHeading.indexOf(name);
  const enquiryBefore = enquiryNameIndex >= 0 ? enquiryHeading.slice(0, enquiryNameIndex) : "";
  const enquiryAfter = enquiryNameIndex >= 0 ? enquiryHeading.slice(enquiryNameIndex + name.length) : "";
  const tagline = b.tagline ? tr("tagline", b.tagline) : undefined;
  const desc = tr("desc", b.desc);
  const overview = tr("overview", b.overview);
  const index = companies.findIndex((c) => c.name === b.name);
  const marqueeItems = [tr("tag", b.tag), ...b.services.map((s, i) => tr(`services.${i}`, s))];
  // Warehouse & Advertising show their own office (Delhi — Imperial Tower) and
  // the full contact set from the project brochures; other pages keep the mix.
  const showFullContacts = b.slug === "warehouse" || b.slug === "advertising";
  const enquiryBranch = branches.find((branch) => branch.key === (showFullContacts ? "delhiOffice" : "corporateOffice"));
  const landline = phoneNumbers.find((p) => p.labelKey === "landline");
  // Home-hero slide copy for this company, already translated in every locale,
  // unused on this page, and reused for the new impact band + story split.
  const slideHeading = t(`hero.p${index + 1}.heading`, b.tagline ?? b.name);
  const slideSub = t(`hero.p${index + 1}.sub`, b.desc);

  // Land the enquiry section top exactly below the fixed navbar. The section
  // carries its own scroll-margin-top (scroll-mt-28), so scrollIntoView is the
  // single source of truth for the offset — no hardcoded pixel math here.
  const scrollToEnquiry = () => {
    document
      .getElementById("enquiry")
      ?.scrollIntoView({ block: "start", behavior: prefersReducedMotion ? "auto" : "smooth" });
  };

  // Book buttons open the booking popup with the selected offering preloaded;
  // rows without a label are the generic bottom CTA ("Book Now").
  const openBooking = (row: PricingRow & { size?: number }) => {
    const variant = b.slug === "advertising" ? "advertising" : "warehouse";
    setBooking({
      context: {
        companyName: name,
        itemLabel: row.label || t("bookingModal.generalItem"),
        itemDetail: [row.value, row.rate].filter(Boolean).join(" · ") || undefined,
      },
      variant,
    });
  };

  const handleBook = (row: PricingRow & { size?: number }) => openBooking(row);

  const handleBookGeneral = () => openBooking({ label: "", value: "" });

  return (
    <>
      <HeroBackdrop
        image={getCompanyImage(b.slug)}
        containerClassName="relative mx-auto w-full max-w-7xl px-2 py-12 pt-20 sm:px-3 lg:px-5 lg:py-18"
        extra={
          <div
            aria-hidden="true"
            className="marquee-band absolute inset-x-0 bottom-0 border-t border-white/10 bg-(--color-ink-deep)/85 backdrop-blur-sm"
          >
            <div
              className="infinite-marquee-track py-3.5"
              style={{ "--marquee-duration": `${Math.max(20, marqueeItems.length * 2.6)}s` } as React.CSSProperties}
            >
              {[0, 1].map((copy) => (
                <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
                  {marqueeItems.map((item, i) => (
                    <span key={i} className="flex items-center whitespace-nowrap">
                      <span className="mx-5 text-xs font-bold tracking-[0.22em] text-white/75">
                        {item}
                      </span>
                      <Sparkles size={12} strokeWidth={2.4} className="text-(--color-yellow)" aria-hidden="true" />
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        }
      >
        <div className="hero-panel-glass fade-up relative max-w-5xl p-5 sm:p-8 lg:max-w-[calc(100%-34rem)] lg:p-10 lg:ml-0 lg:mr-auto">
          {showBackLink && (
            <Link
              to="/about"
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/25 bg-(--color-navy-deep)/45 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-white backdrop-blur-sm transition-colors hover:bg-(--color-navy-deep)/70 hover:text-(--color-yellow)"
            >
              <span aria-hidden="true">←</span> {t("companyDetail.backAll")}
            </Link>
          )}

          <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
            <span
              className="rounded-full bg-(--color-gray) px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-white shadow-md"
            >
              {tag}
            </span>
            <span
              className="rounded-full border border-white/30 bg-(--color-navy-deep)/45 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-white shadow-md backdrop-blur-sm"
            >
              Est. {b.founded}
            </span>
          </div>

          <h1 className="font-display text-[clamp(30px,5vw,52px)] font-bold leading-[1.06] text-white">
            {name}
          </h1>

          {(b.slug === "warehouse" || b.slug === "advertising") && (
            <p className="mt-3 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-white/75">
              {tr("location", b.slug === "warehouse" ? "Shamli, Uttar Pradesh, Part of Delhi NCR" : "Delhi–Dehradun Highway, Shamli")}
            </p>
          )}

          {tagline && (
            <p className="mt-3 sm:mt-4 text-sm sm:text-lg font-semibold italic text-(--color-yellow)">“{tagline}”</p>
          )}

          <p className="mt-4 sm:mt-5 max-w-2xl text-[14px] sm:text-base leading-7 sm:leading-8 text-white/80">{desc}</p>              <div className="mt-7 sm:mt-9 flex flex-wrap gap-3 sm:gap-4">
            <a
              href="#enquiry"
              onClick={(e) => {
                // Prevent the native same-hash jump (which browsers ignore on
                // repeat clicks) and always scroll via scrollIntoView instead.
                e.preventDefault();
                scrollToEnquiry();
              }}
              className="inline-flex items-center gap-2 rounded-full bg-(--color-yellow) px-5 py-2.5 sm:px-7 sm:py-3 text-sm font-bold text-(--color-yellow-ink) shadow-[0_4px_16px_rgba(242,242,49,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-(--color-yellow-bright)"
            >
              {t("companyDetail.eyebrow")}
              <ArrowRight size={16} strokeWidth={2.5} />
            </a>
            <a
              href="#company-services"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2.5 sm:px-7 sm:py-3 text-sm font-bold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20"
            >
              {t("companyDetail.exploreServices")}
              <ArrowDown size={16} strokeWidth={2.5} />
            </a>
            {(b.slug === "warehouse" || b.slug === "advertising") && (
              <Link
                to={`/${b.slug}-brochure`}
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2.5 sm:px-7 sm:py-3 text-sm font-bold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20"
              >
                <FileText size={16} strokeWidth={2.2} />
                {t("companyDetail.brochure", "View Brochure")}
              </Link>
            )}
          </div>
        </div>
      </HeroBackdrop>

      {/* Register of companies — the catalogue edge */}
      <RegisterTabs activeSlug={b.slug} />

      {/* Overview + image split */}
      <section className="section-ruled section-paper relative overflow-hidden py-5 sm:py-7 lg:py-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-e-32 top-8 h-96 w-96 rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(123,123,123,0.9) 0%, transparent 65%)" }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-s-24 bottom-0 h-72 w-72 rounded-full opacity-10 blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(123,123,123,0.9) 0%, transparent 65%)" }}
        />

        <div className="container grid items-center gap-10 sm:gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal amount={0.2} className="relative">
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-3 rounded-3xl"
                style={{ background: "linear-gradient(135deg, rgba(6,106,156,0.4), transparent 55%, rgba(123,123,123,0.2))" }}
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
                  className="aspect-4/3 w-full object-cover object-right transition-transform duration-700 ease-out group-hover:scale-110 img-reveal"
                />
              </div>
            </div>
          </Reveal>

          <div>
            <Eyebrow className="mb-3">{t("companyDetail.overviewEyebrow")}</Eyebrow>
            <h2 className="font-display text-[clamp(26px,3.6vw,42px)] font-bold leading-[1.08] text-(--color-blue)">
              {t("companyDetail.overviewTitle", { name })}
            </h2>
            <p className="mt-4 sm:mt-5 max-w-xl text-[14px] sm:text-[15px] leading-7 sm:leading-8 text-(--color-muted)">{overview}</p>
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
          style={{ background: "radial-gradient(circle, rgba(123,123,123,0.9) 0%, transparent 65%)" }}
        />
        <div className="container relative py-14 lg:py-20">
          <Reveal className="max-w-2xl">
            <h2 className="font-display mt-4 whitespace-pre-line text-[clamp(30px,4.5vw,54px)] font-bold leading-[1.05] text-white">
              {slideHeading}
            </h2>
          </Reveal>
        </div>
      </section>

      {/* Company-specific spotlight section */}
      <CompanySpotlight company={b} />

      {/* Key entries */}
      <CompanyHighlights slug={b.slug} highlights={b.highlights} />

      {/* Story split, second image + pull-quote */}
      <section className="section-ruled section-ink relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-s-24 bottom-0 h-80 w-80 rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(123,123,123,0.9) 0%, transparent 65%)" }}
        />
        <div className="container grid items-center gap-6 sm:gap-8 py-4 sm:py-5 lg:grid-cols-2 lg:gap-12">
          <Reveal amount={0.2} className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-3 rounded-3xl"
              style={{ background: "linear-gradient(135deg, rgba(6,106,156,0.35), transparent 55%, rgba(123,123,123,0.2))" }}
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
              className="inline-flex rounded-full bg-(--color-gray) px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-white shadow-md"
            >
              {tag}
            </span>
            <h2 className="font-display mt-4 sm:mt-5 text-[clamp(22px,3.2vw,38px)] font-bold leading-[1.15] text-white">
              “{slideSub}”
            </h2>
            <a
              href="#company-services"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3 text-sm font-bold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20"
            >
              {t("companyDetail.exploreServices")}
            </a>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="company-services" className="section-ruled section-paper relative scroll-mt-24 overflow-hidden py-5 sm:py-7 lg:py-8">
        {/* Corner glows */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-16 inset-e-0 h-64 w-64 rounded-full opacity-15 blur-[90px]"
          style={{ background: "var(--color-blue)" }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-20 inset-s-0 h-72 w-72 rounded-full opacity-10 blur-[90px]"
          style={{ background: "var(--color-gray)" }}
        />

        <div className="container relative">
          <Reveal className="mx-auto mb-7 sm:mb-9 max-w-2xl text-center">
            <Eyebrow>{t("companyDetail.servicesTitle")}</Eyebrow>
            <span
              aria-hidden="true"
              className="mx-auto mt-4 block h-px w-24"
              style={{ background: "linear-gradient(90deg, transparent, var(--color-yellow), transparent)" }}
            />
          </Reveal>

          <div
            className={`grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 ${b.services.length > 9 ? "xl:grid-cols-4" : ""}`}
          >
            {b.services.map((service, i) => {
              const ServiceIcon = serviceIcons[service] ?? Sparkles;
              return (
                <Reveal key={service} delay={(i % 6) * 0.06} amount={0.1} className="h-full">
                  <div
                    className="group relative flex h-full items-start gap-3 overflow-hidden rounded-2xl border border-(--color-line)/60 bg-white p-4 transition-all duration-400 hover:-translate-y-1.5 hover:border-transparent hover:shadow-[0_18px_44px_rgba(2,16,26,0.16)] sm:gap-3.5 sm:p-4"
                  >
                    {/* Left rail accent */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-y-0 inset-s-0 w-1 origin-top scale-y-0 transition-transform duration-400 group-hover:scale-y-100"
                      style={{ background: "linear-gradient(180deg, var(--color-yellow), var(--color-blue))" }}
                    />

                    {/* Number watermark */}
                    <span
                      aria-hidden="true"
                      className="font-ledger pointer-events-none absolute -top-1 inset-e-3 text-[44px] font-bold leading-none text-(--color-navy)/8 transition-colors duration-400 group-hover:text-(--color-yellow)/25"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    {/* Icon chip */}
                    <span
                      className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl transition-all duration-400 group-hover:-rotate-6 group-hover:scale-105"
                      style={{
                        background: "linear-gradient(135deg, rgba(6,106,156,0.18), rgba(6,106,156,0.06))",
                        color: "var(--color-blue)",
                        boxShadow: "inset 0 0 0 1px rgba(6,106,156,0.22), 0 8px 18px rgba(6,106,156,0.12)",
                      }}
                    >
                      <ServiceIcon size={19} strokeWidth={1.9} />
                    </span>

                    <span className="relative min-w-0 flex-1 pt-0.5">
                      <span className="block wrap-break-word text-[13px] sm:text-[14px] font-bold leading-snug text-(--color-ink-deep)">
                        {tr(`services.${i}`, service)}
                      </span>
                    </span>
                  </div>
                </Reveal>
              );
            })}
          </div>

        </div>
      </section>

      {b.slug === "advertising" && (
        <UnipolePricing onBook={handleBook} onBookGeneral={handleBookGeneral} />
      )}

      {b.slug === "warehouse" && (
        <WarehousePricing onBook={handleBook} onBookGeneral={handleBookGeneral} />
      )}

      {/* Foundation Training Gallery */}
      {b.slug === "foundation" && (
        <section className="section-ruled section-ink relative">
          <div className="container relative py-5 lg:py-7">
            <Reveal className="mx-auto mb-6 max-w-3xl text-center">
              <Eyebrow color="var(--color-yellow)">{t("foundationGallery.eyebrow")}</Eyebrow>
              <h2 className="font-display mt-3 text-[clamp(24px,3.2vw,38px)] font-bold leading-[1.1] text-white">
                {t("foundationGallery.title")}
              </h2>
            </Reveal>
            <FoundationGallery
              videos={foundationVideos.map((src, i) => ({
                src,
                label: t(`foundationGallery.videos.video${i + 1}.label`, `Video ${i + 1}`),
                sublabel: t(`foundationGallery.videos.video${i + 1}.sublabel`, `Training session ${i + 1}`),
              }))}
            />
          </div>
        </section>
      )}

      <section
        id="enquiry"
        className="section-ruled section-paper relative flex scroll-mt-18 items-center overflow-hidden py-3 sm:py-4 sm:scroll-mt-23"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-(--color-blue)/40 to-transparent" aria-hidden="true" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-s-24 top-10 h-80 w-80 rounded-full opacity-10 blur-3xl"
          style={{ background: "var(--color-gray)" }}
        />

        <div className="container grid w-full items-center gap-4 sm:gap-6 lg:grid-cols-[1fr_minmax(0,34rem)] lg:gap-14">
          <div className="mx-auto w-full max-w-xl lg:mx-0">
            <Eyebrow className="mb-3">{t("companyDetail.eyebrow")}</Eyebrow>
            <h2 className="font-display text-[clamp(24px,3.6vw,42px)] font-bold leading-[1.08] text-(--color-blue)">
              {enquiryBefore}
              {enquiryNameIndex >= 0 ? (
                <span style={{ color: accent.green }}>{name}</span>
              ) : (
                enquiryHeading
              )}
              {enquiryAfter}
            </h2>
            <p className="mt-3 max-w-md text-[12px] sm:text-[13px] leading-6 text-(--color-muted)">
              {t("companyDetail.enquireSub", { name })}
            </p>

            <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-2xl border border-(--color-line)/70 bg-white p-3 shadow-sm transition-shadow hover:shadow-md">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white shadow-md" style={{ backgroundColor: accent.blue }}>
                  <Clock size={16} />
                </span>
                <span className="min-w-0">
                  <span className="block text-[9px] font-bold uppercase tracking-[0.16em] text-(--color-muted)">
                    {t("companyDetail.responseTime")}
                  </span>
                  <span className="block text-[13px] font-semibold text-(--color-ink)">
                    {t("companyDetail.responseValue")}
                  </span>
                </span>
              </div>
              <div className="group flex items-center gap-3 rounded-2xl border border-(--color-line)/70 bg-white p-3 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white shadow-md" style={{ backgroundColor: accent.blue }}>
                  <Phone size={16} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[9px] font-bold uppercase tracking-[0.16em] text-(--color-muted)">
                    {t("companyDetail.bookingsPhone")}
                  </span>
                  <a
                    href={`tel:${bookingPhone.href}`}
                    className="block text-[13px] font-semibold text-(--color-ink) transition-colors hover:text-(--color-teal-deep)"
                    style={monoFont}
                  >
                    {bookingPhone.display}
                  </a>
                  {showFullContacts && landline && (
                    <a
                      href={landline.href}
                      className="mt-0.5 block text-[13px] font-semibold text-(--color-ink) transition-colors hover:text-(--color-teal-deep)"
                    >
                      {landline.number}
                    </a>
                  )}
                </span>
              </div>
              <div
                className="group flex items-center gap-3 rounded-2xl border border-(--color-line)/70 bg-white p-3 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md sm:col-span-2"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white shadow-md" style={{ backgroundColor: accent.blue }}>
                  <Mail size={16} />
                </span>
                <span className="min-w-0">
                  <span className="block text-[9px] font-bold uppercase tracking-[0.16em] text-(--color-muted)">
                    {t("companyDetail.bookingsEmail")}
                  </span>
                  <a
                    href={`mailto:${contactEmails.queries}`}
                    className="block break-all text-[13px] font-semibold text-(--color-ink) transition-colors hover:text-(--color-teal-deep)"
                  >
                    {contactEmails.queries}
                  </a>
                  {showFullContacts && (
                    <span className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5">
                      <a href={`mailto:${contactEmails.bijendraMalik}`} className="block break-all text-[13px] font-semibold text-(--color-ink) transition-colors hover:text-(--color-teal-deep)">
                        {contactEmails.bijendraMalik}
                      </a>
                      <span aria-hidden="true" className="text-(--color-muted)">|</span>
                      <a href={`mailto:${contactEmails.viniMalik}`} className="block break-all text-[13px] font-semibold text-(--color-ink) transition-colors hover:text-(--color-teal-deep)">
                        {contactEmails.viniMalik}
                      </a>
                    </span>
                  )}
                </span>
              </div>
              {enquiryBranch && (
                <div className="flex items-center gap-3 rounded-2xl border border-(--color-line)/70 bg-white p-3 shadow-sm transition-shadow hover:shadow-md sm:col-span-2">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white shadow-md" style={{ backgroundColor: accent.blue }}>
                    <MapPin size={16} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[9px] font-bold uppercase tracking-[0.16em] text-(--color-muted)">
                      {t("companyDetail.bookingsOffice")}
                    </span>
                    <span className="block text-[13px] font-semibold leading-5 text-(--color-ink)">
                      {t(enquiryBranch.addressKey)}
                    </span>
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="w-full">
            <EnquiryForm
              initialCompany={b.name}
              initialCompanyLabel={name}
              companyLocked
              compact
            />
          </div>
        </div>
      </section>

      {booking && (
        <BookingModal context={booking.context} variant={booking.variant} onClose={() => setBooking(null)} />
      )}
    </>
  );
};

export default CompanyDetail;
