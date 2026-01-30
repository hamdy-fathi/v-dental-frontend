"use client";

import { useEffect } from "react";
import type { Language } from "@/lib/unified-data";
import { applyLanguage } from "@/lib/language-client";

type LanguageClientInitProps = {
  language: Language;
};

export default function LanguageClientInit({ language }: LanguageClientInitProps) {
  useEffect(() => {
    applyLanguage(language);
  }, [language]);

  return null;
}

