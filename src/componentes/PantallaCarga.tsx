"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

const LINEAS = [
  "INITIALIZING PORTFOLIO SYSTEM v2.0...",
  "LOADING CREATIVE MODULES...",
  "ESTABLISHING SECURE CONNECTION...",
  "READING PROJECT DATABASE...",
  "COMPILING USER INTERFACE...",
  "SYSTEM READY.",
];

const VELOCIDAD_TYPEO = 22;
const PAUSA_LINEA = 180;
const TIEMPO_FINAL = 900;

export default function PantallaCarga({ onTerminar }: { onTerminar: () => void }) {
  const [indiceLinea, setIndiceLinea] = useState(0);
  const [indiceChar, setIndiceChar] = useState(0);
  const [terminado, setTerminado] = useState(false);

  const esUltimaLinea = indiceLinea === LINEAS.length - 1;

  useEffect(() => {
    if (indiceLinea >= LINEAS.length) {
      setTerminado(true);
      const timer = setTimeout(onTerminar, TIEMPO_FINAL);
      return () => clearTimeout(timer);
    }

    const linea = LINEAS[indiceLinea];
    if (indiceChar < linea.length) {
      const timer = setTimeout(() => setIndiceChar((p) => p + 1), VELOCIDAD_TYPEO);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(() => {
      setIndiceLinea((p) => p + 1);
      setIndiceChar(0);
    }, PAUSA_LINEA);
    return () => clearTimeout(timer);
  }, [indiceLinea, indiceChar, onTerminar]);

  const progresoTotal =
    (indiceLinea / LINEAS.length) +
    (indiceChar / (LINEAS[indiceLinea]?.length || 1)) * (1 / LINEAS.length);

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-[#050505] flex items-center justify-center"
      exit={{ opacity: 0, scale: 1.03 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Scan lines */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.015) 2px, rgba(255,255,255,0.015) 4px)",
      }} />

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{
        background: "radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.6) 100%)",
      }} />

      <div className="relative z-10 max-w-xl w-full px-6 sm:px-10">
        {/* Header del terminal */}
        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-white/5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
          <span className="text-white/20 text-[10px] uppercase tracking-[0.2em] font-mono ml-2">
            terminal — fbordon
          </span>
        </div>

        {/* Líneas de boot */}
        <div className="font-mono text-[13px] sm:text-sm leading-[1.9] tracking-wide">
          {LINEAS.slice(0, indiceLinea).map((linea, i) => (
            <div
              key={i}
              className={`${
                i === LINEAS.length - 1
                  ? "text-green-400/90 font-semibold"
                  : "text-acento/80"
              }`}
            >
              <span className="opacity-30 select-none">{">"}</span> {linea}
              {terminado && i === LINEAS.length - 1 && (
                <motion.span
                  className="inline-block w-[2px] h-[14px] sm:h-[16px] bg-green-400 ml-[2px] align-middle"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
                />
              )}
            </div>
          ))}

          {indiceLinea < LINEAS.length && indiceChar > 0 && (
            <div className={esUltimaLinea ? "text-green-400/90 font-semibold" : "text-acento/80"}>
              <span className="opacity-30 select-none">{">"}</span>{" "}
              {LINEAS[indiceLinea].slice(0, indiceChar)}
              <motion.span
                className="inline-block w-[2px] h-[14px] sm:h-[16px] bg-acento ml-[2px] align-middle"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
              />
            </div>
          )}
        </div>

        {/* Barra de progreso */}
        <div className="mt-8 h-[2px] bg-white/5 relative overflow-hidden rounded-full">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-acento via-acento to-green-400"
            style={{ width: `${Math.min(progresoTotal * 100, 100)}%` }}
            transition={{ duration: 0.15, ease: "linear" }}
          />
        </div>

        <div className="mt-2 flex justify-between text-[10px] font-mono text-white/15 tracking-wider">
          <span>BOOT_SEQUENCE v2.0</span>
          <span>{Math.min(Math.round(progresoTotal * 100), 100)}%</span>
        </div>
      </div>
    </motion.div>
  );
}
