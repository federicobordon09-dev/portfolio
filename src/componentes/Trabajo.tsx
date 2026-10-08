"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Resplandor from "./Resplandor";
import { proyectos } from "@/lib/datos";
import { useIdioma } from "@/lib/i18n/IdiomaContext";

/**
 * Selección pública de proyectos — orden exacto de presentación.
 * Los datos completos permanecen en `proyectos` (datos.ts) para
 * reutilización futura; aquí solo se filtra qué se renderiza.
 */
const SLUGS_VISIBLES = [
  "nuvio",
  "copa-chapa-chapa",
  "bodega-andeluna",
  "mirasoles",
  "el-hornero-pizzeria",
  "cabrita-garage-cafe",
  "el-porvenir",
  "hornero-restaurante",
  "opuntia-casa-de-te",
] as const;

function formatoIndice(i: number) {
  return String(i + 1).padStart(2, "0");
}

export default function Trabajo() {
  const { diccionario: es } = useIdioma();
  const textosPorSlug = new Map(es.proyectos.items.map((t) => [t.slug, t]));
  const proyectosVisibles = SLUGS_VISIBLES.map((slug) => {
    const base = proyectos.find((p) => p.slug === slug)!;
    // Merge por slug: datos estructurales (datos.ts) + copy (diccionario)
    return { ...base, ...textosPorSlug.get(slug)! };
  }).filter(Boolean);
  const [indiceSeleccionado, setIndiceSeleccionado] = useState(0);
  const seleccionado = proyectosVisibles[indiceSeleccionado];

  const seleccionar = (i: number) => {
    if (i >= 0 && i < proyectosVisibles.length) setIndiceSeleccionado(i);
  };

  const manejarTeclas = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const siguiente =
        e.key === "ArrowDown" ? indiceSeleccionado + 1 : indiceSeleccionado - 1;
      if (siguiente >= 0 && siguiente < proyectosVisibles.length) {
        setIndiceSeleccionado(siguiente);
        document.getElementById(`proyecto-idx-${siguiente}`)?.focus();
      }
    }
  };

  return (
    <section
      id="trabajo"
      className="relative px-5 sm:px-10 lg:px-16 py-20 sm:py-32 overflow-hidden"
    >
      <Resplandor className="-right-40 top-40 w-[380px] h-[380px] sm:w-[560px] sm:h-[560px] opacity-60" />

      {/* Número fantasma gigante — serie editorial 00·01·02·03·04 */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-8 left-0 sm:left-6 font-display font-extrabold text-[10rem] sm:text-[18rem] leading-none text-[#d4d4d4] dark:text-white/[0.06] select-none"
      >
        01
      </span>

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex items-baseline gap-6 mb-3"
        >
          <span className="text-acento font-mono text-base sm:text-lg">01</span>
          <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-texto tracking-tight">
            {es.proyectos.titulo}
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="text-texto-suave text-sm sm:text-base max-w-xl mb-8 sm:mb-10 leading-relaxed pl-[calc(1.5rem+1ch)]"
        >
          {es.proyectos.intro}
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="linea-divisoria origin-left mb-8 sm:mb-10"
        />

        {/* Índice + escenario */}
        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[1fr_1.1fr] lg:gap-12 lg:items-start">
          {/* Escenario — preview del proyecto seleccionado.
              En mobile va primero para ver el resultado del tap sin scrollear. */}
          <div className="order-first lg:order-2 lg:sticky lg:top-28">
            <div className="flex items-baseline justify-between mb-3 font-mono text-xs sm:text-sm text-texto-suave">
              <span aria-hidden="true">
                <span className="text-acento">{formatoIndice(indiceSeleccionado)}</span>
                {" / "}
                {formatoIndice(proyectosVisibles.length - 1)}
              </span>
              <span className="uppercase tracking-[0.2em] text-[10px] sm:text-xs">
                {seleccionado.categoria}
              </span>
            </div>

            <div
              aria-live="polite"
              aria-label={es.proyectos.vistaPreviaDe(seleccionado.nombre)}
              className="relative w-full aspect-[16/10] overflow-hidden rounded-lg border border-borde bg-fondo"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={seleccionado.slug}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={seleccionado.imagen}
                    alt={seleccionado.imagenAlt}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover object-top"
                    quality={75}
                    priority={indiceSeleccionado === 0}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-between pt-3 mt-1 text-[10px] sm:text-[11px] uppercase tracking-[0.2em]">
              <span className="text-texto-suave font-mono">{seleccionado.anio}</span>
              {seleccionado.enlace ? (
                <a
                  href={seleccionado.enlace}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-texto-suave hover:text-acento transition-colors duration-300"
                  aria-label={es.proyectos.verProyectoDe(seleccionado.nombre)}
                >
                  {es.proyectos.verProyecto}
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="translate-x-0.5 -translate-y-0.5">
                    <path d="M7 17L17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </a>
              ) : null}
            </div>
          </div>

          {/* Índice — los 9 proyectos como elementos tipográficos */}
          <ul
            onKeyDown={manejarTeclas}
            aria-label={es.proyectos.indiceAria}
            className="order-2 lg:order-1 border-t border-borde/60"
          >
            {proyectosVisibles.map((proyecto, i) => {
              const activo = i === indiceSeleccionado;
              return (
                <li key={proyecto.slug} className="border-b border-borde/60">
                  <button
                    id={`proyecto-idx-${i}`}
                    type="button"
                    onClick={() => seleccionar(i)}
                    onMouseEnter={() => seleccionar(i)}
                    onFocus={() => seleccionar(i)}
                    aria-current={activo ? "true" : undefined}
                    aria-label={`${proyecto.nombre}, ${proyecto.categoria}`}
                    className={`group flex w-full items-baseline gap-4 py-3 sm:py-3.5 text-left cursor-pointer transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-acento focus-visible:outline-offset-[-2px] ${
                      activo ? "text-acento" : "text-texto hover:text-acento"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`font-mono text-[11px] sm:text-xs shrink-0 transition-colors duration-200 ${
                        activo ? "text-acento" : "text-texto-suave/60 group-hover:text-acento/70"
                      }`}
                    >
                      {formatoIndice(i)}
                    </span>
                    <span className="font-display font-bold text-lg sm:text-xl lg:text-2xl tracking-tight leading-tight">
                      {proyecto.nombre}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`ml-auto text-acento text-base leading-none transition-all duration-200 ${
                        activo ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-1 group-hover:opacity-60 group-hover:translate-x-0"
                      }`}
                    >
                      →
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Link contextual discreto */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="mt-10 sm:mt-12"
        >
          <a
            href="#contacto"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className="inline-flex items-center gap-2 text-texto-suave text-sm hover:text-acento transition-colors duration-300"
          >
            {es.proyectos.parecidoMente}
            <span className="text-acento">{es.proyectos.escribimeCta}</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
