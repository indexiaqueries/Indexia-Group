import { ChevronDown, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import { LANGUAGES } from "../../../i18n/languages";
import { preloadLocale } from "../../../i18n";
import DropdownPanel from "./DropdownPanel";

type LanguageMenuProps = {
  open: boolean;
  reducedMotion: boolean;
  onToggle: (open: boolean) => void;
  onClose: () => void;
};

const LanguageMenu = ({ open, reducedMotion, onToggle, onClose }: LanguageMenuProps) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const selectLang = async (code: string) => {
    if (code !== i18n.language) {
      await preloadLocale(code).catch(() => undefined);
    }
    i18n.changeLanguage(code);
    onClose();
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => onToggle(true)}
      onMouseLeave={() => onToggle(false)}
    >
      <button
        type="button"
        onClick={() => onToggle(!open)}
        aria-expanded={open}
        aria-label={t("header.aria.selectLanguage")}
        className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3.5 py-2 text-[12.5px] font-bold uppercase text-white/90 backdrop-blur-md transition-all duration-200 hover:bg-white/20 hover:scale-105"
      >
        <Globe size={14} strokeWidth={2.2} className="text-(--color-yellow)" />
        {lang}
        <ChevronDown
          size={12}
          strokeWidth={2.5}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <DropdownPanel open={open} reducedMotion={reducedMotion} className="inset-e-0 w-56 origin-top-end p-1.5">
        <div className="max-h-[min(60vh,440px)] overflow-y-auto overscroll-contain pr-0.5 scrollbar-thin [scrollbar-color:rgba(255,255,255,0.25)_transparent]">
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              type="button"
              onClick={() => selectLang(l.code)}
              className={`block w-full rounded-lg px-3 py-1.5 text-start text-[13px] font-semibold transition-colors duration-150 ${
                lang === l.code
                  ? "bg-(--color-yellow)/15 text-(--color-yellow)"
                  : "text-white/85 hover:bg-white/10 hover:text-white"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      </DropdownPanel>
    </div>
  );
};

export default LanguageMenu;
