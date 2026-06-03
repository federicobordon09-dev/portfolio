/**
 * Datos centralizados del portfolio.
 *
 * Si cambia el email, el GitHub, o el nombre, se actualiza una sola vez
 * acá en vez de andar buscando por todos los componentes.
 *
 * Las constantes de UI (colores, paleta) están en `app/globals.css`.
 * Lo que va acá son datos que podrían llegar a venir de un CMS o
 * de variables de entorno.
 */

export const DATOS_PERSONALES = {
  nombreCompleto: "Federico Bordon",
  email: "federicobordon.dev@gmail.com",
  github: "https://github.com/federicobordon09-dev",
  ubicacion: "Mendoza, Argentina",
  rol: "Desarrollador Web",
} as const;

export interface Proyecto {
  id: number;
  nombre: string;
  categoria: string;
  anio: string;
  descripcion: string;
  tecnologias: string[];
  enlace: string | null;
}

export const proyectos: Proyecto[] = [
  {
    id: 1,
    nombre: "Copa Chapa Chapa",
    categoria: "Plataforma Simracing",
    anio: "2026",
    descripcion:
      "Una plataforma web completa para gestionar y potenciar una comunidad de simracing — con datos de carreras, clasificaciones, automatización y diseño de experiencia de usuario.",
    tecnologias: ["Next.js", "React", "TypeScript", "Tailwind"],
    enlace: "https://copachapachapa.vercel.app/",
  },
  {
    id: 2,
    nombre: "Región Web",
    categoria: "Negocios Locales",
    anio: "2026",
    descripcion:
      "Desarrollo web y soluciones de presencia digital para bodegas, restaurantes y negocios locales de Mendoza.",
    tecnologias: ["Next.js", "Tailwind", "SEO", "AI Tools"],
    enlace: null,
  },
  {
    id: 3,
    nombre: "Bodega Andeluna",
    categoria: "Website Redesign",
    anio: "2026",
    descripcion:
      "Re-diseño completo del sitio web de Bodega Andeluna con estética Luxury Editorial Oscura. Proyecto personal con fines educativos y de demostración — NO es la web oficial.",
    tecnologias: ["Next.js 16", "TypeScript", "CSS Modules", "next-intl", "Embla Carousel"],
    enlace: "https://bodega-andeluna.vercel.app/es",
  },
];
