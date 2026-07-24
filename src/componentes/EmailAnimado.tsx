"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { EASE_OUT_EXPO } from "@/lib/animaciones";

/**
 * Componente que renderea el email letra por letra y aplica
 * el "nervous/alive" effect en hover: cada letra se mueve
 * hacia arriba un poquito (2-4px) con un poquito de stagger.
 *
 * El offset por letra se genera una sola vez en el mount del
 * cliente (post-hidratación) para evitar mismatch de SSR.
 */
export default function EmailAnimado({
  texto,
  onClick,
}: {
  texto: string;
  onClick: () => void;
}) {
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
      aria-label={`Escribirme a ${texto}`}
      className="group/email relative flex flex-wrap items-baseline max-w-full font-display font-bold text-[clamp(1.1rem,4.5vw,3rem)] sm:text-5xl lg:text-6xl leading-[1.1] text-texto hover:text-acento transition-colors duration-300 text-left cursor-pointer"
      initial="reposo"
      whileHover="hover"
    >
      {/* Renderizamos las letras en flujo normal con flex-wrap: en
          pantallas chicas el email envuelve por letra en vez de cortarse
          o desbordar. Cada letra conserva su micro-animación en hover. */}
      {texto.split("").map((letra, indice) => (
        <motion.span
          key={`${letra}-${indice}`}
          aria-hidden="true"
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

      <motion.span
        aria-hidden="true"
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
        className="inline-block ml-2 sm:ml-4 origin-center"
      >
        ↗
      </motion.span>

      <span
        className="absolute left-0 right-0 -bottom-2 h-[2px] bg-acento origin-left scale-x-0 group-hover/email:scale-x-100 transition-transform duration-[400ms] ease-out"
        aria-hidden="true"
      />
    </motion.button>
  );
}
