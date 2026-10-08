"use client";

import { motion, Variants } from "framer-motion";
import { proceso } from "@/lib/datos";
import { useIdioma } from "@/lib/i18n/IdiomaContext";
import Resplandor from "./Resplandor";

const variantesContenedor: Variants = {
  oculto: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const variantesPaso: Variants = {
  oculto: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const variantesDot: Variants = {
  oculto: { scale: 1, opacity: 0.6 },
  visible: {
    scale: [1, 1.5, 1],
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const variantesLinea: Variants = {
  oculto: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      delay: 0.2,
    },
  },
};

export default function Proceso() {
  const { diccionario: es } = useIdioma();
  return (
    <section
      id="proceso"
      className="relative px-5 sm:px-10 lg:px-16 py-20 sm:py-32 overflow-hidden"
    >
      <Resplandor className="-left-40 top-1/3 w-[360px] h-[360px] sm:w-[520px] sm:h-[520px] opacity-50" />

      {/* Número fantasma gigante — serie editorial 00·01·02·03·04 */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-8 left-0 sm:left-6 font-display font-extrabold text-[10rem] sm:text-[18rem] leading-none text-[#d4d4d4] dark:text-white/[0.06] select-none"
      >
        03
      </span>

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex items-baseline gap-6 mb-12 sm:mb-16"
        >
          <span className="text-acento font-mono text-base sm:text-lg">03</span>
          <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-texto tracking-tight">
            {es.proceso.titulo}
          </h2>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="linea-divisoria origin-left mb-16 sm:mb-20"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          <div className="lg:col-span-1 hidden lg:flex items-start pt-2">
            <span className="text-texto-suave text-xs font-mono uppercase tracking-[0.25em] [writing-mode:vertical-rl] rotate-180">
              {es.proceso.etiqueta}
            </span>
          </div>

          <motion.ul
            className="lg:col-span-11 space-y-10 sm:space-y-16"
            initial="oculto"
            whileInView="visible"
            viewport={{ once: false, amount: 0.15 }}
            variants={variantesContenedor}
          >
            {proceso.map((paso, indice) => {
              // Merge por índice: estructura (datos.ts) + copy (diccionario)
              const texto = es.proceso.items[indice];
              return (
              <motion.li
                key={paso.numero}
                variants={variantesPaso}
                className="group grid grid-cols-[auto_1fr] gap-6 sm:gap-8"
              >
                <div className="flex flex-col items-center pt-3">
                  <motion.span
                    variants={variantesDot}
                    className="w-2.5 h-2.5 rounded-full bg-acento"
                  />
                  <motion.span
                    variants={variantesLinea}
                    style={{ transformOrigin: "top" }}
                    className="w-px flex-1 bg-borde mt-2 group-hover:bg-acento transition-colors duration-500"
                  />
                </div>

                <div>
                  <motion.span
                    variants={{
                      oculto: { opacity: 0, y: 10 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.4, delay: 0.2 },
                      },
                    }}
                    className="block text-acento font-mono text-sm mb-3"
                  >
                    {paso.numero}
                  </motion.span>
                  <h3 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-texto mb-3 sm:mb-4 tracking-tight">
                    {texto.titulo}
                  </h3>
                  <p className="text-texto-suave text-base sm:text-lg leading-relaxed max-w-2xl">
                    {texto.descripcion}
                  </p>
                </div>
              </motion.li>
              );
            })}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
