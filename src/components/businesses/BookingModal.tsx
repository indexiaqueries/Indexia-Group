import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { Building2, CalendarDays, CheckCircle2, Clock3, FileImage, Globe, Loader2, Mail, MessageSquare, Phone, User, X } from "lucide-react";
import { API_BASE } from "../../lib/api";
import { sendWeb3Forms } from "../../lib/web3forms";

export type BookingContext = {
  /** Company this booking belongs to, e.g. "Indexia Warehouse". */
  companyName: string;
  /** Selected offering, e.g. "2 Acre Plot" / "Unipole 10×20 ft". */
  itemLabel: string;
  /** Area / rate detail shown under the selection chip. */
  itemDetail?: string;
};

type FormState = {
  name: string;
  phone: string;
  email: string;
  company: string;
  website: string;
  startDate: string;
  duration: string;
  artwork: string;
  notes: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

type BookingModalProps = {
  context: BookingContext;
  /** "warehouse" shows intended-use prompt; "advertising" shows artwork status. */
  variant: "warehouse" | "advertising";
  onClose: () => void;
};

const inputClass =
  "h-11 w-full rounded-xl border border-(--color-line) bg-white px-3.5 text-sm text-(--color-ink) outline-none transition placeholder:text-(--color-muted) focus:border-(--color-teal) focus:ring-4 focus:ring-(--color-teal)/10";
const labelClass = "text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500";
const errorClass = "text-xs font-medium text-(--color-danger)";

const DURATIONS = ["1 month", "3 months", "6 months", "12 months", "Long term"];

const BookingModal = ({ context, variant, onClose }: BookingModalProps) => {
  const { t } = useTranslation();
  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    email: "",
    company: "",
    website: "",
    startDate: "",
    duration: "3 months",
    artwork: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [serverError, setServerError] = useState("");
  const [done, setDone] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Escape to close, focus trap start, scroll lock.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  const set = (id: keyof FormState, value: string) => {
    setForm((f) => ({ ...f, [id]: value }));
    setErrors((e) => ({ ...e, [id]: "" }));
  };

  const validate = (): Errors => {
    const next: Errors = {};
    if (form.name.trim().length < 2) next.name = t("form.errorName");
    if (!/^\d{10}$/.test(form.phone.replace(/\D/g, ""))) next.phone = t("form.errorPhone");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = t("form.errorEmail");
    if (!form.company.trim()) next.company = t("bookingModal.errorCompany");
    if (!form.startDate) next.startDate = t("bookingModal.errorStartDate");
    if (!form.duration) next.duration = t("bookingModal.errorDuration");
    if (variant === "advertising" && !form.artwork) next.artwork = t("bookingModal.errorArtwork");
    return next;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.values(next).some(Boolean)) return;

    setSending(true);
    setServerError("");
    try {
      const detailLines = [
        t("bookingModal.messageInterested", { item: context.itemLabel, company: context.companyName }),
        context.itemDetail ? `${t("bookingModal.messageDetail")}: ${context.itemDetail}` : "",
        form.company ? `${t("bookingModal.companyBrand")}: ${form.company}` : "",
        form.website ? `${t("bookingModal.website")}: ${form.website}` : "",
        `${t("bookingModal.startDate")}: ${form.startDate}`,
        `${t("bookingModal.duration")}: ${t(`bookingModal.duration_${form.duration.replace(" ", "_")}`, { defaultValue: form.duration })}`,
        variant === "advertising" && form.artwork
          ? `${t("bookingModal.artworkStatus")}: ${t(`bookingModal.artwork_${form.artwork}`)}`
          : "",
        form.notes ? `${t("bookingModal.notes")}: ${form.notes}` : "",
      ].filter(Boolean);

      const response = await fetch(`${API_BASE}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone.trim(),
          email: form.email.trim(),
          subject: `${t("bookingModal.subjectPrefix")} — ${context.companyName} (${context.itemLabel})`,
          message: detailLines.join("\n"),
        }),
      });
      const data = (await response.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!response.ok || !data.ok) {
        throw new Error(data.error || t("form.errorGeneric"));
      }
      // DB write succeeded — fire the Web3Forms email copy in the
      // background; a failure here must not fail the booking.
      void sendWeb3Forms({
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        subject: `${t("bookingModal.subjectPrefix")} — ${context.companyName} (${context.itemLabel})`,
        message: detailLines.join("\n"),
        from_name: "Indexia Group Booking",
      });
      setDone(true);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : t("form.errorGeneric"));
    } finally {
      setSending(false);
    }
  };

  const itemChip = (
    <div
      className="flex flex-wrap items-center gap-2 rounded-2xl px-4 py-3"
      style={{ background: "rgba(10,34,51,0.08)" } as CSSProperties}
    >
      <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
        {t("bookingModal.yourSelection")}
      </span>
      <span className="text-sm font-bold text-(--color-ink)">
        {context.itemLabel}
        {context.itemDetail ? <span className="ms-2 text-xs font-medium text-slate-500">{context.itemDetail}</span> : null}
      </span>
    </div>
  );

  return createPortal(
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center overflow-y-auto bg-(--color-ink-deep)/70 p-3 backdrop-blur-sm sm:p-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={t("bookingModal.title")}
        tabIndex={-1}
        className="relative my-auto w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl outline-none"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={t("bookingModal.close")}
          className="absolute end-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200 hover:text-slate-700"
        >
          <X size={16} />
        </button>

        <div className="max-h-[calc(100svh-3rem)] overflow-y-auto px-5 pb-6 pt-6 sm:px-8">
          {done ? (
            <div className="flex flex-col items-center py-12 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-(--color-teal)/10 text-(--color-teal)">
                <CheckCircle2 size={24} />
              </span>
              <h3 className="font-display mt-4 text-xl font-bold text-(--color-ink)">{t("bookingModal.successTitle")}</h3>
              <p className="mt-2 max-w-sm text-sm leading-6 text-(--color-muted)">{t("bookingModal.successBody")}</p>
              <button
                type="button"
                onClick={onClose}
                className="mt-6 rounded-full bg-(--color-teal) px-6 py-2.5 text-sm font-bold text-white transition hover:bg-(--color-teal-deep)"
              >
                {t("bookingModal.done")}
              </button>
            </div>
          ) : (
            <>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-(--color-teal)">
                {t("bookingModal.eyebrow")}
              </p>
              <h3 className="font-display mt-2 text-xl font-bold leading-tight text-(--color-blue) sm:text-2xl">
                {t("bookingModal.title", { item: context.itemLabel })}
              </h3>
              <p className="mt-1.5 text-[13px] leading-5 text-(--color-muted)">{t("bookingModal.subtitle")}</p>

              <div className="mt-4">{itemChip}</div>

              <form onSubmit={handleSubmit} noValidate className="mt-5 grid gap-3.5 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label htmlFor="bm-name" className={labelClass}>
                    <User size={11} className="me-1 inline" /> {t("form.name")} *
                  </label>
                  <input
                    id="bm-name"
                    type="text"
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                    placeholder={t("form.namePlaceholder")}
                    autoComplete="name"
                    className={inputClass}
                  />
                  {errors.name && <p className={errorClass}>{errors.name}</p>}
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="bm-phone" className={labelClass}>
                    <Phone size={11} className="me-1 inline" /> {t("form.phone")} *
                  </label>
                  <input
                    id="bm-phone"
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    placeholder={t("form.phonePlaceholder")}
                    autoComplete="tel-national"
                    className={inputClass}
                  />
                  {errors.phone && <p className={errorClass}>{errors.phone}</p>}
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label htmlFor="bm-email" className={labelClass}>
                    <Mail size={11} className="me-1 inline" /> {t("form.email")} *
                  </label>
                  <input
                    id="bm-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    placeholder={t("form.emailPlaceholder")}
                    autoComplete="email"
                    className={inputClass}
                  />
                  {errors.email && <p className={errorClass}>{errors.email}</p>}
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="bm-company" className={labelClass}>
                    <Building2 size={11} className="me-1 inline" /> {t("bookingModal.companyBrand")} *
                  </label>
                  <input
                    id="bm-company"
                    type="text"
                    value={form.company}
                    onChange={(e) => set("company", e.target.value)}
                    placeholder={t("bookingModal.companyPlaceholder")}
                    autoComplete="organization"
                    className={inputClass}
                  />
                  {errors.company && <p className={errorClass}>{errors.company}</p>}
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="bm-website" className={labelClass}>
                    <Globe size={11} className="me-1 inline" /> {t("bookingModal.website")}
                  </label>
                  <input
                    id="bm-website"
                    type="url"
                    value={form.website}
                    onChange={(e) => set("website", e.target.value)}
                    placeholder={t("bookingModal.websitePlaceholder")}
                    autoComplete="url"
                    className={inputClass}
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="bm-start" className={labelClass}>
                    <CalendarDays size={11} className="me-1 inline" /> {t("bookingModal.startDate")} *
                  </label>
                  <input
                    id="bm-start"
                    type="date"
                    min={new Date().toISOString().slice(0, 10)}
                    value={form.startDate}
                    onChange={(e) => set("startDate", e.target.value)}
                    className={inputClass}
                  />
                  {errors.startDate && <p className={errorClass}>{errors.startDate}</p>}
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="bm-duration" className={labelClass}>
                    <Clock3 size={11} className="me-1 inline" /> {t("bookingModal.duration")} *
                  </label>
                  <select
                    id="bm-duration"
                    value={form.duration}
                    onChange={(e) => set("duration", e.target.value)}
                    className={inputClass}
                  >
                    {DURATIONS.map((d) => (
                      <option key={d} value={d}>
                        {t(`bookingModal.duration_${d.replace(" ", "_")}`, { defaultValue: d })}
                      </option>
                    ))}
                  </select>
                  {errors.duration && <p className={errorClass}>{errors.duration}</p>}
                </div>

                {variant === "advertising" && (
                  <div className="space-y-1.5 sm:col-span-2">
                    <label htmlFor="bm-artwork" className={labelClass}>
                      <FileImage size={11} className="me-1 inline" /> {t("bookingModal.artworkStatus")} *
                    </label>
                    <select
                      id="bm-artwork"
                      value={form.artwork}
                      onChange={(e) => set("artwork", e.target.value)}
                      className={inputClass}
                    >
                      <option value="">{t("bookingModal.artworkPlaceholder")}</option>
                      <option value="ready">{t("bookingModal.artwork_ready")}</option>
                      <option value="design_needed">{t("bookingModal.artwork_design_needed")}</option>
                      <option value="later">{t("bookingModal.artwork_later")}</option>
                    </select>
                    {errors.artwork && <p className={errorClass}>{errors.artwork}</p>}
                  </div>
                )}

                <div className="space-y-1.5 sm:col-span-2">
                  <label htmlFor="bm-notes" className={labelClass}>
                    <MessageSquare size={11} className="me-1 inline" /> {t("bookingModal.notes")}
                  </label>
                  <textarea
                    id="bm-notes"
                    rows={2}
                    value={form.notes}
                    onChange={(e) => set("notes", e.target.value)}
                    placeholder={variant === "advertising" ? t("bookingModal.notesPlaceholderAd") : t("bookingModal.notesPlaceholderWh")}
                    className="w-full resize-none rounded-xl border border-(--color-line) bg-white px-3.5 py-2.5 text-sm text-(--color-ink) outline-none transition placeholder:text-(--color-muted) focus:border-(--color-teal) focus:ring-4 focus:ring-(--color-teal)/10"
                  />
                </div>

                {serverError && (
                  <p className="rounded-xl px-4 py-3 text-center text-sm font-medium sm:col-span-2" style={{ backgroundColor: "rgba(220,38,38,.08)", color: "var(--color-danger)" }}>
                    {serverError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={sending}
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-(--color-yellow) px-6 text-sm font-bold text-(--color-yellow-ink) shadow-[0_8px_22px_rgba(242,242,49,0.35)] transition hover:-translate-y-0.5 hover:bg-(--color-yellow-bright) disabled:hover:translate-y-0 sm:col-span-2"
                >
                  {sending ? <Loader2 size={16} className="animate-spin" /> : null}
                  {sending ? t("bookingModal.submitting") : t("bookingModal.submit")}
                </button>
                <p className="text-center text-[11px] text-slate-400 sm:col-span-2">{t("bookingModal.responseNote")}</p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default BookingModal;
