"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import FormularioContacto from "./FormularioContacto";
import EmailAnimado from "./EmailAnimado";
import { DATOS_PERSONALES } from "@/lib/datos";
import { useIdioma } from "@/lib/i18n/IdiomaContext";
import { IconoGitHub, IconoLinkedIn } from "./iconos/Iconos";
import BotonMagnetico from "./BotonMagnetico";
import Resplandor from "./Resplandor";

export default function Contacto() {
  const { diccionario: es } = useIdioma();
  const [formularioAbierto, setFormularioAbierto] = useState(false);

  return (
    <section
      id="contacto"
      className="relative px-5 sm:px-10 lg:px-16 py-20 sm:py-32 overflow-hidden"
    >
      <Resplandor className="left-1/2 -bottom-40 w-[500px] h-[400px] sm:w-[800px] sm:h-[500px] opacity-70" desplazamiento={40} centrado />

      {/* Número fantasma gigante — serie editorial 00·01·02·03·04 */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-8 right-0 sm:right-6 font-display font-extrabold text-[10rem] sm:text-[18rem] leading-none text-[#d4d4d4] dark:text-white/[0.06] select-none"
      >
        04
      </span>

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex items-baseline gap-6 mb-12 sm:mb-16"
        >
          <span className="text-acento font-mono text-base sm:text-lg">04</span>
          <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-texto tracking-tight">
            {es.contacto.titulo}
          </h2>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="linea-divisoria origin-left mb-16 sm:mb-20"
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="mb-10 sm:mb-14"
        >
          <p className="text-texto text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl">
            {es.contacto.parrafo}
          </p>

          {/* Email editorial — único canal de contacto.
              Abre el mismo panel FormularioContacto, sin formulario visible. */}
          <div className="mt-10 sm:mt-12">
            <span className="block text-xs uppercase tracking-[0.2em] text-texto-suave font-mono mb-4">
              {es.contacto.emailDirecto}
            </span>
            <EmailAnimado
              texto={DATOS_PERSONALES.email}
              onClick={() => setFormularioAbierto(true)}
            />
            <p className="mt-4 text-xs sm:text-sm text-texto-suave font-mono">
              {es.contacto.hintFormulario}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-8 pt-8 border-t border-borde"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
            className="flex flex-wrap items-center gap-3 sm:gap-4"
          >
            <span className="text-xs uppercase tracking-[0.2em] text-texto-suave font-mono mr-2">
              {es.contacto.encontrameEn}
            </span>
            <BotonMagnetico intensidad={0.4}>
              <a
                href={DATOS_PERSONALES.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="group w-11 h-11 flex items-center justify-center border border-borde rounded-full hover:border-acento hover:bg-acento transition-all duration-300"
              >
                <IconoGitHub
                  tamano={18}
                  className="text-texto-suave group-hover:text-fondo transition-colors duration-300"
                />
              </a>
            </BotonMagnetico>
            <BotonMagnetico intensidad={0.4}>
              <a
                href={DATOS_PERSONALES.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="group w-11 h-11 flex items-center justify-center border border-borde rounded-full hover:border-acento hover:bg-acento transition-all duration-300"
              >
                <IconoLinkedIn
                  tamano={18}
                  className="text-texto-suave group-hover:text-fondo transition-colors duration-300"
                />
              </a>
            </BotonMagnetico>
          </motion.div>

          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.15em] text-texto-suave">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span>{es.contacto.disponibilidad}</span>
          </div>
        </motion.div>
      </div>

      <FormularioContacto
        abierto={formularioAbierto}
        onCerrar={() => setFormularioAbierto(false)}
      />
    </section>
  );
}
