import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import footerBg from "../../assets/footer-img/footer-img.webp";
import logo from "../../assets/logo/IndexiaGroup_Logo.webp";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { phoneNumbers } from "../../data/contact";
import BackToTop from "./BackToTop";

const linkGroups: {
  titleKey: string;
  links: { labelKey: string; href: string }[];
}[] = [
  {
    titleKey: "footer.company",
    links: [
      { labelKey: "footer.links.aboutUs", href: "/about" },
      { labelKey: "footer.links.groupCompanies", href: "/businesses" },
      { labelKey: "footer.links.careers", href: "/careers" },
    ],
  },
  {
    titleKey: "footer.resources",
    links: [
      { labelKey: "footer.links.news", href: "/news" },
      { labelKey: "footer.links.globalResearch", href: "/global-research" },
      { labelKey: "footer.links.securityTips", href: "/security-tips" },
    ],
  },
  {
    titleKey: "footer.legal",
    links: [
      { labelKey: "footer.links.termsOfUse", href: "/terms-of-use" },
      { labelKey: "footer.links.termsConditions", href: "/terms" },
      { labelKey: "footer.links.privacyPolicy", href: "/privacy-policy" },
    ],
  },
];

const contactInfo: {
  icon: typeof Mail;
  text?: string;
  textKey?: string;
  href?: string;
}[] = [
  { icon: Mail, text: "contactus@indexiagroup.com", href: "mailto:contactus@indexiagroup.com" },
  { icon: Phone, text: phoneNumbers[0]?.number ?? "+91 011 4629 1155", href: phoneNumbers[0]?.href ?? "tel:+911146291155" },
  { icon: MapPin, text: "Mumbai · Delhi · Ecuador", href: "/contact" },
  { icon: Clock, textKey: "footer.hours" },
];

const ColumnHeader = ({ title }: { title: string }) => (
  <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-white">{title}</h3>
);

const FooterLink = ({
  href,
  labelKey,
  t,
}: {
  href: string;
  labelKey: string;
  t: (key: string) => string;
}) => (
  <li>
    <Link
      to={href}
      className="group inline-flex items-center gap-2 text-sm text-white/85 transition-all duration-200 hover:text-(--color-yellow) link-underline"
    >
      <span className="text-(--color-teal) transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1">›</span>
      {t(labelKey)}
    </Link>
  </li>
);

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer id="footer" className="relative overflow-hidden bg-(--color-deep) text-white">
      <div className="absolute inset-0">
        <img
          src={footerBg}
          alt=""
          aria-hidden="true"
          width={1376}
          height={678}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-center opacity-[0.22] select-none pointer-events-none"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-16 sm:px-6 sm:pt-20 lg:px-8">

        {/* Brand section — full width, centered */}
        <div className="flex flex-col items-center gap-4 text-center">
          <img src={logo} alt={t("common.logoAlt")} width={96} height={96} className="h-24 w-24 object-contain sm:h-28 sm:w-28" />
          <div>
            <div className="flex flex-row items-center justify-center gap-1 text-2xl font-extrabold">
              <span className="text-(--color-yellow)">Indexia</span>
              <span className="text-white">Group</span>
            </div>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.22em] text-white/75">
              {t("footer.tagline")}
            </p>
          </div>
          <p className="w-full max-w-3xl text-sm leading-7 text-(--color-yellow)">
            {t("footer.blurb")}
          </p>
        </div>

        {/* Sections below — Contact, Company, Resources, Legal */}
        <h2 className="sr-only">{t("footer.siteFooter") || "Site footer navigation"}</h2>
        <nav aria-label="Footer navigation" className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 lg:grid-cols-4 lg:divide-x lg:divide-white/10">
          {/* Contact */}
          <div className="text-start">
            <ColumnHeader title={t("footer.contactUs")} />
            <div className="mt-3 h-1 w-10 rounded-full bg-(--color-teal)" />
            <div className="mt-6 space-y-4">
              {contactInfo.map((item) => {
                const Icon = item.icon;
                const content = (
                  <span className="flex items-start justify-start gap-3 text-sm text-white/85">
                    <span className="mt-0.5 shrink-0 text-(--color-teal)">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className={`wrap-break-word min-w-0 ${item.href ? "transition-all duration-200 hover:text-(--color-yellow)" : ""}`}>
                      {item.textKey ? t(item.textKey) : item.text}
                    </span>
                  </span>
                );
                return item.href ? (
                  <Link key={item.text ?? item.textKey} to={item.href} className="block">
                    {content}
                  </Link>
                ) : (
                  <div key={item.text ?? item.textKey}>{content}</div>
                );
              })}
            </div>
          </div>

          {linkGroups.map((group) => (
            <div key={group.titleKey} className="text-start">
              <ColumnHeader title={t(group.titleKey)} />
              <div className="mt-3 h-1 w-10 rounded-full bg-(--color-teal)" />
              <ul className="mt-6 space-y-3">
                {group.links.map((item) => (
                  <FooterLink key={item.labelKey} href={item.href} labelKey={item.labelKey} t={t} />
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="mt-12 rounded-2xl border border-white/12 bg-white/5 px-6 py-6 backdrop-blur-sm sm:px-8">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-white/90">
              {t("footer.cta")}{" "}
              <Link to="/contact" className="font-bold text-(--color-yellow) underline-offset-4 transition-colors hover:text-(--color-yellow-bright) hover:underline">
                {t("footer.enquiry")}
              </Link>
            </p>
            <p className="font-ledger text-[11px] font-bold uppercase tracking-[0.22em] text-white/65">
              {t("footer.stats")}
            </p>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-12 border-t border-white/10 bg-(--color-navy-black)/50">
        <div className="mx-auto max-w-7xl px-4 py-5 text-center text-sm text-white/60 sm:px-6 lg:px-8">
          <p className="pe-16 text-white/80 sm:pe-0">{t("footer.rights")}</p>
        </div>

      </div>

      <BackToTop />
    </footer>
  );
};

export default Footer;
