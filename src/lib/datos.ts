/**
 * Datos centralizados del portfolio — única fuente de verdad.
 * Interfaces, datos personales y proyectos con contenido para case studies.
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
    "Desarrollador web frontend especializado en Next.js, React y TypeScript. Construyo landing pages, sitios web y aplicaciones modernas para negocios en Mendoza y toda Argentina.",
} as const;

// ============================================================
// Interfaces de proyectos
// ============================================================

export interface Proyecto {
  id: number;
  slug: string;
  nombre: string;
  categoria: string;
  anio: string;
  descripcion: string;
  tecnologias: string[];
  enlace: string | null;
  github: string | null;
  imagen: string;
  imagenAlt: string;
  // Case study fields
  problema: string;
  solucion: string;
  desafios: string[];
  resultado: string;
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
// Proyectos
// ============================================================

export const proyectos: Proyecto[] = [
  {
    id: 1,
    slug: "copa-chapa-chapa",
    nombre: "Copa Chapa Chapa",
    categoria: "Plataforma Simracing",
    anio: "2026",
    descripcion:
      "Campeonato argentino de simracing con clasificaciones en vivo, tabla de equipos, resultados por split y formulario de inscripción.",
    tecnologias: ["Next.js", "React", "TypeScript", "Tailwind"],
    enlace: "https://copachapachapa.vercel.app/",
    github: null,
    imagen: "/copachapachapa.webp",
    imagenAlt: "Copa Chapa Chapa - Plataforma de simracing con clasificaciones en vivo",
    problema:
      "El campeonato necesitaba una plataforma centralizada para mostrar clasificaciones en vivo, resultados por split y gestionar inscripciones de equipos. La información estaba dispersa en herramientas manuales y no existía una experiencia unificada para los participantes.",
    solucion:
      "Desarrollé una aplicación web con Next.js que consume datos en tiempo real, presenta clasificaciones actualizadas automáticamente y ofrece un formulario de inscripción validado. La interfaz prioriza la legibilidad de los datos de carrera y funciona en cualquier dispositivo.",
    desafios: [
      "Sincronización de datos en tiempo real entre múltiples fuentes de clasificación",
      "Rendering performante de tablas con actualizaciones frecuentes sin parpadeos",
      "Diseño responsive que mantenga la legibilidad de datos densos en mobile",
    ],
    resultado:
      "Una plataforma funcional que centraliza toda la información del campeonato. Los participantes pueden consultar sus clasificaciones, equipos y resultados desde un solo lugar, mejorando la experiencia general del evento.",
  },
  {
    id: 2,
    slug: "bodega-andeluna",
    nombre: "Bodega Andeluna",
    categoria: "Website Redesign",
    anio: "2026",
    descripcion:
      "Rediseño luxury con catálogo de 32 vinos, experiencias gastronómicas, lodge con booking y soporte en 3 idiomas.",
    tecnologias: ["Next.js 16", "TypeScript", "CSS Modules", "next-intl", "Embla Carousel"],
    enlace: "https://bodega-andeluna.vercel.app/es",
    github: null,
    imagen: "/andeluna.webp",
    imagenAlt: "Bodega Andeluna - Rediseño web luxury con catálogo de vinos y booking",
    problema:
      "Bodega Andeluna, una bodega boutique en el Valle de Uco, necesitaba una presencia digital que reflejara la calidad premium de sus vinos y experiencias. El sitio anterior no comunicaba la exclusividad de la marca ni ofrecía información detallada del catálogo en múltiples idiomas.",
    solucion:
      "Rediseñé el sitio completo con estética luxury: catálogo interactivo de 32 vinos con fichas técnicas detalladas, sección de experiencias gastronómicas, sistema de booking para el lodge y soporte completo en español, inglés y portugués mediante next-intl.",
    desafios: [
      "Implementar internacionalización completa con 3 idiomas manteniendo la consistencia visual",
      "Diseñar un catálogo de 32 vinos con navegación intuitiva y fichas técnicas ricas",
      "Equilibrar estética luxury con performance y accesibilidad",
    ],
    resultado:
      "Un sitio web que posiciona a Bodega Andeluna como marca premium en el Valle de Uco, con presencia multilingüe que llega a visitantes internacionales y un catálogo que comunica la calidad de cada vino.",
  },
  {
    id: 3,
    slug: "mirasoles",
    nombre: "Mirasoles",
    categoria: "Landing Page Restaurante",
    anio: "2026",
    descripcion:
      "Landing page para restaurante familiar: carta digital con lightbox, carrusel de fotos, mapa interactivo y WhatsApp integrado.",
    tecnologias: ["Next.js 16", "TypeScript", "Tailwind CSS v4", "Framer Motion", "Radix UI"],
    enlace: "https://mirasoles-web.vercel.app/",
    github: null,
    imagen: "/mirasoles.webp",
    imagenAlt: "Mirasoles - Landing page de restaurante familiar con carta digital",
    problema:
      "Mirasoles, restaurante familiar en Mendoza, necesitaba una presencia digital que mostrara su carta de forma atractiva, facilitara la ubicación del local y permitiera contacto directo por WhatsApp. La información estaba dispersa en redes sociales sin una página propia.",
    solucion:
      "Desarrollé una landing page completa con carta digital interactiva que incluye lightbox para fotos de platos, carrusel de imágenes del local, mapa interactivo de ubicación y botón de WhatsApp con mensaje predefinido para reservas.",
    desafios: [
      "Optimizar imágenes de platos para carga rápida sin perder calidad visual",
      "Crear una experiencia de carta intuitiva que funcione como un menú físico digital",
      "Integrar WhatsApp de forma natural dentro del flujo de usuario",
    ],
    resultado:
      "Una landing page que captura la esencia del restaurante familiar, facilita el contacto directo y presenta la carta de forma visual y atractiva para potenciales clientes.",
  },
  {
    id: 4,
    slug: "el-hornero-pizzeria",
    nombre: "El Hornero Pizzería",
    categoria: "Landing Page Restaurante",
    anio: "2026",
    descripcion:
      "Landing dark + glassmorphism con carta interactiva, reseñas reales con ticker infinito y WhatsApp con mensaje predefinido.",
    tecnologias: ["Next.js 16", "TypeScript", "Tailwind CSS v4", "Motion", "Base UI", "Lucide"],
    enlace: "https://elhorneropizzanapo.vercel.app/",
    github: null,
    imagen: "/elhorneropizzeria.webp",
    imagenAlt: "El Hornero Pizzería - Landing page dark con glassmorphism y reseñas",
    problema:
      "El Hornero Pizzería necesitaba una página web que transmitiera la personalidad de la marca: informal, cercana y con identidad propia. El diseño debía destacar entre las landing pages de restaurantes genéricas y mostrar reseñas reales de clientes.",
    solucion:
      "Creé una landing con diseño dark y efecto glassmorphism que le da identidad visual única. Incluye carta interactiva con precios visibles, carrusel infinito de reseñas reales de clientes y contacto directo por WhatsApp con mensaje predefinido para pedidos.",
    desafios: [
      "Implementar glassmorphism de forma performante sin afectar rendering en devices低端",
      "Crear el efecto de ticker infinito de reseñas con animación fluida",
      "Mantener la legibilidad de precios y textos sobre fondos con blur",
    ],
    resultado:
      "Una landing con personalidad visual única que refleja la identidad de la pizzería, genera confianza a través de reseñas reales y facilita el contacto para pedidos.",
  },
  {
    id: 5,
    slug: "cabrita-garage-cafe",
    nombre: "Cabrita Garage Cafe",
    categoria: "Landing Page Café",
    anio: "2026",
    descripcion:
      "Casa de café de especialidad: carta con acordeón interactivo, bento grid de productos, reseñas y dos sucursales con Google Maps.",
    tecnologias: ["Next.js 16", "React", "TypeScript", "Tailwind CSS v4", "Framer Motion", "Lucide"],
    enlace: "https://cabritagaragecafe-web.vercel.app/",
    github: null,
    imagen: "/cabritacafegarage.webp",
    imagenAlt: "Cabrita Garage Cafe - Landing page de café de especialidad con carta digital",
    problema:
      "Cabrita Garage Cafe, casa de café de especialidad con dos sucursales en Mendoza, necesitaba una web que mostrara su carta de café de especialidad, destacara sus productos y facilitara la ubicación de ambas sucursales con mapas interactivos.",
    solucion:
      "Desarrollé una landing con diseño moderno que incluye carta con acordeón interactivo por categorías, bento grid de productos destacados con fotos, sección de reseñas de clientes y dos mapas de Google Maps integrados para cada sucursal.",
    desafios: [
      "Organizar una carta extensa de café de especialidad con categorías intuitivas",
      "Diseñar un bento grid que muestre productos de forma visualmente atractiva",
      "Integrar dos instancias de Google Maps sin afectar performance",
    ],
    resultado:
      "Una página que comunica la calidad del café de especialidad, facilita la elección de productos y ayuda a encontrar cada sucursal, fortaleciendo la presencia digital de la marca.",
  },
  {
    id: 6,
    slug: "el-porvenir",
    nombre: "El Porvenir",
    categoria: "Landing Page Restaurante",
    anio: "2026",
    descripcion:
      "Bodegón renovado con galería de platos, cocina de temporada, reseñas embebidas y contacto directo por WhatsApp.",
    tecnologias: ["Next.js 16", "React", "TypeScript", "Tailwind CSS v4", "Framer Motion"],
    enlace: "https://elporvenir-sigma.vercel.app/",
    github: null,
    imagen: "/elporvenir.webp",
    imagenAlt: "El Porvenir - Landing page de bodegón con galería de platos y reseñas",
    problema:
      "El Porvenir, bodegón tradicional renovado en Mendoza, necesitaba una presencia digital que comunicara su renovación, mostrara la cocina de temporada y destacara la experiencia gastronómica completa. La falta de web propia limitaba el alcance a nuevos clientes.",
    solucion:
      "Construí una landing page que muestra la identidad renovada del bodegón: galería de platos con fotos de alta calidad, menú de cocina de temporada, reseñas embebidas de clientes y contacto directo por WhatsApp para reservas.",
    desafios: [
      "Comunicar la renovación del bodegón manteniendo la esencia tradicional",
      "Diseñar una galería de platos que transmita la calidad de la cocina",
      "Integrar reseñas de forma natural sin que parezcan genéricas",
    ],
    resultado:
      "Una página que comunica exitosamente la renovación del restaurante, muestra la propuesta gastronómica de temporada y facilita el contacto para reservas.",
  },
  {
    id: 7,
    slug: "hornero-restaurante",
    nombre: "Hornero Restaurante",
    categoria: "Landing Page Restaurante",
    anio: "2026",
    descripcion:
      "Cocina auténtica al horno a leña en Los Chacayes: cava de 12.000 botellas, vistas a los Andes, menú para compartir y reservas con anticipación.",
    tecnologias: ["Next.js 16", "TypeScript", "Tailwind CSS v4"],
    enlace: "https://hornerorestaurante.vercel.app/",
    github: null,
    imagen: "/hornero_restaurante.webp",
    imagenAlt: "Hornero Restaurante - Landing page de cocina al horno a leña en el Valle de Uco",
    problema:
      "Hornero Restaurante, ubicado en Los Chacayes en el Valle de Uco, necesitaba una web que transmitiera la experiencia gastronómica única: cocina al horno a leña, cava de 12.000 botellas y vistas a los Andes. El restaurante recibe visitantes de todo el país que buscan reservar con anticipación.",
    solucion:
      "Desarrollé una landing page que captura la experiencia completa del restaurante: destacando la cocina al horno a leña, la impresionante cava de vinos y las vistas panorámicas. Incluye menú para compartir y sistema de reservas con contacto directo.",
    desafios: [
      "Transmitir la experiencia sensorial del restaurante a través de diseño y copy",
      "Comunicar la escala de la cava de 12.000 botellas de forma visual",
      "Optimizar para búsquedas de turistas gastronómicos en Mendoza",
    ],
    resultado:
      "Una landing que posiciona a Hornero como destino gastronómico premium en el Valle de Uco, facilitando reservas y comunicando la experiencia completa del restaurante.",
  },
  {
    id: 8,
    slug: "opuntia-casa-de-te",
    nombre: "Opuntia Casa de Té",
    categoria: "Landing Page Casa de Té",
    anio: "2026",
    descripcion:
      "Casa de té y pastelería artesanal con vista a la Cordillera de los Andes, en el Manzano Histórico. Té en hebras, tortas caseras y reserva previa por WhatsApp.",
    tecnologias: ["Next.js 16", "TypeScript", "Tailwind CSS v4"],
    enlace: "https://opuntia.vercel.app/",
    github: null,
    imagen: "/opuntia.webp",
    imagenAlt: "Opuntia Casa de Té - Landing page de merienda con vista a la montaña en Tunuyán",
    problema:
      "Opuntia Casa de Té, ubicada en el Manzano Histórico de Tunuyán con vista a la Cordillera, necesitaba una presencia digital que comunicara la experiencia única de merienda artesanal en un entorno natural excepcional. La reserva previa por WhatsApp era informal y sin información previa.",
    solucion:
      "Creé una landing page que captura la esencia del lugar: té en hebras, tortas caseras y la vista espectacular a los Andes. La página presenta el menú, la experiencia y facilita la reserva previa por WhatsApp con información completa antes del contacto.",
    desafios: [
      "Transmitir la experiencia sensorial del lugar a través de diseño web",
      "Comunicar la ubicación privilegiada en el Manzano Histórico",
      "Optimizar para búsquedas turísticas de la zona de Tunuyán y Valle de Uco",
    ],
    resultado:
      "Una landing que comunica la experiencia única de Opuntia, facilita la reserva informada y posiciona el local como destino turístico-gastronómico en la zona del Valle de Uco.",
  },
];
