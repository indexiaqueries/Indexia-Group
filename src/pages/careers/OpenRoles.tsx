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

const OpenRoles = ({ roles }: OpenRolesProps) => {
  const { t } = useTranslation();

  return (
    <section id="open-roles" className="scroll-mt-24 bg-(--color-mist) px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Reveal className="mx-auto mb-12 max-w-2xl text-center">
          <Eyebrow className="mb-3">{t("careersPage.rolesEyebrow")}</Eyebrow>
          <h2 className="font-display text-[clamp(24px,4vw,38px)] font-bold text-(--color-ink)">
            {t("careersPage.rolesHeading")}
          </h2>
          <p className="mt-4 text-[15px] leading-7 text-(--color-muted)">{t("careersPage.rolesSubtitle")}</p>
        </Reveal>

        <Reveal delay={0.05} amount={0.15}>
          <ImageSlot {...siteImages.careersOpenRoles} className="mb-10" />
        </Reveal>

        <div className="space-y-4">
          {roles.map((role, i) => (
            <Reveal key={role.key} delay={(i % 3) * 0.06} amount={0.1}>
              <div className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className="inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em]"
                      style={{ backgroundColor: `${colors.teal}1a`, color: colors.teal }}
                    >
                      {role.department}
                    </span>
                    <span className="font-ledger text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                      {role.type}
                    </span>
                  </div>
                  <h3 className="font-display mt-3 text-lg font-bold text-slate-900">{role.title}</h3>
                  <p className="mt-1 text-sm text-slate-500">
                    {role.company} · {role.location}
                  </p>
                </div>
                <Link
                  to="/contact"
                  className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-(--color-teal) hover:text-(--color-teal) sm:self-auto"
                >
                  {t("careersPage.apply")} →
                </Link>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-10 text-center text-sm font-semibold text-slate-600">
            {t("careersPage.mailResume")}{" "}
            <a
              href="mailto:hr@indexiafinance.com"
              className="font-bold text-(--color-teal) transition-colors hover:text-(--color-blue) hover:underline"
            >
              hr@indexiafinance.com
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
};

export default OpenRoles;
