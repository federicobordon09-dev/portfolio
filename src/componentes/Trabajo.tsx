"use client";

import { motion } from "framer-motion";
import TarjetaProyecto from "./TarjetaProyecto";
import Resplandor from "./Resplandor";
import { proyectos } from "@/lib/datos";

export default function Trabajo() {
  return (
    <section
      id="trabajo"
      className="relative px-5 sm:px-10 lg:px-16 py-20 sm:py-32 overflow-hidden"
    >
      {/* Resplandor ambiental con micro-parallax — orbe difuminado a la
          derecha que da profundidad a la sección sin competir con las tarjetas */}
      <Resplandor className="-right-40 top-40 w-[380px] h-[380px] sm:w-[560px] sm:h-[560px] opacity-60" />

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex items-baseline gap-6 mb-6"
        >
          <span className="text-acento font-mono text-base sm:text-lg">01</span>
          <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-texto tracking-tight">
            Proyectos
          </h2>
        </motion.div>

        {/* Línea introductoria — le da contexto a la sección */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="text-texto-suave text-base sm:text-lg max-w-xl mb-12 sm:mb-16 leading-relaxed pl-[calc(1.5rem+1ch)]"
        >
          Una selección de trabajos donde combino diseño, código y buenas
          decisiones técnicas.
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="linea-divisoria origin-left mb-12 sm:mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
          {proyectos.map((proyecto, indice) => (
            <TarjetaProyecto
              key={proyecto.id}
              proyecto={proyecto}
              indice={indice}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
