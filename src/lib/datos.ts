/**
 * Datos centralizados del portfolio.
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
      "Plataforma web que gestiona un campeonato argentino de simracing en Assetto Corsa: clasificaciones en vivo con buscador y paginación, tabla de equipos, resultados por split con tabs interactivos y formulario de inscripción con anti-spam.",
    tecnologias: ["Next.js", "React", "TypeScript", "Tailwind"],
    enlace: "https://copachapachapa.vercel.app/",
  },
  {
    id: 2,
    nombre: "MediComprende",
    categoria: "IA + Salud",
    anio: "2026",
    descripcion:
      "App web que traduce informes médicos en PDF a lenguaje claro usando IA. Subí tu estudio y recibí un análisis completo: resumen, hallazgos, términos, valores fuera de rango y preguntas sugeridas para llevar al médico.",
    tecnologias: ["Next.js 16", "TypeScript", "Tailwind CSS", "Gemini AI", "Vercel"],
    enlace: "https://medicomprende.vercel.app/",
  },
  {
    id: 3,
    nombre: "Bodega Andeluna",
    categoria: "Website Redesign",
    anio: "2026",
    descripcion:
      "Rediseño completo del sitio web de Bodega Andeluna con estética Luxury Editorial Oscura: catálogo de 32 vinos en 6 líneas, experiencias gastronómicas, lodge con galería y sistema de booking, en 3 idiomas (ES/EN/PT). Proyecto conceptual — NO es la web oficial.",
    tecnologias: ["Next.js 16", "TypeScript", "CSS Modules", "next-intl", "Embla Carousel"],
    enlace: "https://bodega-andeluna.vercel.app/es",
  },
  {
    id: 4,
    nombre: "Mirasoles",
    categoria: "Landing Page Restaurante",
    anio: "2026",
    descripcion:
      "Landing page para Mirasoles, restaurante familiar en La Consulta, Mendoza: carta digital con lightbox y zoom progresivo, carrusel de fotos con auto-advance, mapa interactivo y botón flotante de WhatsApp. Proyecto conceptual — NO es la web oficial.",
    tecnologias: ["Next.js 16", "TypeScript", "Tailwind CSS v4", "Framer Motion", "Radix UI"],
    enlace: "https://mirasoles-web.vercel.app/",
  },
  {
    id: 5,
    nombre: "El Hornero Pizzería",
    categoria: "Landing Page Restaurante",
    anio: "2026",
    descripcion:
      "Landing page dark + glassmorphism para El Hornero Pizzería, pizza napolitana artesanal en La Consulta, Mendoza: carta interactiva con lightbox y zoom táctil, reseñas reales con ticker infinito, y WhatsApp integrado con mensaje predefinido. Proyecto conceptual — NO es la web oficial.",
    tecnologias: ["Next.js 16", "TypeScript", "Tailwind CSS v4", "Motion", "Base UI", "Lucide"],
    enlace: "https://elhorneropizzanapo.vercel.app/",
  },
  {
    id: 6,
    nombre: "Cabrita Garage Cafe",
    categoria: "Landing Page Café",
    anio: "2026",
    descripcion:
      "Landing page para Cabrita Garage Cafe, casa de café de especialidad en el centro de Mendoza: carta digital con acordeón interactivo, bento grid de productos estrella, reseñas reales embedidas, dos sucursales con Google Maps, PedidosYa y WhatsApp integrados.",
    tecnologias: ["Next.js 16", "React", "TypeScript", "Tailwind CSS v4", "Framer Motion", "Lucide"],
    enlace: "https://cabritagaragecafe-web.vercel.app/",
  },
  {
    id: 7,
    nombre: "El Porvenir",
    categoria: "Landing Page Restaurante",
    anio: "2026",
    descripcion:
      "Landing page para El Porvenir, bodegón renovado en La Consulta, Mendoza: galería de platos con fotos reales, cocina de temporada con takeaway, reseñas embebidas de Sluurpy y TodoResto, y contacto directo por WhatsApp.",
    tecnologias: ["Next.js 16", "React", "TypeScript", "Tailwind CSS v4", "Framer Motion"],
    enlace: "https://elporvenir-sigma.vercel.app/",
  },
];
