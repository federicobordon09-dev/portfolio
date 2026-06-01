import { defineConfig } from "vitest/config";

/**
 * Configuración de Vitest. Por ahora solo testeamos código puro
 * (reducers, helpers) — no necesitamos jsdom ni React Testing
 * Library. Si en el futuro se quieren testear componentes
 * completos, se agrega `environment: "jsdom"` y los plugins
 * correspondientes.
 */
export default defineConfig({
  test: {
    globals: true,
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    environment: "node",
  },
  resolve: {
    alias: {
      "@": new URL("./src", import.meta.url).pathname,
    },
  },
});
