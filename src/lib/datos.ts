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
    slug: "copa-chapa-chapa",
    nombre: "Copa Chapa Chapa",
    anio: "2026",
    tecnologias: ["Next.js", "React", "TypeScript", "Tailwind"],
    enlace: "https://copachapachapa.vercel.app/",
    github: null,
    imagen: "/preview_copachapachapa.webp",
    tipo: "personal",
  },
  {
    id: 2,
    slug: "opencode-hush",
    nombre: "opencode Hush",
    anio: "2026",
    tecnologias: ["TypeScript", "SolidJS", "OpenTUI", "Node.js"],
    enlace: "https://github.com/federicobordon09-dev/opencode-Hush",
    github: "https://github.com/federicobordon09-dev/opencode-Hush",
    imagen: "/preview_hush.png",
    tipo: "personal",
  },
  {
    id: 3,
    slug: "nuvio",
    nombre: "Nuvio",
    anio: "2026",
    tecnologias: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase"],
    enlace: null,
    github: null,
    imagen: "/preview_nuvio.webp",
    tipo: "personal",
    estado: "en_desarrollo",
  },

  // ── PROYECTOS DEMOSTRATIVOS ───────────────────────────────
  {
    id: 4,
    slug: "bodega-andeluna",
    nombre: "Bodega Andeluna",
    anio: "2026",
    tecnologias: ["Next.js 16", "TypeScript", "CSS Modules", "next-intl", "Embla Carousel"],
    enlace: "https://bodega-andeluna.vercel.app/es",
    github: null,
    imagen: "/preview_andeluna.webp",
    tipo: "demostrativo",
  },
  {
    id: 5,
    slug: "opuntia-casa-de-te",
    nombre: "Opuntia Casa de Té",
    anio: "2026",
    tecnologias: ["Next.js 16", "TypeScript", "Tailwind CSS v4"],
    enlace: "https://opuntia.vercel.app/",
    github: null,
    imagen: "/preview_opuntiacasadete.webp",
    tipo: "demostrativo",
  },
  {
    id: 6,
    slug: "hornero-restaurante",
    nombre: "Hornero Restaurante",
    anio: "2026",
    tecnologias: ["Next.js 16", "TypeScript", "Tailwind CSS v4"],
    enlace: "https://hornerorestaurante.vercel.app/",
    github: null,
    imagen: "/preview_hornerorestaurante.webp",
    tipo: "demostrativo",
  },
];
