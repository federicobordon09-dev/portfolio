import { cookies } from "next/headers";
import { DICCIONARIOS, NOMBRE_COOKIE_IDIOMA, resolverIdioma, type Idioma } from "./idioma";
import type { Diccionario } from "./tipos";

export async function idiomaServidor(): Promise<Idioma> {
  const jar = await cookies();
  return resolverIdioma(jar.get(NOMBRE_COOKIE_IDIOMA)?.value);
}

export async function diccionarioServidor(): Promise<{ idioma: Idioma; diccionario: Diccionario }> {
  const idioma = await idiomaServidor();
  return { idioma, diccionario: DICCIONARIOS[idioma] };
}
