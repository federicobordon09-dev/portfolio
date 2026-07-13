"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconoFlechaArriba } from "./iconos/Iconos";
import CvPanel from "./CvPanel";

export default function PieDePagina() {
  const [mostrarBotonArriba, setMostrarBotonArriba] = useState(false);
  const [cvAbierto, setCvAbierto] = useState(false);

  useEffect(() => {
    const manejarScroll = () => {
      setMostrarBotonArriba(window.scrollY > 500);
    };
    manejarScroll();
    window.addEventListener("scroll", manejarScroll, { passive: true });
    return () => window.removeEventListener("scroll", manejarScroll);
  }, []);

  const irAlTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const abrirCv = () => {
    irAlTop();
    setTimeout(() => setCvAbierto(true), 500);
  };

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative px-5 sm:px-10 lg:px-16 py-8 border-t border-borde"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 text-xs text-texto-suave font-mono uppercase tracking-[0.15em] text-center sm:text-left">
        <span>© 2026 — Todos los derechos reservados</span>
        <span>
          Diseñado <span className="text-acento">&amp;</span> Desarrollado por{" "}
          {/* Span con hover en naranja — el nombre se ilumina al pasar el mouse */}
          <button
            onClick={abrirCv}
            className="text-texto transition-colors duration-300 hover:text-acento cursor-pointer underline underline-offset-2 decoration-acento/0 hover:decoration-acento/50"
          >
            Federico Bordon
          </button>
        </span>
      </div>

      {/* Botón flotante scroll-to-top — aparece después de 500px */}
      <AnimatePresence>
        {mostrarBotonArriba && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            onClick={irAlTop}
            aria-label="Volver arriba"
            className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40 w-12 h-12 rounded-full bg-superficie border border-borde flex items-center justify-center text-texto-suave hover:border-acento hover:text-acento hover:bg-acento/10 transition-all duration-300 group"
          >
            {/* Flecha hacia arriba — sutil bounce en hover */}
            <IconoFlechaArriba
              tamano={16}
              className="transition-transform duration-300 group-hover:-translate-y-0.5"
            />
          </motion.button>
        )}
      </AnimatePresence>

      <CvPanel abierto={cvAbierto} onCerrar={() => setCvAbierto(false)} />
    </motion.footer>
  );
}
