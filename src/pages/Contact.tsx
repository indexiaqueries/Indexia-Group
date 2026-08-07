// Contact page: full-height hero + contact info, enquiry form, and branches.
import { useState } from "react";
import type { ChangeEvent, SubmitEvent } from "react";

import LocationCard from "../components/cards/LocationCard";
import SEO from "../components/common/SEO";
import ContactHero from "../components/banners/ContactHero";
import ContactInfo from "../components/contact/ContactInfo";
import EnquiryForm from "../components/contact/EnquiryForm";
import { accent, branches, initialContactForm } from "../data/contact";
import type { ContactFormData } from "../data/contact";

const Contact = () => {
  const [form, setForm] = useState<ContactFormData>(initialContactForm); // Enquiry form values
  const [submitted, setSubmitted] = useState(false);                     // True after the email client opens

  // Keep the form state in sync as the user types.
  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  };

  // Build a prefilled email and open the mail client.
  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const emailSubject = form.subject.trim() || "New enquiry from Indexia Group website";
    const emailBody = `
Name: ${form.name}
Phone: ${form.phone}
Email: ${form.email}
Subject: ${form.subject}

Message:
${form.message}
    `.trim();

    window.location.href =
      `mailto:contactus@indexiagroup.com` +
      `?subject=${encodeURIComponent(emailSubject)}` +
      `&body=${encodeURIComponent(emailBody)}`;
    setSubmitted(true);
  };

return (
    <main className="bg-white">
      <SEO
        title="Contact Us"
        description="Reach out to Indexia Group for financial advisory, loans, and more. Contact our Mumbai, Delhi, Surat, and international offices — we reply within 24 hours."
        keywords="contact Indexia Group, Indexia Group email, financial advisory contact, loan enquiry India, Indexia offices Mumbai Delhi Surat"
        canonicalPath="/contact"
      />

      <ContactHero />

      <section className="bg-[#f8fafc] px-6 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <ContactInfo />
          <EnquiryForm
            form={form}
            submitted={submitted}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        </div>
      </section>

      <section id="branches" className="bg-white px-6 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow" style={{ color: accent.green }}>
              Our Locations
            </p>
            <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Our <span style={{ color: accent.blueDark }}>Locations</span>
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-500">
              Visit or contact any of our offices for assistance with your requirements.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
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
