"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Envoltorio que le da efecto "magnético" a su contenido: cuando el
 * cursor se acerca, el elemento se atrae suavemente hacia él, y al salir
 * vuelve a su lugar con un resorte.
 *
 * Pensado para CTAs e íconos. En mobile (sin mouse) no pasa nada: los
 * eventos onMouseMove/Leave simplemente no se disparan, así que queda
 * estático y sin costo.
 *
 * `intensidad` controla cuánto se mueve (fracción del offset del cursor
 * respecto al centro). 0.3 = sutil y elegante.
 */
export default function BotonMagnetico({
  children,
  intensidad = 0.3,
  className,
}: {
  children: React.ReactNode;
  intensidad?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Resorte para que el retorno y el seguimiento se sientan orgánicos
  const resorteX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.1 });
  const resorteY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.1 });

  const manejarMovimiento = (evento: React.MouseEvent<HTMLDivElement>) => {
    const elemento = ref.current;
    if (!elemento) return;
    const rect = elemento.getBoundingClientRect();
    const centroX = rect.left + rect.width / 2;
    const centroY = rect.top + rect.height / 2;
    x.set((evento.clientX - centroX) * intensidad);
    y.set((evento.clientY - centroY) * intensidad);
  };

  const manejarSalida = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={manejarMovimiento}
      onMouseLeave={manejarSalida}
      style={{ x: resorteX, y: resorteY }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
