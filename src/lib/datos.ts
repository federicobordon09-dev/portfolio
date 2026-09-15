/**
 * Datos centralizados del portfolio — única fuente de verdad.
 * Interfaces, datos personales, servicios, proceso y proyectos.
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
  description:
    "Desarrollador web en Mendoza, Argentina. Diseño y desarrollo sitios web profesionales para negocios que quieren verse bien y crecer online.",
  tagline:
    "Desarrollo web para negocios que quieren verse profesionales y crecer online.",
  subheadline:
    "Diseño y desarrollo sitios rápidos, modernos y pensados para convertir visitas en clientes.",
  whatsapp:
    "https://wa.me/542622579076?text=Hola%20Federico%2C%20quiero%20consultar%20por%20un%20proyecto%20web",
} as const;

// ============================================================
// Interfaces
// ============================================================

export interface Proyecto {
  id: number;
  slug: string;
  nombre: string;
  categoria: string;
  anio: string;
  descripcion: string;
  problema: string;
  solucion: string;
  tecnologias: string[];
  enlace: string | null;
  github: string | null;
  imagen: string;
  imagenAlt: string;
  tipo: "personal" | "demostrativo";
  estado?: "en_desarrollo";
}

export interface Servicio {
  id: number;
  titulo: string;
  descripcion: string;
  icono: string;
}

export interface PasoProceso {
  numero: string;
  titulo: string;
  descripcion: string;
}

// ============================================================
// Helpers
// ============================================================

/** Busca un proyecto por slug. Retorna undefined si no existe. */
export function proyectoPorSlug(slug: string): Proyecto | undefined {
  return proyectos.find((p) => p.slug === slug);
}

/** Retorna proyectos relacionados (misma categoría, excluye el actual). */
export function proyectosRelacionados(slug: string, limite = 2): Proyecto[] {
  const actual = proyectoPorSlug(slug);
  if (!actual) return [];
  return proyectos
    .filter((p) => p.slug !== slug && p.categoria === actual.categoria)
    .slice(0, limite);
}

// ============================================================
// Servicios
// ============================================================

export const servicios: Servicio[] = [
  {
    id: 1,
    titulo: "Web desde cero",
    descripcion:
      "Para negocios que necesitan una presencia digital profesional. Diseño y desarrollo una web completa, desde la estructura hasta el contenido, pensada para transmitir confianza y facilitar el contacto.",
    icono: "rocket",
  },
  {
    id: 2,
    titulo: "Rediseño",
    descripcion:
      "Para sitios antiguos, desactualizados o que ya no representan al negocio. Modernizo la experiencia visual y técnica sin perder lo que ya funciona.",
    icono: "refresh",
  },
  {
    id: 3,
    titulo: "Landing page",
    descripcion:
      "Para promocionar servicios, productos, eventos o campañas. Una página enfocada en un solo objetivo: que el visitante tome acción.",
    icono: "target",
  },
  {
    id: 4,
    titulo: "Experiencia digital",
    descripcion:
      "Para proyectos que necesitan funcionalidades personalizadas: catálogos, reservas, plataformas o aplicaciones web con lógica propia.",
    icono: "code",
  },
];

// ============================================================
// Proceso de trabajo
// ============================================================

export const proceso: PasoProceso[] = [
  {
    numero: "01",
    titulo: "Entender",
    descripcion:
      "Primero entiendo el negocio, sus objetivos y qué necesita conseguir la web. No arranco a codear sin saber qué se busca resolver.",
  },
  {
    numero: "02",
    titulo: "Diseñar",
    descripcion:
      "Defino la estructura, el contenido y la experiencia antes de desarrollar. Así evitamos vueltas innecesarias y el resultado queda claro desde el inicio.",
  },
  {
    numero: "03",
    titulo: "Desarrollar",
    descripcion:
      "Construyo una web responsive, rápida y adaptada al proyecto. Cada detalle está pensado para funcionar bien en cualquier dispositivo.",
  },
  {
    numero: "04",
    titulo: "Publicar",
    descripcion:
      "Dejo el sitio preparado y publicado para que pueda empezar a recibir visitantes desde el primer día.",
  },
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
    categoria: "App Health-Tech",
    anio: "2026",
    descripcion:
      "Producto health-tech desarrollado de punta a punta: análisis de PDFs médicos con IA, extracción de resultados, chat contextual y comparación de estudios.",
    problema:
      "Necesitaba una herramienta que tradujera estudios médicos en PDF a información clara y accionable para el paciente.",
    solucion:
      "Aplicación full-stack con análisis de PDFs, extracción de contenido con IA, resultados estructurados, chat contextual y comparación entre estudios.",
    tecnologias: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase"],
    enlace: null,
    github: null,
    imagen: "/nuvio.PNG",
    imagenAlt: "Nuvio — Aplicación web para análisis de estudios médicos con IA",
    tipo: "personal",
    estado: "en_desarrollo",
  },
  {
    id: 2,
    slug: "copa-chapa-chapa",
    nombre: "Copa Chapa Chapa",
    categoria: "Plataforma Simracing",
    anio: "2026",
    descripcion:
      "Plataforma full-stack para centralizar resultados, clasificaciones y seguimiento de un campeonato de simracing.",
    problema:
      "El campeonato necesitaba una plataforma centralizada para mostrar clasificaciones, gestionar inscripciones y mantener el historial de carreras.",
    solucion:
      "Aplicación con Next.js que presenta clasificaciones actualizadas, formulario de inscripción validado y gestión de equipos y pilotos.",
    tecnologias: ["Next.js", "React", "TypeScript", "Tailwind"],
    enlace: "https://copachapachapa.vercel.app/",
    github: null,
    imagen: "/copachapachapa.webp",
    imagenAlt: "Copa Chapa Chapa — Plataforma de simracing con clasificaciones en vivo",
    tipo: "personal",
  },

  // ── PROYECTOS DEMOSTRATIVOS ───────────────────────────────
  {
    id: 3,
    slug: "bodega-andeluna",
    nombre: "Bodega Andeluna",
    categoria: "Website Redesign",
    anio: "2026",
    descripcion:
      "Rediseño completo con catálogo de 32 vinos, experiencias gastronómicas, lodge con booking y soporte multilíngüe (ES/EN/PT).",
    problema:
      "Bodega Andeluna necesitaba una presencia digital que reflejara la calidad premium de sus vinos y llegara a visitantes internacionales.",
    solucion:
      "Sitio luxury con catálogo interactivo de vinos, experiencias gastronómicas, sistema de booking y soporte en 3 idiomas con next-intl.",
    tecnologias: ["Next.js 16", "TypeScript", "CSS Modules", "next-intl", "Embla Carousel"],
    enlace: "https://bodega-andeluna.vercel.app/es",
    github: null,
    imagen: "/andeluna.webp",
    imagenAlt: "Bodega Andeluna — Rediseño web luxury con catálogo de vinos y booking",
    tipo: "demostrativo",
  },
  {
    id: 4,
    slug: "mirasoles",
    nombre: "Mirasoles",
    categoria: "Landing Page Restaurante",
    anio: "2026",
    descripcion:
      "Landing page para restaurante familiar: carta digital con lightbox, carrusel de fotos, mapa interactivo y WhatsApp integrado.",
    problema:
      "Mirasoles necesitaba una presencia digital que mostrara su carta, facilitara la ubicación del local y permitiera contacto directo por WhatsApp.",
    solucion:
      "Landing page completa con carta digital interactiva con lightbox, carrusel del local, mapa de ubicación y contacto directo por WhatsApp con mensaje predefinido.",
    tecnologias: ["Next.js 16", "TypeScript", "Tailwind CSS v4", "Framer Motion", "Radix UI"],
    enlace: "https://mirasoles-web.vercel.app/",
    github: null,
    imagen: "/mirasoles.webp",
    imagenAlt: "Mirasoles — Landing page de restaurante familiar con carta digital",
    tipo: "demostrativo",
  },
  {
    id: 5,
    slug: "el-hornero-pizzeria",
    nombre: "El Hornero Pizzería",
    categoria: "Landing Page Restaurante",
    anio: "2026",
    descripcion:
      "Landing dark + glassmorphism con carta interactiva, reseñas reales con ticker infinito y WhatsApp con mensaje predefinido.",
    problema:
      "El Hornero necesitaba una página con personalidad propia que destacara entre landing pages genéricas y mostrara reseñas reales de clientes.",
    solucion:
      "Landing con diseño dark y glassmorphism: carta interactiva, carrusel infinito de reseñas reales de clientes y contacto por WhatsApp.",
    tecnologias: ["Next.js 16", "TypeScript", "Tailwind CSS v4", "Motion", "Base UI", "Lucide"],
    enlace: "https://elhorneropizzanapo.vercel.app/",
    github: null,
    imagen: "/elhorneropizzeria.webp",
    imagenAlt: "El Hornero Pizzería — Landing page dark con glassmorphism y reseñas",
    tipo: "demostrativo",
  },
  {
    id: 6,
    slug: "la-taberna",
    nombre: "La Taberna",
    categoria: "Landing Page Restaurante",
    anio: "2026",
    descripcion:
      "Landing editorial premium para restaurante italiano con menú, información del local, ubicación, contacto y SEO estructurado.",
    problema:
      "La Taberna necesitaba una presencia digital que transmitiera la calidad de su gastronomía italiana y facilitara el contacto y la ubicación del restaurante.",
    solucion:
      "Landing editorial premium: menú interactivo, información del restaurante, mapa de ubicación, contacto y datos estructurados para buscadores (SEO).",
    tecnologias: ["Next.js 16", "TypeScript", "Tailwind CSS v4"],
    enlace: "https://lataberna-six.vercel.app/",
    github: null,
    imagen: "/la-taberna.PNG",
    imagenAlt: "La Taberna — Landing editorial premium para restaurante italiano en Lomas de Zamora",
    tipo: "demostrativo",
  },
  {
    id: 7,
    slug: "dante-cocina-local",
    nombre: "Dante Cocina Local",
    categoria: "Landing Page Restaurante",
    anio: "2026",
    descripcion:
      "Landing editorial para propuesta gastronómica vinculada a Bodega Dante Robino. Cocina regional y experiencias con vino.",
    problema:
      "Dante Cocina Local necesitaba comunicar su propuesta de cocina regional vinculada a la bodega, mostrando menú, experiencias y facilitando reservas.",
    solucion:
      "Landing editorial que integra menú, experiencias gastronómicas, historia de la bodega, sistema de reservas, ubicación y contacto por WhatsApp.",
    tecnologias: ["Next.js 16", "TypeScript", "Tailwind CSS v4"],
    enlace: "https://dantecocinalocal.vercel.app/",
    github: null,
    imagen: "/dante-cocina-local.PNG",
    imagenAlt: "Dante Cocina Local — Landing editorial de cocina regional y vinos",
    tipo: "demostrativo",
  },
  {
    id: 8,
    slug: "buchardo-restaurante",
    nombre: "Buchardo Restaurante",
    categoria: "Landing Page Restaurante",
    anio: "2026",
    descripcion:
      "Landing minimalista para restaurante en Núñez, CABA. Parrilla, pastas, vinos y cocktails con menú amplio y reservas.",
    problema:
      "Buchardo necesitaba una web que mostrara su propuesta gastronómica completa — parrilla, pastas, vinos y cocktails — y facilitara reservas y ubicación.",
    solucion:
      "Landing minimalista con menú amplio organizado por categorías (parrilla, pastas, vinos, cocktails), sistema de reservas, eventos y ubicación.",
    tecnologias: ["Next.js 16", "TypeScript", "Tailwind CSS v4"],
    enlace: "https://buchardorestaurante.vercel.app/",
    github: null,
    imagen: "/buchardo.PNG",
    imagenAlt: "Buchardo Restaurante — Landing minimalista de parrilla, pastas y cocktails en Núñez",
    tipo: "demostrativo",
  },
  {
    id: 9,
    slug: "entre-tablas-barbershop",
    nombre: "Entre Tablas Barbershop",
    categoria: "Landing Page Barbería",
    anio: "2026",
    descripcion:
      "Landing neo-brutalista para barbería con reservas, servicios, ubicación, horarios y CTA móvil integrado.",
    problema:
      "Entre Tablas necesitaba una web con personalidad que mostrara sus servicios de corte, color y barba, y facilitara reservas desde el celular.",
    solucion:
      "Landing neo-brutalista: servicios destacados, sistema de reservas, información del local, horarios y botón de contacto optimizado para móvil.",
    tecnologias: ["Next.js 16", "TypeScript", "Tailwind CSS v4"],
    enlace: "https://tablasbarbershop.vercel.app/",
    github: null,
    imagen: "/entre-tablas.PNG",
    imagenAlt: "Entre Tablas Barbershop — Landing neo-brutalista para barbería en Mendoza",
    tipo: "demostrativo",
  },
  {
    id: 10,
    slug: "cabrita-garage-cafe",
    nombre: "Cabrita Garage Cafe",
    categoria: "Landing Page Café",
    anio: "2026",
    descripcion:
      "Casa de café de especialidad: carta con acordeón interactivo, bento grid de productos, reseñas y dos sucursales con Google Maps.",
    problema:
      "Cabrita Garage Cafe necesitaba mostrar su carta de café de especialidad y facilitar la ubicación de sus dos sucursales.",
    solucion:
      "Landing con carta interactiva por categorías de café de especialidad, bento grid de productos, reseñas y dos mapas de Google Maps para cada sucursal.",
    tecnologias: ["Next.js 16", "React", "TypeScript", "Tailwind CSS v4", "Framer Motion", "Lucide"],
    enlace: "https://cabritagaragecafe-web.vercel.app/",
    github: null,
    imagen: "/cabritacafegarage.webp",
    imagenAlt: "Cabrita Garage Cafe — Landing page de café de especialidad con carta digital",
    tipo: "demostrativo",
  },
  {
    id: 11,
    slug: "el-porvenir",
    nombre: "El Porvenir",
    categoria: "Landing Page Restaurante",
    anio: "2026",
    descripcion:
      "Bodegón renovado con galería de platos, cocina de temporada, reseñas embebidas y contacto directo por WhatsApp.",
    problema:
      "El Porvenir necesitaba comunicar su renovación, mostrar la cocina de temporada y facilitar reservas desde nuevos clientes.",
    solucion:
      "Landing que muestra la identidad renovada del bodegón: galería de platos, menú de temporada, reseñas embebidas y contacto directo por WhatsApp.",
    tecnologias: ["Next.js 16", "React", "TypeScript", "Tailwind CSS v4", "Framer Motion"],
    enlace: "https://elporvenir-web.vercel.app/",
    github: null,
    imagen: "/elporvenir.webp",
    imagenAlt: "El Porvenir — Landing page de bodegón con galería de platos y reseñas",
    tipo: "demostrativo",
  },
  {
    id: 12,
    slug: "hornero-restaurante",
    nombre: "Hornero Restaurante",
    categoria: "Landing Page Restaurante",
    anio: "2026",
    descripcion:
      "Cocina auténtica al horno a leña en Los Chacayes: cava de 12.000 botellas, vistas a los Andes, menú para compartir y reservas con anticipación.",
    problema:
      "Hornero necesitaba transmitir la experiencia gastronómica única y facilitar reservas de visitantes de todo el país.",
    solucion:
      "Landing que captura la experiencia completa: cocina al horno a leña, cava de 12.000 botellas, vistas panorámicas a los Andes, menú y reservas.",
    tecnologias: ["Next.js 16", "TypeScript", "Tailwind CSS v4"],
    enlace: "https://hornerorestaurante.vercel.app/",
    github: null,
    imagen: "/hornero_restaurante.webp",
    imagenAlt: "Hornero Restaurante — Landing page de cocina al horno a leña en el Valle de Uco",
    tipo: "demostrativo",
  },
  {
    id: 13,
    slug: "opuntia-casa-de-te",
    nombre: "Opuntia Casa de Té",
    categoria: "Landing Page Casa de Té",
    anio: "2026",
    descripcion:
      "Casa de té y pastelería artesanal con vista a la Cordillera de los Andes, en el Manzano Histórico. Té en hebras, tortas caseras y reserva previa por WhatsApp.",
    problema:
      "Opuntia necesitaba una presencia digital que comunicara la experiencia única de merienda artesanal con vista a los Andes.",
    solucion:
      "Landing que captura la esencia del lugar: té en hebras, tortas caseras y la vista a los Andes, con reserva previa por WhatsApp.",
    tecnologias: ["Next.js 16", "TypeScript", "Tailwind CSS v4"],
    enlace: "https://opuntia.vercel.app/",
    github: null,
    imagen: "/opuntia.webp",
    imagenAlt: "Opuntia Casa de Té — Landing page de merienda con vista a la montaña en Tunuyán",
    tipo: "demostrativo",
  },
  {
    id: 14,
    slug: "los-tilos",
    nombre: "Los Tilos",
    categoria: "Landing Page Restaurante",
    anio: "2026",
    descripcion:
      "Landing editorial para restaurante en Valle de Uco con concepto de jardín, bodega y experiencia gastronómica integral.",
    problema:
      "Los Tilos necesitaba una presencia digital que comunicara la experiencia completa: gastronomía, jardín, vinos y reserva.",
    solucion:
      "Landing editorial con menú, reserva integrada, ubicación, contacto y elementos de prueba social que transmiten la experiencia del jardín y la bodega.",
    tecnologias: ["Next.js 16", "TypeScript", "Tailwind CSS v4"],
    enlace: "https://lostilosrestaurante.vercel.app/",
    github: null,
    imagen: "/los-tilos.PNG",
    imagenAlt: "Los Tilos — Landing editorial de restaurante con jardín y bodega en Valle de Uco",
    tipo: "demostrativo",
  },
];
