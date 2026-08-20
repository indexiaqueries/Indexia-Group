import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams, Link } from "react-router-dom";
import { ArrowLeft, Upload, Send, CheckCircle, User, Mail, Phone, Briefcase, FileText } from "lucide-react";
import SEO from "../components/common/SEO";
import Eyebrow from "../components/common/Eyebrow";
import Reveal from "../components/common/Reveal";

const ApplyPage = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const roleTitle = searchParams.get("role") || "Open Position";
  const department = searchParams.get("dept") || "";

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

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Please enter your name.";
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Please enter a valid email address.";
    if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone.replace(/\D/g, "")))
      newErrors.phone = "Please enter a valid 10-digit phone number.";
    if (!formData.experience) newErrors.experience = "Please select your experience level.";
    if (!formData.resumeFileName) newErrors.resume = "Please upload your resume.";
    if (!formData.intro.trim()) newErrors.intro = "Please tell us about yourself.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, resume: "File size must be under 5MB." }));
        return;
      }
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!allowedTypes.includes(file.type)) {
        setErrors((prev) => ({ ...prev, resume: "Only PDF, DOC, or DOCX files are accepted." }));
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
        throw new Error(data.error || "Could not submit your application. Please try again later.");
      }
      setIsSubmitted(true);
    } catch (err) {
      setErrors({
        submit: err instanceof Error ? err.message : "Could not submit your application. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <main className="bg-white">
        <SEO
          title={`Application for ${roleTitle} - Indexia Group`}
          description={`Your application for the ${roleTitle} position at Indexia Group has been submitted successfully.`}
          keywords={`Indexia Group jobs, ${roleTitle}, career application`}
          canonicalPath="/careers/apply"
          noindex
        />
        <div className="flex min-h-screen items-center justify-center px-5">
          <Reveal>
            <div className="mx-auto max-w-md text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-(--color-teal)/10">
                <CheckCircle size={40} className="text-(--color-teal)" />
              </div>
              <h1 className="font-display text-2xl font-bold text-(--color-ink)">Application Submitted!</h1>
              <p className="mt-4 text-[15px] leading-7 text-(--color-muted)">
                Thank you for applying for the <strong>{roleTitle}</strong> position. Our HR team has received your application and will review it shortly.
              </p>
              <div className="mt-6 rounded-xl border border-slate-200 bg-(--color-soft) p-4 text-sm text-slate-600">
                <p className="font-semibold text-(--color-ink)">Application sent to:</p>
                <p className="mt-1 text-(--color-teal)">hr@indexiafinance.com</p>
                <p className="text-(--color-teal)">hr.indexia@gmail.com</p>
              </div>
              <Link
                to="/careers"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-(--color-teal) px-6 py-3 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-(--color-teal-deep)"
              >
                <ArrowLeft size={16} strokeWidth={2.5} />
                Back to Careers
              </Link>
            </div>
          </Reveal>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-white">
      <SEO
        title={`Apply for ${roleTitle} - Indexia Group`}
        description={`Apply for the ${roleTitle} position at Indexia Group. Submit your application with resume and cover letter.`}
        keywords={`Indexia Group careers, ${roleTitle} job, apply ${roleTitle}, Indexia Finance jobs Mumbai`}
        canonicalPath="/careers/apply"
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-(--color-ink-deep) px-5 py-20 pt-28 sm:px-6 sm:py-24 sm:pt-32 lg:px-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(circle at 20% 80%, rgba(38,174,144,0.3), transparent 50%), radial-gradient(circle at 80% 20%, rgba(242,242,49,0.15), transparent 45%)",
          }}
        />
        <div className="container relative mx-auto max-w-3xl">
          <Link
            to="/careers"
            className="mb-6 inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.18em] text-white/60 transition-colors hover:text-(--color-yellow)"
          >
            <ArrowLeft size={14} strokeWidth={2.5} />
            Back to Careers
          </Link>
          <Eyebrow color="var(--color-yellow)" className="mb-3">
            {t("careersPage.apply")}
          </Eyebrow>
          <h1 className="font-display text-[clamp(28px,5vw,44px)] font-bold leading-[1.1] text-white">
            Apply for <span className="text-(--color-yellow)">{roleTitle}</span>
          </h1>
          {department && (
            <p className="mt-3 text-sm font-semibold text-white/60">{department}</p>
          )}
        </div>
      </section>

      {/* Form */}
      <section className="px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="container mx-auto max-w-2xl">
          <Reveal>
            <p className="mb-8 text-[15px] leading-7 text-(--color-muted)">
              Fill out the form below and we'll open your email client with all the details. Just attach your resume and hit send!
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="apply-name" className="mb-2 flex items-center gap-2 text-sm font-bold text-(--color-ink)">
                  <User size={16} className="text-(--color-teal)" />
                  Full Name *
                </label>
                <input
                  id="apply-name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Your full name"
                  aria-required="true"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "apply-name-error" : undefined}
                  className={`w-full rounded-xl border ${errors.name ? "border-red-400" : "border-slate-200"} bg-white px-4 py-3 text-[15px] text-(--color-ink) outline-none transition-colors focus:border-(--color-teal) focus:ring-2 focus:ring-(--color-teal)/20`}
                />
                {errors.name && <p id="apply-name-error" role="alert" className="mt-1.5 text-xs text-red-500">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="apply-email" className="mb-2 flex items-center gap-2 text-sm font-bold text-(--color-ink)">
                  <Mail size={16} className="text-(--color-teal)" />
                  Email Address *
                </label>
                <input
                  id="apply-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  placeholder="you@example.com"
                  aria-required="true"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "apply-email-error" : undefined}
                  className={`w-full rounded-xl border ${errors.email ? "border-red-400" : "border-slate-200"} bg-white px-4 py-3 text-[15px] text-(--color-ink) outline-none transition-colors focus:border-(--color-teal) focus:ring-2 focus:ring-(--color-teal)/20`}
                />
                {errors.email && <p id="apply-email-error" role="alert" className="mt-1.5 text-xs text-red-500">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="apply-phone" className="mb-2 flex items-center gap-2 text-sm font-bold text-(--color-ink)">
                  <Phone size={16} className="text-(--color-teal)" />
                  Phone Number *
                </label>
                <input
                  id="apply-phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                  placeholder="10-digit number"
                  aria-required="true"
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? "apply-phone-error" : undefined}
                  className={`w-full rounded-xl border ${errors.phone ? "border-red-400" : "border-slate-200"} bg-white px-4 py-3 text-[15px] text-(--color-ink) outline-none transition-colors focus:border-(--color-teal) focus:ring-2 focus:ring-(--color-teal)/20`}
                />
                {errors.phone && <p id="apply-phone-error" role="alert" className="mt-1.5 text-xs text-red-500">{errors.phone}</p>}
              </div>

              {/* Experience */}
              <div>
                <label htmlFor="apply-experience" className="mb-2 flex items-center gap-2 text-sm font-bold text-(--color-ink)">
                  <Briefcase size={16} className="text-(--color-teal)" />
                  Total Experience *
                </label>
                <select
                  id="apply-experience"
                  value={formData.experience}
                  onChange={(e) => setFormData((prev) => ({ ...prev, experience: e.target.value }))}
                  aria-required="true"
                  aria-invalid={!!errors.experience}
                  aria-describedby={errors.experience ? "apply-experience-error" : undefined}
                  className={`w-full rounded-xl border ${errors.experience ? "border-red-400" : "border-slate-200"} bg-white px-4 py-3 text-[15px] text-(--color-ink) outline-none transition-colors focus:border-(--color-teal) focus:ring-2 focus:ring-(--color-teal)/20`}
                >
                  <option value="">Select experience</option>
                  <option value="Fresher">Fresher</option>
                  <option value="Less than 1 year">Less than 1 year</option>
                  <option value="1-2 years">1-2 years</option>
                  <option value="2-5 years">2-5 years</option>
                  <option value="5+ years">5+ years</option>
                </select>
                {errors.experience && <p id="apply-experience-error" role="alert" className="mt-1.5 text-xs text-red-500">{errors.experience}</p>}
              </div>

              {/* Resume */}
              <div>
                <label htmlFor="apply-resume" className="mb-2 flex items-center gap-2 text-sm font-bold text-(--color-ink)">
                  <FileText size={16} className="text-(--color-teal)" />
                  Resume *
                </label>
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => fileInputRef.current?.click()}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); fileInputRef.current?.click(); } }}
                  aria-describedby={errors.resume ? "apply-resume-error" : undefined}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 border-dashed ${errors.resume ? "border-red-400" : "border-slate-200"} bg-(--color-soft) px-4 py-5 transition-colors hover:border-(--color-teal)/50 hover:bg-white focus:border-(--color-teal) focus:ring-2 focus:ring-(--color-teal)/20 focus:outline-none`}
                >
                  <Upload size={20} className="text-(--color-teal)" aria-hidden="true" />
                  <div className="min-w-0 flex-1">
                    {formData.resumeFileName ? (
                      <p className="truncate text-sm font-semibold text-(--color-ink)">{formData.resumeFileName}</p>
                    ) : (
                      <>
                        <p className="text-sm font-semibold text-(--color-ink)">Click to upload resume</p>
                        <p className="text-xs text-(--color-muted)">PDF, DOC, or DOCX (max 5MB)</p>
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
                {errors.resume && <p id="apply-resume-error" role="alert" className="mt-1.5 text-xs text-red-500">{errors.resume}</p>}
              </div>

              {/* Intro */}
              <div>
                <label htmlFor="apply-intro" className="mb-2 flex items-center gap-2 text-sm font-bold text-(--color-ink)">
                  <FileText size={16} className="text-(--color-teal)" />
                  Tell us about yourself *
                </label>
                <textarea
                  id="apply-intro"
                  value={formData.intro}
                  onChange={(e) => setFormData((prev) => ({ ...prev, intro: e.target.value }))}
                  placeholder="Share your background, skills, and why you're interested in this role..."
                  rows={5}
                  aria-required="true"
                  aria-invalid={!!errors.intro}
                  aria-describedby={errors.intro ? "apply-intro-error" : undefined}
                  className={`w-full rounded-xl border ${errors.intro ? "border-red-400" : "border-slate-200"} bg-white px-4 py-3 text-[15px] leading-6 text-(--color-ink) outline-none transition-colors focus:border-(--color-teal) focus:ring-2 focus:ring-(--color-teal)/20 resize-none`}
                />
                {errors.intro && <p id="apply-intro-error" role="alert" className="mt-1.5 text-xs text-red-500">{errors.intro}</p>}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-(--color-teal) px-8 py-3.5 text-sm font-bold text-white shadow-[0_4px_16px_rgba(38,174,144,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-(--color-teal-deep) disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send size={16} strokeWidth={2.5} />
                    Submit Application
                  </>
                )}
              </button>

              {errors.submit && (
                <p className="rounded-xl px-4 py-3 text-center text-sm font-medium bg-red-50 text-red-600">
                  {errors.submit}
                </p>
              )}
              <p className="text-center text-xs text-(--color-muted)">
                Your application will be sent directly to our HR team at hr@indexiafinance.com and hr.indexia@gmail.com.
              </p>
            </form>
          </Reveal>
        </div>
      </section>
    </main>
  );
};

export default ApplyPage;
