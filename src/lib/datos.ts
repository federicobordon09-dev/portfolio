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
  linkedin: "https://www.linkedin.com/in/federicobordon",
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
    nombre: "MediComprende",
    categoria: "IA + Salud",
    anio: "2026",
    descripcion:
      "App web que traduce informes médicos a lenguaje simple usando inteligencia artificial. Subí tu PDF y recibí explicaciones claras de cada hallazgo, término y resultado sin tecnicismos.",
    tecnologias: ["Next.js 16", "TypeScript", "Tailwind CSS", "Gemini AI", "Vercel"],
    enlace: "https://medicomprende.vercel.app/",
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
  {
    id: 4,
    nombre: "Mirasoles",
    categoria: "Landing Page Restaurante",
    anio: "2026",
    descripcion:
      "Landing page para Mirasoles, un restaurante familiar de La Consulta, Mendoza: carta digital que se lee perfecto desde el celular, reservas por WhatsApp y mejor presencia en Google. Proyecto conceptual con fines educativos y de demostración — NO es la web oficial.",
    tecnologias: ["Next.js 16", "TypeScript", "Tailwind CSS v4", "Framer Motion", "Radix UI"],
    enlace: "https://mirasoles-web.vercel.app/",
  },
];
