import { memo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import footerBg from "../../assets/footer-img/footer-img.webp";
import logo from "../../assets/logo/IndexiaGroup_Logo.webp";
import { Mail, Phone, Clock } from "lucide-react";
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
  { icon: Clock, textKey: "footer.hours" },
];

const ColumnHeader = memo(({ title }: { title: string }) => (
  <h3 className="font-ledger text-[10px] font-bold uppercase tracking-[0.22em] text-white">{title}</h3>
));

const FooterLink = memo(({
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
      className="group inline-flex items-center gap-1.5 text-[13px] text-white/75 transition-colors duration-200 hover:text-(--color-yellow)"
    >
      <span className="text-(--color-teal) transition-transform duration-200 group-hover:translate-x-0.5">›</span>
      {t(labelKey)}
    </Link>
  </li>
));

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer id="footer" className="relative overflow-hidden bg-[#040d14] text-white">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-(--color-teal) to-transparent" />
      <div className="absolute inset-0">
        <img
          src={footerBg}
          alt=""
          aria-hidden="true"
          width={1376}
          height={678}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-center opacity-[0.12] select-none pointer-events-none"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-3 pt-12 pb-6 sm:px-4 sm:pt-16 sm:pb-8 lg:px-6">

        {/* Brand + CTA row, compact, horizontal on desktop */}
        <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt={t("common.logoAlt")} width={48} height={48} className="h-12 w-12 object-contain" />
            <div>
              <div className="flex items-center gap-1 text-lg font-extrabold">
                <span className="text-(--color-yellow)">Indexia</span>
                <span className="text-white">Group</span>
              </div>
              <p className="font-ledger text-[9px] font-bold uppercase tracking-[0.22em] text-white/60">
                {t("footer.tagline")}
              </p>
            </div>
          </div>
          <Link
            to="/contact"
            className="shrink-0 inline-flex items-center gap-2 rounded-full border border-(--color-yellow)/30 bg-(--color-yellow)/10 px-5 py-2 text-[13px] font-bold text-(--color-yellow) transition-all duration-200 hover:-translate-y-0.5 hover:bg-(--color-yellow)/20"
          >
            {t("footer.enquiry")} →
          </Link>
        </div>

        {/* Nav columns */}
        <h2 className="sr-only">{t("footer.siteFooter") || "Site footer navigation"}</h2>
        <nav aria-label="Footer navigation" className="mt-8 grid grid-cols-2 gap-x-5 gap-y-6 sm:grid-cols-4 lg:divide-x lg:divide-white/10">
          {/* Contact */}
          <div className="text-start">
            <ColumnHeader title={t("footer.contactUs")} />
            <div className="mt-2 h-0.5 w-8 rounded-full bg-(--color-teal)" />
            <div className="mt-3 space-y-2">
              {contactInfo.map((item) => {
                const Icon = item.icon;
                const content = (
                  <span className="flex items-start gap-2 text-[13px] text-white/80">
                    <span className="mt-0.5 shrink-0 text-(--color-teal)">
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                    <span className={`wrap-break-word min-w-0 ${item.href ? "transition-colors duration-200 hover:text-(--color-yellow)" : ""}`}>
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
              <div className="mt-2 h-0.5 w-8 rounded-full bg-(--color-teal)" />
              <ul className="mt-3 space-y-1.5">
                {group.links.map((item) => (
                  <FooterLink key={item.labelKey} href={item.href} labelKey={item.labelKey} t={t} />
                ))}
              </ul>
            </div>
          ))}
        </nav>


      </div>

      <div className="relative z-10 mt-8 border-t border-white/8 bg-black/30">
        <div className="mx-auto max-w-7xl px-3 py-4 text-center text-[13px] text-white/50 sm:px-4 lg:px-6">
          <p>{t("footer.rights")}</p>
        </div>
      </div>

      <BackToTop />
    </footer>
  );
};

export default Footer;
