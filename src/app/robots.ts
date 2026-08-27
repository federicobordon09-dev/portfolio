import type { MetadataRoute } from "next";

const URL_SITIO = process.env.NEXT_PUBLIC_SITE_URL || "https://federicobordon.com.ar";

/**
 * Robots.txt — define qué pueden rastrear los motores de búsqueda.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/api/",
      },
    ],
    sitemap: `${URL_SITIO}/sitemap.xml`,
  };
}
