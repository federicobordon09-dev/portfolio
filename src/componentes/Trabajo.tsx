"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TarjetaProyecto from "./TarjetaProyecto";
import Resplandor from "./Resplandor";
import { proyectos } from "@/lib/datos";

const CARTAS_POR_PAGINA = 2;

export default function Trabajo() {
  const [pagina, setPagina] = useState(0);
  const totalPaginas = Math.ceil(proyectos.length / CARTAS_POR_PAGINA);
  const inicio = pagina * CARTAS_POR_PAGINA;
  const proyectosPagina = proyectos.slice(inicio, inicio + CARTAS_POR_PAGINA);

  const hayAnterior = pagina > 0;
  const haySiguiente = pagina < totalPaginas - 1;

  return (
    <section
      id="trabajo"
      className="relative px-5 sm:px-10 lg:px-16 py-20 sm:py-32 overflow-hidden"
    >
      <Resplandor className="-right-40 top-40 w-[380px] h-[380px] sm:w-[560px] sm:h-[560px] opacity-60" />

      <div className="relative max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex items-baseline gap-6 mb-3"
        >
          <span className="text-acento font-mono text-base sm:text-lg">01</span>
          <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-texto tracking-tight">
            Proyectos
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="text-texto-suave text-sm sm:text-base max-w-xl mb-8 sm:mb-10 leading-relaxed pl-[calc(1.5rem+1ch)]"
        >
          Una selección de trabajos donde combino diseño, código y buenas decisiones técnicas.
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="linea-divisoria origin-left mb-8 sm:mb-10"
        />

        {/* Carrusel de proyectos con flechas a los costados */}
        <div className="relative flex items-center gap-3 sm:gap-4">
          {/* Flecha izquierda */}
          <button
            onClick={() => setPagina((p) => Math.max(0, p - 1))}
            disabled={!hayAnterior}
            className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-borde flex items-center justify-center text-texto-suave hover:text-acento hover:border-acento disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-300"
            aria-label="Proyectos anteriores"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18" height="18" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Grid de proyectos */}
          <div className="flex-1 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={pagina}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
              >
                {proyectosPagina.map((proyecto) => (
                  <TarjetaProyecto
                    key={proyecto.id}
                    proyecto={proyecto}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Flecha derecha */}
          <button
            onClick={() => setPagina((p) => Math.min(totalPaginas - 1, p + 1))}
            disabled={!haySiguiente}
            className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-borde flex items-center justify-center text-texto-suave hover:text-acento hover:border-acento disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-300"
            aria-label="Próximos proyectos"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18" height="18" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        {/* Indicadores de página */}
        {totalPaginas > 1 && (
          <div className="flex items-center justify-center gap-2 mt-6">
            {Array.from({ length: totalPaginas }, (_, i) => (
              <button
                key={i}
                onClick={() => setPagina(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === pagina
                    ? "bg-acento w-6"
                    : "bg-borde w-1.5 hover:bg-texto-suave"
                }`}
                aria-label={`Página ${i + 1}`}
                aria-current={i === pagina ? "page" : undefined}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
