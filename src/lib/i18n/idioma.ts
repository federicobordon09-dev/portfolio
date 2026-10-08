import type { Diccionario } from "./tipos";
import { es } from "./diccionarios/es";
import { en } from "./diccionarios/en";

export type Idioma = "es" | "en";

export const IDIOMA_POR_DEFECTO: Idioma = "es";

export const NOMBRE_COOKIE_IDIOMA = "idioma-portfolio";

export const DICCIONARIOS: Record<Idioma, Diccionario> = { es, en };

export function resolverIdioma(valor: string | null | undefined): Idioma {
  return valor === "es" || valor === "en" ? valor : IDIOMA_POR_DEFECTO;
}

export function serializarCookieIdioma(idioma: Idioma): string {
  return `${NOMBRE_COOKIE_IDIOMA}=${idioma}; path=/; max-age=31536000; SameSite=Lax`;
}
