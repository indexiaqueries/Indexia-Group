import { MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";

type LocationCardItem = {
  name: string;
  address: string;
  phones?: { label: string; number: string; href: string }[];
};

type LocationCardProps = {
  location: LocationCardItem;
  delay?: number;
};

const LocationCard = ({ location, delay = 0 }: LocationCardProps) => (
  <motion.article
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.55, delay }}
    className="shared-card flex h-full min-h-62.5 flex-col bg-(--color-soft) p-6"
  >
    <div className="flex items-start gap-4">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-(--color-blue) text-white shadow-lg">
        <MapPin size={21} />
      </span>
      <h3 className="pt-2 text-xl font-extrabold text-slate-900">{location.name}</h3>
    </div>

    <div className="mt-6 flex-1">
      <p className="whitespace-pre-line text-sm leading-7 text-slate-600">{location.address}</p>
      {!!location.phones?.length && (
        <div className="mt-5 space-y-2">
          {location.phones.map((phone) => (
            <a
              key={`${location.name}-${phone.label}-${phone.number}`}
              href={phone.href}
              className="flex items-center gap-3 text-sm font-semibold text-slate-700 hover:text-(--color-blue)"
            >
              <Phone size={16} className="shrink-0 text-(--color-teal)" />
              <span>
                <span className="me-2 text-xs font-bold uppercase tracking-wider text-(--color-gray)">
                  {phone.label}:
                </span>
                {phone.number}
              </span>
            </a>
          ))}
        </div>
      )}
    </div>
  </motion.article>
);

export default LocationCard;
