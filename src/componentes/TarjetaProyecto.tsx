"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { IconoFlechaDiagonal, IconoReloj } from "./iconos/Iconos";
import type { Proyecto } from "@/lib/datos";

/**
 * Card individual de proyecto.
 * Maneja: tilt 3D en mousemove, transición de borde, flecha con rotate+scale,
 * shine en hover y stagger de los tags.
 */
export default function TarjetaProyecto({
  proyecto,
  indice,
}: {
  proyecto: Proyecto;
  indice: number;
}) {
  const refTarjeta = useRef<HTMLElement>(null);

  const rotacionX = useMotionValue(0);
  const rotacionY = useMotionValue(0);
  const rotacionXSuave = useSpring(rotacionX, { stiffness: 200, damping: 20 });
  const rotacionYSuave = useSpring(rotacionY, { stiffness: 200, damping: 20 });

  const posicionBrilloX = useMotionValue(50);
  const posicionBrilloY = useMotionValue(50);

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
    const x = (evento.clientX - rect.left) / rect.width;
    const y = (evento.clientY - rect.top) / rect.height;

    rotacionX.set((y - 0.5) * -5);
    rotacionY.set((x - 0.5) * 5);

    posicionBrilloX.set(x * 100);
    posicionBrilloY.set(y * 100);
  };

  const resetearTilt = () => {
    rotacionX.set(0);
    rotacionY.set(0);
    posicionBrilloX.set(50);
    posicionBrilloY.set(50);
  };

  return (
    <motion.article
      ref={refTarjeta}
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
        perspective: 1000,
        transformStyle: "preserve-3d",
        rotateX: rotacionXSuave,
        rotateY: rotacionYSuave,
      }}
      className="group relative bg-superficie border border-borde rounded-sm p-5 sm:p-8 flex flex-col justify-between min-h-[320px] sm:min-h-[340px] hover:border-acento transition-colors duration-300 cursor-pointer"
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 rounded-sm pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: fondoBrillo }}
      />

      <div className="shine-recorrido" aria-hidden="true" />

      <div className="flex items-center justify-between text-xs uppercase tracking-[0.15em] text-texto-suave mb-8">
        <span>{proyecto.categoria}</span>
        <span className="font-mono">{proyecto.anio}</span>
      </div>

      <div className="flex-1 flex flex-col">
        <h3 className="font-display font-bold text-2xl sm:text-3xl text-texto mb-3 group-hover:text-acento transition-colors duration-300">
          {proyecto.nombre}
        </h3>
        <p className="text-texto-suave text-sm sm:text-base leading-relaxed mb-6">
          {proyecto.descripcion}
        </p>

        <motion.ul
          className="flex flex-wrap gap-2 mt-auto"
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

      <div className="mt-6 pt-6 border-t border-borde flex items-center justify-between">
        <span className="text-xs uppercase tracking-[0.2em] text-texto-suave">
          {proyecto.enlace ? "Ver Proyecto" : "Próximamente"}
        </span>
        {proyecto.enlace ? (
          <motion.a
            href={proyecto.enlace}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ rotate: 45, scale: 1.1 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
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
