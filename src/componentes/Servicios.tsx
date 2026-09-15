"use client";

import { motion, Variants } from "framer-motion";
import { servicios } from "@/lib/datos";
import Resplandor from "./Resplandor";

function IconoServicio({ icono }: { icono: string }) {
  const comun = "w-6 h-6 text-acento";
  switch (icono) {
    case "rocket":
      return (
        <svg className={comun} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
          <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
          <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
          <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
        </svg>
      );
    case "refresh":
      return (
        <svg className={comun} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
          <path d="M21 3v5h-5" />
        </svg>
      );
    case "target":
      return (
        <svg className={comun} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      );
    case "code":
      return (
        <svg className={comun} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      );
    default:
      return null;
  }
}

const variantesContenedor: Variants = {
  oculto: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const variantesItem: Variants = {
  oculto: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function Servicios() {
  return (
    <section
      id="servicios"
      className="relative px-5 sm:px-10 lg:px-16 py-20 sm:py-32 overflow-hidden"
    >
      <Resplandor className="-left-40 top-1/3 w-[360px] h-[360px] sm:w-[520px] sm:h-[520px] opacity-50" />

      {/* Número fantasma gigante — serie editorial 00·01·02·03·04 */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-8 right-0 sm:right-6 font-display font-extrabold text-[10rem] sm:text-[18rem] leading-none text-[#d4d4d4] dark:text-white/[0.06] select-none"
      >
        02
      </span>

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex items-baseline gap-6 mb-3"
        >
          <span className="text-acento font-mono text-base sm:text-lg">02</span>
          <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-texto tracking-tight">
            ¿Qué puedo hacer por tu negocio?
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="text-texto-suave text-sm sm:text-base max-w-xl mb-8 sm:mb-10 leading-relaxed pl-[calc(1.5rem+1ch)]"
        >
          Cada proyecto es distinto. Estos son los tipos de trabajo que puedo encarar para ayudarte.
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="linea-divisoria origin-left mb-8 sm:mb-10"
        />

        {/* Grid de servicios */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5"
          initial="oculto"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }}
          variants={variantesContenedor}
        >
          {servicios.map((servicio) => (
            <motion.article
              key={servicio.id}
              variants={variantesItem}
              className="group relative bg-superficie border border-borde rounded-lg p-6 sm:p-8 hover:border-acento/50 hover:shadow-[0_8px_30px_-12px_rgba(var(--acento-rgb)/0.12)] transition-all duration-300"
            >
              <span
                aria-hidden="true"
                className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-acento to-transparent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out z-10"
              />

              <div className="flex items-start gap-4 mb-4">
                <div className="shrink-0 w-11 h-11 rounded-full border border-borde flex items-center justify-center group-hover:border-acento/50 group-hover:bg-acento/5 transition-all duration-300">
                  <IconoServicio icono={servicio.icono} />
                </div>
                <h3 className="font-display font-bold text-lg sm:text-xl text-texto group-hover:text-acento transition-colors duration-300 pt-2">
                  {servicio.titulo}
                </h3>
              </div>

              <p className="text-texto-suave text-sm sm:text-base leading-relaxed">
                {servicio.descripcion}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
