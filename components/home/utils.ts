import { apiImageUrl } from "@/lib/unified-data";

export const resolveImageUrl = (path?: string | null) => {
  if (!path) return "";
  if (path.startsWith("/")) return path;
  return apiImageUrl(path) ?? "";
};

