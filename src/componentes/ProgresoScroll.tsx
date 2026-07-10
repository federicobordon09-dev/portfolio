"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Barra de progreso de scroll — una línea naranja fija arriba que se
 * llena a medida que el usuario baja por la página.
 *
 * Distinta a `BarraProgreso` (esa es decorativa de carga y se auto-remueve).
 * Esta refleja en tiempo real cuánto de la página se recorrió.
 *
 * Usa `useSpring` para suavizar el movimiento y que no se sienta brusco.
 * z-[190] la deja debajo de la barra de carga inicial (z-200) durante
 * el primer segundo, y siempre visible por encima del contenido.
 */
export default function ProgresoScroll() {
  const { scrollYProgress } = useScroll();
  const escala = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX: escala }}
      className="fixed top-0 left-0 right-0 h-[2px] bg-acento origin-left z-[190]"
    />
  );
}
