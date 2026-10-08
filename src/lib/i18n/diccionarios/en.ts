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
        slug: "mirasoles",
        categoria: "Restaurant Landing Page",
        descripcion:
          "Landing page for a family restaurant: digital menu with lightbox, photo carousel, interactive map and integrated WhatsApp.",
        problema:
          "Mirasoles needed a digital presence to showcase its menu, make the venue easy to find and enable direct contact via WhatsApp.",
        solucion:
          "Complete landing page with an interactive digital menu with lightbox, venue carousel, location map and direct WhatsApp contact with a preset message.",
        imagenAlt:
          "Mirasoles — Family restaurant landing page with digital menu",
      },
      {
        slug: "el-hornero-pizzeria",
        categoria: "Restaurant Landing Page",
        descripcion:
          "Dark + glassmorphism landing with an interactive menu, real reviews with an infinite ticker and WhatsApp with a preset message.",
        problema:
          "El Hornero needed a page with its own personality to stand out from generic landing pages and show real customer reviews.",
        solucion:
          "Dark glassmorphism landing: interactive menu, infinite carousel of real customer reviews and WhatsApp contact.",
        imagenAlt:
          "El Hornero Pizzería — Dark landing page with glassmorphism and reviews",
      },
      {
        slug: "la-taberna",
        categoria: "Restaurant Landing Page",
        descripcion:
          "Premium editorial landing for an Italian restaurant with menu, venue information, location, contact and structured SEO.",
        problema:
          "La Taberna needed a digital presence conveying the quality of its Italian cuisine and making contact and location easy.",
        solucion:
          "Premium editorial landing: interactive menu, restaurant information, location map, contact and structured search-engine data (SEO).",
        imagenAlt:
          "La Taberna — Premium editorial landing for an Italian restaurant in Lomas de Zamora",
      },
      {
        slug: "dante-cocina-local",
        categoria: "Restaurant Landing Page",
        descripcion:
          "Editorial landing for a dining proposal linked to Bodega Dante Robino. Regional cuisine and wine experiences.",
        problema:
          "Dante Cocina Local needed to communicate its regional cuisine proposal linked to the winery, showcasing menu, experiences and making reservations easy.",
        solucion:
          "Editorial landing combining menu, dining experiences, winery history, a reservation system, location and WhatsApp contact.",
        imagenAlt:
          "Dante Cocina Local — Editorial landing for regional cuisine and wines",
      },
      {
        slug: "buchardo-restaurante",
        categoria: "Restaurant Landing Page",
        descripcion:
          "Minimalist landing for a restaurant in Núñez, CABA. Grill, pasta, wine and cocktails with an extensive menu and reservations.",
        problema:
          "Buchardo needed a website showing its full dining proposal — grill, pasta, wine and cocktails — and making reservations and location easy.",
        solucion:
          "Minimalist landing with an extensive menu organized by category (grill, pasta, wine, cocktails), a reservation system, events and location.",
        imagenAlt:
          "Buchardo Restaurante — Minimalist landing for grill, pasta and cocktails in Núñez",
      },
      {
        slug: "entre-tablas-barbershop",
        categoria: "Barbershop Landing Page",
        descripcion:
          "Neo-brutalist landing for a barbershop with bookings, services, location, hours and an integrated mobile CTA.",
        problema:
          "Entre Tablas needed a website with personality to showcase its cutting, coloring and beard services and make booking easy from a phone.",
        solucion:
          "Neo-brutalist landing: featured services, booking system, venue information, hours and a mobile-optimized contact button.",
        imagenAlt:
          "Entre Tablas Barbershop — Neo-brutalist landing for a barbershop in Mendoza",
      },
      {
        slug: "cabrita-garage-cafe",
        categoria: "Café Landing Page",
        descripcion:
          "Specialty coffee house: menu with interactive accordion, product bento grid, reviews and two locations with Google Maps.",
        problema:
          "Cabrita Garage Cafe needed to showcase its specialty coffee menu and make its two locations easy to find.",
        solucion:
          "Landing with an interactive menu by specialty coffee category, product bento grid, reviews and two Google Maps embeds, one per location.",
        imagenAlt:
          "Cabrita Garage Cafe — Specialty coffee landing page with digital menu",
      },
      {
        slug: "el-porvenir",
        categoria: "Restaurant Landing Page",
        descripcion:
          "Renovated bodegón with a dish gallery, seasonal cuisine, embedded reviews and direct WhatsApp contact.",
        problema:
          "El Porvenir needed to communicate its renovation, showcase seasonal cooking and make booking easy for new customers.",
        solucion:
          "Landing showing the bodegón's renewed identity: dish gallery, seasonal menu, embedded reviews and direct WhatsApp contact.",
        imagenAlt:
          "El Porvenir — Bodegón landing page with dish gallery and reviews",
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
        slug: "los-tilos",
        categoria: "Restaurant Landing Page",
        descripcion:
          "Editorial landing for a Valle de Uco restaurant built around a garden, winery and a complete dining experience.",
        problema:
          "Los Tilos needed a digital presence communicating the full experience: gastronomy, garden, wines and booking.",
        solucion:
          "Editorial landing with menu, integrated booking, location, contact and social-proof elements conveying the garden and winery experience.",
        imagenAlt:
          "Los Tilos — Editorial restaurant landing with garden and winery in Valle de Uco",
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
    disponibilidad: "Available for freelance projects",
    pie: "Close",
    perfil: {
      titulo: "Professional Profile",
      contenido:
        "I'm a self-taught web developer in Mendoza. I build websites with Next.js, React and TypeScript: landing pages, business websites and web apps. I develop my own projects to go deeper into design, development and interfaces, and I use AI as part of my workflow to speed up development, debug errors and automate repetitive tasks.",
    },
    destacados: {
      titulo: "Featured Projects",
      contexto: "Built on my own initiative.",
      items: [
        "Nuvio — Health-tech app for AI-powered analysis of medical PDFs, contextual chat and study comparison (in development)",
        "Copa Chapa Chapa — Simracing platform with standings and registrations",
        "Bodega Andeluna — Premium website redesign with a 3-language wine catalog",
        "Mirasoles — Restaurant landing with an interactive digital menu",
        "El Hornero Pizzería — Dark landing with real reviews",
        "Cabrita Garage Cafe — Specialty coffee landing with two locations",
        "El Porvenir — Bodegón landing with gallery and reviews",
        "Hornero Restaurante — Wood-fired cuisine landing in Valle de Uco",
        "Opuntia Casa de Té — Tea house landing in Manzano Histórico",
      ],
    },
    tecnologias: {
      titulo: "Technologies",
      items: [
        "Frontend: HTML5, CSS3, JavaScript, TypeScript, React, Next.js, Tailwind CSS",
        "Backend: Node.js, Next.js (Route Handlers / Server Actions)",
        "Databases: Supabase, PostgreSQL, Neon",
        "Others: Git, GitHub, Vercel",
      ],
    },
    forma: {
      titulo: "My Approach",
      contenido:
        "I work end to end: I understand the goal, define the structure, develop and publish. I use AI as part of my workflow to speed up development, debug errors and automate repetitive tasks.",
    },
    idiomas: {
      titulo: "Languages",
      items: [
        "Spanish: Native",
        "English: Technical reading and documentation comprehension",
      ],
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
