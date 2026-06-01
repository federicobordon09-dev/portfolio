"use client";

import { MotionConfig } from "framer-motion";

/**
 * Wrapper global que hace que TODAS las animaciones de Framer Motion
 * respeten la preferencia del sistema `prefers-reduced-motion: reduce`.
 *
 * Por defecto Framer Motion usa JS para las animaciones, así que el
 * @media (prefers-reduced-motion) de CSS globals no las afecta. Con
 * `reducedMotion="user"` le decimos a Framer:
 *   - Si el usuario tiene la preferencia activada → snap directo al
 *     estado final, sin transición
 *   - Si no la tiene → comportamiento normal
 *
 * Esto cubre TODOS los motion.* de la app de una sola vez.
 */
export default function ConfiguracionMovimiento({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
