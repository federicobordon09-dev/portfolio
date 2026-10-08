/**
 * Diccionario de español — única fuente de verdad del copy.
 * FASE 2 i18n: solo extracción del español, sin selector ni rutas.
 */

export interface Diccionario {
  rol: string;
  navegacion: {
    inicio: string;
    proyectos: string;
    servicios: string;
    proceso: string;
    contacto: string;
    abrirMenu: string;
    cerrarMenu: string;
    menuNavegacion: string;
    volverInicio: string;
  };
  hero: {
    etiqueta: string;
    subheadline: string;
    ctaProyecto: string;
    verProyectos: string;
    bajar: string;
    ubicacionCorta: string;
    disponibilidad: string;
  };
  proyectos: {
    titulo: string;
    intro: string;
    verProyecto: string;
    escribimeCta: string;
    parecidoMente: string;
    indiceAria: string;
    vistaPreviaDe: (nombre: string) => string;
    verProyectoDe: (nombre: string) => string;
    /** slug es clave de unión con los datos de `proyectos` en datos.ts */
    items: Array<{
      slug: string;
      categoria: string;
      descripcion: string;
      problema: string;
      solucion: string;
      imagenAlt: string;
    }>;
  };
  servicios: {
    titulo: string;
    intro: string;
    items: Array<{ id: number; titulo: string; descripcion: string }>;
  };
  proceso: {
    titulo: string;
    etiqueta: string;
    items: Array<{ titulo: string; descripcion: string }>;
  };
  contacto: {
    titulo: string;
    parrafo: string;
    emailDirecto: string;
    hintFormulario: string;
    encontrameEn: string;
    disponibilidad: string;
  };
  formulario: {
    nuevoMensaje: string;
    titulo: string;
    etiquetaCorreo: string;
    placeholderCorreo: string;
    etiquetaAsunto: string;
    placeholderAsunto: string;
    etiquetaMensaje: string;
    placeholderMensaje: string;
    enviar: string;
    enviando: string;
    exitoTitulo: string;
    exitoDescripcion: string;
    cerrar: string;
    cerrarFormulario: string;
  };
  cv: {
    disponibilidad: string;
    pie: string;
    perfil: { titulo: string; contenido: string };
    destacados: { titulo: string; contexto: string; items: string[] };
    tecnologias: { titulo: string; items: string[] };
    forma: { titulo: string; contenido: string };
    idiomas: { titulo: string; items: string[] };
  };
  pie: {
    derechos: string;
    desarrolladoPor: string;
    volverArriba: string;
  };
  tema: {
    sistema: string;
    claro: string;
    oscuro: string;
    actual: (etiqueta: string) => string;
  };
  idioma: { etiqueta: string; espanol: string; ingles: string };
  cargando: { etiqueta: string; texto: string };
  paginaError: {
    etiqueta: string;
    titulo: string;
    descripcion: string;
    reintentar: string;
    volver: string;
  };
  erroresApi: {
    limite: (minutos: number) => string;
    requeridos: string;
    emailLargo: string;
    asuntoLargo: (max: number) => string;
    mensajeCorto: (min: number) => string;
    mensajeLargo: (max: number) => string;
    emailInvalido: string;
    envioFallido: string;
    generico: string;
    desconocido: string;
  };
  metadata: {
    titulo: string;
    descripcion: string;
    ogTitulo: string;
    ogDescripcion: string;
    twitterTitulo: string;
    twitterDescripcion: string;
    ogUbicacion: (ubicacion: string) => string;
    conocimientos: string[];
  };
  emailAria: (email: string) => string;
  stackAria: string;
}
