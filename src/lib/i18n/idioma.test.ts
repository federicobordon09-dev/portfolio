import { describe, it, expect } from "vitest";
import {
  IDIOMA_POR_DEFECTO,
  resolverIdioma,
  serializarCookieIdioma,
} from "./idioma";

describe("resolverIdioma", () => {
  it("resuelve null a español por defecto", () => {
    expect(resolverIdioma(null)).toBe("es");
  });

  it("resuelve undefined a español por defecto", () => {
    expect(resolverIdioma(undefined)).toBe("es");
  });

  it("conserva es", () => {
    expect(resolverIdioma("es")).toBe("es");
  });

  it("conserva en", () => {
    expect(resolverIdioma("en")).toBe("en");
  });

  it("rechaza valores no soportados", () => {
    expect(resolverIdioma("pt")).toBe("es");
    expect(resolverIdioma("EN")).toBe("es");
    expect(resolverIdioma("")).toBe("es");
    expect(resolverIdioma("fr")).toBe("es");
  });
});

describe("serializarCookieIdioma", () => {
  it("serializa es con path y SameSite", () => {
    const cookie = serializarCookieIdioma("es");
    expect(cookie).toContain("idioma-portfolio=es");
    expect(cookie).toContain("path=/");
    expect(cookie).toContain("SameSite=Lax");
  });

  it("serializa en con path y SameSite", () => {
    const cookie = serializarCookieIdioma("en");
    expect(cookie).toContain("idioma-portfolio=en");
    expect(cookie).toContain("path=/");
    expect(cookie).toContain("SameSite=Lax");
  });
});

describe("IDIOMA_POR_DEFECTO", () => {
  it("es español", () => {
    expect(IDIOMA_POR_DEFECTO).toBe("es");
  });
});
