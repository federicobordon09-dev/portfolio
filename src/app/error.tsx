"use client";

import { DICCIONARIOS, resolverIdioma } from "@/lib/i18n/idioma";

/**
 * Error boundary global — se renderiza automáticamente cuando
 * cualquier parte del árbol de React tira una excepción.
 * El user puede probar recargar la página o volver al inicio.
 *
 * Client boundary sin provider garantizado: resuelve el idioma
 * leyendo `document.cookie` en render (sin contexto, sin efectos)
 * y elige `DICCIONARIOS[idioma].paginaError`.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const cookie =
    typeof document === "undefined" ? "" : document.cookie;
  const coincidencia = /(?:^|;\s*)idioma-portfolio=([^;]*)/.exec(cookie);
  const idioma = resolverIdioma(
    coincidencia ? decodeURIComponent(coincidencia[1]) : undefined,
  );
  const textos = DICCIONARIOS[idioma].paginaError;

  return (
    <div className="min-h-screen flex items-center justify-center bg-fondo px-5">
      <div className="max-w-md text-center">
        <span className="block text-acento font-mono text-sm mb-4">{textos.etiqueta}</span>
        <h1 className="font-display font-bold text-4xl sm:text-5xl text-texto mb-4 tracking-tight">
          {textos.titulo}
        </h1>
        <p className="text-texto-suave mb-8 leading-relaxed">
          {textos.descripcion}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={reset}
            className="px-6 py-3 bg-acento text-fondo font-display font-semibold rounded-full hover:bg-acento-hover transition-colors"
          >
            {textos.reintentar}
          </button>
          <a
            href="/"
            className="px-6 py-3 border border-borde text-texto font-display font-semibold rounded-full hover:border-acento hover:text-acento transition-colors"
          >
            {textos.volver}
          </a>
        </div>
        {error.digest && (
          <p className="mt-8 text-xs text-texto-suave/50 font-mono">
            ref: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}
