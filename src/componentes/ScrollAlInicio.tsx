"use client";

import { useEffect } from "react";

/**
 * Fuerza que cada recarga de la página lleve al usuario al Inicio (top),
 * en vez de restaurar la posición de scroll donde estaba.
 *
 * Por defecto los navegadores usan `scrollRestoration = "auto"`, que
 * recuerda dónde estabas al recargar. Lo pasamos a "manual" y hacemos
 * scroll al tope. Como es un portfolio de una sola página con anclas,
 * no afecta la navegación interna.
 */
export default function ScrollAlInicio() {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  return null;
}
