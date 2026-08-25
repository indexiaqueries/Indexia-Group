import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Eyebrow from "../../components/common/Eyebrow";
import Reveal from "../../components/common/Reveal";
import ResponsiveImage from "../../components/common/ResponsiveImage";
import openPositionsImg from "../../assets/careers-img/OpenPositions.png";
import { colors } from "../../lib/theme";
import type { RoleItem } from "./careersData";

type OpenRolesProps = {
  roles: RoleItem[];
  loading?: boolean;
};

const departmentColors: Record<string, string> = {
  Finance: colors.teal,
  "Human Resources": "#8b5cf6",
  "Digital Marketing": "#f59e0b",
  "Information Technology": "#066a9c",
  "Customer Support": "#10b981",
  Administration: "#6366f1",
};

const OpenRoles = ({ roles, loading }: OpenRolesProps) => {
  const { t } = useTranslation();
  const [activeType, setActiveType] = useState<"Full-time" | "Intern">("Full-time");
  const filteredRoles = roles.filter((role) => role.type === activeType);

  const fullTimeCount = roles.filter((r) => r.type === "Full-time").length;
  const internCount = roles.filter((r) => r.type === "Intern").length;

  return (
    <section id="open-roles" className="scroll-mt-24 bg-(--color-mist) px-2 py-6 sm:px-3 sm:py-8 lg:px-5">
      <div className="mx-auto max-w-6xl">
        {/* Header */}          <Reveal className="mx-auto mb-4 sm:mb-6 max-w-2xl text-center">
          <Eyebrow className="mb-3">{t("careersPage.rolesEyebrow")}</Eyebrow>
          <h2 className="font-display text-[clamp(26px,4vw,40px)] font-bold text-(--color-ink)">
            {t("careersPage.rolesHeading")}
          </h2>
          <p className="mt-4 text-[14px] sm:text-[15px] leading-6 sm:leading-7 text-(--color-muted)">{t("careersPage.rolesSubtitle")}</p>
        </Reveal>

        {/* Banner Image */}
        <Reveal delay={0.05} amount={0.15}>
          <div className="relative mb-10 overflow-hidden rounded-2xl">
            <ResponsiveImage
              src={openPositionsImg}
              alt="Open positions at Indexia Group"
              width={1200}
              height={400}
              className="w-full object-cover"
            />
            <span aria-hidden="true" className="card-shine-lines" />
          </div>
        </Reveal>

        {/* Toggle with counts */}
        <Reveal delay={0.05} className="mb-8">
          <div className="mx-auto flex w-fit items-center gap-1 rounded-full border border-slate-200 bg-white p-1 shadow-sm">
            <button
              onClick={() => setActiveType("Full-time")}
              className={`flex items-center gap-2 rounded-full px-4 py-2 sm:px-6 sm:py-2.5 text-[13px] sm:text-sm font-bold transition-all duration-200 ${
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
              className={`flex items-center gap-2 rounded-full px-4 py-2 sm:px-6 sm:py-2.5 text-[13px] sm:text-sm font-bold transition-all duration-200 ${
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

        {/* Loading State */}
        {loading && (
          <Reveal>              <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-8 sm:p-12 text-center">
              <div className="mx-auto mb-3 h-6 w-6 animate-spin rounded-full border-2 border-(--color-teal) border-t-transparent" />
              <p className="text-sm text-slate-500">Loading openings...</p>
            </div>
          </Reveal>
        )}

        {/* Role Cards */}
        {!loading && (<>
        <div className="space-y-4">
          {filteredRoles.map((role, i) => {
            const deptColor = departmentColors[role.department] || colors.teal;
            return (
              <Reveal key={role._id || role.title} delay={(i % 3) * 0.06} amount={0.1}>
                <div className="group rounded-2xl border border-slate-100 bg-white p-4 sm:p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
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
                      <h3 className="font-display mt-3 text-[17px] sm:text-lg font-bold text-slate-900 group-hover:text-(--color-teal) transition-colors">
                        {role.title}
                      </h3>

                      {/* Description */}
                      {role.description && (
                        <p className="mt-2 text-[13px] sm:text-sm leading-5 sm:leading-6 text-slate-500">{role.description}</p>
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
          <Reveal>              <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-8 sm:p-12 text-center">
              <p className="text-sm text-slate-500">No {activeType.toLowerCase()} positions available at the moment.</p>
            </div>
          </Reveal>
        )}
        </>)}

      </div>
    </section>
  );
};

export default OpenRoles;
