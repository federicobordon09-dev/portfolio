"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Orbe naranja difuminado (`.resplandor-acento`) con micro-parallax:
 * se desplaza levemente en el eje Y a medida que la sección entra y
 * sale del viewport, dando sensación de profundidad al scrollear.
 *
 * Reemplaza a los `<div className="resplandor-acento ...">` estáticos.
 * La posición/tamaño se siguen pasando por `className` (utilidades de
 * Tailwind), igual que antes; este componente solo agrega el movimiento.
 *
 * `desplazamiento` = cuántos px se mueve de un extremo al otro del
 * recorrido. Sutil por defecto. Respeta prefers-reduced-motion vía el
 * MotionConfig global, que congela el transform en su estado base.
 */
export default function Resplandor({
  className,
  desplazamiento = 60,
  centrado = false,
}: {
  className?: string;
  desplazamiento?: number;
  /** Si el orbe se centra horizontalmente (equivale a -translate-x-1/2).
      Necesario porque Framer maneja el transform y pisaría la utilidad
      de Tailwind `-translate-x-1/2`. */
  centrado?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [desplazamiento, -desplazamiento],
  );

  return (
    <motion.div
      ref={ref}
      aria-hidden="true"
      style={centrado ? { x: "-50%", y } : { y }}
      className={`resplandor-acento ${className ?? ""}`}
    />
  );
}
