/**
 * Datos centralizados del portfolio — única fuente de verdad.
 * Interfaces, datos personales, servicios, proceso y proyectos.
 *
 * NOTA i18n FASE 2: el copy en español vive en `src/lib/i18n/diccionarios/es.ts`.
 * Aquí solo quedan datos no traducibles (slugs, URLs, imágenes, nombres,
 * ids, años, tecnologías, tipos, helpers).
 */

// ============================================================
// Datos personales
// ============================================================

export const DATOS_PERSONALES = {
  nombreCompleto: "Federico Bordon",
  email: "federicobordon.dev@gmail.com",
  github: "https://github.com/federicobordon09-dev",
  linkedin: "https://www.linkedin.com/in/federicobordon",
  ubicacion: "Mendoza, Argentina",
  rol: "Desarrollador Web",
} as const;

// ============================================================
// Interfaces
// ============================================================

export interface Proyecto {
  id: number;
  slug: string;
  nombre: string;
  anio: string;
  tecnologias: string[];
  enlace: string | null;
  github: string | null;
  imagen: string;
  tipo: "personal" | "demostrativo";
  estado?: "en_desarrollo";
}

export interface Servicio {
  id: number;
  icono: string;
}

export interface PasoProceso {
  numero: string;
}

// ============================================================
// Helpers
// ============================================================

/** Busca un proyecto por slug. Retorna undefined si no existe. */
export function proyectoPorSlug(slug: string): Proyecto | undefined {
  return proyectos.find((p) => p.slug === slug);
}

/** Retorna proyectos relacionados (excluye el actual). */
export function proyectosRelacionados(slug: string, limite = 2): Proyecto[] {
  return proyectos.filter((p) => p.slug !== slug).slice(0, limite);
}

// ============================================================
// Servicios
// ============================================================

export const servicios: Servicio[] = [
  { id: 1, icono: "rocket" },
  { id: 2, icono: "refresh" },
  { id: 3, icono: "target" },
  { id: 4, icono: "code" },
];

// ============================================================
// Proceso de trabajo
// ============================================================

export const proceso: PasoProceso[] = [
  { numero: "01" },
  { numero: "02" },
  { numero: "03" },
  { numero: "04" },
];

// ============================================================
// Proyectos
// ============================================================

export const proyectos: Proyecto[] = [
  // ── PROYECTOS PERSONALES ──────────────────────────────────
  {
    id: 1,
    slug: "nuvio",
    nombre: "Nuvio",
    anio: "2026",
    tecnologias: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase"],
    enlace: null,
    github: null,
    imagen: "/nuvio.PNG",
    tipo: "personal",
    estado: "en_desarrollo",
  },
  {
    id: 2,
    slug: "copa-chapa-chapa",
    nombre: "Copa Chapa Chapa",
    anio: "2026",
    tecnologias: ["Next.js", "React", "TypeScript", "Tailwind"],
    enlace: "https://copachapachapa.vercel.app/",
    github: null,
    imagen: "/copachapachapa.webp",
    tipo: "personal",
  },

  // ── PROYECTOS DEMOSTRATIVOS ───────────────────────────────
  {
    id: 3,
    slug: "bodega-andeluna",
    nombre: "Bodega Andeluna",
    anio: "2026",
    tecnologias: ["Next.js 16", "TypeScript", "CSS Modules", "next-intl", "Embla Carousel"],
    enlace: "https://bodega-andeluna.vercel.app/es",
    github: null,
    imagen: "/andeluna.webp",
    tipo: "demostrativo",
  },
  {
    id: 4,
    slug: "mirasoles",
    nombre: "Mirasoles",
    anio: "2026",
    tecnologias: ["Next.js 16", "TypeScript", "Tailwind CSS v4", "Framer Motion", "Radix UI"],
    enlace: "https://mirasoles-web.vercel.app/",
    github: null,
    imagen: "/mirasoles.webp",
    tipo: "demostrativo",
  },
  {
    id: 5,
    slug: "el-hornero-pizzeria",
    nombre: "El Hornero Pizzería",
    anio: "2026",
    tecnologias: ["Next.js 16", "TypeScript", "Tailwind CSS v4", "Motion", "Base UI", "Lucide"],
    enlace: "https://elhorneropizzanapo.vercel.app/",
    github: null,
    imagen: "/elhorneropizzeria.webp",
    tipo: "demostrativo",
  },
  {
    id: 6,
    slug: "la-taberna",
    nombre: "La Taberna",
    anio: "2026",
    tecnologias: ["Next.js 16", "TypeScript", "Tailwind CSS v4"],
    enlace: "https://lataberna-six.vercel.app/",
    github: null,
    imagen: "/la-taberna.PNG",
    tipo: "demostrativo",
  },
  {
    id: 7,
    slug: "dante-cocina-local",
    nombre: "Dante Cocina Local",
    anio: "2026",
    tecnologias: ["Next.js 16", "TypeScript", "Tailwind CSS v4"],
    enlace: "https://dantecocinalocal.vercel.app/",
    github: null,
    imagen: "/dante-cocina-local.PNG",
    tipo: "demostrativo",
  },
  {
    id: 8,
    slug: "buchardo-restaurante",
    nombre: "Buchardo Restaurante",
    anio: "2026",
    tecnologias: ["Next.js 16", "TypeScript", "Tailwind CSS v4"],
    enlace: "https://buchardorestaurante.vercel.app/",
    github: null,
    imagen: "/buchardo.PNG",
    tipo: "demostrativo",
  },
  {
    id: 9,
    slug: "entre-tablas-barbershop",
    nombre: "Entre Tablas Barbershop",
    anio: "2026",
    tecnologias: ["Next.js 16", "TypeScript", "Tailwind CSS v4"],
    enlace: "https://tablasbarbershop.vercel.app/",
    github: null,
    imagen: "/entre-tablas.PNG",
    tipo: "demostrativo",
  },
  {
    id: 10,
    slug: "cabrita-garage-cafe",
    nombre: "Cabrita Garage Cafe",
    anio: "2026",
    tecnologias: ["Next.js 16", "React", "TypeScript", "Tailwind CSS v4", "Framer Motion", "Lucide"],
    enlace: "https://cabritagaragecafe-web.vercel.app/",
    github: null,
    imagen: "/cabritacafegarage.webp",
    tipo: "demostrativo",
  },
  {
    id: 11,
    slug: "el-porvenir",
    nombre: "El Porvenir",
    anio: "2026",
    tecnologias: ["Next.js 16", "React", "TypeScript", "Tailwind CSS v4", "Framer Motion"],
    enlace: "https://elporvenir-web.vercel.app/",
    github: null,
    imagen: "/elporvenir.webp",
    tipo: "demostrativo",
  },
  {
    id: 12,
    slug: "hornero-restaurante",
    nombre: "Hornero Restaurante",
    anio: "2026",
    tecnologias: ["Next.js 16", "TypeScript", "Tailwind CSS v4"],
    enlace: "https://hornerorestaurante.vercel.app/",
    github: null,
    imagen: "/hornero_restaurante.webp",
    tipo: "demostrativo",
  },
  {
    id: 13,
    slug: "opuntia-casa-de-te",
    nombre: "Opuntia Casa de Té",
    anio: "2026",
    tecnologias: ["Next.js 16", "TypeScript", "Tailwind CSS v4"],
    enlace: "https://opuntia.vercel.app/",
    github: null,
    imagen: "/opuntia.webp",
    tipo: "demostrativo",
  },
  {
    id: 14,
    slug: "los-tilos",
    nombre: "Los Tilos",
    anio: "2026",
    tecnologias: ["Next.js 16", "TypeScript", "Tailwind CSS v4"],
    enlace: "https://lostilosrestaurante.vercel.app/",
    github: null,
    imagen: "/los-tilos.PNG",
    tipo: "demostrativo",
  },
];
