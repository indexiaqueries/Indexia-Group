import { motion } from "framer-motion";
import { Send } from "lucide-react";
import type { ChangeEvent, SubmitEvent } from "react";

import {
  accent,
  displayFont,
  eyebrowClass,
  fadeUp,
  inputClasses,
} from "../../data/contact";
import type { ContactFormData } from "../../data/contact";

type EnquiryFormProps = {
  form: ContactFormData;
  submitted: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (event: SubmitEvent<HTMLFormElement>) => void;
};

const halfFields = [
  { id: "name", label: "Name", type: "text", placeholder: "Your full name" },
  { id: "phone", label: "Phone Number", type: "tel", placeholder: "Your phone number" },
] as const;

const fullFields = [
  { id: "email", label: "Email Address", type: "email", placeholder: "you@example.com" },
  { id: "subject", label: "Subject", type: "text", placeholder: "What would you like to discuss?" },
] as const;

const Field = ({
  id,
  label,
  type,
  placeholder,
  value,
  onChange,
}: {
  id: keyof ContactFormData;
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: EnquiryFormProps["onChange"];
}) => (
  <div>
    <label htmlFor={id} className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-600">
      {label}
    </label>
    <input
      id={id}
      name={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required
      className={inputClasses}
    />
  </div>
);

const EnquiryForm = ({ form, submitted, onChange, onSubmit }: EnquiryFormProps) => (
  <motion.div
    id="enquiry-form"
    {...fadeUp(0.1)}
    className="relative overflow-hidden rounded-4xl border border-white bg-white p-6 shadow-xl sm:p-10"
  >
    <div
      className="absolute right-0 top-0 h-40 w-40 rounded-full blur-3xl"
      style={{ backgroundColor: "rgba(38,174,144,.09)" }}
    />
    <div
      className="absolute bottom-0 left-0 h-40 w-40 rounded-full blur-3xl"
      style={{ backgroundColor: "rgba(40,96,144,.09)" }}
    />

    <div className="relative">
      <p className={eyebrowClass} style={{ color: accent.green }}>
        Send Your Enquiry
      </p>
      <h2 className="mt-3 text-3xl font-extrabold text-slate-900" style={displayFont}>
        Tell Us How We Can Help
      </h2>
      <p className="mt-3 text-sm leading-6 text-slate-500">
        Complete the form below and your enquiry will be addressed by our team.
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          {halfFields.map((field) => (
            <Field
              key={field.id}
              {...field}
              id={field.id}
              value={form[field.id]}
              onChange={onChange}
            />
          ))}
        </div>

        {fullFields.map((field) => (
          <Field
            key={field.id}
            {...field}
            id={field.id}
            value={form[field.id]}
            onChange={onChange}
          />
        ))}

        <div>
          <label htmlFor="message" className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-600">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            value={form.message}
            onChange={onChange}
            placeholder="Write your enquiry here..."
            required
            className={`${inputClasses} resize-none`}
          />
        </div>

        <button
          type="submit"
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-1"
          style={{ backgroundColor: accent.blueDark, boxShadow: "0 8px 22px rgba(40,96,144,.25)" }}
        >
          <Send size={17} />
          Send Enquiry
        </button>

        {submitted && (
          <p className="rounded-xl px-4 py-3 text-center text-sm font-medium" style={{ backgroundColor: "rgba(38,174,144,.08)", color: "#14765f" }}>
            Your email application should open now. Please send the prepared enquiry to{" "}
            <a href="mailto:contactus@indexiagroup.com" className="font-bold underline">
              contactus@indexiagroup.com
            </a>
            .
          </p>
        )}
      </form>
    </div>
  </motion.div>
);

export default EnquiryForm;
