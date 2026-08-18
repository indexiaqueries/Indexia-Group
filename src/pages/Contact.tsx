import { useTranslation } from "react-i18next";
import LocationCard from "../components/cards/LocationCard";
import SEO from "../components/common/SEO";
import ContactHero from "../components/banners/ContactHero";
import ContactInfo from "../components/contact/ContactInfo";
import EnquiryForm from "../components/contact/EnquiryForm";
import { branches } from "../data/contact";
import { accent } from "../lib/theme";

const contactJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      name: "Contact Indexia Group",
      url: "https://www.indexiagroup.com/contact",
      isPartOf: { "@id": "https://www.indexiagroup.com/#website" },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.indexiagroup.com/" },
        {
          "@type": "ListItem",
          position: 2,
          name: "Contact Us",
          item: "https://www.indexiagroup.com/contact",
        },
      ],
    },
    {
      "@type": "Organization",
      name: "Indexia Group",
      url: "https://www.indexiagroup.com/",
      telephone: "+91-11-4629-1155",
      email: "contactus@indexiagroup.com",
      address: [
        {
          "@type": "PostalAddress",
          name: "Corporate Office",
          streetAddress: "Office No. 3, 1st Floor, Rahimtoola House, Homji Street, Fort",
          addressLocality: "Mumbai",
          addressRegion: "Maharashtra",
          postalCode: "400001",
          addressCountry: "IN",
        },
        {
          "@type": "PostalAddress",
          name: "Delhi Office",
          streetAddress: "213, Second Floor, Imperial Tower, C Block Commercial Complex, Naraina Vihar",
          addressLocality: "New Delhi",
          postalCode: "110028",
          addressCountry: "IN",
        },
      ],
    },
  ],
};

const Contact = () => {
  const { t } = useTranslation();

  return (
    <main className="bg-white">
      <SEO
        title={t("seo.contactTitle")}
        description={t("seo.contactDescription")}
        keywords="contact Indexia Group, Indexia Group Mumbai office, financial services contact India, loan enquiry, business enquiry, Indexia Group email, Delhi NCR"
        canonicalPath="/contact"
        jsonLd={contactJsonLd}
      />

      <ContactHero />

      <section className="relative flex min-h-svh items-center overflow-hidden bg-(--color-soft) px-6 py-16 lg:px-8">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <ContactInfo />
          <div className="flex flex-col">
            <EnquiryForm />
          </div>
        </div>
      </section>

      <section id="branches" className="bg-white py-20 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
              {t("contact.locationsTitleStart")}
              <span style={{ color: accent.blue }}>{t("contact.locationsTitleAccent")}</span>
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {branches.map((branch, index) => (
              <LocationCard key={branch.name} location={branch} delay={index * 0.08} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
