import { describe, it, expect } from "vitest";
import {
  TIMING,
  ESTADO_INICIAL,
  reductorTypewriter,
  decidirAccion,
  type EstadoTypewriter,
} from "./typewriter";

const AHORA = 1000; // timestamp arbitrario de "ahora"
const TOTAL_LETRAS = 15; // largo arbitrario para los tests

describe("typewriter — estado inicial", () => {
  it("arranca con 0 letras visibles y entrada no terminada", () => {
    expect(ESTADO_INICIAL).toEqual({
      cantidadVisible: 0,
      estaBorrando: false,
      entradaTerminada: false,
      proximoTickMs: TIMING.ENTRADA_POR_LETRA_MS,
    });
  });
});

describe("reductorTypewriter", () => {
  it("avanzar incrementa cantidadVisible y programa próximo tick (con ritmo de entrada)", () => {
    // ESTADO_INICIAL tiene entradaTerminada=false → usa ritmo de ENTRADA
    const estado = reductorTypewriter(ESTADO_INICIAL, {
      tipo: "avanzar",
      ahoraMs: AHORA,
    });
    expect(estado.cantidadVisible).toBe(1);
    expect(estado.proximoTickMs).toBe(AHORA + TIMING.ENTRADA_POR_LETRA_MS);
  });

  it("avanzar en el loop usa ritmo de escritura (más lento que entrada)", () => {
    const inicial: EstadoTypewriter = { ...ESTADO_INICIAL, entradaTerminada: true };
    const estado = reductorTypewriter(inicial, { tipo: "avanzar", ahoraMs: AHORA });
    expect(estado.cantidadVisible).toBe(1);
    expect(estado.proximoTickMs).toBe(AHORA + TIMING.ESCRIBIR_POR_LETRA_MS);
  });

  it("retroceder decrementa cantidadVisible", () => {
    const inicial: EstadoTypewriter = {
      ...ESTADO_INICIAL,
      cantidadVisible: 5,
      entradaTerminada: true,
      estaBorrando: true,
    };
    const estado = reductorTypewriter(inicial, { tipo: "retroceder", ahoraMs: AHORA });
    expect(estado.cantidadVisible).toBe(4);
    expect(estado.proximoTickMs).toBe(AHORA + TIMING.BORRAR_POR_LETRA_MS);
  });

  it("terminarEntrada marca la entrada como terminada", () => {
    const inicial: EstadoTypewriter = {
      ...ESTADO_INICIAL,
      cantidadVisible: TOTAL_LETRAS,
    };
    const estado = reductorTypewriter(inicial, {
      tipo: "terminarEntrada",
      ahoraMs: AHORA,
    });
    expect(estado.entradaTerminada).toBe(true);
    // Nombre completo → pausa larga antes de empezar a borrar
    expect(estado.proximoTickMs).toBe(AHORA + TIMING.PAUSA_ESCRITO_COMPLETO_MS);
  });

  it("empezarBorrado activa el flag de borrado", () => {
    const estado = reductorTypewriter(ESTADO_INICIAL, {
      tipo: "empezarBorrado",
      ahoraMs: AHORA,
    });
    expect(estado.estaBorrando).toBe(true);
  });

  it("empezarEscritura desactiva el flag de borrado", () => {
    const inicial: EstadoTypewriter = { ...ESTADO_INICIAL, estaBorrando: true };
    const estado = reductorTypewriter(inicial, {
      tipo: "empezarEscritura",
      ahoraMs: AHORA,
    });
    expect(estado.estaBorrando).toBe(false);
  });
});

describe("decidirAccion", () => {
  it("devuelve null si todavía no es tiempo del próximo tick", () => {
    const estado: EstadoTypewriter = {
      ...ESTADO_INICIAL,
      proximoTickMs: AHORA + 1000,
    };
    expect(decidirAccion(estado, AHORA, TOTAL_LETRAS)).toBeNull();
  });

  it("FASE 1 entrada: avanza letra por letra hasta completar", () => {
    // Simulamos el paso del tiempo avanzando 100ms por iteración
    // (más que los 50ms entre letras para que cada tick "sea tiempo")
    let estado: EstadoTypewriter = { ...ESTADO_INICIAL, proximoTickMs: AHORA };
    let tiempo = AHORA;
    const acciones: string[] = [];
    for (let i = 0; i < TOTAL_LETRAS; i++) {
      const accion = decidirAccion(estado, tiempo, TOTAL_LETRAS);
      expect(accion).not.toBeNull();
      acciones.push(accion!.tipo);
      estado = reductorTypewriter(estado, accion!);
      tiempo += 100;
    }
    expect(acciones).toEqual(Array(TOTAL_LETRAS).fill("avanzar"));
    expect(estado.cantidadVisible).toBe(TOTAL_LETRAS);
  });

  it("FASE 1 entrada: cuando está completa, transiciona a terminarEntrada", () => {
    const estado: EstadoTypewriter = {
      ...ESTADO_INICIAL,
      cantidadVisible: TOTAL_LETRAS,
      proximoTickMs: AHORA,
    };
    expect(decidirAccion(estado, AHORA, TOTAL_LETRAS)).toEqual({
      tipo: "terminarEntrada",
      ahoraMs: AHORA,
    });
  });

  it("FASE 2 loop: completo → empieza a borrar", () => {
    const estado: EstadoTypewriter = {
      cantidadVisible: TOTAL_LETRAS,
      estaBorrando: false,
      entradaTerminada: true,
      proximoTickMs: AHORA,
    };
    expect(decidirAccion(estado, AHORA, TOTAL_LETRAS)).toEqual({
      tipo: "empezarBorrado",
      ahoraMs: AHORA,
    });
  });

  it("FASE 2 loop: vacío mientras borra → empieza a escribir", () => {
    const estado: EstadoTypewriter = {
      cantidadVisible: 0,
      estaBorrando: true,
      entradaTerminada: true,
      proximoTickMs: AHORA,
    };
    expect(decidirAccion(estado, AHORA, TOTAL_LETRAS)).toEqual({
      tipo: "empezarEscritura",
      ahoraMs: AHORA,
    });
  });

  it("FASE 2 loop: en el medio del bucle, sigue avanzando/retrocediendo", () => {
    const escribiendoMedio: EstadoTypewriter = {
      cantidadVisible: 5,
      estaBorrando: false,
      entradaTerminada: true,
      proximoTickMs: AHORA,
    };
    expect(decidirAccion(escribiendoMedio, AHORA, TOTAL_LETRAS)).toEqual({
      tipo: "avanzar",
      ahoraMs: AHORA,
    });

    const borrandoMedio: EstadoTypewriter = {
      cantidadVisible: 5,
      estaBorrando: true,
      entradaTerminada: true,
      proximoTickMs: AHORA,
    };
    expect(decidirAccion(borrandoMedio, AHORA, TOTAL_LETRAS)).toEqual({
      tipo: "retroceder",
      ahoraMs: AHORA,
    });
  });
});
