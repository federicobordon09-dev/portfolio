"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import FormularioContacto from "./FormularioContacto";
import EmailAnimado from "./EmailAnimado";
import { DATOS_PERSONALES } from "@/lib/datos";
import { IconoGitHub, IconoLinkedIn } from "./iconos/Iconos";
import BotonMagnetico from "./BotonMagnetico";
import Resplandor from "./Resplandor";

export default function Contacto() {
  const [formularioAbierto, setFormularioAbierto] = useState(false);

  return (
    <section
      id="contacto"
      className="relative px-5 sm:px-10 lg:px-16 py-20 sm:py-32 overflow-hidden"
    >
      {/* Resplandor ambiental con micro-parallax — refuerza el CTA final con calidez */}
      <Resplandor className="left-1/2 -bottom-40 w-[500px] h-[400px] sm:w-[800px] sm:h-[500px] opacity-70" desplazamiento={40} centrado />

      {/* Número fantasma gigante — cierra la serie editorial 01·02·03 */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-8 left-0 sm:left-6 font-display font-extrabold text-[10rem] sm:text-[18rem] leading-none text-texto/[0.02] select-none"
      >
        03
      </span>

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex items-baseline gap-6 mb-12 sm:mb-16"
        >
          <span className="text-acento font-mono text-base sm:text-lg">03</span>
          <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-texto tracking-tight">
            Construyamos Algo
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
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="mb-12 sm:mb-16"
        >
          <span className="block text-xs uppercase tracking-[0.2em] text-texto-suave mb-4 font-mono">
            Escribime
          </span>
          <EmailAnimado
            texto={DATOS_PERSONALES.email}
            onClick={() => setFormularioAbierto(true)}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 sm:gap-8 pt-8 border-t border-borde"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
            className="flex items-center gap-4"
          >
            <span className="text-xs uppercase tracking-[0.2em] text-texto-suave font-mono mr-2">
              Encontrame en
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
        </motion.div>
      </div>

      <FormularioContacto
        abierto={formularioAbierto}
        onCerrar={() => setFormularioAbierto(false)}
      />
    </section>
  );
}
