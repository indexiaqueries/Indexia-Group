import { Mail, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";

import { phoneNumbers } from "../../data/contact";
import { accent, monoFont } from "../../lib/theme";
import { useInView } from "../../hooks/useInView";
import Eyebrow from "../common/Eyebrow";

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
      className={`reveal rounded-2xl bg-white p-5 shadow-sm${inView ? " is-in-view" : ""}`}
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
              <span className="block text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
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
    <a href={href} className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-sm transition-all duration-200 hover:border-(--color-blue)/40 hover:shadow-md">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-white" style={{ backgroundColor: accent.blue }}>
        <Phone size={12} />
      </span>
      <span className="text-[10px] font-bold uppercase tracking-wide" style={{ color: accent.gray }}>
        {labelKey ? t(`phoneLabel.${labelKey}`, { defaultValue: label }) : label}
      </span>
      <span className="text-[13px] font-bold text-slate-800 group-hover:text-(--color-blue)" style={monoFont}>
        {number}
      </span>
    </a>
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
      <h2 className="font-display mt-3 text-[clamp(24px,3.4vw,40px)] font-bold leading-[1.08] text-slate-900">
        {t("contactInfo.headlineStart")}
        <span style={{ color: accent.blue }}>{t("contactInfo.headlineAccent")}</span>
      </h2>
      <p className="mt-4 sm:mt-5 max-w-lg text-[13px] sm:text-sm leading-6 sm:leading-7 text-slate-500">
        {t("contactInfo.paragraph")}
      </p>

      <div className="mt-5 sm:mt-6 flex flex-1 flex-col justify-center gap-3 sm:gap-4">
        <EmailsSection />
      </div>

      <div className="mt-6 sm:mt-8">
        <span className="mb-3 block font-ledger text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
          {t("contactInfo.phoneNumbers")}
        </span>
        <div className="flex flex-wrap gap-2">
          {phoneNumbers.map((phone) => (
            <PhoneTile key={phone.number} {...phone} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
