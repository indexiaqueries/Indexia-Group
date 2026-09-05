import {
  FaInstagram,
  FaLinkedinIn,
  FaFacebookF,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6";

import { ArrowUpRight } from "lucide-react";

interface LinkFrame {
  name: string;
  handle: string;
  url: string;
  icon: React.ElementType;
}

const socialLinks: LinkFrame[] = [
  {
    name: "Instagram",
    handle: "@indexiafinance",
    url: "https://www.instagram.com/",
    icon: FaInstagram,
  },
  {
    name: "LinkedIn",
    handle: "Indexia Finance",
    url: "https://www.linkedin.com/",
    icon: FaLinkedinIn,
  },
  {
    name: "X",
    handle: "@indexiafinance",
    url: "https://x.com/",
    icon: FaXTwitter,
  },
  {
    name: "Facebook",
    handle: "Indexia Finance",
    url: "https://www.facebook.com/",
    icon: FaFacebookF,
  },
  {
    name: "YouTube",
    handle: "Indexia Finance",
    url: "https://www.youtube.com/",
    icon: FaYoutube,
  },
];

const SocialLinks: React.FC = () => {
  return (
    <section className="indexia-socials">
      <div className="indexia-socials__container">

        <div className="indexia-socials__header">
          <div className="indexia-socials__eyebrow">
            <span className="indexia-socials__line" />
            <span>Stay Connected</span>
          </div>

          <div className="indexia-socials__heading-wrap">
            <h2 className="indexia-socials__heading">
              Follow <span>Indexia Finance</span>
            </h2>

            <p className="indexia-socials__description">
              Stay informed with the latest updates, insights and stories
              from Indexia Finance across our social channels.
            </p>
          </div>
        </div>

        <div className="indexia-socials__grid">
          {socialLinks.map((social) => {
            const Icon = social.icon;

            return (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="indexia-social-card"
                aria-label={`Visit Indexia Finance on ${social.name}`}
              >
                <div className="indexia-social-card__icon">
                  <Icon size={24} />
                </div>

                <div className="indexia-social-card__content">
                  <span className="indexia-social-card__name">
                    {social.name}
                  </span>

                  <span className="indexia-social-card__handle">
                    {social.handle}
                  </span>
                </div>

                <div className="indexia-social-card__arrow">
                  <ArrowUpRight size={18} />
                </div>

                <span className="indexia-social-card__glow" />
              </a>
            );
          })}
        </div>

        <div className="indexia-socials__footer">
          <span>Connect with us</span>
          <span className="indexia-socials__footer-dot" />
          <span>Across the world</span>
        </div>

      </div>
    </section>
  );
};

export default SocialLinks;