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
  imagen: string;
  imagenAlt: string;
}

export const proyectos: Proyecto[] = [
  {
    id: 1,
    nombre: "Copa Chapa Chapa",
    categoria: "Plataforma Simracing",
    anio: "2026",
    descripcion:
      "Campeonato argentino de simracing con clasificaciones en vivo, tabla de equipos, resultados por split y formulario de inscripción.",
    tecnologias: ["Next.js", "React", "TypeScript", "Tailwind"],
    enlace: "https://copachapachapa.vercel.app/",
    imagen: "/copachapachapa.webp",
    imagenAlt: "Copa Chapa Chapa - Plataforma de simracing con clasificaciones en vivo",
  },
  {
    id: 2,
    nombre: "MediComprende",
    categoria: "IA + Salud",
    anio: "2026",
    descripcion:
      "App que traduce informes médicos en PDF a lenguaje claro usando IA. Análisis completo con resumen, hallazgos y preguntas para el médico.",
    tecnologias: ["Next.js 16", "TypeScript", "Tailwind CSS", "Gemini AI", "Vercel"],
    enlace: "https://medicomprende.vercel.app/",
    imagen: "/medicomprende.webp",
    imagenAlt: "MediComprende - App que traduce informes médicos con IA",
  },
  {
    id: 3,
    nombre: "Bodega Andeluna",
    categoria: "Website Redesign",
    anio: "2026",
    descripcion:
      "Rediseño luxury con catálogo de 32 vinos, experiencias gastronómicas, lodge con booking y soporte en 3 idiomas.",
    tecnologias: ["Next.js 16", "TypeScript", "CSS Modules", "next-intl", "Embla Carousel"],
    enlace: "https://bodega-andeluna.vercel.app/es",
    imagen: "/andeluna.webp",
    imagenAlt: "Bodega Andeluna - Rediseño web luxury con catálogo de vinos y booking",
  },
  {
    id: 4,
    nombre: "Mirasoles",
    categoria: "Landing Page Restaurante",
    anio: "2026",
    descripcion:
      "Landing page para restaurante familiar: carta digital con lightbox, carrusel de fotos, mapa interactivo y WhatsApp integrado.",
    tecnologias: ["Next.js 16", "TypeScript", "Tailwind CSS v4", "Framer Motion", "Radix UI"],
    enlace: "https://mirasoles-web.vercel.app/",
    imagen: "/mirasoles.webp",
    imagenAlt: "Mirasoles - Landing page de restaurante familiar con carta digital",
  },
  {
    id: 5,
    nombre: "El Hornero Pizzería",
    categoria: "Landing Page Restaurante",
    anio: "2026",
    descripcion:
      "Landing dark + glassmorphism con carta interactiva, reseñas reales con ticker infinito y WhatsApp con mensaje predefinido.",
    tecnologias: ["Next.js 16", "TypeScript", "Tailwind CSS v4", "Motion", "Base UI", "Lucide"],
    enlace: "https://elhorneropizzanapo.vercel.app/",
    imagen: "/elhorneropizzeria.webp",
    imagenAlt: "El Hornero Pizzería - Landing page dark con glassmorphism y reseñas",
  },
  {
    id: 6,
    nombre: "Cabrita Garage Cafe",
    categoria: "Landing Page Café",
    anio: "2026",
    descripcion:
      "Casa de café de especialidad: carta con acordeón interactivo, bento grid de productos, reseñas y dos sucursales con Google Maps.",
    tecnologias: ["Next.js 16", "React", "TypeScript", "Tailwind CSS v4", "Framer Motion", "Lucide"],
    enlace: "https://cabritagaragecafe-web.vercel.app/",
    imagen: "/cabritacafegarage.webp",
    imagenAlt: "Cabrita Garage Cafe - Landing page de café de especialidad con carta digital",
  },
  {
    id: 7,
    nombre: "El Porvenir",
    categoria: "Landing Page Restaurante",
    anio: "2026",
    descripcion:
      "Bodegón renovado con galería de platos, cocina de temporada, reseñas embebidas y contacto directo por WhatsApp.",
    tecnologias: ["Next.js 16", "React", "TypeScript", "Tailwind CSS v4", "Framer Motion"],
    enlace: "https://elporvenir-sigma.vercel.app/",
    imagen: "/elporvenir.webp",
    imagenAlt: "El Porvenir - Landing page de bodegón con galería de platos y reseñas",
  },
];
