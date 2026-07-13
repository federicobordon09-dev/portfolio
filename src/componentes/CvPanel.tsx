"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Seccion = {
  titulo: string;
  contenido: string | string[];
};

const SECCIONES: Seccion[] = [
  {
    titulo: "Perfil Profesional",
    contenido:
      "Estudiante de Desarrollo de Software y desarrollador web enfocado en crear aplicaciones modernas, rápidas y optimizadas para pequeñas y medianas empresas. Mi objetivo es desarrollar soluciones reales que ayuden a los negocios a mejorar su presencia digital mediante landing pages, sitios web corporativos y aplicaciones web.",
  },
  {
    titulo: "Tecnologías",
    contenido: [
      "Frontend: HTML5, CSS3, JavaScript, TypeScript, React, Next.js, Tailwind CSS",
      "Backend: Node.js, API Routes de Next.js",
      "Bases de datos: Supabase, Neon PostgreSQL, MongoDB",
      "Control de versiones: Git, GitHub",
    ],
  },
  {
    titulo: "Proyectos Destacados",
    contenido: [
      "MediComprende — App que traduce informes médicos PDF a lenguaje claro usando IA",
      "Bodega Andeluna — Rediseño web con catálogo de vinos, experiencias y sistema de booking en 3 idiomas",
      "Copa Chapa Chapa — Plataforma de simracing con clasificaciones, splits e inscripciones",
      "Mirasoles — Landing page con carta digital, carrusel de fotos y WhatsApp integrado",
      "El Hornero Pizzería — Landing page dark + glassmorphism con reseñas y pedidos por WhatsApp",
    ],
  },
  {
    titulo: "Forma de Trabajo",
    contenido:
      "Priorizo el código limpio, componentes reutilizables, buen rendimiento, responsive design, SEO, accesibilidad y escalabilidad. Utilizo IA como parte de mi flujo de trabajo para acelerar el desarrollo, depurar errores y automatizar tareas repetitivas.",
  },
  {
    titulo: "Idiomas",
    contenido: ["Español: Nativo", "Inglés: Lectura técnica y comprensión de documentación"],
  },
];

function IconoChevron({ abierto }: { abierto: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`transition-transform duration-300 ${abierto ? "rotate-180" : ""}`}
      aria-hidden="true"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export default function CvPanel({ abierto, onCerrar }: { abierto: boolean; onCerrar: () => void }) {
  const [seccionesAbiertas, setSeccionesAbiertas] = useState<Set<number>>(() => new Set([0]));

  useEffect(() => {
    if (!abierto) return;
    const manejarEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCerrar();
    };
    document.addEventListener("keydown", manejarEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", manejarEscape);
      document.body.style.overflow = "";
    };
  }, [abierto, onCerrar]);

  useEffect(() => {
    if (abierto) setSeccionesAbiertas(new Set([0]));
  }, [abierto]);

  const toggleSeccion = (i: number) => {
    setSeccionesAbiertas((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  return (
    <AnimatePresence>
      {abierto && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-start justify-center pt-8 sm:pt-16 px-4 pb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCerrar}
          />

          <motion.div
            className="relative z-10 w-full max-w-xl max-h-[85vh] overflow-y-auto bg-[#0c0c0c] border border-borde/60 rounded-2xl shadow-2xl scrollbar-cv"
            initial={{ opacity: 0, y: -30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Header sticky */}
            <div className="sticky top-0 bg-[#0c0c0c] z-10 px-6 sm:px-8 pt-7 pb-4 border-b border-borde/40">
              <h2 className="text-lg sm:text-xl font-bold text-texto font-syne uppercase tracking-[0.12em]">
                Federico Bordon
              </h2>
              <p className="text-sm text-texto-suave font-mono mt-1">Desarrollador Web</p>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-xs font-mono text-texto-suave">
                <span>Mendoza, Argentina</span>
                <a
                  href="mailto:federicobordon.dev@gmail.com"
                  className="text-acento hover:text-acento-hover transition-colors"
                >
                  federicobordon.dev@gmail.com
                </a>
                <span>Disponible para proyectos freelance</span>
              </div>
            </div>

            {/* Secciones colapsables */}
            <div className="px-6 sm:px-8 pb-6 pt-2">
              {SECCIONES.map((seccion, i) => {
                const estaAbierta = seccionesAbiertas.has(i);
                return (
                  <div key={seccion.titulo} className="border-b border-borde/20 last:border-b-0">
                    <button
                      onClick={() => toggleSeccion(i)}
                      className="w-full flex items-center justify-between py-4 text-left text-[11px] font-mono uppercase tracking-[0.2em] text-acento/80 hover:text-acento transition-colors"
                    >
                      {seccion.titulo}
                      <IconoChevron abierto={estaAbierta} />
                    </button>

                    <AnimatePresence initial={false}>
                      {estaAbierta && (
                        <motion.div
                          key="contenido"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="pb-5">
                            {Array.isArray(seccion.contenido) ? (
                              <ul className="space-y-2">
                                {seccion.contenido.map((item) => (
                                  <li
                                    key={item}
                                    className="text-[13px] sm:text-sm text-texto/80 leading-relaxed pl-4 border-l-2 border-acento/20"
                                  >
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-[13px] sm:text-sm text-texto/80 leading-relaxed">
                                {seccion.contenido}
                              </p>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Footer sticky */}
            <div className="sticky bottom-0 bg-[#0c0c0c] px-6 sm:px-8 py-4 border-t border-borde/40 flex items-center justify-between text-xs font-mono text-texto-suave">
              <span>CV — 2026</span>
              <button
                onClick={onCerrar}
                className="text-acento hover:text-acento-hover transition-colors uppercase tracking-[0.12em] font-semibold"
              >
                Cerrar
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
