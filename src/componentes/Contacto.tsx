"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import FormularioContacto from "./FormularioContacto";
import { DATOS_PERSONALES } from "@/lib/datos";
import { IconoGitHub, IconoLinkedIn } from "./iconos/Iconos";
import BotonMagnetico from "./BotonMagnetico";
import Resplandor from "./Resplandor";

export default function Contacto() {
  const [formularioAbierto, setFormularioAbierto] = useState(false);

  const manejarClickWhatsApp = () => {
    window.open(DATOS_PERSONALES.whatsapp, "_blank", "noopener,noreferrer");
  };

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
            ¿Tenés un proyecto en mente?
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
          <p className="text-texto text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl mb-8">
            Contame qué necesitás y vemos juntos la mejor forma de llevarlo a la web.
          </p>

          {/* CTAs principales */}
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <motion.button
              onClick={manejarClickWhatsApp}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-acento text-fondo font-display font-semibold text-sm sm:text-base rounded-full hover:bg-acento-hover transition-colors cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Hablar por WhatsApp
            </motion.button>

            <motion.button
              onClick={() => setFormularioAbierto(true)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 border border-borde text-texto font-display font-semibold text-sm sm:text-base rounded-full hover:border-acento hover:text-acento transition-colors cursor-pointer bg-transparent"
            >
              Enviar email
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </motion.button>
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
