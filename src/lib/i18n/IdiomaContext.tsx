"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Diccionario } from "./tipos";
import {
  DICCIONARIOS,
  IDIOMA_POR_DEFECTO,
  resolverIdioma,
  serializarCookieIdioma,
  type Idioma,
} from "./idioma";

const CLAVE_STORAGE = "idioma-portfolio";

function leerIdiomaPersistido(): Idioma {
  if (typeof window === "undefined") return IDIOMA_POR_DEFECTO;
  try {
    return resolverIdioma(window.localStorage.getItem(CLAVE_STORAGE));
  } catch {
    return IDIOMA_POR_DEFECTO;
  }
}
function sincronizarEfectos(idioma: Idioma) {
  try {
    window.localStorage.setItem(CLAVE_STORAGE, idioma);
  } catch {
    /* almacenamiento no disponible: la sesión sigue en memoria */
  }
  document.cookie = serializarCookieIdioma(idioma);
  document.documentElement.lang = idioma;
}
interface EstadoIdioma {
  idioma: Idioma;
  diccionario: Diccionario;
  setIdioma: (idioma: Idioma) => void;
}
const ContextoIdioma = createContext<EstadoIdioma>({
  idioma: IDIOMA_POR_DEFECTO,
  diccionario: DICCIONARIOS[IDIOMA_POR_DEFECTO],
  setIdioma: () => {},
});
export function IdiomaProvider({ children }: { children: ReactNode }) {
  const [idioma, setIdiomaEstado] = useState<Idioma>(IDIOMA_POR_DEFECTO);
  useEffect(() => {
    const guardado = leerIdiomaPersistido();
    sincronizarEfectos(guardado);
    if (guardado !== IDIOMA_POR_DEFECTO) setIdiomaEstado(guardado);
  }, []);
  const setIdioma = useCallback((nuevo: Idioma) => {
    const normalizado = resolverIdioma(nuevo);
    sincronizarEfectos(normalizado);
    setIdiomaEstado(normalizado);
  }, []);
  const valor = useMemo<EstadoIdioma>(
    () => ({ idioma, diccionario: DICCIONARIOS[idioma], setIdioma }),
    [idioma, setIdioma],
  );
  return <ContextoIdioma.Provider value={valor}>{children}</ContextoIdioma.Provider>;
}
export function useIdioma(): EstadoIdioma {
  return useContext(ContextoIdioma);
}
