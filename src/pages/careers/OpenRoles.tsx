import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Eyebrow from "../../components/common/Eyebrow";
import ImageSlot from "../../components/common/ImageSlot";
import Reveal from "../../components/common/Reveal";
import { siteImages } from "../../data/siteImages";
import { colors } from "../../lib/theme";
import type { RoleItem } from "./careersData";

type OpenRolesProps = {
  roles: RoleItem[];
};

const departmentColors: Record<string, string> = {
  Finance: colors.teal,
  "Human Resources": "#8b5cf6",
  "Digital Marketing": "#f59e0b",
  "Information Technology": "#066a9c",
  "Customer Support": "#10b981",
  Administration: "#6366f1",
};

const OpenRoles = ({ roles }: OpenRolesProps) => {
  const { t } = useTranslation();
  const [activeType, setActiveType] = useState<"Full-time" | "Intern">("Full-time");
  const filteredRoles = roles.filter((role) => role.type === activeType);

  const fullTimeCount = roles.filter((r) => r.type === "Full-time").length;
  const internCount = roles.filter((r) => r.type === "Intern").length;

  return (
    <section id="open-roles" className="scroll-mt-24 bg-(--color-mist) px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <Reveal className="mx-auto mb-12 max-w-2xl text-center">
          <Eyebrow className="mb-3">{t("careersPage.rolesEyebrow")}</Eyebrow>
          <h2 className="font-display text-[clamp(26px,4vw,40px)] font-bold text-(--color-ink)">
            {t("careersPage.rolesHeading")}
          </h2>
          <p className="mt-4 text-[15px] leading-7 text-(--color-muted)">{t("careersPage.rolesSubtitle")}</p>
        </Reveal>

        {/* Banner Image */}
        <Reveal delay={0.05} amount={0.15}>
          <ImageSlot {...siteImages.careersOpenRoles} className="mb-10 rounded-2xl" aspect="aspect-[21/8]" />
        </Reveal>

        {/* Toggle with counts */}
        <Reveal delay={0.05} className="mb-8">
          <div className="mx-auto flex w-fit items-center gap-1 rounded-full border border-slate-200 bg-white p-1 shadow-sm">
            <button
              onClick={() => setActiveType("Full-time")}
              className={`flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-bold transition-all duration-200 ${
                activeType === "Full-time"
                  ? "bg-(--color-teal) text-white shadow-md"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Full-time
              <span
                className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold ${
                  activeType === "Full-time" ? "bg-white/25 text-white" : "bg-slate-100 text-slate-500"
                }`}
              >
                {fullTimeCount}
              </span>
            </button>
            <button
              onClick={() => setActiveType("Intern")}
              className={`flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-bold transition-all duration-200 ${
                activeType === "Intern"
                  ? "bg-(--color-teal) text-white shadow-md"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Intern
              <span
                className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold ${
                  activeType === "Intern" ? "bg-white/25 text-white" : "bg-slate-100 text-slate-500"
                }`}
              >
                {internCount}
              </span>
            </button>
          </div>
        </Reveal>

        {/* Role Cards */}
        <div className="space-y-4">
          {filteredRoles.map((role, i) => {
            const deptColor = departmentColors[role.department] || colors.teal;
            return (
              <Reveal key={role.key} delay={(i % 3) * 0.06} amount={0.1}>
                <div className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0 flex-1">
                      {/* Tags */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className="inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em]"
                          style={{ backgroundColor: `${deptColor}15`, color: deptColor }}
                        >
                          {role.department}
                        </span>
                        <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">
                          {role.type}
                        </span>
                        <span className="font-ledger text-[10px] text-slate-400">
                          {role.company} · {role.location}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-display mt-3 text-lg font-bold text-slate-900 group-hover:text-(--color-teal) transition-colors">
                        {role.title}
                      </h3>

                      {/* Description */}
                      {role.description && (
                        <p className="mt-2 text-sm leading-6 text-slate-500">{role.description}</p>
                      )}

                      {/* Requirements */}
                      {role.requirements && role.requirements.length > 0 && (
                        <ul className="mt-3 flex flex-wrap gap-2">
                          {role.requirements.map((req, idx) => (
                            <li
                              key={idx}
                              className="inline-flex items-center gap-1.5 rounded-full bg-(--color-soft) px-3 py-1 text-xs text-slate-600"
                            >
                              <span className="h-1 w-1 shrink-0 rounded-full bg-(--color-teal)" />
                              {req}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {/* Apply Button */}
                    <Link
                      to={`/careers/apply?role=${encodeURIComponent(role.title)}&dept=${encodeURIComponent(role.department)}`}
                      className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-(--color-teal) px-5 py-2.5 text-sm font-bold text-white shadow-[0_2px_8px_rgba(38,174,144,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-(--color-teal-deep) hover:shadow-[0_4px_12px_rgba(38,174,144,0.35)] sm:self-auto"
                    >
                      {t("careersPage.apply")}
                      <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14m0 0l-4-4m4 4l-4 4" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredRoles.length === 0 && (
          <Reveal>
            <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-12 text-center">
              <p className="text-sm text-slate-500">No {activeType.toLowerCase()} positions available at the moment.</p>
            </div>
          </Reveal>
        )}

      </div>
    </section>
  );
};

export default OpenRoles;
