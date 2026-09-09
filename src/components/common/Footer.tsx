import { memo, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import footerBg from "../../assets/footer-img/footer-img.webp";
import logo from "../../assets/logo/IndexiaGroup_Logo.webp";
import { Mail, Phone, Clock } from "lucide-react";
import { contactEmails, phoneNumbers } from "../../data/contact";
import { socialLinks } from "../../data/socialLinks";
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
      { labelKey: "footer.links.news", href: "/news" },
    ],
  },
  {
    titleKey: "footer.legal",
    links: [
      { labelKey: "footer.links.termsOfUse", href: "/terms-of-use" },
      { labelKey: "footer.links.privacyPolicy", href: "/privacy-policy" },
    ],
  },
];

const landline = phoneNumbers[0];
// Mobile number shown in the footer alongside the landline.
const mobile = phoneNumbers.find((p) => p.number === "+91 86551 68551");

const contactInfo: {
  icon: typeof Mail;
  text?: string;
  textKey?: string;
  href?: string;
  /** Multiple values (phone numbers or emails) sharing one icon on a row. */
  links?: { text: string; href: string }[];
}[] = [
  { icon: Mail, text: contactEmails.generalEnquiries, href: `mailto:${contactEmails.generalEnquiries}` },
  {
    icon: Phone,
    links: [landline, mobile]
      .filter((p): p is NonNullable<typeof landline> => Boolean(p))
      .map((p) => ({ text: p.number, href: p.href })),
  },
  {
    icon: Mail,
    // HR reachable from every page, not just the careers section
    links: [contactEmails.hr, contactEmails.hrAlternate].map((email) => ({ text: email, href: `mailto:${email}` })),
  },
  { icon: Clock, textKey: "footer.hours" },
];

// X's brand colour is near-black — on the dark footer it needs a light badge to stay visible.
// Threshold set so only genuinely near-black brands (< 50 luminance) get the white badge;
const isDarkBrand = (brand: string) => {
  const num = parseInt(brand.slice(1), 16);
  return (0.299 * ((num >> 16) & 255) + 0.587 * ((num >> 8) & 255) + 0.114 * (num & 255)) < 50;
};

const ColumnHeader = memo(({ title }: { title: string }) => (
  <h3 className="font-ledger text-xs font-bold uppercase tracking-[0.22em] text-white">{title}</h3>
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
      <span className="text-(--color-yellow) transition-transform duration-200 group-hover:translate-x-0.5">→</span>
      {t(labelKey)}
    </Link>
  </li>
));

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer id="footer" className="relative overflow-hidden bg-(--color-night) text-white">
      <div className="h-px w-full bg-linear-to-r from-transparent via-(--color-teal) to-transparent" />
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

        {/* Brand row */}
        <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start">
          <div className="flex items-center gap-3">
            <img src={logo} alt={t("common.logoAlt")} width={64} height={64} className="h-16 w-16 object-contain" />
            <div>
              <div className="flex items-center gap-1 text-lg font-extrabold">
                <span className="text-(--color-yellow)">{t("footer.brand")}</span>
              </div>
              <p className="font-ledger text-xs font-bold uppercase tracking-[0.22em] text-white/70">
                {t("footer.tagline")}
              </p>
            </div>
          </div>
        </div>

        {/* Nav columns */}
        <h2 className="sr-only">{t("footer.siteFooter") || "Site footer navigation"}</h2>
        <nav aria-label={t("footer.footerNav")} className="mt-8 grid grid-cols-2 gap-x-5 gap-y-6 sm:grid-cols-3 lg:grid-cols-3 lg:divide-x lg:divide-white/10">
          {/* Contact */}
          <div className="text-start">
            <ColumnHeader title={t("footer.contactUs")} />
            <div className="mt-2 h-0.5 w-8 rounded-full bg-(--color-teal)" />
            <div className="mt-3 space-y-2">
              {contactInfo.map((item) => {
                const Icon = item.icon;
                // Row with several values (phone numbers or emails) sharing one icon
                if (item.links && item.links.length) {
                  const links = item.links;
                  return (
                    <div key={links.map((l) => l.href).join("|")} className="flex items-start gap-2 text-[13px] text-white/80">
                      <span className="mt-0.5 shrink-0 text-(--color-teal)">
                        <Icon className="h-3.5 w-3.5" />
                      </span>
                      <span className="flex min-w-0 flex-wrap items-center gap-x-2">
                        {links.map((n, i) => (
                          <span key={n.href} className="flex items-center gap-2">
                            <a href={n.href} className="transition-colors duration-200 hover:text-(--color-yellow)">
                              {n.text}
                            </a>
                            {i < links.length - 1 && <span className="text-white/40">·</span>}
                          </span>
                        ))}
                      </span>
                    </div>
                  );
                }
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

            {/* Enquiry CTA relocated inside the Connect With Us column */}
            <Link
              to="/contact#enquiry-form"
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-(--color-yellow)/30 bg-(--color-yellow)/10 px-5 py-2 text-[13px] font-bold text-(--color-yellow) transition-all duration-200 hover:-translate-y-0.5 hover:bg-(--color-yellow)/20"
            >
              {t("footer.enquiry")} →
            </Link>
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

        {/* Social Media - Circular Icons Section: full-width band below the nav grid, label left / icons right */}
        <div className="mt-8 flex flex-wrap items-center justify-end gap-4 border-t border-white/10 pt-6 sm:gap-5 lg:gap-6">
          <span className="hidden sm:inline mr-1 text-xs font-ledger font-bold uppercase tracking-[0.18em] text-white">
            {t("footer.followUs")}
          </span>
          <div className="flex flex-wrap items-center gap-4 sm:gap-5">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              const dark = isDarkBrand(social.brand);
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Indexia Finance on ${social.name}`}
                  style={{ "--brand": social.brand } as CSSProperties}
                  className={`indexia-footer-social flex h-10 w-10 items-center justify-center rounded-full border shadow-[0_4px_14px_rgba(2,16,26,0.35)] transition-all duration-200 hover:-translate-y-0.5 ${
                    dark
                      ? "border-white/25 bg-white text-(--color-ink) hover:bg-(--color-night) hover:text-(--color-paper)"
                      : "border-(--brand)/50 bg-(--brand) text-(--color-paper) hover:bg-white hover:text-(--brand)"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </a>
              );
            })}
          </div>
        </div>

      </div>

      <div className="relative z-10 mt-3 border-t border-white/8 bg-(--color-navy-black)/45">
        {/* Admin entry point: static dot at the extreme left of the copyright bar */}
        <Link
          to="/admin"
          aria-label="Admin"
          tabIndex={-1}
          className="group absolute left-0 top-1/2 -translate-y-1/2 p-3"
        >
          <span
            className="footer-blob block h-3 w-3 rounded-full bg-white/10 blur-[1px] transition-all duration-500 group-hover:bg-(--color-yellow)/70 group-hover:blur-none group-hover:shadow-[0_0_12px_rgba(250,204,21,0.6)]"
          />
        </Link>
        <div className="mx-auto max-w-7xl px-3 py-4 text-center text-[13px] text-white/50 sm:px-4 lg:px-6">
          <p>{t("footer.rights")}</p>
        </div>
      </div>

      <BackToTop />
    </footer>
  );
};

export default Footer;
