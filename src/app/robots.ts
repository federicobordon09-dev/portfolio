import type { MetadataRoute } from "next";

const URL_SITIO = process.env.NEXT_PUBLIC_SITE_URL || "https://federicobordon.dev";

/**
 * Le dice a los motores de búsqueda qué pueden y qué no pueden indexar.
 * Acá permitimos indexar todo, incluido el opengraph-image dinámico.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${URL_SITIO}/sitemap.xml`,
  };
}
