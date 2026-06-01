"use client";

import { useEffect, useReducer, useRef } from "react";
import { motion } from "framer-motion";
import {
  TIMING,
  ESTADO_INICIAL,
  reductorTypewriter,
  decidirAccion,
} from "./typewriter";

// Nombre completo y separación para poder colorear "Federico" blanco
// y "Bordon" naranja con la animación de typewriter
const NOMBRE_COMPLETO = "Federico Bordon";
const INDICE_ESPACIO = NOMBRE_COMPLETO.indexOf(" "); // 8
const LETRAS = NOMBRE_COMPLETO.split("");
const LETRAS_LINEA_1 = LETRAS.slice(0, INDICE_ESPACIO + 1); // "Federico "
const LETRAS_LINEA_2 = LETRAS.slice(INDICE_ESPACIO + 1); // "Bordon"

/**
 * Hook que controla la animación del nombre en dos fases:
 *
 * FASE 1 — Entrada (una sola vez al cargar la página):
 *   Las letras aparecen una a una con stagger TIMING.ENTRADA_POR_LETRA_MS,
 *   animando desde {y: 60%, opacity: 0, filter: blur(8px)} hasta
 *   {y: 0, opacity: 1, filter: blur(0)} — efecto letra por letra
 *   con blur que se limpia mientras suben.
 *
 * FASE 2 — Loop typewriter (para siempre):
 *   Pausa TIMING.PAUSA_ESCRITO_COMPLETO_MS con el nombre completo,
 *   después borra letra por letra cada TIMING.BORRAR_POR_LETRA_MS,
 *   pausa TIMING.PAUSA_VACIO_MS en vacío, escribe letra por letra
 *   cada TIMING.ESCRIBIR_POR_LETRA_MS, y repite.
 *
 * Implementación: UN ÚNICO setInterval (con deps vacías) que vive
 * lo que vive el componente. Para leer el estado actualizado dentro
 * del callback usamos un `useRef` que se sincroniza en cada render.
 * Si pusiéramos `[estado]` como dep, el interval se re-crearía en
 * cada dispatch y se podrían perder ticks durante re-renders de
 * resize/parent update.
 */
function useTypewriterConEntrada() {
  const [estado, dispatch] = useReducer(reductorTypewriter, ESTADO_INICIAL);
  // Ref que mantiene SIEMPRE la última versión del estado, sin
  // disparar re-renders. El callback del setInterval la lee para
  // tomar decisiones actualizadas.
  const estadoRef = useRef(estado);
  estadoRef.current = estado;

  useEffect(() => {
    const intervalo = setInterval(() => {
      const ahoraMs =
        typeof performance !== "undefined" ? performance.now() : Date.now();
      const accion = decidirAccion(estadoRef.current, ahoraMs, LETRAS.length);
      if (accion) dispatch(accion);
    }, TIMING.ENTRADA_POR_LETRA_MS);

    return () => clearInterval(intervalo);
  }, []); // ← deps vacías: el interval se crea UNA vez y listo

  return {
    cantidadVisible: estado.cantidadVisible,
    entradaTerminada: estado.entradaTerminada,
  };
}

export default function Inicio() {
  const { cantidadVisible, entradaTerminada } = useTypewriterConEntrada();

  // Helper para scrollear a la siguiente sección (Trabajo)
  const manejarClickScroll = () => {
    const seccionTrabajo = document.getElementById("trabajo");
    if (seccionTrabajo) {
      seccionTrabajo.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  /**
   * Render de UNA letra individual.
   *
   * - Durante la entrada: la letra arranca oculta y borrosa (initial)
   *   y se anima a nítida y en su lugar con delay escalonado.
   * - Durante el loop: la letra aparece/desaparece según `cantidadVisible`
   *   con un fade suave (sin blur — ya se vio la entrada).
   */
  function renderLetra(
    letra: string,
    indiceGlobal: number,
    esParteNaranja: boolean,
  ) {
    const estaVisible = indiceGlobal < cantidadVisible;

    return (
      <motion.span
        key={indiceGlobal}
        initial={{ y: "60%", opacity: 0, filter: "blur(8px)" }}
        animate={
          entradaTerminada
            ? estaVisible
              ? { y: "0%", opacity: 1, filter: "blur(0px)" }
              : { y: "0%", opacity: 0, filter: "blur(0px)" }
            : // Durante la entrada, el animate es siempre "visible" —
              // la magia del efecto está en el delay escalonado
              { y: "0%", opacity: 1, filter: "blur(0px)" }
        }
        transition={{
          duration: entradaTerminada ? 0.2 : 0.5,
          delay: entradaTerminada ? 0 : indiceGlobal * TIMING.STAGGER_ENTRADA_S,
          ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        }}
        className={`inline-block ${esParteNaranja ? "text-acento" : "text-texto"}`}
      >
        {letra === " " ? "\u00A0" : letra}
      </motion.span>
    );
  }

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex flex-col justify-center px-5 sm:px-10 lg:px-16 pt-24 pb-12 overflow-hidden"
    >
      {/* Overlay de grano sutil para darle textura al hero */}
      <div className="textura-grano" aria-hidden="true" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative max-w-7xl w-full mx-auto z-10"
      >
        {/* Tag superior — fade up simple, entra antes que el nombre */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="flex items-center gap-3 mb-8 sm:mb-12"
        >
          <span className="text-acento font-mono text-sm">00</span>
          <span className="h-px w-12 bg-borde" />
          <span className="text-texto-suave text-xs sm:text-sm uppercase tracking-[0.2em] font-medium">
            Desarrollador Web
          </span>
        </motion.div>

        {/* Nombre principal con animación de entrada letra por letra
            + typewriter loop que mantiene la línea naranja siguiendo al texto. */}
        <h1 className="relative font-display font-extrabold leading-[0.95] tracking-tight text-[clamp(3rem,12vw,9.5rem)] min-h-[2.1em]">
          {/* Línea 1: "Federico" + espacio */}
          <span className="block text-texto whitespace-pre">
            {/* Cursor al inicio cuando todavía no hay ninguna letra */}
            {entradaTerminada && cantidadVisible === 0 && (
              <span className="cursor-parpadeante" aria-hidden="true" />
            )}
            {/* Letras de línea 1: durante la entrada rendereamos todas
                para que la animación stagger funcione; durante el loop
                solo las visibles, así el cursor que va después las
                sigue letra por letra. */}
            {(entradaTerminada
              ? LETRAS_LINEA_1.slice(
                  0,
                  Math.min(cantidadVisible, LETRAS_LINEA_1.length),
                )
              : LETRAS_LINEA_1
            ).map((letra, i) => renderLetra(letra, i, false))}
            {/* Cursor al final de línea 1 cuando hay letras visibles
                y la última todavía está en esta línea */}
            {entradaTerminada &&
              cantidadVisible > 0 &&
              cantidadVisible <= LETRAS_LINEA_1.length && (
                <span className="cursor-parpadeante" aria-hidden="true" />
              )}
          </span>

          {/* Línea 2: "Bordon" */}
          <span className="block whitespace-pre">
            {(entradaTerminada
              ? LETRAS_LINEA_2.slice(
                  0,
                  Math.max(0, cantidadVisible - LETRAS_LINEA_1.length),
                )
              : LETRAS_LINEA_2
            ).map((letra, i) =>
              renderLetra(letra, LETRAS_LINEA_1.length + i, true),
            )}
            {/* Cursor en línea 2 cuando ya hay letras de "Bordon" */}
            {entradaTerminada && cantidadVisible > LETRAS_LINEA_1.length && (
              <span className="cursor-parpadeante" aria-hidden="true" />
            )}
          </span>
        </h1>

        {/* Frase de posicionamiento — fade + slide-up con delay 0.8s */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.8,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
          }}
          className="mt-10 sm:mt-14 max-w-2xl text-base sm:text-xl lg:text-2xl text-texto-suave leading-relaxed font-light"
        >
          Construyo experiencias web que ayudan a las marcas a crecer
          digitalmente.
        </motion.p>

        {/* Metadata inferior — entra desde la izquierda con stagger 0.15s entre items */}
        <motion.div
          initial="oculto"
          animate="visible"
          variants={{
            oculto: {},
            visible: {
              transition: { staggerChildren: 0.15, delayChildren: 1.1 },
            },
          }}
          className="mt-10 sm:mt-16 flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-3 sm:gap-x-8 sm:gap-y-3 text-sm text-texto-suave"
        >
          <motion.div
            variants={{
              oculto: { opacity: 0, x: -30 },
              visible: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.5, ease: "easeOut" },
              },
            }}
            className="flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-acento" />
            <span>Soy de Mendoza, Argentina</span>
          </motion.div>
          <motion.div
            variants={{
              oculto: { opacity: 0, x: -30 },
              visible: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.5, ease: "easeOut" },
              },
            }}
            className="flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-acento" />
            <span>Disponible para proyectos freelance</span>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Indicador de scroll — oculto en mobile, aparece en desktop */}
      <motion.button
        onClick={manejarClickScroll}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.4 }}
        className="hidden sm:flex absolute bottom-8 sm:bottom-12 right-6 sm:right-10 lg:right-16 flex-col items-center gap-3 text-texto-suave hover:text-acento transition-colors duration-300 group"
        aria-label="Bajar"
      >
        <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] font-medium">
          Bajar
        </span>
        <span className="rebote-sutile w-px h-10 sm:h-14 bg-gradient-to-b from-acento to-transparent" />
      </motion.button>
    </section>
  );
}
