import type { MetadataRoute } from "next";
import { proyectos } from "@/lib/datos";

const URL_SITIO = process.env.NEXT_PUBLIC_SITE_URL || "https://federicobordon.com.ar";

/**
 * Sitemap dinámico — genera una entrada por cada proyecto además de la home.
 * Los proyectos son anchors (#nombre) dentro de la single page, así que
 * Google los indexa como secciones del sitio principal.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const home: MetadataRoute.Sitemap[number] = {
    url: URL_SITIO,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 1,
    images: [`${URL_SITIO}/logo.png`],
  };

  const proyectosSitemap = proyectos.map((p) => ({
    url: `${URL_SITIO}/#${p.nombre.toLowerCase().replace(/\s+/g, "-")}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
    images: [`${URL_SITIO}${p.imagen}`],
  }));

  return [home, ...proyectosSitemap];
}
