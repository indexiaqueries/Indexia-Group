import { MapPin, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";
import ImageSlot from "../common/ImageSlot";
import MediaFrame from "../common/MediaFrame";
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

const LocationCard = ({ location }: LocationCardProps) => {
  const { t } = useTranslation();
  const slotKey = `contact${location.key.replace(/Office$/, "").replace(/^./, (c) => c.toUpperCase())}`;
  const slot = siteImages[slotKey];

  return (
    <article className="flex h-full flex-col">
      {slot && (
        <MediaFrame className="image-zoom-frame mb-4 shrink-0 overflow-hidden rounded-xl">
          <ImageSlot
            {...slot}
            aspect="aspect-[16/10]"
            alt={t(`branches.${location.key}`, { defaultValue: location.name })}
            className="image-zoom-media rounded-xl"
          />
        </MediaFrame>
      )}

      <div className="flex items-start gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-(--color-teal) text-white shadow-lg">
          <MapPin size={21} />
        </span>
        <h3 className="pt-2 text-xl font-extrabold text-white">
          {t(`branches.${location.key}`, { defaultValue: location.name })}
        </h3>
      </div>

      <div className="mt-4 flex-1">
        <p className="whitespace-pre-line text-sm leading-7 text-white/70">{location.address}</p>
        {!!location.phones?.length && (
          <div className="mt-4 space-y-2">
            {location.phones.map((phone) => (
              <a
                key={`${location.name}-${phone.label}-${phone.number}`}
                href={phone.href}
                className="flex items-center gap-3 text-sm font-semibold text-white/80 hover:text-(--color-yellow)"
              >
                <Phone size={16} className="shrink-0 text-(--color-yellow)" />
                <span>
                  <span className="me-2 text-xs font-bold uppercase tracking-wider text-white/40">
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
