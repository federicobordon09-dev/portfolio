"use client";

import { useIdioma } from "@/lib/i18n/IdiomaContext";

export default function SelectorIdioma() {
  const { idioma, diccionario: es, setIdioma } = useIdioma();

  const clasesBoton =
    "px-2.5 h-9 rounded-full text-[11px] font-mono uppercase tracking-[0.15em] transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-acento focus-visible:outline-offset-2 cursor-pointer";

  return (
    <div
      role="group"
      aria-label={es.idioma.etiqueta}
      className="flex items-center rounded-full border border-borde/60 bg-superficie/50 p-1"
    >
      <button
        type="button"
        aria-pressed={idioma === "es"}
        aria-label={es.idioma.espanol}
        title={es.idioma.espanol}
        onClick={() => setIdioma("es")}
        className={`${clasesBoton} ${
          idioma === "es"
            ? "bg-acento text-fondo font-semibold"
            : "text-texto-suave hover:text-texto"
        }`}
      >
        ES
      </button>
      <button
        type="button"
        aria-pressed={idioma === "en"}
        aria-label={es.idioma.ingles}
        title={es.idioma.ingles}
        onClick={() => setIdioma("en")}
        className={`${clasesBoton} ${
          idioma === "en"
            ? "bg-acento text-fondo font-semibold"
            : "text-texto-suave hover:text-texto"
        }`}
      >
        EN
      </button>
    </div>
  );
}
