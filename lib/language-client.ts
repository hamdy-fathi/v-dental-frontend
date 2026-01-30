import type { Language } from "@/lib/unified-data";
import { applyStaticTranslations } from "@/lib/translations";

export function applyLanguage(language: Language) {
  if (typeof document === "undefined") return;

  const direction = language === "ar" ? "rtl" : "ltr";
  document.documentElement.lang = language;
  document.documentElement.dir = direction;
  document.documentElement.setAttribute("dir", direction);

  try {
    localStorage.setItem("language", language);
    localStorage.setItem("direction", direction);
  } catch {
    // Ignore storage errors (e.g., private mode)
  }

  applyStaticTranslations(language);
}

