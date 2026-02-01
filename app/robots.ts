import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://www.vdentaleg.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/legacy/", "/api/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

