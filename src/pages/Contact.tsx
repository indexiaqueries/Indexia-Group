import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight } from "lucide-react";
import LocationCard from "../components/cards/LocationCard";
import SEO from "../components/common/SEO";
import Reveal from "../components/common/Reveal";
import ContactHero from "../components/banners/ContactHero";
import ContactInfo from "../components/contact/ContactInfo";
import EnquiryForm from "../components/contact/EnquiryForm";
import { branches } from "../data/contact";
import { GlowingCard } from "../components/lightswind/glowing-cards";
import { accent } from "../lib/theme"
import SocialLinks from "../components/ui/SocialLinks";

const Contact = () => {
  const { t } = useTranslation();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLocations = (dir: -1 | 1) => {
    if (!scrollRef.current) return;
    const card = scrollRef.current.firstElementChild as HTMLElement | null;
    if (!card) return;
    const amount = card.offsetWidth + 20;
    scrollRef.current.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  const contactJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        name: t("jsonLd.contactName", "Contact Indexia Group"),
        url: "https://www.indexiagroup.com/contact",
        isPartOf: { "@id": "https://www.indexiagroup.com/#website" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: t("jsonLd.breadcrumbHome", "Home"), item: "https://www.indexiagroup.com/" },
          { "@type": "ListItem", position: 2, name: t("jsonLd.breadcrumbContact", "Contact Us"), item: "https://www.indexiagroup.com/contact" },
        ],
      },
      {
        "@type": "Organization",
        name: t("jsonLd.orgName", "Indexia Group"),
        url: "https://www.indexiagroup.com/",
        telephone: "+91-11-4629-1155",
        email: "contactus@indexiagroup.com",
        address: [
          {
            "@type": "PostalAddress",
            name: t("jsonLd.corporateOffice", "Corporate Office"),
            streetAddress: "Office No. 3, 1st Floor, Rahimtoola House, Homji Street, Fort",
            addressLocality: "Mumbai",
            addressRegion: "Maharashtra",
            postalCode: "400001",
            addressCountry: "IN",
          },
          {
            "@type": "PostalAddress",
            name: t("jsonLd.delhiOffice", "Delhi Office"),
            streetAddress: "213, Second Floor, Imperial Tower, C Block Commercial Complex, Naraina Vihar",
            addressLocality: "New Delhi",
            postalCode: "110028",
            addressCountry: "IN",
          },
        ],
      },
    ],
  };

  return (
    <main className="site-shell">
      <SEO
        title={t("seo.contactTitle")}
        description={t("seo.contactDescription")}
        keywords="contact Indexia Group, Indexia Group Mumbai office, financial services contact India, loan enquiry, business enquiry, Indexia Group email, Delhi NCR"
        canonicalPath="/contact"
        jsonLd={contactJsonLd}
      />

      <ContactHero />

      <section className="section-ruled section-paper relative overflow-hidden px-4 py-5 sm:px-6 sm:py-8 lg:px-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-(--color-teal)/35 to-transparent"
        />
        <div className="mx-auto grid w-full max-w-7xl items-start gap-8 sm:gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:gap-16">
          <div className="flex flex-col gap-6 sm:gap-8 lg:sticky lg:top-28">
            <ContactInfo />
          </div>
          <div className="flex flex-col">
            <EnquiryForm />
          </div>
        </div>
      </section>

      <section id="branches" className="section-ruled pt-5 sm:pt-4 lg:pt-6" style={{ background: 'rgba(2,16,26,0.08)' }}>
        <div className="mx-auto max-w-7xl">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-extrabold text-slate-900 sm:text-4xl">
              {t("contact.locationsTitleStart")}
              <span style={{ color: accent.blue }}>{t("contact.locationsTitleAccent")}</span>
            </h2>
          </Reveal>

          <div className="relative">
            {/* Scroll arrows, outside overflow so they're never clipped */}
            <button
              onClick={() => scrollLocations(-1)}
              className="absolute -inset-s-4 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-slate-700 shadow-lg ring-1 ring-slate-200 transition-colors hover:bg-(--color-yellow) hover:text-(--color-yellow-ink)"
              aria-label="Scroll left"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scrollLocations(1)}
              className="absolute -inset-e-4 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-slate-700 shadow-lg ring-1 ring-slate-200 transition-colors hover:bg-(--color-yellow) hover:text-(--color-yellow-ink)"
              aria-label="Scroll right"
            >
              <ChevronRight size={18} />
            </button>

            {/* Scrollable area, clips only on x, not y */}
            <div
              ref={scrollRef}
              className="flex gap-5 overflow-x-auto scroll-smooth pt-6 pb-10"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {branches.map((branch, index) => (
                <GlowingCard
                  key={branch.name}
                  glowColor={['#26ae90', '#f2f231', '#066a9c', '#94a3b8'][index % 4]}
                  className="shrink-0 w-[calc((100%-2.5rem)/3)] min-w-55 border-slate-200/80 bg-white p-0 hover:shadow-[0_24px_64px_rgba(2,16,26,0.14)]"
                >
                  <LocationCard location={branch} delay={index * 0.08} tone="light" />
                </GlowingCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-ruled section-paper px-4 py-5 sm:px-6 sm:py-8 lg:px-8">
            <SocialLinks />
      </section>
    </main>
  );
};

export default Contact;
