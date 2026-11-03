import type { Diccionario } from "../tipos";

export const en: Diccionario = {
  rol: "Web Developer",
  navegacion: {
    inicio: "Home",
    proyectos: "Projects",
    servicios: "Services",
    proceso: "Process",
    contacto: "Contact",
    abrirMenu: "Open menu",
    cerrarMenu: "Close menu",
    menuNavegacion: "Navigation menu",
    volverInicio: "Back to home",
  },
  hero: {
    etiqueta: "I build websites with Next.js, React and TypeScript.",
    subheadline:
      "I design and develop landing pages, business websites and web apps, from idea to launch.",
    ctaProyecto: "I want a website for my business",
    verProyectos: "View projects",
    bajar: "Scroll down",
    ubicacionCorta: "Mendoza · Argentina",
    disponibilidad: "Available for new projects",
  },
  proyectos: {
    titulo: "Projects",
    intro:
      "I built them on my own to learn and improve: each one solves a concrete design, development or product problem.",
    verProyecto: "View project",
    escribimeCta: "Write to me →",
    parecidoMente: "Have a similar project in mind?",
    indiceAria: "Project index",
    vistaPreviaDe: (nombre: string) => `Preview of ${nombre}`,
    verProyectoDe: (nombre: string) => `View project ${nombre}`,
    items: [
      {
        slug: "copa-chapa-chapa",
        categoria: "Simracing Platform",
        descripcion:
          "Full-stack platform to centralize results, standings and tracking of a simracing championship.",
        problema:
          "The championship needed a centralized platform to show standings, manage registrations and keep the race history.",
        solucion:
          "Next.js application with up-to-date standings, a validated registration form and team and driver management.",
        imagenAlt:
          "Copa Chapa Chapa — Simracing platform with live standings",
      },
      {
        slug: "opencode-hush",
        categoria: "OpenCode Plugin",
        descripcion:
          "Minimal telemetry panel for the OpenCode TUI: context pressure, Git branch and session metrics the host does not draw in the same place.",
        problema:
          "OpenCode does not visibly show context pressure or session metrics while you work in the terminal.",
        solucion:
          "TypeScript + SolidJS plugin drawing a quiet sidebar panel: it renders only what is available, hides the rest and makes no external calls.",
        imagenAlt:
          "opencode Hush — Telemetry sidebar panel for the OpenCode TUI",
      },
      {
        slug: "nuvio",
        categoria: "Health-Tech App",
        descripcion:
          "End-to-end health-tech product: AI-powered analysis of medical PDFs, result extraction, contextual chat and study comparison.",
        problema:
          "It needed a tool that could turn medical PDF studies into clear, actionable information for the patient.",
        solucion:
          "Full-stack application with PDF analysis, AI content extraction, structured results, contextual chat and comparison between studies.",
        imagenAlt:
          "Nuvio — Web app for AI-powered analysis of medical studies",
      },
      {
        slug: "bodega-andeluna",
        categoria: "Website Redesign",
        descripcion:
          "Complete redesign with a 32-wine catalog, dining experiences, lodge with booking and multilingual support (ES/EN/PT).",
        problema:
          "Bodega Andeluna needed a digital presence reflecting the premium quality of its wines and reaching international visitors.",
        solucion:
          "Luxury site with an interactive wine catalog, dining experiences, a booking system and support in 3 languages with next-intl.",
        imagenAlt:
          "Bodega Andeluna — Luxury website redesign with wine catalog and booking",
      },
      {
        slug: "opuntia-casa-de-te",
        categoria: "Tea House Landing Page",
        descripcion:
          "Artisan tea house and bakery with views of the Andes mountains, in Manzano Histórico. Loose-leaf tea, homemade cakes and advance booking via WhatsApp.",
        problema:
          "Opuntia needed a digital presence communicating the unique experience of an artisan tea with mountain views.",
        solucion:
          "Landing capturing the essence of the place: loose-leaf tea, homemade cakes and the Andes views, with advance booking via WhatsApp.",
        imagenAlt:
          "Opuntia Casa de Té — Mountain-view tea house landing page in Tunuyán",
      },
      {
        slug: "hornero-restaurante",
        categoria: "Restaurant Landing Page",
        descripcion:
          "Authentic wood-fired cuisine in Los Chacayes: a 12,000-bottle cellar, Andes views, a sharing menu and advance reservations.",
        problema:
          "Hornero needed to convey its unique dining experience and make booking easy for visitors from all over the country.",
        solucion:
          "Landing capturing the full experience: wood-fired cooking, a 12,000-bottle cellar, panoramic Andes views, menu and reservations.",
        imagenAlt:
          "Hornero Restaurante — Wood-fired cuisine landing page in Valle de Uco",
      },
    ],
  },
  servicios: {
    titulo: "What can I build?",
    intro: "Every project is different. These are the kinds of work I do.",
    items: [
      {
        id: 1,
        titulo: "Website from scratch",
        descripcion:
          "A complete site, from structure to launch. I define the content, design the interface and leave it running online.",
      },
      {
        id: 2,
        titulo: "Redesign",
        descripcion:
          "I take an existing site and modernize it: I organize the content, update the design and improve performance, without breaking what already works.",
      },
      {
        id: 3,
        titulo: "Landing page",
        descripcion:
          "One page focused on a single topic: presenting a service, a product or an idea clearly and directly.",
      },
      {
        id: 4,
        titulo: "Digital experience",
        descripcion:
          "Projects with custom functionality, such as catalogs, bookings or web apps with their own logic. I define and develop them end to end.",
      },
    ],
  },
  proceso: {
    titulo: "How I Work",
    etiqueta: "Process",
    items: [
      {
        titulo: "Understand",
        descripcion:
          "First I understand what needs to be achieved and for whom. I ask questions and define the goal before writing code.",
      },
      {
        titulo: "Design",
        descripcion:
          "I define the structure and content before developing, so the outcome is clear from the start.",
      },
      {
        titulo: "Develop",
        descripcion:
          "I build the site responsively, taking care of performance and details on every device.",
      },
      {
        titulo: "Publish",
        descripcion:
          "I prepare and publish the site so it stays accessible and working correctly.",
      },
    ],
  },
  contacto: {
    titulo: "Have a project in mind?",
    parrafo: "Tell me your idea and let's see how to bring it to the web.",
    emailDirecto: "Direct email",
    hintFormulario:
      "Click to open the form — I'll get back to you soon.",
    encontrameEn: "Find me on",
    disponibilidad: "Available for new projects",
  },
  formulario: {
    nuevoMensaje: "New message",
    titulo: "Write to me",
    etiquetaCorreo: "Your email",
    placeholderCorreo: "you@email.com",
    etiquetaAsunto: "Subject",
    placeholderAsunto: "What's it about?",
    etiquetaMensaje: "Message",
    placeholderMensaje: "Tell me how I can help...",
    enviar: "Send message",
    enviando: "Sending...",
    exitoTitulo: "Message sent!",
    exitoDescripcion: "Thanks for writing. I'll get back to you soon.",
    cerrar: "Close",
    cerrarFormulario: "Close form",
  },
  cv: {
    disponibilidad: "I am seeking my first junior web developer / software developer position.",
    pie: "Close",
    perfil: {
      titulo: "Web Developer / Full-Stack Junior",
      contenido:
        "I am a self-taught web developer based in Mendoza, Argentina. I build websites with Next.js, React, TypeScript and Tailwind CSS, and web applications with Node.js, REST APIs, PostgreSQL and Supabase. I am looking for my first professional position as a web developer / full-stack junior; my projects are personal ones, built to learn and deepen design, development and interfaces.",
    },
    destacados: {
      titulo: "Featured Projects",
      contexto: "Built on my own initiative.",
      items: [
        "Copa Chapa Chapa — Simracing platform with standings and registrations",
        "OpenCode Hush — OpenCode plugin that displays context, model, token usage, cost and session info in the sidebar. Published on npm.",
        "Nuvio — Health-tech app for AI-powered analysis of medical PDFs, contextual chat and study comparison. In development.",
        "Bodega Andeluna — Premium website redesign with a 3-language wine catalog",
        "Opuntia Casa de Té — Tea house landing in Manzano Histórico",
        "Hornero Restaurante — Wood-fired cuisine landing in Valle de Uco",
      ],
    },
    experiencia: {
      titulo: "Experience",
      items: [
        "No established professional software development employment.",
        "No paid freelance development experience.",
        "Practical development experience through personal projects.",
      ],
    },
    formacion: {
      titulo: "Education",
      items: [
        "Secondary education completed.",
        "Software Development studies started in 2022, not completed.",
        "Ongoing self-directed learning in software development.",
      ],
    },
    tecnologias: {
      titulo: "Technologies",
      items: [
        "Frontend: Next.js, React, TypeScript, Tailwind CSS",
        "Backend: Node.js, REST APIs",
        "Databases: PostgreSQL, Supabase",
        "Tools: Git, GitHub",
        "AI-assisted development: OpenCode",
      ],
    },
    forma: {
      titulo: "My Approach",
      contenido:
        "I work end to end: I understand the goal, define the structure, develop and publish. I use AI as part of my workflow to speed up development, debug errors and automate repetitive tasks.",
    },
    idiomas: {
      titulo: "Languages",
      items: ["Spanish: Native", "English: Basic"],
    },
  },
  pie: {
    derechos: "All rights reserved",
    desarrolladoPor: "Built by",
    volverArriba: "Back to top",
  },
  tema: {
    sistema: "System",
    claro: "Light",
    oscuro: "Dark",
    actual: (etiqueta: string) => `Current theme: ${etiqueta}. Change theme`,
  },
  idioma: { etiqueta: "Language", espanol: "Spanish", ingles: "English" },
  cargando: { etiqueta: "Loading portfolio", texto: "Loading" },
  paginaError: {
    etiqueta: "Error",
    titulo: "Something broke",
    descripcion:
      "Don't worry, it wasn't your fault. You can try again or go back to the portfolio home.",
    reintentar: "Retry",
    volver: "Back to home",
  },
  erroresApi: {
    limite: (minutos: number) =>
      `Too many attempts. Try again in ${minutos} ${minutos === 1 ? "minute" : "minutes"}.`,
    requeridos: "All fields are required",
    emailLargo: "The email address is too long",
    asuntoLargo: (max: number) =>
      `The subject cannot exceed ${max} characters`,
    mensajeCorto: (min: number) =>
      `The message must be at least ${min} characters`,
    mensajeLargo: (max: number) =>
      `The message cannot exceed ${max} characters`,
    emailInvalido: "The email format is not valid",
    envioFallido: "Failed to send the message. Try again in a while.",
    generico: "Failed to send the message",
    desconocido: "Unknown error",
  },
  metadata: {
    titulo: "Federico Bordon | Web Developer",
    descripcion:
      "Portfolio of Federico Bordon, web developer in Mendoza, Argentina. I build websites with Next.js, React and TypeScript.",
    ogTitulo: "Federico Bordon | Web Developer",
    ogDescripcion:
      "Portfolio of Federico Bordon, web developer in Mendoza, Argentina. Websites with Next.js, React and TypeScript.",
    twitterTitulo: "Federico Bordon | Web Developer",
    twitterDescripcion:
      "Portfolio of Federico Bordon, web developer in Mendoza, Argentina. Websites with Next.js, React and TypeScript.",
    ogUbicacion: (ubicacion: string) => `Based in ${ubicacion}`,
    conocimientos: [
      "Web Development",
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "PostgreSQL",
    ],
  },
  emailAria: (email: string) => `Write to me at ${email}`,
  stackAria: "Tech stack",
};
