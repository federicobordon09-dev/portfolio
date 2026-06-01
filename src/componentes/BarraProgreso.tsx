"use client";

import { useEffect, useState } from "react";

/**
 * Barra de progreso decorativa que aparece en la primera carga.
 * Pura estética — da la sensación de que "algo está pasando" en 800ms.
 * Se auto-remueve del DOM cuando termina la animación así no queda ocupando lugar.
 */
export default function BarraProgreso() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Un poquito más que la duración de la animación CSS (0.8s) para que se vea completa
    const temporizador = setTimeout(() => setVisible(false), 1200);
    return () => clearTimeout(temporizador);
  }, []);

  if (!visible) return null;

  return <div className="barra-progreso" aria-hidden="true" />;
}
