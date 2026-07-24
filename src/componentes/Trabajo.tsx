"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { IconoFlechaDiagonal, IconoReloj } from "./iconos/Iconos";
import Resplandor from "./Resplandor";
import { proyectos, type Proyecto } from "@/lib/datos";

const POR_PAGINA = 3;

function CardProyecto({ proyecto, indice }: { proyecto: Proyecto; indice: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 0.5, delay: indice * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="group relative bg-superficie border border-borde rounded-lg overflow-hidden hover:border-acento/50 transition-all duration-300"
    >
      {/* Línea naranja superior en hover */}
      <span
        aria-hidden="true"
        className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-acento to-transparent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out z-10"
      />

      {/* Preview del proyecto — aspect ratio compacto */}
      <div className="relative w-full aspect-[16/7] overflow-hidden bg-fondo">
        <Image
          src={proyecto.imagen}
          alt={proyecto.imagenAlt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
          quality={75}
        />
        {/* Overlay sutil */}
        <div className="absolute inset-0 bg-gradient-to-t from-superficie/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
      </div>

      {/* Contenido */}
      <div className="p-4 sm:p-5">
        {/* Categoría + año */}
        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.15em] text-texto-suave mb-2">
          <span>{proyecto.categoria}</span>
          <span className="font-mono">{proyecto.anio}</span>
        </div>

        {/* Nombre */}
        <h3 className="font-display font-bold text-base sm:text-lg text-texto group-hover:text-acento transition-colors duration-300 mb-2">
          {proyecto.nombre}
        </h3>

        {/* Descripción */}
        <p className="text-texto-suave text-xs sm:text-sm leading-relaxed mb-4 line-clamp-2">
          {proyecto.descripcion}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {proyecto.tecnologias.slice(0, 3).map((t) => (
            <span
              key={t}
              className="text-[9px] sm:text-[10px] uppercase tracking-wider text-texto-suave/70 border border-borde rounded-full px-2 py-0.5 font-mono group-hover:border-acento/30 group-hover:text-acento/60 transition-colors"
            >
              {t}
            </span>
          ))}
          {proyecto.tecnologias.length > 3 && (
            <span className="text-[9px] sm:text-[10px] text-texto-suave/40 font-mono">
              +{proyecto.tecnologias.length - 3}
            </span>
          )}
        </div>

        {/* Footer: label + flecha */}
        <div className="flex items-center justify-between pt-3 border-t border-borde/50">
          <span className="text-[10px] uppercase tracking-[0.2em] text-texto-suave/50">
            {proyecto.enlace ? "Ver proyecto" : "Próximamente"}
          </span>
          {proyecto.enlace ? (
            <motion.button
              onClick={() => window.open(proyecto.enlace!, "_blank", "noopener,noreferrer")}
              whileHover={{ rotate: 45, scale: 1.1 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className="w-7 h-7 rounded-full bg-acento flex items-center justify-center text-fondo flex-shrink-0 cursor-pointer"
              aria-label={`Ver proyecto ${proyecto.nombre}`}
            >
              <IconoFlechaDiagonal tamano={12} />
            </motion.button>
          ) : (
            <span
              aria-label={`${proyecto.nombre} próximamente`}
              className="w-7 h-7 rounded-full border border-borde flex items-center justify-center text-texto-suave/40 cursor-not-allowed flex-shrink-0"
            >
              <IconoReloj tamano={12} />
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function Trabajo() {
  const [pagina, setPagina] = useState(0);
  const totalPaginas = Math.ceil(proyectos.length / POR_PAGINA);
  const inicio = pagina * POR_PAGINA;
  const proyectosPagina = proyectos.slice(inicio, inicio + POR_PAGINA);

  return (
    <section
      id="trabajo"
      className="relative px-5 sm:px-10 lg:px-16 py-20 sm:py-32 overflow-hidden"
    >
      <Resplandor className="-right-40 top-40 w-[380px] h-[380px] sm:w-[560px] sm:h-[560px] opacity-60" />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
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

        {/* Grid de proyectos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={pagina}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="contents"
            >
              {proyectosPagina.map((proyecto, i) => (
                <CardProyecto key={proyecto.id} proyecto={proyecto} indice={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Paginación */}
        {totalPaginas > 1 && (
          <div className="flex items-center justify-center gap-3 mt-10 sm:mt-12">
            <button
              onClick={() => setPagina((p) => Math.max(0, p - 1))}
              disabled={pagina === 0}
              className="w-9 h-9 rounded-full border border-borde flex items-center justify-center text-texto-suave hover:text-acento hover:border-acento disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-300"
              aria-label="Página anterior"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            {Array.from({ length: totalPaginas }, (_, i) => (
              <button
                key={i}
                onClick={() => setPagina(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === pagina ? "bg-acento w-6" : "bg-borde w-1.5 hover:bg-texto-suave"
                }`}
                aria-label={`Página ${i + 1}`}
                aria-current={i === pagina ? "page" : undefined}
              />
            ))}

            <button
              onClick={() => setPagina((p) => Math.min(totalPaginas - 1, p + 1))}
              disabled={pagina === totalPaginas - 1}
              className="w-9 h-9 rounded-full border border-borde flex items-center justify-center text-texto-suave hover:text-acento hover:border-acento disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-300"
              aria-label="Página siguiente"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
