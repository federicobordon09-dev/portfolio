import type { MetadataRoute } from "next";

const URL_SITIO = process.env.NEXT_PUBLIC_SITE_URL || "https://federicobordon.com.ar";

/**
 * Sitemap mínimo — el portfolio es una single page, así que
 * solo figura la home. Si más adelante hay rutas individuales
 * (blog, proyectos/:slug, etc.) se agregan acá.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: URL_SITIO,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      images: [`${URL_SITIO}/logo.png`],
    },
  ];
}
