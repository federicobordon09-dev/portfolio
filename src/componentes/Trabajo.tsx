"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Resplandor from "./Resplandor";
import { proyectos, type Proyecto } from "@/lib/datos";
import type { Diccionario } from "@/lib/i18n/tipos";
import { useIdioma } from "@/lib/i18n/IdiomaContext";

/**
 * Selección pública de proyectos — orden exacto de presentación.
 * Los datos completos permanecen en `proyectos` (datos.ts) para
 * reutilización futura; aquí solo se filtra qué se renderiza.
 */
const SLUGS_VISIBLES = [
  "copa-chapa-chapa",
  "opencode-hush",
  "nuvio",
  "bodega-andeluna",
  "opuntia-casa-de-te",
  "hornero-restaurante",
] as const;

/** Proyecto estructural (datos.ts) + su copy (diccionario), unidos por slug. */
type ProyectoConCopy = Proyecto & Diccionario["proyectos"]["items"][number];

const EASING: [number, number, number, number] = [0.22, 1, 0.36, 1];

function formatoIndice(i: number) {
  return String(i + 1).padStart(2, "0");
}

/**
 * Detecta entrada táctil por media query (nunca por user agent ni por ancho):
 * en touch el tap debe activar el proyecto, no navegar.
 */
function esDispositivoTactil(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(hover: none) and (pointer: coarse)").matches;
}

const CLASES_FILA =
  "group relative block w-full cursor-pointer overflow-hidden rounded-[10px] border px-4 sm:px-5 text-left transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-acento focus-visible:outline-offset-2";

function clasesFila(activo: boolean): string {
  return `${CLASES_FILA} ${
    activo
      ? "border-borde bg-superficie"
      : "border-borde/50 bg-superficie/40 hover:border-borde/80 hover:bg-superficie/70"
  }`;
}

interface PropsFila {
  proyecto: ProyectoConCopy;
  indice: number;
  activo: boolean;
  onSeleccionar: () => void;
  onPrevisualizar: () => void;
  refFila: (el: HTMLElement | null) => void;
}

/**
 * Fila tarjeta del índice. Con enlace es un `<a>` real (Tab/Enter/navegación
 * nativa); sin enlace, un `<button>` que solo selecciona.
 */
function FilaProyecto({
  proyecto,
  indice,
  activo,
  onSeleccionar,
  onPrevisualizar,
  refFila,
}: PropsFila) {
  const manejarClick = (evento: React.MouseEvent<HTMLElement>) => {
    // Solo el click originado por puntero en touch evita la navegación.
    // Enter por teclado (detail === 0) sigue navegando normalmente.
    if (proyecto.enlace && evento.detail > 0 && esDispositivoTactil()) {
      evento.preventDefault();
    }
    onSeleccionar();
  };

  const contenido = (
    <>
      {/* Barra de acento — borde izquierdo del estado activo */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-y-0 left-0 w-[3px] bg-acento transition-opacity duration-300 ${
          activo ? "opacity-100" : "opacity-0"
        }`}
      />

      <span className="flex min-h-14 items-center gap-3 py-3 sm:min-h-16 sm:gap-4 sm:py-0">
        <span
          aria-hidden="true"
          className={`shrink-0 font-mono text-[10px] tabular-nums transition-colors duration-300 sm:text-[11px] ${
            activo ? "text-acento" : "text-texto-suave/60"
          }`}
        >
          {formatoIndice(indice)}
        </span>

        <span
          className={`min-w-0 font-display font-bold tracking-tight leading-tight sm:whitespace-nowrap transition-[color,font-size,opacity] duration-300 ${
            activo
              ? "text-[1.3rem] text-texto sm:text-[1.5rem] lg:text-[1.45rem]"
              : "text-[1.1rem] text-texto-suave opacity-70 group-hover:text-texto group-hover:opacity-100 sm:text-[1.25rem] lg:text-[1.2rem]"
          }`}
        >
          {proyecto.nombre}
        </span>

        <span className="ml-auto shrink-0 font-mono text-[10px] tabular-nums text-texto-suave sm:text-[11px]">
          {proyecto.anio}
        </span>

        <span
          aria-hidden="true"
          className={`shrink-0 text-base leading-none transition-all duration-300 ${
            activo
              ? "translate-x-0 text-acento opacity-100"
              : "text-texto-suave/40 opacity-60 group-hover:translate-x-0.5 group-hover:opacity-100"
          }`}
        >
          →
        </span>
      </span>

      {/* Detalle — solo si el proyecto está activo */}
      <AnimatePresence initial={false}>
        {activo && (
          <motion.span
            key="detalle"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASING }}
            className="block overflow-hidden"
          >
            <span className="block pb-4 pr-1">
              <span className="block text-sm leading-relaxed text-texto-suave">
                {proyecto.descripcion}
              </span>

              {proyecto.tecnologias.length > 0 && (
                <span className="mt-3 flex flex-wrap gap-1.5">
                  {proyecto.tecnologias.map((tecnologia) => (
                    <span
                      key={tecnologia}
                      className="rounded border border-borde/70 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-texto-suave"
                    >
                      {tecnologia}
                    </span>
                  ))}
                </span>
              )}
            </span>
          </motion.span>
        )}
      </AnimatePresence>
    </>
  );

  // El hover se detecta con `pointermove`, no con `mouseenter`: `mouseenter`
  // también se dispara cuando la animación de altura mueve las filas bajo un
  // cursor quieto, y eso re-alimentaba la selección entre dos filas. La
  // intención real (y su espera) la resuelve el componente padre.
  const previsualizarConPuntero = (evento: React.PointerEvent<HTMLElement>) => {
    if (evento.pointerType === "touch") return;
    onPrevisualizar();
  };

  const propsComunes = {
    id: `proyecto-idx-${indice}`,
    onPointerMove: previsualizarConPuntero,
    onFocus: onSeleccionar,
    onClick: manejarClick,
    "aria-current": activo ? ("true" as const) : undefined,
    "aria-label": `${proyecto.nombre}, ${proyecto.categoria}`,
    className: clasesFila(activo),
  };

  return proyecto.enlace ? (
    <a
      {...propsComunes}
      ref={refFila}
      href={proyecto.enlace}
      target="_blank"
      rel="noopener noreferrer"
    >
      {contenido}
    </a>
  ) : (
    <button {...propsComunes} ref={refFila} type="button">
      {contenido}
    </button>
  );
}

/** Espera de intención antes de abrir el detalle de una fila con el puntero. */
const ESPERA_HOVER_MS = 120;

export default function Trabajo() {
  const { diccionario: es } = useIdioma();
  const textosPorSlug = new Map(es.proyectos.items.map((t) => [t.slug, t]));
  const proyectosVisibles = SLUGS_VISIBLES.map((slug) => {
    const base = proyectos.find((p) => p.slug === slug)!;
    // Merge por slug: datos estructurales (datos.ts) + copy (diccionario)
    return { ...base, ...textosPorSlug.get(slug)! };
  }).filter(Boolean);
  const [indiceSeleccionado, setIndiceSeleccionado] = useState(0);
  const [imagenesRotas, setImagenesRotas] = useState<Record<string, boolean>>({});
  const refsFilas = useRef<Array<HTMLElement | null>>([]);
  const temporizadorHover = useRef<ReturnType<typeof setTimeout> | null>(null);
  const seleccionado = proyectosVisibles[indiceSeleccionado];

  const cancelarHover = () => {
    if (temporizadorHover.current !== null) {
      clearTimeout(temporizadorHover.current);
      temporizadorHover.current = null;
    }
  };

  useEffect(() => cancelarHover, []);

  const seleccionar = (i: number) => {
    cancelarHover();
    if (i >= 0 && i < proyectosVisibles.length) setIndiceSeleccionado(i);
  };

  /**
   * Hover con intención: la fila se abre recién cuando el puntero se queda
   * quieto sobre ella. Sin esta espera, cada píxel de movimiento cambiaba la
   * fila activa y la animación de altura movía las filas bajo el cursor,
   * realimentando la selección (el parpadeo entre dos proyectos).
   */
  const previsualizar = (i: number) => {
    if (i === indiceSeleccionado) {
      cancelarHover();
      return;
    }
    cancelarHover();
    temporizadorHover.current = setTimeout(() => {
      temporizadorHover.current = null;
      setIndiceSeleccionado(i);
    }, ESPERA_HOVER_MS);
  };

  const manejarTeclas = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();
    cancelarHover();
    const siguiente =
      e.key === "ArrowDown" ? indiceSeleccionado + 1 : indiceSeleccionado - 1;
    if (siguiente >= 0 && siguiente < proyectosVisibles.length) {
      setIndiceSeleccionado(siguiente);
      refsFilas.current[siguiente]?.focus();
    }
  };

  return (
    <section
      id="trabajo"
      className="relative px-5 sm:px-10 lg:px-16 py-20 sm:py-32 overflow-hidden"
    >
      <Resplandor className="right-[-15%] top-1/3 w-[380px] h-[380px] sm:w-[620px] sm:h-[620px] opacity-60" />

      {/* Número fantasma gigante — decorativo, muy sutil */}
      <span
        aria-hidden="true"
        className="pointer-events-none select-none absolute -top-10 left-0 sm:left-2 font-display font-extrabold text-[8rem] sm:text-[14rem] leading-none text-acento/[0.04]"
      >
        01
      </span>

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-texto-suave">
              <span
                aria-hidden="true"
                className="size-1.5 rounded-full bg-acento"
              />
              <span className="text-acento">01</span>
            </span>

            <h2 className="mt-3 font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-texto tracking-tight">
              {es.proyectos.titulo}
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="mt-4 sm:mt-5 max-w-xl text-texto-suave text-sm sm:text-base leading-relaxed"
          >
            {es.proyectos.intro}
          </motion.p>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="linea-divisoria origin-left mt-8 sm:mt-10 mb-8 sm:mb-10"
        />

        {/* Índice + visor */}
        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-12 lg:gap-10 lg:items-start">
          {/* Visor — preview del proyecto seleccionado.
              En mobile va primero para ver el resultado del tap sin scrollear. */}
          <div className="order-first lg:order-2 lg:col-span-7 lg:sticky lg:top-28">
            <div className="relative rounded-[20px] border border-borde/70 bg-superficie/60 p-3 sm:p-4 shadow-[0_0_80px_-24px_rgb(var(--acento-rgb)/0.25)]">
              {/* Cabecera de la tarjeta */}
              <div className="flex items-center justify-between gap-3 px-1 pb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-texto-suave sm:pb-4 sm:text-[11px]">
                <span aria-hidden="true" className="inline-flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-acento" />
                  <span>
                    <span className="text-acento">
                      {formatoIndice(indiceSeleccionado)}
                    </span>
                    {" / "}
                    {formatoIndice(proyectosVisibles.length - 1)}
                  </span>
                </span>
                <span className="truncate text-right">
                  {seleccionado.categoria}
                </span>
              </div>

              {/* Imagen real del proyecto */}
              <div
                aria-live="polite"
                aria-label={es.proyectos.vistaPreviaDe(seleccionado.nombre)}
                className="relative w-full aspect-video overflow-hidden rounded-xl border border-borde/60 bg-fondo"
              >
                <AnimatePresence initial={false}>
                  <motion.div
                    key={seleccionado.slug}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.99 }}
                    transition={{ duration: 0.4, ease: EASING }}
                    className="absolute inset-0"
                  >
                    {imagenesRotas[seleccionado.slug] ? (
                      <span className="flex h-full w-full items-center justify-center px-6 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-texto-suave">
                        {seleccionado.nombre}
                      </span>
                    ) : (
                      <Image
                        src={seleccionado.imagen}
                        alt={seleccionado.imagenAlt}
                        fill
                        sizes="(min-width: 1024px) 55vw, 100vw"
                        className="object-contain object-center"
                        quality={90}
                        priority={indiceSeleccionado === 0}
                        onError={() =>
                          setImagenesRotas((previas) => ({
                            ...previas,
                            [seleccionado.slug]: true,
                          }))
                        }
                      />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Pie de la tarjeta */}
              <div className="mt-3 flex items-center justify-between gap-4 border-t border-borde/60 px-1 pt-3 sm:mt-4 sm:pt-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-texto-suave sm:text-[11px]">
                  {seleccionado.anio}
                </span>

                {seleccionado.enlace ? (
                  <a
                    href={seleccionado.enlace}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={es.proyectos.verProyectoDe(seleccionado.nombre)}
                    className="group/boton inline-flex items-center gap-2 rounded-full border border-borde px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-texto transition-colors duration-300 hover:border-acento hover:bg-acento hover:text-fondo focus-visible:outline-2 focus-visible:outline-acento focus-visible:outline-offset-2 sm:text-[11px]"
                  >
                    {es.proyectos.verProyecto}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      className="translate-x-0.5 -translate-y-0.5"
                    >
                      <path d="M7 17L17 7" />
                      <path d="M7 7h10v10" />
                    </svg>
                  </a>
                ) : null}
              </div>
            </div>

            {/* Progreso — un segmento por proyecto */}
            <div className="mt-2 flex items-center gap-1.5">
              {proyectosVisibles.map((proyecto, i) => {
                const activo = i === indiceSeleccionado;
                return (
                  <button
                    key={proyecto.slug}
                    type="button"
                    onClick={() => seleccionar(i)}
                    aria-label={es.proyectos.verProyectoDe(proyecto.nombre)}
                    aria-current={activo ? "true" : undefined}
                    className="group/segmento flex-1 py-2 focus-visible:outline-2 focus-visible:outline-acento focus-visible:outline-offset-2"
                  >
                    <span className="relative block h-[3px] w-full overflow-hidden rounded-full bg-borde/60">
                      <span
                        aria-hidden="true"
                        className={`absolute inset-0 rounded-full bg-acento transition-opacity duration-300 ${
                          activo
                            ? "opacity-100"
                            : "opacity-0 group-hover/segmento:opacity-40"
                        }`}
                      />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Índice — los 6 proyectos como filas tarjeta */}
          <ul
            onKeyDown={manejarTeclas}
            aria-label={es.proyectos.indiceAria}
            className="order-2 lg:order-1 lg:col-span-5 flex flex-col gap-2"
          >
            {proyectosVisibles.map((proyecto, i) => (
              <motion.li
                key={proyecto.slug}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.06,
                  ease: EASING,
                }}
              >
                <FilaProyecto
                  proyecto={proyecto}
                  indice={i}
                  activo={i === indiceSeleccionado}
                  onSeleccionar={() => seleccionar(i)}
                  onPrevisualizar={() => previsualizar(i)}
                  refFila={(el) => {
                    refsFilas.current[i] = el;
                  }}
                />
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Link contextual discreto */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="mt-10 sm:mt-12"
        >
          <a
            href="#contacto"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("contacto")
                ?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className="inline-flex flex-wrap items-center gap-2 text-texto-suave text-sm transition-colors duration-300 hover:text-texto"
          >
            {es.proyectos.parecidoMente}
            <span className="text-acento">{es.proyectos.escribimeCta}</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
