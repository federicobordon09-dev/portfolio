"use client";

import { useState, useEffect, useCallback } from "react";

export type PreferenciaTema = "sistema" | "claro" | "oscuro";
export type TemaResuelto = "claro" | "oscuro";

const CLAVE_STORAGE = "tema-portfolio";

function obtenerPreferenciaInicial(): PreferenciaTema {
  if (typeof window === "undefined") return "sistema";
  const guardada = localStorage.getItem(CLAVE_STORAGE);
  if (guardada === "claro" || guardada === "oscuro" || guardada === "sistema") {
    return guardada;
  }
  return "sistema";
}

function resolverTema(preferencia: PreferenciaTema): TemaResuelto {
  if (preferencia === "claro") return "claro";
  if (preferencia === "oscuro") return "oscuro";
  // "sistema" — detectar prefers-color-scheme
  if (typeof window === "undefined") return "oscuro";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "oscuro"
    : "claro";
}

function aplicarClase(tema: TemaResuelto) {
  const html = document.documentElement;
  if (tema === "oscuro") {
    html.classList.add("dark");
  } else {
    html.classList.remove("dark");
  }
}

export function useTema() {
  const [preferencia, setPreferencia] = useState<PreferenciaTema>("sistema");
  const [tema, setTema] = useState<TemaResuelto>("oscuro");

  // Inicializar desde localStorage y aplicar
  useEffect(() => {
    const inicial = obtenerPreferenciaInicial();
    setPreferencia(inicial);
    const resuelto = resolverTema(inicial);
    setTema(resuelto);
    aplicarClase(resuelto);
  }, []);

  // Escuchar cambios en prefers-color-scheme cuando está en "sistema"
  useEffect(() => {
    if (preferencia !== "sistema") return;

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      const resuelto = resolverTema("sistema");
      setTema(resuelto);
      aplicarClase(resuelto);
    };

    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [preferencia]);

  const cambiar = useCallback((nueva: PreferenciaTema) => {
    setPreferencia(nueva);
    localStorage.setItem(CLAVE_STORAGE, nueva);
    const resuelto = resolverTema(nueva);
    setTema(resuelto);
    aplicarClase(resuelto);
  }, []);

  const ciclo = useCallback(() => {
    const siguiente: PreferenciaTema =
      preferencia === "sistema" ? "claro" : preferencia === "claro" ? "oscuro" : "sistema";
    cambiar(siguiente);
  }, [preferencia, cambiar]);

  return { preferencia, tema, cambiar, ciclo };
}
