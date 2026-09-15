"use client";

import { useEffect, useReducer, useRef } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";
import {
  TIMING,
  ESTADO_INICIAL,
  reductorTypewriter,
  decidirAccion,
} from "./typewriter";
import { DATOS_PERSONALES } from "@/lib/datos";

const NOMBRE_COMPLETO = "Federico Bordon";
const INDICE_ESPACIO = NOMBRE_COMPLETO.indexOf(" ");
const LETRAS = NOMBRE_COMPLETO.split("");
const LETRAS_LINEA_1 = LETRAS.slice(0, INDICE_ESPACIO + 1);
const LETRAS_LINEA_2 = LETRAS.slice(INDICE_ESPACIO + 1);

function useTypewriterConEntrada() {
  const [estado, dispatch] = useReducer(reductorTypewriter, ESTADO_INICIAL);
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
  }, []);

  return {
    cantidadVisible: estado.cantidadVisible,
    entradaTerminada: estado.entradaTerminada,
  };
}

export default function Inicio() {
  const { cantidadVisible, entradaTerminada } = useTypewriterConEntrada();

  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);
  const fondoSpotlight = useTransform(
    [mouseX, mouseY],
    ([x, y]) =>
      `radial-gradient(500px circle at ${x}px ${y}px, rgb(var(--acento-rgb) / 0.07), transparent 65%)`,
  );

  const manejarMovimientoMouse = (evento: React.MouseEvent<HTMLElement>) => {
    const rect = evento.currentTarget.getBoundingClientRect();
    mouseX.set(evento.clientX - rect.left);
    mouseY.set(evento.clientY - rect.top);
  };

  const manejarClickScroll = () => {
    const seccionTrabajo = document.getElementById("trabajo");
    if (seccionTrabajo) {
      seccionTrabajo.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const manejarClickWhatsApp = () => {
    window.open(DATOS_PERSONALES.whatsapp, "_blank", "noopener,noreferrer");
  };

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
            : { y: "0%", opacity: 1, filter: "blur(0px)" }
        }
        transition={{
          duration: entradaTerminada ? 0.2 : 0.5,
          delay: entradaTerminada ? 0 : indiceGlobal * TIMING.STAGGER_ENTRADA_S,
          ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        }}
        className={`inline-block ${esParteNaranja ? "texto-degradado-acento" : "text-texto"}`}
      >
        {letra === " " ? "\u00A0" : letra}
      </motion.span>
    );
  }

  return (
    <section
      id="inicio"
      onMouseMove={manejarMovimientoMouse}
      className="relative min-h-screen flex flex-col justify-center px-5 sm:px-10 lg:px-16 pt-24 pb-12 overflow-hidden"
    >
      <div className="patron-puntos" aria-hidden="true" />

      <motion.div
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ background: fondoSpotlight }}
      />

      <div
        className="resplandor-acento glow-respira -top-32 -left-24 w-[420px] h-[420px] sm:w-[650px] sm:h-[650px]"
        aria-hidden="true"
      />

      <div className="textura-grano" aria-hidden="true" />

      {/* Número fantasma gigante — serie editorial 00·01·02·03·04 */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-8 right-0 sm:right-6 font-display font-extrabold text-[10rem] sm:text-[18rem] leading-none text-[#d4d4d4] dark:text-white/[0.06] select-none"
      >
        00
      </span>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative max-w-7xl w-full mx-auto z-10"
      >
        {/* Tag superior */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.0, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-3 mb-8 sm:mb-12"
        >
          <span className="text-acento font-mono text-sm">00</span>
          <span className="h-px w-12 bg-borde" />
          <span className="text-texto-suave text-xs sm:text-sm uppercase tracking-[0.2em] font-medium">
            Desarrollador Web — Mendoza, Argentina
          </span>
        </motion.div>

        {/* Nombre principal con typewriter */}
        <h1 className="relative font-display font-extrabold leading-[0.95] tracking-tight text-[clamp(3rem,12vw,9.5rem)] min-h-[2.1em]">
          <span className="sr-only">Federico Bordon</span>
          <span className="block text-texto whitespace-pre">
            {entradaTerminada && cantidadVisible === 0 && (
              <span className="cursor-parpadeante" aria-hidden="true" />
            )}
            {(entradaTerminada
              ? LETRAS_LINEA_1.slice(
                  0,
                  Math.min(cantidadVisible, LETRAS_LINEA_1.length),
                )
              : LETRAS_LINEA_1
            ).map((letra, i) => renderLetra(letra, i, false))}
            {entradaTerminada &&
              cantidadVisible > 0 &&
              cantidadVisible <= LETRAS_LINEA_1.length && (
                <span className="cursor-parpadeante" aria-hidden="true" />
              )}
          </span>

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
            {entradaTerminada && cantidadVisible > LETRAS_LINEA_1.length && (
              <span className="cursor-parpadeante" aria-hidden="true" />
            )}
          </span>
        </h1>

        {/* Propuesta principal */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.4,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
          }}
          className="mt-8 sm:mt-12 max-w-2xl text-base sm:text-xl lg:text-2xl text-texto leading-relaxed font-light"
        >
          {DATOS_PERSONALES.tagline}
        </motion.p>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.55,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
          }}
          className="mt-4 max-w-xl text-sm sm:text-base text-texto-suave leading-relaxed"
        >
          {DATOS_PERSONALES.subheadline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4"
        >
          <motion.button
            onClick={manejarClickWhatsApp}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-acento text-fondo font-display font-semibold text-sm sm:text-base rounded-full hover:bg-acento-hover transition-colors cursor-pointer"
          >
            Quiero una web para mi negocio
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </motion.button>

          <motion.button
            onClick={manejarClickScroll}
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-5 py-3.5 text-sm sm:text-base text-texto-suave hover:text-acento transition-colors cursor-pointer bg-transparent border-0"
          >
            Ver proyectos
            <span className="text-acento">→</span>
          </motion.button>
        </motion.div>

        {/* Metadata inferior */}
        <motion.div
          initial="oculto"
          animate="visible"
          variants={{
            oculto: {},
            visible: {
              transition: { staggerChildren: 0.12, delayChildren: 1.0 },
            },
          }}
          className="mt-8 sm:mt-12 flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-3 sm:gap-x-8 sm:gap-y-3 text-sm text-texto-suave"
        >
          <motion.div
            variants={{
              oculto: { opacity: 0, x: -20 },
              visible: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
              },
            }}
            className="flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-acento" />
            <span>Mendoza · Argentina</span>
          </motion.div>
          <motion.div
            variants={{
              oculto: { opacity: 0, x: -20 },
              visible: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
              },
            }}
            className="flex items-center gap-3"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
            </span>
            <span>Disponible para nuevos proyectos</span>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Indicador de scroll */}
      <motion.button
        onClick={manejarClickScroll}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: 4 }}
        className="hidden sm:flex absolute bottom-8 sm:bottom-12 right-6 sm:right-10 lg:right-16 flex-col items-center gap-3 text-texto-suave hover:text-acento transition-colors duration-300 group"
        aria-label="Bajar"
      >
        <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] font-medium">
          Bajar
        </span>
        <span className="rebote-sutil w-px h-10 sm:h-14 bg-gradient-to-b from-acento to-transparent" aria-hidden="true" />
      </motion.button>
    </section>
  );
}
