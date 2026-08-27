import type { MetadataRoute } from "next";

const URL_SITIO = process.env.NEXT_PUBLIC_SITE_URL || "https://federicobordon.com.ar";

/**
 * Sitemap válido — una sola URL para el sitio SPA.
 * Google trata los hashes como la misma página, no los duplica.
 * lastModified estable para no triggerar re-indexación en cada build.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: URL_SITIO,
      lastModified: new Date("2026-01-01"),
      changeFrequency: "monthly",
      priority: 1,
      images: [`${URL_SITIO}/logo.png`],
    },
  ];
}
