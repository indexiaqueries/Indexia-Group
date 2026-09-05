import {
  FaInstagram,
  FaLinkedinIn,
  FaFacebookF,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6";

const socialLinks = [
  {
    name: "Instagram",
    handle: "@indexiafinance",
    url: "https://www.instagram.com/indexiafinance",
    icon: FaInstagram,
  },
  {
    name: "LinkedIn",
    handle: "Indexia Finance",
    url: "https://www.linkedin.com/company/finance",
    icon: FaLinkedinIn,
  },
  {
    name: "X",
    handle: "@indexiafinance",
    url: "https://x.com/indexiafinance",
    icon: FaXTwitter,
  },
  {
    name: "Facebook",
    handle: "Indexia Finance",
    url: "https://www.facebook.com/indexiafinance",
    icon: FaFacebookF,
  },
  {
    name: "YouTube",
    handle: "Indexia Finance",
    url: "https://www.youtube.com/@indexiafinance",
    icon: FaYoutube,
  },
];

const SocialLinks: React.FC = () => {
  return (
    <section className="socials">
      <div className="socials-container">

        <div className="socials-header flex justify-between items-end mb-6">
          <div className="socials-heading-wrap w-max-content">
            <h2 className="socials-heading font-display text-[clamp(24px,3.4vw,40px)] font-bold text-(--color-ink)">
              Follow <span className="text-(--color-blue)">Indexia Finance</span>
            </h2>

            <p className="socials-description w-max-content text-(--color-muted) text-[clamp(12px,2vw,14px)]">
              Stay informed with the latest updates, insights and stories from Indexia Finance across our social channels.
            </p>
          </div>

          <div className="socials-eyebrow flex items-center gap-2 text-(--color-muted) text-[clamp(10px,1.5vw,13px)] uppercase tracking-wider font-semibold">
            <span>Stay Connected</span>
            <span className="socials-line block w-10 h-0.5 bg-(--color-blue)" />
          </div>
        </div>

        <div className="socials-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5 md:gap-6 mt-6 sm:mt-8 md:mt-10">
          {socialLinks.map((social) => {
            const Icon = social.icon;

            return (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-card pb-5"
                aria-label={`Visit Indexia Finance on ${social.name}`}
              >
                <div className="social-card-inner">
                  <div className="social-card-icon">
                    <Icon size={22} />
                  </div>
                  <span className="social-card-name">{social.name}</span>
                </div>

                <span className="social-card-hover-glow" />
              </a>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default SocialLinks;