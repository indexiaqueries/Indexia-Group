import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import Eyebrow from "../common/Eyebrow";
import AnimatedCounter from "../common/AnimatedCounter";
import Reveal from "../common/Reveal";
import { getCompanyPageImage } from "../../data/companyPageImages";
import { SPOTLIGHT_DATA } from "../../data/spotlight";
import type { Company } from "../../data/companies";

// Real photos of the unipole hoarding locations (advertising page only).
const advertisingLocationMedia = import.meta.glob(
  "../../assets/company-pages-img/advertising-location/*",
  { eager: true },
) as Record<string, { default: string }>;
const advertisingLocationImages = Object.values(advertisingLocationMedia)
  .map((mod) => mod.default)
  .sort();

type CompanySpotlightProps = {
  company: Company;
};

const CompanySpotlight = ({ company }: CompanySpotlightProps) => {
  const { t } = useTranslation();
  // Hook must run before the early return below.
  const [photoIndex, setPhotoIndex] = useState(0);
  // Direction of the last navigation, used to slide the photo in from the matching side.
  const [slideDirection, setSlideDirection] = useState<"next" | "prev">("next");
  // Start point of the active touch gesture on the gallery frame.
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const data = SPOTLIGHT_DATA[company.slug];
  if (!data) return null;

  const useGallery = company.slug === "advertising" && advertisingLocationImages.length > 0;
  const galleryIndex = Math.min(photoIndex, Math.max(advertisingLocationImages.length - 1, 0));
  const showPreviousPhoto = () => {
    setSlideDirection("prev");
    setPhotoIndex((i) => (i - 1 + advertisingLocationImages.length) % advertisingLocationImages.length);
  };
  const showNextPhoto = () => {
    setSlideDirection("next");
    setPhotoIndex((i) => (i + 1) % advertisingLocationImages.length);
  };

  const handleGalleryTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  // A deliberate horizontal swipe (>40px, mostly horizontal) changes the photo;
  // anything more vertical keeps scrolling the page normally.
  const handleGalleryTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    const start = touchStartRef.current;
    touchStartRef.current = null;
    if (!start) return;
    const dx = e.changedTouches[0].clientX - start.x;
    const dy = e.changedTouches[0].clientY - start.y;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      if (dx < 0) showNextPhoto();
      else showPreviousPhoto();
    }
  };

  // Arrow keys browse the gallery while the frame (or a control inside it) has focus.
  const handleGalleryKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      showPreviousPhoto();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      showNextPhoto();
    }
  };

  const eyebrow = t(data.eyebrowKey);
  const heading = t(data.headingKey);
  const description = t(data.descriptionKey);
  const headingLines = heading.split("\n");

  return (
    <section className="relative overflow-hidden bg-white py-2.5 sm:py-3 lg:py-4">
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

      <div className="container grid items-center gap-7 sm:gap-10 lg:grid-cols-2 lg:gap-16">
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
                  color="var(--color-teal)"
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
                  className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-(--color-ink-deep) shadow-sm"
                  style={{ background: "var(--color-yellow)" }}
                >
                  <Check size={11} strokeWidth={3.4} />
                </span>
                {t(bulletKey)}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Image side — advertising shows a one-at-a-time location gallery, others a single image */}
        <Reveal amount={0.2} className="relative">
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-3 rounded-3xl"
              style={{ background: "linear-gradient(135deg, rgba(6,106,156,0.27), transparent 55%, rgba(123,123,123,0.13))" }}
            />
            {useGallery ? (
              <>
                <div
                  onTouchStart={handleGalleryTouchStart}
                  onTouchEnd={handleGalleryTouchEnd}
                  onKeyDown={handleGalleryKeyDown}
                  tabIndex={0}
                  role="group"
                  aria-roledescription="carousel"
                  aria-label={t("gallery.locationPhotos", "Location photos")}
                  className="relative touch-pan-y overflow-hidden rounded-3xl shadow-2xl ring-1 ring-black/10 focus-visible:ring-2 focus-visible:ring-(--color-blue) focus-visible:outline-none"
                >
                  <img
                    key={galleryIndex}
                    src={advertisingLocationImages[galleryIndex]}
                    alt={`${company.name} — hoarding location photo ${galleryIndex + 1}`}
                    loading="lazy"
                    decoding="async"
                    className="gallery-slide-in aspect-4/3 w-full object-cover"
                    style={{ "--slide-from": slideDirection === "next" ? "24px" : "-24px" } as React.CSSProperties}
                  />
                  <span aria-hidden="true" className="card-shine-lines" />

                  {/* Prev / next controls */}
                  <button
                    type="button"
                    onClick={showPreviousPhoto}
                    aria-label={t("gallery.previousPhoto", "Previous photo")}
                    className="absolute top-1/2 inset-s-3 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-(--color-ink) shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:bg-white focus-visible:ring-2 focus-visible:ring-(--color-blue) focus-visible:outline-none"
                  >
                    <ChevronLeft size={18} strokeWidth={2.4} />
                  </button>
                  <button
                    type="button"
                    onClick={showNextPhoto}
                    aria-label={t("gallery.nextPhoto", "Next photo")}
                    className="absolute top-1/2 inset-e-3 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-(--color-ink) shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:bg-white focus-visible:ring-2 focus-visible:ring-(--color-blue) focus-visible:outline-none"
                  >
                    <ChevronRight size={18} strokeWidth={2.4} />
                  </button>

                  {/* Counter */}
                  <span className="absolute bottom-3 inset-e-3 rounded-full bg-black/55 px-3 py-1 text-[11px] font-bold tabular-nums text-white backdrop-blur-sm">
                    {galleryIndex + 1} / {advertisingLocationImages.length}
                  </span>
                </div>


                {/* Dot indicators */}
                <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5" role="tablist" aria-label={t("gallery.locationPhotos", "Location photos")}>
                  {advertisingLocationImages.map((src, i) => (
                    <button
                      key={src}
                      type="button"
                      onClick={() => {
                        setSlideDirection(i > galleryIndex ? "next" : "prev");
                        setPhotoIndex(i);
                      }}
                      aria-label={t("gallery.viewPhoto", "View photo {{n}}", { n: i + 1 })}
                      aria-current={i === galleryIndex}
                      className={`h-1.5 rounded-full transition-all duration-300 focus-visible:ring-2 focus-visible:ring-(--color-blue) focus-visible:outline-none ${
                        i === galleryIndex
                          ? "w-6 bg-(--color-blue)"
                          : "w-1.5 bg-(--color-line) hover:bg-(--color-muted)"
                      }`}
                    />
                  ))}
                </div>
              </>
            ) : (
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
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default CompanySpotlight;
