import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configuración del componente <Image>
  // - qualities: lista blanca de valores de quality aceptados.
  //   Es requerimiento de Next 16+ por seguridad (evita que un
  //   atacante abuse del parámetro quality para SSRF/scraping).
  //   Acá listamos 90 que es lo que usa el logo del nav.
  //   Si en el futuro alguna imagen usa otra quality, hay que
  //   agregarla a esta lista.
  images: {
    qualities: [90],
  },
};

export default nextConfig;
