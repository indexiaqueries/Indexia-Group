import type { CSSProperties } from "react";
import { MapPin, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useInView } from "../../hooks/useInView";
import ImageSlot from "../common/ImageSlot";
import { siteImages } from "../../data/siteImages";

type LocationCardItem = {
  key: string;
  name: string;
  address: string;
  phones?: { label: string; labelKey?: string; number: string; href: string }[];
};

type LocationCardProps = {
  location: LocationCardItem;
  delay?: number;
};

const LocationCard = ({ location, delay = 0 }: LocationCardProps) => {
  const { t } = useTranslation();
  const [ref, inView] = useInView<HTMLElement>({ once: true, amount: 0.2 });
  const slotKey = `contact${location.key.replace(/Office$/, "").replace(/^./, (c) => c.toUpperCase())}`;
  const slot = siteImages[slotKey];

  return (
  <article
    ref={ref}
    className={`reveal flex h-full min-h-62.5 flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_36px_rgba(0,0,0,0.1)]${inView ? " is-in-view" : ""}`}
    style={{ "--reveal-delay": `${delay}s` } as CSSProperties}
  >
    {slot && (
      <div className="image-zoom-frame mb-5 shrink-0 rounded-2xl">
        <ImageSlot
          {...slot}
          alt={t(`branches.${location.key}`, { defaultValue: location.name })}
          className="image-zoom-media rounded-2xl"
        />
      </div>
    )}

    <div className="flex items-start gap-4">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-(--color-blue) text-white shadow-lg">
        <MapPin size={21} />
      </span>
      <h3 className="pt-2 text-xl font-extrabold text-(--color-ink)">
        {t(`branches.${location.key}`, { defaultValue: location.name })}
      </h3>
    </div>

    <div className="mt-6 flex-1">
      <p className="whitespace-pre-line text-sm leading-7 text-(--color-muted)">{location.address}</p>
      {!!location.phones?.length && (
        <div className="mt-5 space-y-2">
          {location.phones.map((phone) => (
            <a
              key={`${location.name}-${phone.label}-${phone.number}`}
              href={phone.href}
              className="flex items-center gap-3 text-sm font-semibold text-(--color-ink-soft) hover:text-(--color-blue)"
            >
              <Phone size={16} className="shrink-0 text-(--color-teal)" />
              <span>
                <span className="me-2 text-xs font-bold uppercase tracking-wider text-(--color-gray)">
                  {phone.labelKey ? t(`phoneLabel.${phone.labelKey}`, { defaultValue: phone.label }) : phone.label}:
                </span>
                {phone.number}
              </span>
            </a>
          ))}
        </div>
      )}
    </div>
  </article>
  );
};

export default LocationCard;
