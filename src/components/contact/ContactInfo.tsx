import type { CSSProperties } from "react";
import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";

import { phoneNumbers } from "../../data/contact";
import { accent, cardBaseClass, monoFont } from "../../lib/theme";
import { useInView } from "../../hooks/useInView";
import Eyebrow from "../common/Eyebrow";

const tileLabelClass = "block text-[10px] font-bold uppercase tracking-[0.15em]";

const InfoTile = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView<HTMLAnchorElement>({ once: true, amount: 0.2 });

  return (
  <a
    ref={ref}
    href="mailto:contactus@indexiagroup.com"
    className={`group reveal flex items-center gap-4 ${cardBaseClass} p-4 transition-transform duration-300 hover:translate-x-1.5${inView ? " is-in-view" : ""}`}
  >
    <span
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white shadow-lg"
      style={{ backgroundColor: accent.green, boxShadow: `0 6px 18px rgba(38,174,144,.22)` }}
    >
      <Mail size={20} />
    </span>
    <span>
      <span className={tileLabelClass} style={{ color: accent.gray }}>
        {t("contactInfo.enquiries")}
      </span>
      <span
        className="mt-1 block text-sm font-semibold text-slate-800 group-hover:text-(--color-blue)"
      >
        contactus@indexiagroup.com
      </span>
    </span>
  </a>
  );
};

const PhoneTile = ({ label, labelKey, number, href }: (typeof phoneNumbers)[number]) => {
  const { t } = useTranslation();
  return (
  <a href={href} className="group flex items-center gap-4 py-3.5 first:pt-1 last:pb-1">
    <span
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white shadow-lg"
      style={{ backgroundColor: accent.blue, boxShadow: `0 6px 18px rgba(6,106,156,.22)` }}
    >
      <Phone size={20} />
    </span>
    <span>
      <span className={tileLabelClass} style={{ color: accent.gray }}>
        {labelKey ? t(`phoneLabel.${labelKey}`, { defaultValue: label }) : label}
      </span>
      <span className="mt-1 block text-base font-bold text-slate-800 group-hover:text-(--color-blue)" style={monoFont}>
        {number}
      </span>
    </span>
  </a>
  );
};

const LocationHoursTile = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView<HTMLDivElement>({ once: true, amount: 0.2 });

  return (
  <div
    ref={ref}
    className={`reveal flex items-start gap-4 ${cardBaseClass} p-5${inView ? " is-in-view" : ""}`}
    style={{ "--reveal-delay": "0.1s" } as CSSProperties}
  >
    <span
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white shadow-lg"
      style={{ backgroundColor: accent.blue, boxShadow: `0 6px 18px rgba(6,106,156,.22)` }}
    >
      <MapPin size={20} />
    </span>
    <div>
      <span className={tileLabelClass} style={{ color: accent.gray }}>
        {t("contactInfo.location")}
      </span>
      <span className="mt-1 block text-sm font-semibold text-slate-800">{t("contactInfo.country")}</span>

      <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-4">
        <Clock3 size={16} style={{ color: accent.green }} />
        <span className={tileLabelClass.replace("block ", "")} style={{ color: accent.gray }}>
          {t("contactInfo.workingHours")}
        </span>
      </div>
      <span className="mt-1 block text-sm font-semibold text-slate-800">{t("footer.hours")}</span>
    </div>
  </div>
  );
};

const ContactInfo = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView<HTMLDivElement>({ once: true, amount: 0.2 });

  return (
  <div ref={ref} className={`reveal flex h-full flex-col${inView ? " is-in-view" : ""}`}>
    <Eyebrow size="md" color={accent.green}>
      {t("contactInfo.eyebrow")}
    </Eyebrow>
    <h2 className="font-display mt-3 text-[clamp(26px,3.4vw,40px)] font-bold leading-[1.08] text-slate-900">
      {t("contactInfo.headlineStart")}
      <span style={{ color: accent.blue }}>{t("contactInfo.headlineAccent")}</span>
    </h2>
    <p className="mt-5 max-w-lg text-sm leading-7 text-slate-500">
      {t("contactInfo.paragraph")}
    </p>

    <div className="mt-10 flex flex-1 flex-col justify-center gap-5">
      <InfoTile />
      <LocationHoursTile />
    </div>

<div className="mt-8 rounded-2xl border border-(--color-sand-deep) bg-(--color-paper) p-5 shadow-sm">
      <Eyebrow size="md" color={accent.green} style={{ letterSpacing: "0.18em" }}>
        {t("contactInfo.phoneNumbers")}
      </Eyebrow>
      <div className="mt-2 divide-y divide-(--color-sand)">
        {phoneNumbers.map((phone) => (
          <PhoneTile key={phone.number} {...phone} />
        ))}
      </div>
    </div>
  </div>
  );
};

export default ContactInfo;
