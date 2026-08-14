import type { ContactFormData } from "../../../data/contact";

export const validateField = (id: keyof ContactFormData, value: string, t: (key: string) => string): string => {
  switch (id) {
    case "name": {
      const trimmed = value.trim();
      if (trimmed.length < 2) return t("form.errorName");
      if (!/[a-zA-Z\u00C0-\u024F]/.test(trimmed)) return t("form.errorNameLetters");
      return "";
    }
    case "phone": {
      const digits = value.replace(/\D/g, "");
      return /^\d{10}$/.test(digits) ? "" : t("form.errorPhone");
    }
    case "email":
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) ? "" : t("form.errorEmail");
    case "subject":
      return value.trim() ? "" : t("form.errorSubject");
    case "message":
      return value.trim() ? "" : t("form.errorMessage");
  }
};
