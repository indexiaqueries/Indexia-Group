import { useState } from "react";
import type { CSSProperties } from "react";
import { Send } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { initialContactForm } from "../../data/contact";
import type { ContactFormData } from "../../data/contact";
import { accent } from "../../lib/theme";
import { useInView } from "../../hooks/useInView";
import Eyebrow from "../common/Eyebrow";
import Field from "./enquiry/Field";
import {
  errorText,
  fullFields,
  halfFields,
  ledgerLabel,
  selectClass,
  subjectOptions,
  type FieldErrors,
  type FormBlurEvent,
  type FormFieldEvent,
} from "./enquiry/fields";
import { validateField } from "./enquiry/validation";

type EnquiryFormProps = {
  initialCompany?: string;
  initialCompanyLabel?: string;
  companyLocked?: boolean;
  /** Pre-filled message (e.g. selected pricing package) — updates overwrite the message field. */
  initialMessage?: string;
};

const EnquiryForm = ({ initialCompany, initialCompanyLabel, companyLocked = false, initialMessage }: EnquiryFormProps) => {
  const { t } = useTranslation();

  const [form, setForm] = useState<ContactFormData>(() => ({
    ...initialContactForm,
    subject: initialCompany ?? "",
    message: initialMessage ?? "",
  }));

  // When a booking message arrives (e.g. a land-area or unipole package was
  // selected), overwrite only the message field — name/phone/email typed so far
  // are preserved instead of the form being reset.
  const [prevInitialMessage, setPrevInitialMessage] = useState(initialMessage);
  if (prevInitialMessage !== initialMessage) {
    setPrevInitialMessage(initialMessage);
    setForm((previous) => ({ ...previous, message: initialMessage ?? "" }));
  }


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
    setFieldError(name as keyof ContactFormData, validateField(name as keyof ContactFormData, value, t) || undefined);
  };

  const validateAll = (): FieldErrors => {
    const next: FieldErrors = {};
    (Object.keys(form) as (keyof ContactFormData)[]).forEach((id) => {
      const message = validateField(id, form[id], t);
      if (message) next[id] = message;
    });
    return next;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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
        throw new Error(data.error || t("form.errorGeneric"));
      }
      setSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : t("form.errorGeneric"));
    } finally {
      setSending(false);
    }
  };

  const [ref, inView] = useInView<HTMLDivElement>({ once: true, amount: 0.2 });

  return (
    <div
      ref={ref}
      id="enquiry-form"
      className={`reveal relative flex flex-1 flex-col overflow-hidden rounded-3xl sm:rounded-4xl border border-white bg-white px-4 pt-5 pb-2 shadow-xl sm:px-8 sm:pt-8 sm:pb-4${inView ? " is-in-view" : ""}`}
      style={{ "--reveal-delay": "0.1s" } as CSSProperties}
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
        <Eyebrow size="md" color={accent.green}>
          {t("form.eyebrow")}
        </Eyebrow>
        <p className="mt-3 text-sm leading-6 text-slate-500">{t("form.intro")}</p>

        <form onSubmit={handleSubmit} noValidate className="mt-6 sm:mt-8 flex flex-1 flex-col gap-4 sm:gap-5">
          <div className="grid gap-4 sm:gap-5 sm:grid-cols-2">
            {halfFields.map((field) => (
              <Field
                key={field.id}
                {...field}
                id={field.id}
                label={t(field.labelKey)}
                placeholder={t(field.placeholderKey)}
                value={form[field.id]}
                error={errors[field.id]}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            ))}

            <div className="space-y-2">
              <label htmlFor="phone" className={ledgerLabel}>
                {t("form.phone")}
              </label>
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
                placeholder={t("form.phonePlaceholder")}
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
              label={t(field.labelKey)}
              placeholder={t(field.placeholderKey)}
              value={form[field.id]}
              error={errors[field.id]}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          ))}

          <div className="space-y-2">
            <label htmlFor="subject" className={ledgerLabel}>
              {t("form.subject")}
            </label>
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
                <option value={initialCompany}>{initialCompanyLabel ?? initialCompany}</option>
              ) : (
                <>
                  <option value="" disabled>
                    {t("form.subjectPlaceholder")}
                  </option>
                  {subjectOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.labelKey ? t(option.labelKey, { defaultValue: option.value }) : option.value}
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
            <label htmlFor="message" className={ledgerLabel}>
              {t("form.message")}
            </label>
            <Textarea
              id="message"
              name="message"
              autoComplete="off"
              rows={4}
              value={form.message}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={t("form.messagePlaceholder")}
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
            {sending ? t("form.sending") : t("form.submit")}
          </Button>

          {submitError && (
            <p className="rounded-xl px-4 py-3 text-center text-sm font-medium" style={{ backgroundColor: "rgba(220,38,38,.08)", color: "var(--color-danger)" }}>
              {submitError}
            </p>
          )}

          {submitted && (
            <p className="rounded-xl px-4 py-3 text-center text-sm font-medium" style={{ backgroundColor: "rgba(38,174,144,.08)", color: "var(--color-success)" }}>
              {t("form.success")}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default EnquiryForm;
