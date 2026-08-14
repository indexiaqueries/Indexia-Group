import { useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ArrowUp } from "lucide-react";
import { useBackToTop } from "../../hooks/useBackToTop";

const BackToTop = ({ hideOver }: { hideOver?: string[] }) => {
  const { t } = useTranslation();
  const visible = useBackToTop(hideOver);
  const prefersReducedMotion = useReducedMotion();

  return (
    <button
      type="button"
      onClick={() =>
        window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" })
      }
      aria-label={t("footer.backToTop")}
      tabIndex={visible ? 0 : -1}
      className={`back-to-top-pulse fixed bottom-5 end-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-(--color-yellow) text-(--color-deep) shadow-[0_0_0_4px_rgba(242,242,49,0.25),0_10px_28px_rgba(2,16,26,0.45)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_0_4px_rgba(242,242,49,0.4),0_14px_34px_rgba(2,16,26,0.55)] sm:bottom-6 sm:h-11 sm:w-11 ${
        visible ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <ArrowUp className="h-5 w-5" strokeWidth={2.75} />
    </button>
  );
};

export default BackToTop;
