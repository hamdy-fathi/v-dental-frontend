const API_URL = "https://www.vdentaleg.com/api/v1/unified-data/data";
const API_DOMAIN = "https://www.vdentaleg.com";

export type Language = "en" | "ar";

type SectionWithContent = {
  content?: Array<{ language_id?: number; language?: { name?: string } } & Record<string, unknown>>;
} & Record<string, unknown>;

export type UnifiedData = {
  generalSettings: Record<string, unknown> | null;
  sectionOne: Record<string, unknown> | null;
  sectionTwo: Record<string, unknown> | null;
  sectionThree: Record<string, unknown> | null;
  sectionFour: Record<string, unknown> | null;
  sectionFive: Record<string, unknown> | null;
  sectionReviews: Record<string, unknown> | null;
  sectionBranches: Record<string, unknown> | null;
  sectionDoctors: Record<string, unknown> | null;
};

function getLanguageId(lang: Language) {
  return lang === "ar" ? 2 : 1;
}

function findContentByLanguage(section: SectionWithContent | null, lang: Language) {
  if (!section || !Array.isArray(section.content) || section.content.length === 0) {
    return section;
  }

  const languageId = getLanguageId(lang);
  const byId = section.content.find((item) => item.language_id === languageId);
  if (byId) return byId;

  const langName = lang;
  const byName = section.content.find((item) => item.language?.name === langName);
  return byName ?? section.content[0];
}

export function apiImageUrl(path?: string | null) {
  if (!path) return null;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const normalized = path.startsWith("/") ? path.slice(1) : path;
  return `${API_DOMAIN}/${normalized}`;
}

export function extractIframeSrc(iframeHtml?: string | null) {
  if (!iframeHtml) return null;
  const match = iframeHtml.match(/src=["']([^"']+)["']/i);
  return match?.[1] ?? null;
}

export function normalizeLineBreaks(text?: string | null) {
  if (!text) return [];
  return text.split("\n").filter(Boolean);
}

export async function fetchUnifiedData(lang: Language = "en"): Promise<UnifiedData> {
  const response = await fetch(API_URL, {
    headers: { "Content-Type": "application/json" },
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error(`Unified data API error: ${response.status}`);
  }

  const payload = await response.json();
  const data = payload?.data ?? {};

  const generalSettings = data.general_settings ?? null;
  const generalContent =
    generalSettings && Array.isArray(generalSettings.content)
      ? generalSettings.content.find((item: { language_id?: number }) => item.language_id === getLanguageId(lang)) ??
        generalSettings.content[0]
      : null;

  const sectionOne = findContentByLanguage(data.section_one ?? null, lang);
  const sectionTwo = findContentByLanguage(data.section_two ?? null, lang);
  const sectionThree = findContentByLanguage(data.section_three ?? null, lang);
  const sectionFour = findContentByLanguage(data.section_four ?? null, lang);
  const sectionFive = findContentByLanguage(data.section_five ?? null, lang);
  const sectionReviews = findContentByLanguage(data.section_reviews ?? null, lang);
  const sectionBranches = findContentByLanguage(data.section_branches ?? null, lang);
  const sectionDoctors = findContentByLanguage(data.section_doctors ?? null, lang);

  return {
    generalSettings: generalSettings
      ? {
          ...generalSettings,
          content: generalContent,
        }
      : null,
    sectionOne: sectionOne ?? null,
    sectionTwo: sectionTwo ?? null,
    sectionThree: sectionThree ?? null,
    sectionFour: sectionFour ?? null,
    sectionFive: sectionFive ?? null,
    sectionReviews: sectionReviews ?? null,
    sectionBranches: sectionBranches ?? null,
    sectionDoctors: sectionDoctors ?? null,
  };
}

