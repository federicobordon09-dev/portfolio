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
      className="group/email relative inline-block font-display font-bold text-[clamp(1.5rem,6vw,4rem)] sm:text-5xl lg:text-7xl text-texto hover:text-acento transition-colors duration-300 break-words text-left cursor-pointer"
      initial="reposo"
      whileHover="hover"
    >
      <span className="invisible" aria-hidden="true">
        {texto}
      </span>

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

      <span
        className="absolute left-0 right-0 -bottom-2 h-[2px] bg-acento origin-left scale-x-0 group-hover/email:scale-x-100 transition-transform duration-[400ms] ease-out"
        aria-hidden="true"
      />
    </motion.button>
  );
}
