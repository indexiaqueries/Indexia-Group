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
      className={`back-to-top-pulse fixed bottom-5 inset-e-4 z-40 flex h-9 w-9 items-center justify-center rounded-full bg-(--color-yellow) text-(--color-deep) shadow-[0_0_0_3px_rgba(242,242,49,0.2),0_6px_16px_rgba(2,16,26,0.35)] transition-all duration-300 hover:scale-110 hover:shadow-[0_0_0_4px_rgba(242,242,49,0.35),0_8px_20px_rgba(2,16,26,0.45)] sm:bottom-6 ${
        visible ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <ArrowUp className="h-4 w-4" strokeWidth={2.75} />
    </button>
  );
};

export default BackToTop;
