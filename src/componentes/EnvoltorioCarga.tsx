"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import PantallaCarga from "./PantallaCarga";

export default function EnvoltorioCarga({ children }: { children: React.ReactNode }) {
  const [mostrar, setMostrar] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem("bootShown")) setMostrar(false);
  }, []);

  const terminar = useCallback(() => {
    sessionStorage.setItem("bootShown", "true");
    setMostrar(false);
  }, []);

  return (
    <>
      <AnimatePresence>
        {mostrar && <PantallaCarga onTerminar={terminar} />}
      </AnimatePresence>
      {/* El contenido YA se renderiza detrás del overlay. El loading
          solo lo cubre visualmente (z-[80], por encima de la nav z-50),
          no lo bloquea. Así el LCP se pinta apenas carga la página en
          vez de esperar. La nav queda tapada durante la carga y se
          revela recién cuando el terminal termina (SISTEMA LISTO). */}
      <div aria-hidden={mostrar}>{children}</div>
    </>
  );
}
