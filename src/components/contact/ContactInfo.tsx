import { motion } from "framer-motion";
import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";

import { phoneNumbers } from "../../data/contact";
import { accent, cardBaseClass, monoFont } from "../../lib/theme";
import { fadeUp } from "../../lib/motion";
import Eyebrow from "../common/Eyebrow";

const tileLabelClass = "block text-[10px] font-bold uppercase tracking-[0.15em]";

const InfoTile = () => {
  const { t } = useTranslation();

  return (
  <motion.a
    href="mailto:contactus@indexiagroup.com"
    {...fadeUp(0)}
    whileHover={{ x: 6 }}
    className={`group flex items-center gap-4 ${cardBaseClass} p-4`}
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
  </motion.a>
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

  return (
  <motion.div {...fadeUp(0.1)} className={`flex items-start gap-4 ${cardBaseClass} p-5`}>
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
  </motion.div>
  );
};

const ContactInfo = () => {
  const { t } = useTranslation();

  return (
  <motion.div {...fadeUp()} className="flex h-full flex-col">
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
  </motion.div>
  );
};

export default ContactInfo;
