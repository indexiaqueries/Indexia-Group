import type { ChangeEvent, FocusEvent } from "react";
import type { ContactFormData } from "../../../data/contact";
import { companies } from "../../../data/companies";

export type FormFieldEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;
export type FormBlurEvent = FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;
export type FieldErrors = Partial<Record<keyof ContactFormData, string>>;

export const halfFields = [
  { id: "name", labelKey: "form.name", type: "text", autocomplete: "name", placeholderKey: "form.namePlaceholder", required: true },
] as const;

export const fullFields = [
  { id: "email", labelKey: "form.email", type: "email", autocomplete: "email", placeholderKey: "form.emailPlaceholder", required: true },
] as const;

export const subjectOptions: { value: string; labelKey?: string }[] = [
  { value: "General Enquiry", labelKey: "form.generalEnquiry" },
  ...companies.map((company) => ({ value: company.name, labelKey: `pageContent.companies.${company.slug}.name` })),
];

export const ledgerLabel = "text-xs font-bold uppercase tracking-wider text-slate-500";
export const selectClass = "h-11 rounded-xl px-4 text-sm text-slate-900 bg-white border-slate-300";
export const errorText = "text-xs font-medium text-(--color-danger)";
