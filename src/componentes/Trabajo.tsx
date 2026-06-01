"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { IconoFlechaDiagonal, IconoReloj } from "./iconos/Iconos";

// Tipado para el shape de cada proyecto — prolijo para más adelante
// laburar con datos reales. `enlace` es null para proyectos que todavía
// no tienen URL pública, así no rendereamos un link roto.
interface Proyecto {
  id: number;
  nombre: string;
  categoria: string;
  anio: string;
  descripcion: string;
  tecnologias: string[];
  enlace: string | null;
}

// Proyectos reales de Federico Bordon
const proyectos: Proyecto[] = [
  {
    id: 1,
    nombre: "Copa Chapa Chapa",
    categoria: "Plataforma Simracing",
    anio: "2026",
    descripcion:
      "Una plataforma web completa para gestionar y potenciar una comunidad de simracing — con datos de carreras, clasificaciones, automatización y diseño de experiencia de usuario.",
    tecnologias: ["Next.js", "React", "TypeScript", "Tailwind"],
    enlace: "https://copachapachapa.vercel.app/",
  },
  {
    id: 2,
    nombre: "Región Web",
    categoria: "Negocios Locales",
    anio: "2026",
    descripcion:
      "Desarrollo web y soluciones de presencia digital para bodegas, restaurantes y negocios locales de Mendoza.",
    tecnologias: ["Next.js", "Tailwind", "SEO", "AI Tools"],
    enlace: null,
  },
  {
    id: 3,
    nombre: "Next Project",
    categoria: "Próximamente",
    anio: "2026",
    descripcion:
      "Siempre construyendo algo nuevo. El próximo proyecto ya está tomando forma — enfocado en rendimiento, diseño e impacto real.",
    tecnologias: ["TBD"],
    enlace: null,
  },
];

/**
 * Card individual de proyecto.
 * Maneja: tilt 3D en mousemove, transición de borde, flecha con rotate+scale,
 * shine en hover y stagger de los tags.
 */
function TarjetaProyecto({
  proyecto,
  indice,
}: {
  proyecto: Proyecto;
  indice: number;
}) {
  // Ref al contenedor de la card para calcular la posición relativa del mouse
  const refTarjeta = useRef<HTMLElement>(null);

  // Motion values para el tilt — más fluido que setState
  const rotacionX = useMotionValue(0);
  const rotacionY = useMotionValue(0);
  // Le metemos un poquito de spring para que el tilt se sienta "amortiguado"
  const rotacionXSuave = useSpring(rotacionX, { stiffness: 200, damping: 20 });
  const rotacionYSuave = useSpring(rotacionY, { stiffness: 200, damping: 20 });

  // Para el efecto de luz shine que se mueve con el mouse (lo calculamos aparte)
  const posicionBrilloX = useMotionValue(50);
  const posicionBrilloY = useMotionValue(50);

  // El background del spotlight lo derivamos de las dos motion values
  const fondoBrillo = useTransform(
    [posicionBrilloX, posicionBrilloY],
    ([x, y]) =>
      `radial-gradient(circle 200px at ${x}% ${y}%, rgba(255, 107, 0, 0.12), transparent 70%)`,
  );

  const manejarMovimientoMouse = (
    evento: React.MouseEvent<HTMLElement>,
  ) => {
    if (!refTarjeta.current) return;
    const rect = refTarjeta.current.getBoundingClientRect();
    // Posición del mouse relativa a la card (de 0 a 1)
    const x = (evento.clientX - rect.left) / rect.width;
    const y = (evento.clientY - rect.top) / rect.height;

    // Tilt máximo de ±5 grados — sutil pero perceptible
    rotacionX.set((y - 0.5) * -5);
    rotacionY.set((x - 0.5) * 5);

    // Posición del brillo en porcentaje
    posicionBrilloX.set(x * 100);
    posicionBrilloY.set(y * 100);
  };

  const resetearTilt = () => {
    rotacionX.set(0);
    rotacionY.set(0);
  };

  return (
    <motion.article
      ref={refTarjeta}
      // Animación de entrada: desde abajo con fade — se re-dispara al scrollear
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{
        duration: 0.6,
        delay: indice * 0.15,
        ease: "easeOut",
      }}
      onMouseMove={manejarMovimientoMouse}
      onMouseLeave={resetearTilt}
      style={{
        // Perspectiva + rotaciones controladas por spring
        perspective: 1000,
        transformStyle: "preserve-3d",
        rotateX: rotacionXSuave,
        rotateY: rotacionYSuave,
      }}
      className="group relative bg-superficie border border-borde rounded-sm p-5 sm:p-8 flex flex-col justify-between min-h-[320px] sm:min-h-[340px] hover:border-acento transition-colors duration-300 cursor-pointer"
    >
      {/* Capa de brillo que sigue al cursor — un spotlight sutil */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 rounded-sm pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: fondoBrillo }}
      />

      {/* Shine que recorre la card de top-left a bottom-right */}
      <div className="shine-recorrido" aria-hidden="true" />

      {/* Header: categoría + año */}
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.15em] text-texto-suave mb-8">
        <span>{proyecto.categoria}</span>
        <span className="font-mono">{proyecto.anio}</span>
      </div>

      {/* Cuerpo: nombre, descripción y tags */}
      <div className="flex-1 flex flex-col">
        <h3 className="font-display font-bold text-2xl sm:text-3xl text-texto mb-3 group-hover:text-acento transition-colors duration-300">
          {proyecto.nombre}
        </h3>
        <p className="text-texto-suave text-sm sm:text-base leading-relaxed mb-6">
          {proyecto.descripcion}
        </p>

        {/* Tags: en hover se deslizan 4px hacia arriba con stagger */}
        <motion.ul
          className="flex flex-wrap gap-2 mt-auto"
          // El contenedor dispara los hijos
          initial="oculto"
          animate="visible"
          variants={{
            oculto: { transition: { staggerChildren: 0 } },
            visible: { transition: { staggerChildren: 0, delayChildren: 0 } },
          }}
          whileHover="hover"
        >
          {proyecto.tecnologias.map((tecnologia) => (
            <motion.li
              key={tecnologia}
              variants={{
                oculto: { y: 0 },
                hover: {
                  y: -4,
                  transition: { duration: 0.3, ease: "easeOut" },
                },
              }}
              className="text-[11px] uppercase tracking-wider text-texto-suave border border-borde rounded-full px-2.5 py-1 font-mono hover:border-acento hover:text-acento transition-colors"
            >
              {tecnologia}
            </motion.li>
          ))}
        </motion.ul>
      </div>

      {/* Footer: Ver Proyecto + flecha con rotate+scale. Si el proyecto
          no tiene enlace todavía, rendereamos un placeholder disabled
          en vez de un link roto que abre nueva pestaña con "#". */}
      <div className="mt-6 pt-6 border-t border-borde flex items-center justify-between">
        <span className="text-xs uppercase tracking-[0.2em] text-texto-suave">
          {proyecto.enlace ? "Ver Proyecto" : "Próximamente"}
        </span>
        {proyecto.enlace ? (
          <motion.a
            href={proyecto.enlace}
            target="_blank"
            rel="noopener noreferrer"
            // Rotate 45deg + scale 1.1 al hacer hover en la flecha
            whileHover={{ rotate: 45, scale: 1.1 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            // En mobile el w-9 (36px) es muy chico para tap target, le sumamos padding
            className="w-11 h-11 sm:w-9 sm:h-9 rounded-full bg-acento flex items-center justify-center text-fondo"
            aria-label={`Ver proyecto ${proyecto.nombre}`}
          >
            <IconoFlechaDiagonal tamano={14} />
          </motion.a>
        ) : (
          <span
            aria-label={`${proyecto.nombre} próximamente`}
            className="w-11 h-11 sm:w-9 sm:h-9 rounded-full border border-borde flex items-center justify-center text-texto-suave cursor-not-allowed"
          >
            <IconoReloj tamano={14} />
          </span>
        )}
      </div>
    </motion.article>
  );
}

export default function Trabajo() {
  return (
    <section
      id="trabajo"
      className="relative px-5 sm:px-10 lg:px-16 py-20 sm:py-32"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header de sección — entra desde la izquierda */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex items-baseline gap-6 mb-12 sm:mb-16"
        >
          <span className="text-acento font-mono text-base sm:text-lg">01</span>
          <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-texto tracking-tight">
            Proyectos
          </h2>
        </motion.div>

        {/* Línea divisoria sutil */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="linea-divisoria origin-left mb-12 sm:mb-16"
        />

        {/* Grid de proyectos — 1 col mobile, 2 tablet, 3 desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {proyectos.map((proyecto, indice) => (
            <TarjetaProyecto
              key={proyecto.id}
              proyecto={proyecto}
              indice={indice}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
