"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import FormularioContacto from "./FormularioContacto";
import { DATOS_PERSONALES } from "@/lib/datos";
import { IconoGitHub } from "./iconos/Iconos";
import { EASE_OUT_EXPO } from "@/lib/animaciones";

/**
 * Componente que renderea el email letra por letra y aplica
 * el "nervous/alive" effect en hover: cada letra se mueve
 * hacia arriba un poquito (2-4px) con un poquito de stagger.
 *
 * El offset por letra se genera una sola vez en el mount del
 * cliente (post-hidratación) para evitar mismatch de SSR.
 */
function EmailAnimado({
  texto,
  onClick,
}: {
  texto: string;
  onClick: () => void;
}) {
  // Precomputamos los offsets random de cada letra en mount
  // del CLIENTE (no del server) — así server y cliente renderean
  // lo mismo en la primera pasada y no hay hydration mismatch.
  // Inicia como array de ceros; en useEffect se rellena con
  // valores random estables.
  const [offsetsPorLetra, setOffsetsPorLetra] = useState<number[]>(() =>
    texto.split("").map(() => 0),
  );

  useEffect(() => {
    setOffsetsPorLetra(
      texto.split("").map(() => -(Math.floor(Math.random() * 3) + 2)),
    );
  }, [texto]);

  return (
    <motion.button
      type="button"
      onClick={onClick}
      className="group/email relative inline-block font-display font-bold text-[clamp(1.5rem,6vw,4rem)] sm:text-5xl lg:text-7xl text-texto hover:text-acento transition-colors duration-300 break-all text-left cursor-pointer"
      // Variantes del contenedor — coordina el stagger de las letras
      initial="reposo"
      whileHover="hover"
    >
      {/* Span invisible que mantiene el ancho del texto — importante
          porque las letras se animan con translate y no queremos
          que el layout se mueva */}
      <span className="invisible" aria-hidden="true">
        {texto}
      </span>

      {/* Letras animadas superpuestas — absolute sobre el span invisible */}
      <span className="absolute inset-0 flex" aria-label={texto}>
        {texto.split("").map((letra, indice) => (
          <motion.span
            key={`${letra}-${indice}`}
            variants={{
              reposo: { y: 0 },
              hover: {
                y: offsetsPorLetra[indice],
                transition: {
                  duration: 0.3,
                  delay: indice * 0.015,
                  ease: EASE_OUT_EXPO,
                },
              },
            }}
            className="inline-block"
            style={{ width: letra === " " ? "0.3em" : "auto" }}
          >
            {letra === " " ? "\u00A0" : letra}
          </motion.span>
        ))}
      </span>

      {/* Flecha al final — rota con spring a -45deg en hover */}
      <motion.span
        variants={{
          reposo: { rotate: 0, x: 0, y: 0 },
          hover: {
            rotate: -45,
            x: 6,
            y: -6,
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 15,
            },
          },
        }}
        className="inline-block ml-3 sm:ml-6 origin-center"
      >
        ↗
      </motion.span>

      {/* Línea horizontal debajo del email que se expande en hover */}
      <span
        className="absolute left-0 right-0 -bottom-2 h-[2px] bg-acento origin-left scale-x-0 group-hover/email:scale-x-100 transition-transform duration-[400ms] ease-out"
        aria-hidden="true"
      />
    </motion.button>
  );
}

export default function Contacto() {
  // Controla si el panel del formulario está abierto
  const [formularioAbierto, setFormularioAbierto] = useState(false);

  return (
    <section
      id="contacto"
      className="relative px-5 sm:px-10 lg:px-16 py-20 sm:py-32"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header de sección — fade in desde abajo */}
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

        {/* Email clickeable gigante con efecto "nervioso" en hover
            — slide up con delay 0.3s después del título */}
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

        {/* Footer de contacto: disponibilidad + redes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 sm:gap-8 pt-8 border-t border-borde"
        >
          {/* Status de disponibilidad con dot pulse continuo */}
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full rounded-full bg-acento opacity-60 pulso-continuo" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-acento" />
            </span>
            <span className="text-sm text-texto-suave">
              Disponible para proyectos freelance
            </span>
          </div>

          {/* Icono de GitHub — fade in con delay 0.6s */}
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

      {/* Panel del formulario — se monta al final de la sección,
          posicionado fixed con z alto, así flota sobre todo el portfolio */}
      <FormularioContacto
        abierto={formularioAbierto}
        onCerrar={() => setFormularioAbierto(false)}
      />
    </section>
  );
}
