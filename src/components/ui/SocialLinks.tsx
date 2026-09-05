import { useTranslation } from "react-i18next";
import { FaInstagram, FaLinkedinIn, FaFacebookF, FaYoutube, FaXTwitter } from "react-icons/fa6";
import Reveal from "../common/Reveal";

const socialLinks = [
  {
    name: "Instagram",
    handle: "@indexiafinance",
    url: "https://www.instagram.com/indexiafinance",
    icon: FaInstagram,
    brand: "#E4405F",
  },
  {
    name: "LinkedIn",
    handle: "Indexia Finance",
    url: "https://www.linkedin.com/company/finance",
    icon: FaLinkedinIn,
    brand: "#0A66C2",
  },
  {
    name: "X",
    handle: "@indexiafinance",
    url: "https://x.com/indexiafinance",
    icon: FaXTwitter,
    brand: "#111827",
  },
  {
    name: "Facebook",
    handle: "Indexia Finance",
    url: "https://www.facebook.com/indexiafinance",
    icon: FaFacebookF,
    brand: "#1877F2",
  },
  {
    name: "YouTube",
    handle: "Indexia Finance",
    url: "https://www.youtube.com/@indexiafinance",
    icon: FaYoutube,
    brand: "#FF0000",
  },
];

const SocialLinks: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      {/* Decorative background glows (theme vars) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-28 right-[-8%] h-80 w-80 rounded-full bg-(--color-teal)/12 blur-[90px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 left-[-8%] h-96 w-96 rounded-full bg-(--color-blue)/10 blur-[110px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-(--color-yellow)/5 blur-[120px]"
      />

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
          <div className="max-w-xl">
            <div className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-(--color-muted) sm:text-xs">
              <span className="inline-block h-0.5 w-8 bg-(--color-teal)" />
              <span>{t("socialLinks.stayConnected")}</span>
            </div>
            <h2 className="text-[28px] font-bold leading-tight tracking-tight text-(--color-ink) sm:text-[34px] lg:text-[40px]">
              {t("socialLinks.follow")} <span className="text-(--color-teal)">Indexia Finance</span>
            </h2>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-(--color-muted)">
              {t("socialLinks.description")}
            </p>
          </div>

          {/* Decorative count chip */}
          <div className="flex shrink-0 items-center gap-3 rounded-full border border-(--color-teal)/25 bg-(--color-paper)/70 px-4 py-2">
            <span className="font-display text-lg font-bold text-(--color-teal)">05</span>
            <span className="h-3.5 w-px bg-(--color-line)" />
            <span className="text-[11px] font-semibold uppercase tracking-wider text-(--color-muted)">
              {t("socialLinks.channels")}
            </span>
          </div>
        </div>

        {/* Cards — fanned deck */}
        <div className="grid grid-cols-1 gap-4 min-[400px]:grid-cols-2 md:grid-cols-3 md:gap-5 lg:grid-cols-5 lg:gap-6">
          {socialLinks.map((social, index) => {
            const Icon = social.icon;
            const fan = index % 2 === 1 ? "lg:rotate-1" : "lg:-rotate-1";

            return (
              <Reveal key={social.name} delay={index * 0.08} amount={0.15} y={28}>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t("socialLinks.visitAria", { name: social.name })}
                  className={`group relative flex min-h-21 flex-col items-center justify-end rounded-xl border border-(--color-teal)/18 bg-(--color-paper) px-4 pb-3.5 pt-12 text-center transition-all duration-300 ease-out hover:-translate-y-1 hover:rotate-0 hover:border-(--color-teal)/40 hover:bg-(--color-mist) hover:shadow-[0_12px_32px_rgba(2,16,26,0.08)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:hover:rotate-0 ${fan}`}
                  style={{ "--brand": social.brand } as React.CSSProperties}
                >
                  {/* Half-out / half-in icon circle — fills with brand color on hover */}
                  <span className="absolute left-1/2 top-0 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-(--color-night) text-(--color-teal) shadow-[0_6px_16px_rgba(2,16,26,0.25)] transition-all duration-300 group-hover:bg-(--brand) group-hover:text-(--color-paper) motion-reduce:transition-none sm:h-13 sm:w-13 lg:h-14 lg:w-14">
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </span>

                  <span className="text-[13px] font-medium tracking-tight text-(--color-ink) transition-colors duration-300 group-hover:text-(--brand) sm:text-sm">
                    {social.name}
                  </span>

                  <span className="mt-0.5 text-[11px] leading-none text-(--color-muted)">
                    {social.handle}
                  </span>

                  {/* Hover glow tinted with brand color */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:transition-none"
                    style={{
                      background: `radial-gradient(circle at 50% 0%, ${social.brand}1A, transparent 70%)`,
                    }}
                  />
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SocialLinks;