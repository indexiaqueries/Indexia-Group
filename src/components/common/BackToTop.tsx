import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useTranslation } from "react-i18next";
import { ArrowUp } from "lucide-react";
import { useBackToTop } from "../../hooks/useBackToTop";

const BackToTop = () => {
  const { t } = useTranslation();
  const visible = useBackToTop();
  const prefersReducedMotion = useReducedMotion();

  return (
    <button
      type="button"
      onClick={() =>
        window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" })
      }
      aria-label={t("footer.backToTop")}
      tabIndex={visible ? 0 : -1}
      className={`back-to-top-pulse fixed bottom-5 inset-e-4 z-40 flex h-12 items-center gap-2 rounded-full bg-(--color-yellow) px-4 text-(--color-deep) shadow-[0_0_0_4px_rgba(242,242,49,0.25),0_10px_28px_rgba(2,16,26,0.45)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_0_4px_rgba(242,242,49,0.4),0_14px_34px_rgba(2,16,26,0.55)] sm:bottom-6 ${
        visible ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <ArrowUp className="h-5 w-5" strokeWidth={2.75} />
      <span className="text-[11px] font-bold uppercase tracking-[0.14em] sm:inline">{t("footer.backToTop")}</span>
    </button>
  );
};

export default BackToTop;
