import type { Easing } from "framer-motion";

/**
 * Easings y timings de animación centralizados.
 *
 * Antes estaban repetidos en cada componente con el cast feo
 * `as [number, number, number, number]`. Acá los exportamos
 * tipados, así autocomplete y type-check los cubren.
 *
 * Para agregar un easing nuevo, simplemente exportalo acá y
 * usalo desde cualquier componente.
 */

// Curva de ease-out exponencial — la que más usamos en el portfolio.
// type-safe gracias al tipo `Easing` de Framer Motion.
export const EASE_OUT_EXPO: Easing = [0.22, 1, 0.36, 1];

// Easing del "pop" de éxito del form (un poco más elástico)
export const EASE_BACK_OUT: Easing = [0.34, 1.56, 0.64, 1];

// Easing del "Genie" del form — entra con overshoot sutil
export const EASE_GENIE: Easing = [0.34, 1.4, 0.5, 1];

// Easing de salida del form (sale rápido al fondo)
export const EASE_GENIE_SALIDA: Easing = [0.4, 0, 0.2, 1];

/**
 * Preset de viewport para `whileInView`. Lo repetimos en 20+
 * motion components de la página — centralizado acá.
 *
 * `once: false` → la animación se re-dispara cada vez que el
 * elemento entra al viewport (scroll up/down).
 * `amount: 0.15` → se activa cuando el 15% del elemento es visible.
 */
export const VIEWPORT_PRESET = {
  once: false,
  amount: 0.15,
} as const;
