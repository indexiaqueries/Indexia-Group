import { useTranslation } from "react-i18next";
import Eyebrow from "../common/Eyebrow";

type ApplyHeroProps = {
  roleTitle: string;
  department: string;
};

const ApplyHero = ({ roleTitle, department }: ApplyHeroProps) => {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden bg-(--color-ink-deep) px-2 py-6 pt-10 sm:px-3 sm:py-7 sm:pt-12 lg:px-5 lg:py-10 lg:pt-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 20% 80%, rgba(38,174,144,0.2), transparent 50%), radial-gradient(circle at 80% 20%, rgba(242,242,49,0.12), transparent 45%)",
        }}
      />
      <div className="relative mx-auto max-w-4xl">
        <div className="mb-4 flex items-center gap-3">
          <span className="h-px w-10 bg-(--color-yellow)/60" />
          <Eyebrow color="var(--color-yellow)" size="md">
            {t("careersPage.apply")}
          </Eyebrow>
          <span className="h-px w-10 bg-(--color-yellow)/60" />
        </div>
        <h1 className="font-display text-[clamp(24px,4vw,44px)] font-bold leading-[1.1] text-white">
          {t("applyPage.heroTitle")} <span className="text-(--color-yellow)">{roleTitle}</span>
        </h1>
        {department && (
          <p className="mt-3 font-ledger text-[11px] sm:text-xs uppercase tracking-[0.18em] text-(--color-teal)/80">{department}</p>
        )}
      </div>
    </section>
  );
};

export default ApplyHero;
