import type { CSSProperties } from "react";
import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";

import { phoneNumbers } from "../../data/contact";
import { accent, cardBaseClass, monoFont } from "../../lib/theme";
import { useInView } from "../../hooks/useInView";
import Eyebrow from "../common/Eyebrow";

const tileLabelClass = "block text-[10px] font-bold uppercase tracking-[0.15em]";

const emailAddresses = [
  { label: "General Enquiries", email: "contactus@indexiagroup.com", color: accent.green },
  { label: "Queries", email: "indexia.queries@gmail.com", color: accent.green },
  { label: "Vini Malik", email: "Vini.Malik5@gmail.com", color: accent.blue },
];

const EmailsSection = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView<HTMLDivElement>({ once: true, amount: 0.2 });

  return (
  <div
    ref={ref}
    className={`reveal rounded-2xl border border-(--color-sand-deep) bg-(--color-paper) p-5 shadow-sm${inView ? " is-in-view" : ""}`}
  >
    <Eyebrow size="md" color={accent.green} style={{ letterSpacing: "0.18em" }}>
      {t("contactInfo.enquiries")}
    </Eyebrow>
    <div className="mt-4 space-y-3">
      {emailAddresses.map(({ label, email, color }) => (
        <a key={email} href={`mailto:${email}`} className="group flex items-center gap-4">
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white shadow-md"
            style={{ backgroundColor: color, boxShadow: `0 4px 14px ${color}33` }}
          >
            <Mail size={18} />
          </span>
          <span className="min-w-0">
            <span className="block text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: accent.gray }}>
              {label}
            </span>
            <span className="mt-0.5 block text-sm font-semibold text-slate-800 group-hover:text-(--color-blue)">
              {email}
            </span>
          </span>
        </a>
      ))}
    </div>
  </div>
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
      <EmailsSection />
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
