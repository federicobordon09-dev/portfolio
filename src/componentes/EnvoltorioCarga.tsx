"use client";

import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import PantallaCarga from "./PantallaCarga";

export default function EnvoltorioCarga({ children }: { children: React.ReactNode }) {
  const [mostrar, setMostrar] = useState(true);

  const terminar = useCallback(() => setMostrar(false), []);

  return (
    <>
      <AnimatePresence>
        {mostrar && <PantallaCarga onTerminar={terminar} />}
      </AnimatePresence>
      {!mostrar && children}
    </>
  );
}
