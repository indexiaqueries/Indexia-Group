import { useState } from "react";
import type { ChangeEvent, FocusEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { accent, eyebrowClass, fadeUp, initialContactForm } from "../../data/contact";
import type { ContactFormData } from "../../data/contact";
import { companyNames } from "../../data/companies";

type FormFieldEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;
type FormBlurEvent = FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;

const halfFields = [
  { id: "name", label: "Name", type: "text", autocomplete: "name", placeholder: "Your full name", required: true },
] as const;

const fullFields = [
  { id: "email", label: "Email Address", type: "email", autocomplete: "email", placeholder: "you@example.com", required: true },
] as const;

const subjectOptions = ["General Enquiry", ...companyNames];

const ledgerLabel = "text-xs font-bold uppercase tracking-wider text-slate-600";
const selectClass = "h-11 rounded-xl px-4 text-sm text-slate-900";
const errorText = "text-xs font-medium text-[#b91c1c]";

type FieldErrors = Partial<Record<keyof ContactFormData, string>>;

const validateField = (id: keyof ContactFormData, value: string): string => {
  switch (id) {
    case "name": {
      const trimmed = value.trim();
      if (trimmed.length < 2) return "Please enter your name.";
      if (!/[a-zA-Z\u00C0-\u024F]/.test(trimmed)) return "Name must contain letters.";
      return "";
    }
    case "phone": {
      const digits = value.replace(/\D/g, "");
      return /^\d{10}$/.test(digits) ? "" : "Enter a valid 10-digit phone number.";
    }
    case "email":
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) ? "" : "Enter a valid email address.";
    case "subject":
      return value.trim() ? "" : "Please select a subject or company.";
    case "message":
      return value.trim() ? "" : "Please enter your message.";
  }
};

const Field = ({
  id,
  label,
  type,
  autocomplete,
  placeholder,
  required,
  value,
  error,
  onChange,
  onBlur,
}: {
  id: keyof ContactFormData;
  label: string;
  type: string;
  autocomplete: string;
  placeholder: string;
  required: boolean;
  value: string;
  error?: string;
  onChange: (event: FormFieldEvent) => void;
  onBlur: (event: FormBlurEvent) => void;
}) => (
  <div className="space-y-2">
    <Label htmlFor={id} className={ledgerLabel}>
      {label}
    </Label>
    <Input
      id={id}
      name={id}
      type={type}
      autoComplete={autocomplete}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      required={required}
      aria-invalid={!!error}
      aria-describedby={error ? `${id}-error` : undefined}
      className="h-11 rounded-xl px-4 text-sm placeholder:text-slate-400"
    />
    {error && (
      <p id={`${id}-error`} role="alert" className={errorText}>
        {error}
      </p>
    )}
  </div>
);

type EnquiryFormProps = {
  initialCompany?: string;
  companyLocked?: boolean;
};

const EnquiryForm = ({ initialCompany, companyLocked = false }: EnquiryFormProps) => {
  const [form, setForm] = useState<ContactFormData>(() => ({
    ...initialContactForm,
    subject: initialCompany ?? "",
  }));
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const setFieldError = (id: keyof ContactFormData, message: string | undefined) => {
    setErrors((previous) => {
      const next = { ...previous };
      if (message) next[id] = message;
      else delete next[id];
      return next;
    });
  };

  const handleChange = (event: FormFieldEvent) => {
    const { name, value } = event.target;

    const nextValue = name === "phone" ? value.replace(/\D/g, "").slice(0, 10) : value;
    setForm((previous) => ({ ...previous, [name]: nextValue }));
    setFieldError(name as keyof ContactFormData, undefined);
  };

  const handleBlur = (event: FormBlurEvent) => {
    const { name, value } = event.target;
    setFieldError(name as keyof ContactFormData, validateField(name as keyof ContactFormData, value) || undefined);
  };

  const validateAll = (): FieldErrors => {
    const next: FieldErrors = {};
    (Object.keys(form) as (keyof ContactFormData)[]).forEach((id) => {
      const message = validateField(id, form[id]);
      if (message) next[id] = message;
    });
    return next;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError("");

    const nextErrors = validateAll();
    setErrors(nextErrors);
    const firstInvalid = (Object.keys(nextErrors) as (keyof ContactFormData)[])[0];
    if (firstInvalid) {
      document.getElementById(firstInvalid)?.focus();
      return;
    }

    setSending(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await response.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!response.ok || !data.ok) {
        throw new Error(data.error || "Something went wrong. Please try again later.");
      }
      setSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Please try again later.");
    } finally {
      setSending(false);
    }
  };

  return (
    <motion.div
      id="enquiry-form"
      {...fadeUp(0.1)}
      className="relative flex flex-1 flex-col overflow-hidden rounded-4xl border border-white bg-white px-6 pt-6 pb-2 shadow-xl sm:px-8 sm:pt-8 sm:pb-4"
    >
      <div
        className="absolute right-0 top-0 h-40 w-40 rounded-full blur-3xl"
        style={{ backgroundColor: "rgba(38,174,144,.09)" }}
      />
      <div
        className="absolute bottom-0 left-0 h-40 w-40 rounded-full blur-3xl"
        style={{ backgroundColor: "rgba(6,106,156,.09)" }}
      />

      <div className="relative flex flex-1 flex-col">
        <p className={eyebrowClass} style={{ color: accent.green }}>
          Send Your Enquiry
        </p>
        <p className="mt-3 text-sm leading-6 text-slate-500">
          Complete the form below and your enquiry will be addressed by our team.
        </p>

        <form onSubmit={handleSubmit} noValidate className="mt-8 flex flex-1 flex-col gap-5">
          <div className="grid gap-5 sm:grid-cols-2">
            {halfFields.map((field) => (
              <Field
                key={field.id}
                {...field}
                id={field.id}
                value={form[field.id]}
                error={errors[field.id]}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            ))}

            <div className="space-y-2">
              <Label htmlFor="phone" className={ledgerLabel}>
                Phone Number
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                maxLength={10}
                value={form.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="10-digit number"
                required
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? "phone-error" : undefined}
                className="h-11 rounded-xl px-4 text-sm placeholder:text-slate-400"
              />
              {errors.phone && (
                <p id="phone-error" role="alert" className={errorText}>
                  {errors.phone}
                </p>
              )}
            </div>
          </div>

          {fullFields.map((field) => (
            <Field
              key={field.id}
              {...field}
              id={field.id}
              value={form[field.id]}
              error={errors[field.id]}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          ))}

          <div className="space-y-2">
            <Label htmlFor="subject" className={ledgerLabel}>
              Subject / Company
            </Label>
            <Select
              id="subject"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={companyLocked}
              required
              aria-invalid={!!errors.subject}
              aria-describedby={errors.subject ? "subject-error" : undefined}
              className={`${selectClass} w-full disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-600`}
            >
              {companyLocked ? (
                <option value={initialCompany}>{initialCompany}</option>
              ) : (
                <>
                  <option value="" disabled>
                    Select a company…
                  </option>
                  {subjectOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </>
              )}
            </Select>
            {errors.subject && (
              <p id="subject-error" role="alert" className={errorText}>
                {errors.subject}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className={ledgerLabel}>
              Message
            </Label>
            <Textarea
              id="message"
              name="message"
              autoComplete="off"
              rows={4}
              value={form.message}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Write your enquiry here..."
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
              className="min-h-28 resize-none rounded-xl px-4 py-3 text-sm"
            />
            {errors.message && (
              <p id="message-error" role="alert" className={errorText}>
                {errors.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={sending}
            className="mt-auto h-12 w-full rounded-xl px-6 text-sm font-bold shadow-[0_8px_22px_rgba(38,174,144,0.25)] hover:-translate-y-0.5 disabled:hover:translate-y-0"
          >
            <Send size={17} />
            {sending ? "Sending…" : "Send Enquiry"}
          </Button>

          {submitError && (
            <p className="rounded-xl px-4 py-3 text-center text-sm font-medium" style={{ backgroundColor: "rgba(220,38,38,.08)", color: "#b91c1c" }}>
              {submitError}
            </p>
          )}

          {submitted && (
            <p className="rounded-xl px-4 py-3 text-center text-sm font-medium" style={{ backgroundColor: "rgba(38,174,144,.08)", color: "#14765f" }}>
              Your enquiry has been sent! Our team will get back to you shortly.
            </p>
          )}
        </form>
      </div>
    </motion.div>
  );
};

export default EnquiryForm;
