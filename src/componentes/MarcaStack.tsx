"use client";

import { useIdioma } from "@/lib/i18n/IdiomaContext";

/**
 * Infinite Sports Ticker con el stack tecnológico.
 *
 * Estética de marcador deportivo: un badge fijo a la izquierda ("STACK")
 * y una tira que desfila sin fin con las tecnologías en mayúsculas mono,
 * separadas por un rombo de acento.
 *
 * El loop es perfecto porque renderizamos DOS grupos idénticos dentro de
 * la pista y animamos con `translateX(-50%)` (keyframe `marquee`): cuando
 * el primer grupo sale por la izquierda, el segundo ya ocupó su lugar.
 *
 * Animación CSS pura → respeta prefers-reduced-motion vía globals.css.
 */

const STACK = [
  "HTML5",
  "CSS3",
  "TypeScript",
  "React",
  "Next.js",
  "Tailwind CSS",
  "PostgreSQL",
  "Supabase",
  "Vercel",
  "GitHub",
];

// Un grupo = la lista completa en una fila. Renderizamos dos idénticos
// dentro de la pista para el loop continuo.
function GrupoStack({ oculto = false }: { oculto?: boolean }) {
  return (
    <div className="marquee-grupo" aria-hidden={oculto ? "true" : undefined}>
      {STACK.map((tec, i) => (
        <div key={i} className="flex items-center shrink-0">
          <span className="font-mono text-xs sm:text-sm uppercase tracking-[0.15em] text-texto/60 whitespace-nowrap">
            {tec}
          </span>
          {/* Separador tipo rombo — detalle de ticker deportivo */}
          <span
            className="mx-5 sm:mx-7 w-1.5 h-1.5 rotate-45 bg-acento shrink-0"
            aria-hidden="true"
          />
        </div>
      ))}
    </div>
  );
}

export default function MarcaStack() {
  const { diccionario: es } = useIdioma();
  return (
    <section
      aria-label={es.stackAria}
      className="relative border-y border-borde overflow-hidden bg-superficie/30"
    >
      <div className="flex items-stretch">
        <div className="relative z-10 shrink-0 flex items-center bg-acento/90 px-4 sm:px-5 border-r border-fondo/20">
          <span className="font-mono font-bold text-[10px] sm:text-xs uppercase tracking-[0.2em] text-fondo whitespace-nowrap">
            Stack
          </span>
        </div>

        <div className="marquee-mascara flex-1 py-2.5 sm:py-3">
          <div className="marquee-pista">
            <GrupoStack />
            <GrupoStack oculto />
          </div>
        </div>
      </div>
    </section>
  );
}
