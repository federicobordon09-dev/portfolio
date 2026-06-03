"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import FormularioContacto from "./FormularioContacto";
import EmailAnimado from "./EmailAnimado";
import { DATOS_PERSONALES } from "@/lib/datos";
import { IconoGitHub } from "./iconos/Iconos";

export default function Contacto() {
  const [formularioAbierto, setFormularioAbierto] = useState(false);

  return (
    <section
      id="contacto"
      className="relative px-5 sm:px-10 lg:px-16 py-20 sm:py-32"
    >
      <div className="max-w-7xl mx-auto">
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
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full rounded-full bg-acento opacity-60 pulso-continuo" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-acento" />
            </span>
            <span className="text-sm text-texto-suave">
              Disponible para proyectos freelance
            </span>
          </div>

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
