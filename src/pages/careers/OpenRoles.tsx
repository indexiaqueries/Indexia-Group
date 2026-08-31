import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MapPin, Building2, ArrowRight } from "lucide-react";
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
  const [activeType, setActiveType] = useState<string>("Full-time");
  const filteredRoles = roles.filter((role) => role.type === activeType);

  const fullTimeCount = roles.filter((r) => r.type === "Full-time").length;
  const internCount = roles.filter((r) => r.type === "Intern").length;

  return (
    <section id="open-roles" className="scroll-mt-24 relative">
      {/* Background image with overlay */}
      <div className="relative">
        <ResponsiveImage
          src={openPositionsImg}
          alt=""
          width={1200}
          height={400}
          className="h-48 sm:h-56 w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-(--color-ink-deep)/80 via-(--color-ink-deep)/70 to-(--color-ink-deep)/90" />

        <div className="absolute inset-0 flex flex-col items-center justify-center px-2">
          <Reveal className="text-center">
            <Eyebrow color="var(--color-yellow)" className="mb-1.5">{t("careersPage.rolesEyebrow")}</Eyebrow>
            <h2 className="font-display text-[clamp(20px,3.5vw,32px)] font-bold text-white">
              {t("careersPage.rolesHeading")}
            </h2>
          </Reveal>

          <Reveal delay={0.05} className="mt-5">
            <div className="flex items-center gap-6 border-b border-white/15">
              {([
                  { key: "Full-time", labelKey: "openRoles.fullTime" },
                  { key: "Intern", labelKey: "openRoles.intern" },
                ]).map(({ key: type, labelKey }) => {
                const count = type === "Full-time" ? fullTimeCount : internCount;
                const active = activeType === type;
                return (
                  <button
                    key={type}
                    onClick={() => setActiveType(type)}
                    className={`relative flex items-center gap-1.5 pb-2.5 text-[13px] font-bold transition-colors ${
                      active ? "text-white" : "text-white/50 hover:text-white/80"
                    }`}
                  >
                    {t(labelKey)}
                    <span className={active ? "text-white/60" : "text-white/35"}>
                      ({count})
                    </span>
                    {active && (
                      <span className="absolute -bottom-px left-0 h-0.5 w-full bg-(--color-teal)" />
                    )}
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>

      {/* Roster */}
      <div className="section-ruled section-paper px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="mx-auto max-w-5xl">
          {loading && (
            <div className="border border-slate-200 bg-white py-10 text-center">
              <div className="mx-auto mb-2 h-5 w-5 animate-spin rounded-full border-2 border-(--color-teal) border-t-transparent" />
              <p className="text-sm text-slate-500">{t("openRoles.loading")}</p>
            </div>
          )}

          {!loading && (
            <div className="card-premium overflow-hidden rounded-2xl">
              {filteredRoles.map((role, i) => {
                const dc = departmentColors[role.department] || colors.teal;
                return (
                  <Reveal key={role._id || role.title} delay={(i % 8) * 0.03} amount={0.1}>
                    <div className="group relative flex flex-col gap-2 border-b border-slate-100 px-4 py-5 transition-colors last:border-none hover:bg-(--color-soft)/70 sm:flex-row sm:items-center sm:gap-6 sm:px-6">
                      <span
                        aria-hidden="true"
                        className="absolute inset-y-0 left-0 w-0.75"
                        style={{ backgroundColor: dc }}
                      />

                      <div className="pl-2 sm:w-36 sm:shrink-0 sm:pl-2">
                        <span
                          className="text-[9px] font-bold uppercase tracking-wider"
                          style={{ color: dc }}
                        >
                          {role.department}
                        </span>
                      </div>

                      <div className="min-w-0 flex-1 pl-2 sm:pl-0">
                        <div className="flex flex-wrap items-baseline gap-x-2">
                          <h3 className="font-display text-[14px] sm:text-[15px] font-bold text-slate-900 leading-snug transition-colors group-hover:text-(--color-teal)">
                            {role.title}
                          </h3>
                          <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                            {role.type}
                          </span>
                        </div>

                        {/* Company + location as capsules; requirements stay as plain text so the row doesn't turn into a wall of pills */}
                        <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                          {role.company && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600">
                              <Building2 size={10} />
                              {role.company}
                            </span>
                          )}
                          {role.location && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600">
                              <MapPin size={10} />
                              {role.location}
                            </span>
                          )}
                          {role.requirements && role.requirements.length > 0 && (
                            <span className="flex flex-wrap items-center gap-x-1.5 text-[11px] text-slate-400">
                              <span className="text-slate-300">·</span>
                              {role.requirements.slice(0, 3).join(" · ")}
                              {role.requirements.length > 3 && (
                                <span className="text-slate-300">
                                  +{role.requirements.length - 3}
                                </span>
                              )}
                            </span>
                          )}
                        </div>
                      </div>

                      <Link
                        to={`/careers/apply?role=${encodeURIComponent(role.title)}&dept=${encodeURIComponent(role.department)}`}
                        className="inline-flex shrink-0 items-center gap-1 pl-2 text-[12px] font-bold text-(--color-teal) transition-transform sm:ml-auto sm:pl-0 sm:group-hover:translate-x-0.5"
                      >
                        {t("careersPage.apply")}
                        <ArrowRight size={13} strokeWidth={2.5} />
                      </Link>
                    </div>
                  </Reveal>
                );
              })}

              {filteredRoles.length === 0 && (
                <div className="px-5 py-10 text-center">
                  <p className="text-sm text-slate-500">
                    {t("openRoles.noPositions", { type: activeType.toLowerCase() })}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default OpenRoles;
