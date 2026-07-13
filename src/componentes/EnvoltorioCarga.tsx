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
      <div style={{ display: mostrar ? "none" : undefined }}>{children}</div>
    </>
  );
}
