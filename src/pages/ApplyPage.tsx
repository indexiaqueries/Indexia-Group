import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, Upload, Send, CheckCircle, User, Mail, Phone, Briefcase, FileText } from "lucide-react";
import SEO from "../components/common/SEO";
import Eyebrow from "../components/common/Eyebrow";
import Reveal from "../components/common/Reveal";

const ApplyPage = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const roleTitle = searchParams.get("role");
  const department = searchParams.get("dept") || "";
  const [roleData, setRoleData] = useState<{ description?: string; requirements?: string[]; company?: string; location?: string } | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    resumeFileName: "",
    intro: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!roleTitle) return;
    fetch("/api/openings")
      .then((r) => r.json())
      .then((data) => {
        if (data.ok && data.openings) {
          const match = data.openings.find((o: { title: string; department: string }) => o.title === roleTitle && o.department === department);
          if (match) setRoleData(match);
        }
      })
      .catch(() => {});
  }, [roleTitle, department]);

  if (!roleTitle) return <Navigate to="/careers" replace />;

  const validateField = (field: string, value: string): string => {
    switch (field) {
      case "name":
        if (!value.trim()) return t("applyPage.errorNameEmpty");
        if (value.trim().length < 2) return t("applyPage.errorNameShort");
        if (!/[a-zA-Z]/.test(value)) return t("applyPage.errorNameLetters");
        return "";
      case "email":
        if (!value.trim()) return t("applyPage.errorEmailEmpty");
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return t("applyPage.errorEmailInvalid");
        return "";
      case "phone":
        if (!value.trim()) return t("applyPage.errorPhoneEmpty");
        if (!/^\d{10}$/.test(value.replace(/\D/g, ""))) return t("applyPage.errorPhoneInvalid");
        return "";
      case "experience":
        if (!value) return t("applyPage.errorExperience");
        return "";
      case "resume":
        if (!formData.resumeFileName) return t("applyPage.errorResume");
        return "";
      case "intro":
        if (!value.trim()) return t("applyPage.errorIntroEmpty");
        if (value.trim().length < 20) return t("applyPage.errorIntroShort");
        return "";
      default:
        return "";
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    for (const field of ["name", "email", "phone", "experience", "resume", "intro"]) {
      const err = validateField(field, field === "resume" ? "" : (formData as Record<string, string>)[field]);
      if (err) newErrors[field] = err;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (field: string) => {
    const err = validateField(field, (formData as Record<string, string>)[field]);
    setErrors((prev) => {
      if (err) return { ...prev, [field]: err };
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const clearError = (field: string) => {
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, resume: t("applyPage.errorFileSize") }));
        return;
      }
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!allowedTypes.includes(file.type)) {
        setErrors((prev) => ({ ...prev, resume: t("applyPage.errorFileType") }));
        return;
      }
      setFormData((prev) => ({ ...prev, resumeFileName: file.name }));
      setErrors((prev) => {
        const next = { ...prev };
        delete next.resume;
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const body = new FormData();
      body.append("name", formData.name);
      body.append("email", formData.email);
      body.append("phone", formData.phone);
      body.append("experience", formData.experience);
      body.append("intro", formData.intro);
      body.append("roleTitle", roleTitle);
      body.append("department", department);

      const file = fileInputRef.current?.files?.[0];
      if (file) body.append("resume", file);

      const response = await fetch("/api/apply", {
        method: "POST",
        body,
      });
      const data = (await response.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!response.ok || !data.ok) {
        throw new Error(data.error || t("applyPage.errorSubmit"));
      }
      setIsSubmitted(true);
    } catch (err) {
      setErrors({
        submit: err instanceof Error ? err.message : t("applyPage.errorSubmit"),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ── Success State ─────────────────────────────────────────── */

  if (isSubmitted) {
    return (
      <main className="bg-white">
        <SEO
          title={`${t("applyPage.successTitle")} - Indexia Group`}
          description={t("applyPage.successTitle")}
          keywords={`Indexia Group jobs, ${roleTitle}, career application`}
          canonicalPath="/careers/apply"
          noindex
        />
        <section className="relative overflow-hidden bg-(--color-ink-deep) px-2 py-8 pt-16 sm:px-3 sm:py-10 sm:pt-20 lg:px-5 lg:py-14 lg:pt-24">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(circle at 50% 50%, rgba(38,174,144,0.15), transparent 60%)" }} />
          <div className="relative mx-auto max-w-2xl text-center">
            <Reveal>
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-(--color-teal)/15 ring-1 ring-(--color-teal)/30">
                <CheckCircle size={40} className="text-(--color-teal)" />
              </div>
              <h1 className="font-display text-[clamp(28px,5vw,40px)] font-bold text-white">
                {t("applyPage.successTitle")}
              </h1>
              <p
                className="mx-auto mt-4 max-w-lg text-[13px] sm:text-sm leading-6 text-white/70"
                dangerouslySetInnerHTML={{ __html: t("applyPage.successBody", { role: roleTitle }) }}
              />

              <div className="mx-auto mt-6 max-w-sm rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm">
                <p className="text-xs font-bold uppercase tracking-wider text-white/50">{t("applyPage.successSentTo")}</p>
                <p className="mt-2 text-sm font-semibold text-(--color-teal)">hr@indexiafinance.com</p>
                <p className="text-sm font-semibold text-(--color-teal)">hr.indexia@gmail.com</p>
              </div>

              <Link
                to="/careers"
                className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/20"
              >
                <ArrowLeft size={16} strokeWidth={2.5} />
                {t("applyPage.backToCareers")}
              </Link>
            </Reveal>
          </div>
        </section>
      </main>
    );
  }

  /* ── Form State ────────────────────────────────────────────── */

  return (
    <main className="bg-white">
      <SEO          title={`${t("applyPage.heroTitle")} ${roleTitle} - Indexia Group`}
          description={`${t("applyPage.heroTitle")} ${roleTitle} - Indexia Group`}
        keywords={`Indexia Group careers, ${roleTitle} job, apply ${roleTitle}, Indexia Finance jobs`}
        canonicalPath="/careers/apply"
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-(--color-ink-deep) px-2 py-8 pt-16 sm:px-3 sm:py-10 sm:pt-20 lg:px-5 lg:py-14 lg:pt-24">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(circle at 20% 80%, rgba(38,174,144,0.2), transparent 50%), radial-gradient(circle at 80% 20%, rgba(242,242,49,0.12), transparent 45%)" }} />
        <div className="relative mx-auto max-w-4xl">
          <Link
            to="/careers"
            className="mb-6 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white/50 transition-colors hover:text-(--color-yellow)"
          >
            <ArrowLeft size={14} strokeWidth={2.5} />
            {t("applyPage.backToCareers")}
          </Link>
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-10 bg-(--color-yellow)/60" />
            <Eyebrow color="var(--color-yellow)" size="md">
              {t("careersPage.apply")}
            </Eyebrow>
            <span className="h-px w-10 bg-(--color-yellow)/60" />
          </div>
          <h1 className="font-display text-[clamp(28px,5vw,44px)] font-bold leading-[1.1] text-white">
            {t("applyPage.heroTitle")} <span className="text-(--color-yellow)">{roleTitle}</span>
          </h1>
          {department && (
            <p className="mt-3 font-ledger text-[11px] sm:text-xs uppercase tracking-[0.18em] text-(--color-teal)/80">{department}</p>
          )}
        </div>
      </section>

      {/* Top divider */}
      <div aria-hidden="true" className="h-px w-full bg-linear-to-r from-transparent via-(--color-teal)/35 to-transparent" />

      {/* Role Details */}
      {roleData && (roleData.description || (roleData.requirements && roleData.requirements.length > 0)) && (
        <section className="bg-white px-2 py-5 sm:px-3 sm:py-6 lg:px-5">
          <div className="mx-auto max-w-2xl">
            <Reveal>
              <div className="rounded-2xl border border-slate-100 bg-(--color-soft) p-5 sm:p-6">
                <h2 className="font-display text-[15px] sm:text-base font-bold text-slate-900">{t("applyPage.roleDetails")}</h2>
                {roleData.description && (
                  <p className="mt-2 text-[13px] sm:text-sm leading-6 text-slate-600">{roleData.description}</p>
                )}
                {roleData.requirements && roleData.requirements.length > 0 && (
                  <div className="mt-4">
                    <h3 className="mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">{t("applyPage.responsibilities")}</h3>
                    <ul className="space-y-1.5">
                      {roleData.requirements.map((req, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-[12px] sm:text-[13px] leading-5 text-slate-600">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-(--color-teal)" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="mt-4 flex flex-wrap items-center gap-3 text-[11px] text-slate-400">
                  {roleData.company && <span>{roleData.company}</span>}
                  {roleData.location && <span>· {roleData.location}</span>}
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* Form */}
      <section className="px-2 py-8 sm:px-3 sm:py-10 lg:px-5">
        <div className="mx-auto max-w-2xl">
          <Reveal>
            {/* Info banner */}
            <div className="mb-6 rounded-2xl border border-(--color-teal)/15 bg-(--color-teal)/5 p-4 sm:p-5">
              <p className="text-[12px] sm:text-[13px] leading-5 text-slate-600">
                {t("applyPage.infoBanner")}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name & Email row */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="apply-name" className="mb-1.5 flex items-center gap-1.5 text-[13px] font-bold text-slate-700">
                    <User size={14} className="text-(--color-teal)" />
                    {t("applyPage.fullName")}
                  </label>
                  <input
                    id="apply-name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => { setFormData((prev) => ({ ...prev, name: e.target.value })); clearError("name"); }}
                    onBlur={() => handleBlur("name")}
                    placeholder={t("applyPage.fullNamePlaceholder")}
                    aria-required="true"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "apply-name-error" : undefined}
                    className={`w-full rounded-xl border ${errors.name ? "border-red-400 bg-red-50/50" : "border-slate-200 bg-white"} px-4 py-3 text-[14px] text-(--color-ink) outline-none transition-all focus:border-(--color-teal) focus:ring-2 focus:ring-(--color-teal)/15`}
                  />
                  {errors.name && <p id="apply-name-error" role="alert" className="mt-1 text-[11px] text-red-500">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="apply-email" className="mb-1.5 flex items-center gap-1.5 text-[13px] font-bold text-slate-700">
                    <Mail size={14} className="text-(--color-teal)" />
                    {t("applyPage.email")}
                  </label>
                  <input
                    id="apply-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => { setFormData((prev) => ({ ...prev, email: e.target.value })); clearError("email"); }}
                    onBlur={() => handleBlur("email")}
                    placeholder="you@example.com"
                    aria-required="true"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "apply-email-error" : undefined}
                    className={`w-full rounded-xl border ${errors.email ? "border-red-400 bg-red-50/50" : "border-slate-200 bg-white"} px-4 py-3 text-[14px] text-(--color-ink) outline-none transition-all focus:border-(--color-teal) focus:ring-2 focus:ring-(--color-teal)/15`}
                  />
                  {errors.email && <p id="apply-email-error" role="alert" className="mt-1 text-[11px] text-red-500">{errors.email}</p>}
                </div>
              </div>

              {/* Phone & Experience row */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="apply-phone" className="mb-1.5 flex items-center gap-1.5 text-[13px] font-bold text-slate-700">
                    <Phone size={14} className="text-(--color-teal)" />
                    {t("applyPage.phone")}
                  </label>
                  <input
                    id="apply-phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => { setFormData((prev) => ({ ...prev, phone: e.target.value })); clearError("phone"); }}
                    onBlur={() => handleBlur("phone")}
                    placeholder={t("applyPage.phonePlaceholder")}
                    aria-required="true"
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? "apply-phone-error" : undefined}
                    className={`w-full rounded-xl border ${errors.phone ? "border-red-400 bg-red-50/50" : "border-slate-200 bg-white"} px-4 py-3 text-[14px] text-(--color-ink) outline-none transition-all focus:border-(--color-teal) focus:ring-2 focus:ring-(--color-teal)/15`}
                  />
                  {errors.phone && <p id="apply-phone-error" role="alert" className="mt-1 text-[11px] text-red-500">{errors.phone}</p>}
                </div>
                <div>
                  <label htmlFor="apply-experience" className="mb-1.5 flex items-center gap-1.5 text-[13px] font-bold text-slate-700">
                    <Briefcase size={14} className="text-(--color-teal)" />
                    {t("applyPage.experience")}
                  </label>
                  <select
                    id="apply-experience"
                    value={formData.experience}
                    onChange={(e) => { setFormData((prev) => ({ ...prev, experience: e.target.value })); clearError("experience"); }}
                    onBlur={() => handleBlur("experience")}
                    aria-required="true"
                    aria-invalid={!!errors.experience}
                    aria-describedby={errors.experience ? "apply-experience-error" : undefined}
                    className={`w-full rounded-xl border ${errors.experience ? "border-red-400 bg-red-50/50" : "border-slate-200 bg-white"} px-4 py-3 text-[14px] text-(--color-ink) outline-none transition-all focus:border-(--color-teal) focus:ring-2 focus:ring-(--color-teal)/15`}
                  >
                    <option value="">{t("applyPage.selectExperience")}</option>
                    <option value="Fresher">{t("applyPage.fresher")}</option>
                    <option value="Less than 1 year">{t("applyPage.lessThan1Year")}</option>
                    <option value="1-2 years">{t("applyPage.1to2Years")}</option>
                    <option value="2-5 years">{t("applyPage.2to5Years")}</option>
                    <option value="5+ years">{t("applyPage.5plusYears")}</option>
                  </select>
                  {errors.experience && <p id="apply-experience-error" role="alert" className="mt-1 text-[11px] text-red-500">{errors.experience}</p>}
                </div>
              </div>

              {/* Resume */}
              <div>
                <label htmlFor="apply-resume" className="mb-1.5 flex items-center gap-1.5 text-[13px] font-bold text-slate-700">
                  <FileText size={14} className="text-(--color-teal)" />
                  {t("applyPage.resume")}
                </label>
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => fileInputRef.current?.click()}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); fileInputRef.current?.click(); } }}
                  aria-describedby={errors.resume ? "apply-resume-error" : undefined}
                  className={`group flex cursor-pointer items-center gap-3 rounded-xl border-2 border-dashed ${errors.resume ? "border-red-400 bg-red-50/50" : "border-slate-200 bg-(--color-soft)"} px-4 py-4 transition-all hover:border-(--color-teal)/40 hover:bg-white focus:border-(--color-teal) focus:ring-2 focus:ring-(--color-teal)/15 focus:outline-none`}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-(--color-teal)/10 text-(--color-teal) transition-colors group-hover:bg-(--color-teal)/15">
                    <Upload size={18} aria-hidden="true" />
                  </div>
                  <div className="min-w-0 flex-1">
                    {formData.resumeFileName ? (
                      <>
                        <p className="truncate text-sm font-semibold text-(--color-ink)">{formData.resumeFileName}</p>
                        <p className="text-[11px] text-(--color-teal)">{t("applyPage.clickToReplace")}</p>
                      </>
                    ) : (
                      <>
                        <p className="text-sm font-semibold text-(--color-ink)">{t("applyPage.clickToUpload")}</p>
                        <p className="text-[11px] text-(--color-muted)">{t("applyPage.resumeFormats")}</p>
                      </>
                    )}
                  </div>
                </div>
                <input
                  ref={fileInputRef}
                  id="apply-resume"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="sr-only"
                  aria-required="true"
                />
                {errors.resume && <p id="apply-resume-error" role="alert" className="mt-1 text-[11px] text-red-500">{errors.resume}</p>}
              </div>

              {/* Intro */}
              <div>
                <label htmlFor="apply-intro" className="mb-1.5 flex items-center gap-1.5 text-[13px] font-bold text-slate-700">
                  <FileText size={14} className="text-(--color-teal)" />
                  {t("applyPage.tellUsAboutYourself")}
                </label>
                <textarea
                  id="apply-intro"
                  value={formData.intro}
                  onChange={(e) => { setFormData((prev) => ({ ...prev, intro: e.target.value })); clearError("intro"); }}
                  onBlur={() => handleBlur("intro")}
                  placeholder={t("applyPage.introPlaceholder")}
                  rows={5}
                  maxLength={1000}
                  aria-required="true"
                  aria-invalid={!!errors.intro}
                  aria-describedby={errors.intro ? "apply-intro-error" : undefined}
                  className={`w-full rounded-xl border ${errors.intro ? "border-red-400 bg-red-50/50" : "border-slate-200 bg-white"} px-4 py-3 text-[14px] leading-6 text-(--color-ink) outline-none transition-all focus:border-(--color-teal) focus:ring-2 focus:ring-(--color-teal)/15 resize-none`}
                />
                <div className="mt-1 flex items-center justify-between">
                  {errors.intro ? (
                    <p id="apply-intro-error" role="alert" className="text-[11px] text-red-500">{errors.intro}</p>
                  ) : (
                    <span />
                  )}
                  <span className={`text-[11px] ${formData.intro.length > 900 ? "text-amber-500" : "text-slate-400"}`}>
                    {formData.intro.length}/1000
                  </span>
                </div>
              </div>

              {/* Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-(--color-teal) px-6 py-3.5 text-[13px] sm:text-sm font-bold text-white shadow-[0_4px_16px_rgba(38,174,144,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-(--color-teal-deep) hover:shadow-[0_6px_20px_rgba(38,174,144,0.4)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      {t("applyPage.submitting")}
                    </>
                  ) : (
                    <>
                      <Send size={15} strokeWidth={2.5} />
                      {t("applyPage.submitApplication")}
                    </>
                  )}
                </button>
              </div>

              {errors.submit && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-center text-sm font-medium text-red-600">
                  {errors.submit}
                </div>
              )}
              <p className="text-center text-[11px] text-slate-400">
                {t("applyPage.submitNote")}
              </p>
            </form>
          </Reveal>
        </div>
      </section>
    </main>
  );
};

export default ApplyPage;
