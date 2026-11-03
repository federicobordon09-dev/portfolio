import type { Diccionario } from "../tipos";

export const es: Diccionario = {
  rol: "Desarrollador Web",
  navegacion: {
    inicio: "Inicio",
    proyectos: "Proyectos",
    servicios: "Servicios",
    proceso: "Proceso",
    contacto: "Contacto",
    abrirMenu: "Abrir menú",
    cerrarMenu: "Cerrar menú",
    menuNavegacion: "Menú de navegación",
    volverInicio: "Volver al inicio",
  },
  hero: {
    etiqueta: "Construyo sitios web con Next.js, React y TypeScript.",
    subheadline:
      "Diseño y desarrollo landing pages, sitios para negocios y aplicaciones web, de la idea a la publicación.",
    ctaProyecto: "Quiero una web para mi negocio",
    verProyectos: "Ver proyectos",
    bajar: "Bajar",
    ubicacionCorta: "Mendoza · Argentina",
    disponibilidad: "Disponible para nuevos proyectos",
  },
  proyectos: {
    titulo: "Proyectos",
    intro:
      "Los hice por mi cuenta para aprender y mejorar: cada uno resuelve un problema concreto de diseño, desarrollo o producto.",
    verProyecto: "Ver proyecto",
    escribimeCta: "Escribime →",
    parecidoMente: "¿Tenés un proyecto parecido en mente?",
    indiceAria: "Índice de proyectos",
    vistaPreviaDe: (nombre: string) => `Vista previa de ${nombre}`,
    verProyectoDe: (nombre: string) => `Ver proyecto ${nombre}`,
    items: [
      {
        slug: "copa-chapa-chapa",
        categoria: "Plataforma Simracing",
        descripcion:
          "Plataforma full-stack para centralizar resultados, clasificaciones y seguimiento de un campeonato de simracing.",
        problema:
          "El campeonato necesitaba una plataforma centralizada para mostrar clasificaciones, gestionar inscripciones y mantener el historial de carreras.",
        solucion:
          "Aplicación con Next.js que presenta clasificaciones actualizadas, formulario de inscripción validado y gestión de equipos y pilotos.",
        imagenAlt:
          "Copa Chapa Chapa — Plataforma de simracing con clasificaciones en vivo",
      },
      {
        slug: "opencode-hush",
        categoria: "Plugin OpenCode",
        descripcion:
          "Panel de telemetría mínima para la TUI de OpenCode: presión de contexto, rama de Git y métricas de sesión que el host no dibuja en el mismo lugar.",
        problema:
          "OpenCode no muestra de forma visible la presión del contexto ni las métricas de la sesión mientras se trabaja en la terminal.",
        solucion:
          "Plugin en TypeScript y SolidJS que dibuja un panel lateral silencioso: muestra solo lo disponible, oculta lo que falta y no hace llamadas externas.",
        imagenAlt:
          "opencode Hush — Panel de telemetría para la TUI de OpenCode",
      },
      {
        slug: "nuvio",
        categoria: "App Health-Tech",
        descripcion:
          "Producto health-tech desarrollado de punta a punta: análisis de PDFs médicos con IA, extracción de resultados, chat contextual y comparación de estudios.",
        problema:
          "Necesitaba una herramienta que tradujera estudios médicos en PDF a información clara y accionable para el paciente.",
        solucion:
          "Aplicación full-stack con análisis de PDFs, extracción de contenido con IA, resultados estructurados, chat contextual y comparación entre estudios.",
        imagenAlt:
          "Nuvio — Aplicación web para análisis de estudios médicos con IA",
      },
      {
        slug: "bodega-andeluna",
        categoria: "Website Redesign",
        descripcion:
          "Rediseño completo con catálogo de 32 vinos, experiencias gastronómicas, lodge con booking y soporte multilíngüe (ES/EN/PT).",
        problema:
          "Bodega Andeluna necesitaba una presencia digital que reflejara la calidad premium de sus vinos y llegara a visitantes internacionales.",
        solucion:
          "Sitio luxury con catálogo interactivo de vinos, experiencias gastronómicas, sistema de booking y soporte en 3 idiomas con next-intl.",
        imagenAlt:
          "Bodega Andeluna — Rediseño web luxury con catálogo de vinos y booking",
      },
      {
        slug: "opuntia-casa-de-te",
        categoria: "Landing Page Casa de Té",
        descripcion:
          "Casa de té y pastelería artesanal con vista a la Cordillera de los Andes, en el Manzano Histórico. Té en hebras, tortas caseras y reserva previa por WhatsApp.",
        problema:
          "Opuntia necesitaba una presencia digital que comunicara la experiencia única de merienda artesanal con vista a los Andes.",
        solucion:
          "Landing que captura la esencia del lugar: té en hebras, tortas caseras y la vista a los Andes, con reserva previa por WhatsApp.",
        imagenAlt:
          "Opuntia Casa de Té — Landing page de merienda con vista a la montaña en Tunuyán",
      },
      {
        slug: "hornero-restaurante",
        categoria: "Landing Page Restaurante",
        descripcion:
          "Cocina auténtica al horno a leña en Los Chacayes: cava de 12.000 botellas, vistas a los Andes, menú para compartir y reservas con anticipación.",
        problema:
          "Hornero necesitaba transmitir la experiencia gastronómica única y facilitar reservas de visitantes de todo el país.",
        solucion:
          "Landing que captura la experiencia completa: cocina al horno a leña, cava de 12.000 botellas, vistas panorámicas a los Andes, menú y reservas.",
        imagenAlt:
          "Hornero Restaurante — Landing page de cocina al horno a leña en el Valle de Uco",
      },
    ],
  },
  servicios: {
    titulo: "¿Qué puedo construir?",
    intro: "Cada proyecto es distinto. Estos son los tipos de trabajo que hago.",
    items: [
      {
        id: 1,
        titulo: "Web desde cero",
        descripcion:
          "Un sitio completo, desde la estructura hasta la publicación. Defino el contenido, diseño la interfaz y lo dejo funcionando online.",
      },
      {
        id: 2,
        titulo: "Rediseño",
        descripcion:
          "Tomo un sitio existente y lo modernizo: ordeno el contenido, actualizo el diseño y mejoro el rendimiento, sin romper lo que ya funciona.",
      },
      {
        id: 3,
        titulo: "Landing page",
        descripcion:
          "Una página enfocada en un solo tema: presentar un servicio, un producto o una idea de forma clara y directa.",
      },
      {
        id: 4,
        titulo: "Experiencia digital",
        descripcion:
          "Proyectos con funcionalidades a medida, como catálogos, reservas o aplicaciones web con lógica propia. Los defino y desarrollo de punta a punta.",
      },
    ],
  },
  proceso: {
    titulo: "Cómo Trabajo",
    etiqueta: "Proceso",
    items: [
      {
        titulo: "Entender",
        descripcion:
          "Primero entiendo qué se quiere lograr y para quién. Hago preguntas y defino el objetivo antes de escribir código.",
      },
      {
        titulo: "Diseñar",
        descripcion:
          "Defino la estructura y el contenido antes de desarrollar, así el resultado queda claro desde el inicio.",
      },
      {
        titulo: "Desarrollar",
        descripcion:
          "Construyo la web de forma responsive, cuidando el rendimiento y los detalles en cada dispositivo.",
      },
      {
        titulo: "Publicar",
        descripcion:
          "Preparo y publico el sitio para que quede accesible y funcionando correctamente.",
      },
    ],
  },
  contacto: {
    titulo: "¿Tenés un proyecto en mente?",
    parrafo: "Contame tu idea y vemos cómo llevarla a la web.",
    emailDirecto: "Email directo",
    hintFormulario:
      "Click para abrir el formulario — te respondo a la brevedad.",
    encontrameEn: "Encontrame en",
    disponibilidad: "Disponible para nuevos proyectos",
  },
  formulario: {
    nuevoMensaje: "Nuevo mensaje",
    titulo: "Escribime",
    etiquetaCorreo: "Tu correo",
    placeholderCorreo: "tu@correo.com",
    etiquetaAsunto: "Asunto",
    placeholderAsunto: "¿De qué se trata?",
    etiquetaMensaje: "Mensaje",
    placeholderMensaje: "Contame en qué te puedo ayudar...",
    enviar: "Enviar mensaje",
    enviando: "Enviando...",
    exitoTitulo: "¡Mensaje enviado!",
    exitoDescripcion: "Gracias por escribirme. Te respondo a la brevedad.",
    cerrar: "Cerrar",
    cerrarFormulario: "Cerrar formulario",
  },
  cv: {
    disponibilidad: "Busco mi primer puesto como desarrollador web junior.",
    pie: "Cerrar",
    perfil: {
      titulo: "Desarrollador Web / Full-Stack Junior",
      contenido:
        "Soy desarrollador web autodidacta en Mendoza, Argentina. Construyo sitios web con Next.js, React, TypeScript y Tailwind CSS, y aplicaciones web con Node.js, REST APIs, PostgreSQL y Supabase. Estoy buscando mi primer puesto profesional como desarrollador web / full-stack junior; mis proyectos son propios y personales, construidos para aprender y profundizar en diseño, desarrollo e interfaces.",
    },
    destacados: {
      titulo: "Proyectos Destacados",
      contexto: "Construidos por iniciativa propia.",
      items: [
        "Copa Chapa Chapa — Plataforma de campeonato de simracing con clasificaciones e inscripciones",
        "OpenCode Hush — Plugin para OpenCode que muestra en la sidebar información de contexto, modelo, tokens, costo y sesión. Publicado en npm.",
        "Nuvio — Aplicación health-tech para análisis de PDFs médicos con IA, chat contextual y comparación de estudios. En desarrollo.",
        "Bodega Andeluna — Rediseño web premium con catálogo de vinos en 3 idiomas",
        "Opuntia Casa de Té — Landing de casa de té en el Manzano Histórico",
        "Hornero Restaurante — Landing de cocina al horno a leña en Valle de Uco",
      ],
    },
    experiencia: {
      titulo: "Experiencia",
      items: [
        "No tengo experiencia laboral en desarrollo de software como empleo profesional.",
        "No realicé trabajos freelance pagados en desarrollo.",
        "Mi experiencia práctica la construyo con proyectos propios: construcciones personales que practico para aprender y profundizar.",
      ],
    },
    formacion: {
      titulo: "Formación",
      items: [
        "Educación secundaria completa (Argentina).",
        "Desarrollo de Software: cursada desde 2022, no finalizada.",
        "Formación autodidacta continua en desarrollo de software.",
      ],
    },
    tecnologias: {
      titulo: "Tecnologías",
      items: [
        "Frontend: Next.js, React, TypeScript, Tailwind CSS",
        "Backend: Node.js, REST APIs",
        "Bases de datos: PostgreSQL, Supabase",
        "Herramientas: Git, GitHub",
        "Desarrollo asistido con IA: OpenCode",
      ],
    },
    forma: {
      titulo: "Forma de Trabajo",
      contenido:
        "Trabajo de punta a punta: entiendo el objetivo, defino la estructura, desarrollo y publico. Uso IA como parte de mi flujo de trabajo para acelerar el desarrollo, depurar errores y automatizar tareas repetitivas.",
    },
    idiomas: {
      titulo: "Idiomas",
      items: ["Español: Nativo", "Inglés: Básico"],
    },
  },
  pie: {
    derechos: "Todos los derechos reservados",
    desarrolladoPor: "Desarrollado por",
    volverArriba: "Volver arriba",
  },
  tema: {
    sistema: "Sistema",
    claro: "Claro",
    oscuro: "Oscuro",
    actual: (etiqueta: string) => `Tema actual: ${etiqueta}. Cambiar tema`,
  },
  idioma: { etiqueta: "Idioma", espanol: "Español", ingles: "English" },
  cargando: { etiqueta: "Cargando portfolio", texto: "Cargando" },
  paginaError: {
    etiqueta: "Error",
    titulo: "Algo se rompió",
    descripcion:
      "No te preocupes, no fue tu culpa. Podés intentar de nuevo o volver al inicio del portfolio.",
    reintentar: "Reintentar",
    volver: "Volver al inicio",
  },
  erroresApi: {
    limite: (minutos: number) =>
      `Demasiados intentos. Probá de nuevo en ${minutos} ${minutos === 1 ? "minuto" : "minutos"}.`,
    requeridos: "Todos los campos son requeridos",
    emailLargo: "El correo es demasiado largo",
    asuntoLargo: (max: number) =>
      `El asunto no puede superar los ${max} caracteres`,
    mensajeCorto: (min: number) =>
      `El mensaje debe tener al menos ${min} caracteres`,
    mensajeLargo: (max: number) =>
      `El mensaje no puede superar los ${max} caracteres`,
    emailInvalido: "El formato del correo no es válido",
    envioFallido: "Error al enviar el mensaje. Intentá de nuevo en un rato.",
    generico: "Error al enviar el mensaje",
    desconocido: "Error desconocido",
  },
  metadata: {
    titulo: "Federico Bordon | Desarrollador Web",
    descripcion:
      "Portfolio de Federico Bordon, desarrollador web en Mendoza, Argentina. Construyo sitios web con Next.js, React y TypeScript.",
    ogTitulo: "Federico Bordon | Desarrollador Web",
    ogDescripcion:
      "Portfolio de Federico Bordon, desarrollador web en Mendoza, Argentina. Sitios web con Next.js, React y TypeScript.",
    twitterTitulo: "Federico Bordon | Desarrollador Web",
    twitterDescripcion:
      "Portfolio de Federico Bordon, desarrollador web en Mendoza, Argentina. Sitios web con Next.js, React y TypeScript.",
    ogUbicacion: (ubicacion: string) => `Soy de ${ubicacion}`,
    conocimientos: [
      "Desarrollo Web",
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "PostgreSQL",
    ],
  },
  emailAria: (email: string) => `Escribirme a ${email}`,
  stackAria: "Stack tecnológico",
};
