"use client";

import { motion } from "framer-motion";
import TarjetaProyecto from "./TarjetaProyecto";
import { proyectos } from "@/lib/datos";

export default function Trabajo() {
  return (
    <section
      id="trabajo"
      className="relative px-5 sm:px-10 lg:px-16 py-20 sm:py-32"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex items-baseline gap-6 mb-12 sm:mb-16"
        >
          <span className="text-acento font-mono text-base sm:text-lg">01</span>
          <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-texto tracking-tight">
            Proyectos
          </h2>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="linea-divisoria origin-left mb-12 sm:mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
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
