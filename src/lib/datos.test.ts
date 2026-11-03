import { describe, expect, it } from "vitest";

import { proyectos } from "./datos";

/**
 * Fija la selección pública exacta de proyectos del portfolio.
 * Orden de presentación definido por el usuario.
 */
describe("proyectos", () => {
  it("contiene exactamente los 6 slugs del portfolio, en orden", () => {
    expect(proyectos.map((p) => p.slug)).toEqual([
      "copa-chapa-chapa",
      "opencode-hush",
      "nuvio",
      "bodega-andeluna",
      "opuntia-casa-de-te",
      "hornero-restaurante",
    ]);
  });
});
