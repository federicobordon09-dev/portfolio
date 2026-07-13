"use client";

import { motion } from "framer-motion";
import { IconoFlechaDiagonal, IconoReloj } from "./iconos/Iconos";
import type { Proyecto } from "@/lib/datos";

export default function TarjetaProyecto({
  proyecto,
}: {
  proyecto: Proyecto;
}) {
  return (
    <div className="group relative bg-superficie border border-borde rounded-sm p-4 sm:p-5 flex flex-col min-h-[200px] sm:min-h-[220px] hover:border-acento transition-colors duration-300 cursor-pointer">
      <span
        aria-hidden="true"
        className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-acento to-transparent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"
      />

      <div className="relative z-10 flex items-center justify-between text-[10px] uppercase tracking-[0.15em] text-texto-suave mb-3">
        <span className="bg-fondo/50 px-2 py-0.5 rounded-sm">{proyecto.categoria}</span>
        <span className="font-mono">{proyecto.anio}</span>
      </div>

      <div className="relative z-10 flex-1 flex flex-col">
        <h3 className="font-display font-bold text-lg sm:text-xl text-texto mb-2 group-hover:text-acento transition-colors duration-300">
          {proyecto.nombre}
        </h3>
        <p className="text-texto-suave text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3">
          {proyecto.descripcion}
        </p>

        <div className="flex flex-wrap gap-1.5 mt-auto">
          {proyecto.tecnologias.map((t) => (
            <span
              key={t}
              className="text-[10px] uppercase tracking-wider text-texto-suave border border-borde rounded-full px-2 py-0.5 font-mono group-hover:border-acento/40 group-hover:text-acento/80 transition-colors"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="relative z-10 mt-3 pt-3 flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-[0.2em] text-texto-suave/60">
          {proyecto.enlace ? "Ver proyecto" : "Próximamente"}
        </span>
        {proyecto.enlace ? (
          <motion.a
            href={proyecto.enlace}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ rotate: 45, scale: 1.1 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="w-7 h-7 rounded-full bg-acento flex items-center justify-center text-fondo flex-shrink-0"
            aria-label={`Ver proyecto ${proyecto.nombre}`}
          >
            <IconoFlechaDiagonal tamano={12} />
          </motion.a>
        ) : (
          <span
            aria-label={`${proyecto.nombre} próximamente`}
            className="w-7 h-7 rounded-full border border-borde flex items-center justify-center text-texto-suave cursor-not-allowed flex-shrink-0"
          >
            <IconoReloj tamano={12} />
          </span>
        )}
      </div>
    </div>
  );
}
