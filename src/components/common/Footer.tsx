import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import footerBg from "../../assets/footer-img.webp";
import logo from "../../assets/IndexiaGroup_Logo.gif";
import { ArrowUp, Mail, Phone, MapPin, Clock } from "lucide-react";
import { phoneNumbers } from "../../data/contact";
import BackToTop from "./BackToTop";

const linkGroups: {
  titleKey: string;
  links: { labelKey: string; href: string }[];
}[] = [
  {
    titleKey: "footer.company",
    links: [
      { labelKey: "footer.links.groupCompanies", href: "/businesses" },
      { labelKey: "footer.links.advertise", href: "/contact" },
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
  { icon: MapPin, text: "Mumbai · Delhi · Surat · Ecuador", href: "/contact" },
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
      className="group inline-flex items-center gap-2 text-sm text-white/85 transition-all duration-200 hover:text-(--color-yellow)"
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
        {/* Balanced 5-column grid — Brand · Contact · Company · Resources · Legal.
            Proportions measured from content: brand blurb ~380px, contact ~200px,
            longest link (Resources) ~185px. Verified at 1216px content width:
            6fr_4fr_3.5fr_3.5fr_3.5fr + 24px gaps → 328/219/191/191/191, no overflow. */}
        <div className="grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-[6fr_4fr_3.5fr_3.5fr_3.5fr] lg:divide-x lg:divide-white/10">
          {/* Brand — spans both tablet columns, one on desktop. Centered in the
              single-column mobile stack, left-aligned from md up. */}
          <div className="flex flex-col items-center gap-5 text-center md:col-span-2 md:items-start md:text-start lg:col-span-1">
            <div className="flex flex-row items-center gap-3">
              <img src={logo} alt="Indexia Group logo" width={72} height={72} className="h-16 w-16 object-contain sm:h-20 sm:w-20" />
              <div>
                <div className="flex flex-row items-center gap-1 text-2xl font-extrabold">
                  <span className="text-(--color-yellow)">Indexia</span>
                  <span className="text-white">Group</span>
                </div>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.22em] text-white/75">
                  {t("footer.tagline")}
                </p>
              </div>
            </div>

            <p className="max-w-sm text-sm leading-7 text-white/90">
              {t("footer.blurb")}
            </p>
          </div>

          {/* Contact Us */}
          <div className="text-center md:text-start">
            <ColumnHeader title={t("footer.contactUs")} />
            <div className="mx-auto mt-3 h-1 w-10 rounded-full bg-(--color-teal) md:mx-0" />

            <div className="mt-6 space-y-4">
              {contactInfo.map((item) => {
                const Icon = item.icon;
                const content = (
                  <span className="flex items-start justify-center gap-3 text-sm text-white/85 md:justify-start">
                    <span className="mt-0.5 shrink-0 text-(--color-teal)">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className={`break-words ${item.href ? "transition-all duration-200 hover:text-(--color-yellow)" : ""}`}>
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

          {/* Company / Resources / Legal */}
          {linkGroups.map((group) => (
            <div key={group.titleKey} className="text-center md:text-start">
              <ColumnHeader title={t(group.titleKey)} />
              <div className="mx-auto mt-3 h-1 w-10 rounded-full bg-(--color-teal) md:mx-0" />
              <ul className="mt-6 space-y-3">
                {group.links.map((item) => (
                  <FooterLink key={item.labelKey} href={item.href} labelKey={item.labelKey} t={t} />
                ))}
              </ul>
            </div>
          ))}
        </div>

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
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label={t("footer.backToTop")}
          className="back-to-top-pulse absolute end-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-(--color-yellow) text-(--color-deep) shadow-[0_0_0_4px_rgba(242,242,49,0.25),0_10px_28px_rgba(2,16,26,0.45)] transition-all duration-200 hover:-translate-y-[calc(50%+4px)] hover:scale-105 hover:shadow-[0_0_0_4px_rgba(242,242,49,0.4),0_14px_34px_rgba(2,16,26,0.55)] sm:end-8 sm:h-11 sm:w-11"
        >
          <ArrowUp className="h-5 w-5" strokeWidth={2.75} />
        </button>
      </div>

      {/* Floating Back to Top — extracted to BackToTop so pages without a footer can mount it too */}
      <BackToTop />
    </footer>
  );
};

export default Footer;
