/**
 * State machine puro del typewriter. Sin React, sin timers, sin
 * side effects → 100% testeable con un simple
 * `expect(reducer(estado, accion, ahora)).toEqual(esperado)`.
 *
 * El hook `useTypewriterConEntrada` (en Inicio.tsx) lo usa para
 * mantener el estado y consultar qué acción tocar en cada tick.
 */

// Tiempos y delays del typewriter, en milisegundos.
// Centralizados acá para que tocar el ritmo de la animación
// sea cambiar un solo lugar.
export const TIMING = {
  // FASE 1 — entrada letra por letra al cargar
  ENTRADA_POR_LETRA_MS: 50,
  ENTRADA_PAUSA_FINAL_MS: 500,

  // FASE 2 — loop infinito de escribir/borrar
  ESCRIBIR_POR_LETRA_MS: 80,
  BORRAR_POR_LETRA_MS: 80,
  PAUSA_ESCRITO_COMPLETO_MS: 2000,
  PAUSA_VACIO_MS: 400,

  // Stagger de la entrada (segundos — lo usa Framer)
  STAGGER_ENTRADA_S: 0.05,
} as const;

export type EstadoTypewriter = {
  cantidadVisible: number;
  estaBorrando: boolean;
  entradaTerminada: boolean;
  // Timestamp (performance.now() en ms) en el que se debe actuar.
  // El setInterval corre siempre a TIMING.ENTRADA_POR_LETRA_MS y
  // en cada tick consulta este valor para saber si es hora.
  proximoTickMs: number;
};

export const ESTADO_INICIAL: EstadoTypewriter = {
  cantidadVisible: 0,
  estaBorrando: false,
  entradaTerminada: false,
  proximoTickMs: TIMING.ENTRADA_POR_LETRA_MS,
};

export type AccionTypewriter =
  | { tipo: "avanzar"; ahoraMs: number }
  | { tipo: "retroceder"; ahoraMs: number }
  | { tipo: "terminarEntrada"; ahoraMs: number }
  | { tipo: "empezarBorrado"; ahoraMs: number }
  | { tipo: "empezarEscritura"; ahoraMs: number };

/**
 * Reducer puro: dada la acción, devuelve el nuevo estado.
 * El timestamp `ahoraMs` viene dentro de la acción para que
 * `useReducer` acepte la firma estándar de 2 args.
 */
export function reductorTypewriter(
  estado: EstadoTypewriter,
  accion: AccionTypewriter,
): EstadoTypewriter {
  const { ahoraMs } = accion;
  switch (accion.tipo) {
    case "avanzar":
      return {
        ...estado,
        cantidadVisible: estado.cantidadVisible + 1,
        // El ritmo de avance depende de la fase: en entrada
        // es más rápido (efecto "apertura") que en el loop
        proximoTickMs:
          ahoraMs +
          (estado.entradaTerminada
            ? TIMING.ESCRIBIR_POR_LETRA_MS
            : TIMING.ENTRADA_POR_LETRA_MS),
      };
    case "retroceder":
      return {
        ...estado,
        cantidadVisible: estado.cantidadVisible - 1,
        proximoTickMs: ahoraMs + TIMING.BORRAR_POR_LETRA_MS,
      };
    case "terminarEntrada":
      return {
        ...estado,
        entradaTerminada: true,
        proximoTickMs:
          ahoraMs +
          (estado.cantidadVisible === 0
            ? TIMING.PAUSA_VACIO_MS
            : TIMING.PAUSA_ESCRITO_COMPLETO_MS),
      };
    case "empezarBorrado":
      return {
        ...estado,
        estaBorrando: true,
        proximoTickMs: ahoraMs + TIMING.BORRAR_POR_LETRA_MS,
      };
    case "empezarEscritura":
      return {
        ...estado,
        estaBorrando: false,
        proximoTickMs: ahoraMs + TIMING.ESCRIBIR_POR_LETRA_MS,
      };
  }
}

/**
 * Decisión pura del state machine: dado el estado actual y el
 * timestamp, ¿qué acción hay que dispatchar? Si todavía no es
 * tiempo (estamos esperando una pausa larga), devuelve null.
 *
 * La acción ya viene con `ahoraMs` embebido para que el caller
 * pueda hacer `dispatch(accion)` directamente sin rearmarla.
 */
export function decidirAccion(
  estado: EstadoTypewriter,
  ahoraMs: number,
  totalLetras: number,
): AccionTypewriter | null {
  if (ahoraMs < estado.proximoTickMs) return null;

  if (!estado.entradaTerminada) {
    if (estado.cantidadVisible < totalLetras) {
      return { tipo: "avanzar", ahoraMs };
    }
    return { tipo: "terminarEntrada", ahoraMs };
  }

  if (estado.estaBorrando) {
    if (estado.cantidadVisible === 0) {
      return { tipo: "empezarEscritura", ahoraMs };
    }
    return { tipo: "retroceder", ahoraMs };
  }

  if (estado.cantidadVisible === totalLetras) {
    return { tipo: "empezarBorrado", ahoraMs };
  }
  return { tipo: "avanzar", ahoraMs };
}
