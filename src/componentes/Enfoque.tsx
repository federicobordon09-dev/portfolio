"use client";

import { motion, Variants } from "framer-motion";

// Principios profesionales de Federico Bordon — cortos, punzantes, sin biografía
const principios = [
  {
    numero: "I.",
    titulo: "Cada proyecto es una oportunidad de aprendizaje.",
    descripcion:
      "Estoy en una etapa de crecimiento y lo abrazo. Cada desarrollo me enseña algo nuevo — y el siguiente siempre es mejor que el anterior.",
  },
  {
    numero: "II.",
    titulo: "Entiendo el objetivo antes de escribir una línea de código.",
    descripcion:
      "Me importa lo que cada proyecto necesita lograr. Construyo soluciones que son útiles, rápidas y pensadas para escalar.",
  },
  {
    numero: "III.",
    titulo: "Herramientas modernas, impacto real.",
    descripcion:
      "Trabajo con Next.js, React e inteligencia artificial para entregar experiencias web rápidas, bien diseñadas y posicionadas para crecer.",
  },
];

// Variantes del contenedor — hace stagger de 0.2s entre hijos
const variantesContenedor: Variants = {
  oculto: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

// Variante de cada principio — entra desde la izquierda
const variantesPrincipio: Variants = {
  oculto: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

// Variante del dot — pulse una vez cuando entra
const variantesDot: Variants = {
  oculto: { scale: 1, opacity: 0.6 },
  visible: {
    scale: [1, 1.5, 1],
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

// Variante de la línea vertical — crece desde arriba
const variantesLinea: Variants = {
  oculto: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      delay: 0.2,
    },
  },
};

export default function Enfoque() {
  return (
    <section
      id="enfoque"
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
          <span className="text-acento font-mono text-base sm:text-lg">02</span>
          <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-texto tracking-tight">
            Cómo Trabajo
          </h2>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="linea-divisoria origin-left mb-16 sm:mb-20"
        />

        {/* Grid asimétrico: los principios a la derecha en desktop,
            dejando aire a la izquierda con el número de sección */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          <div className="lg:col-span-1 hidden lg:flex items-start pt-2">
            <span className="text-texto-suave text-xs font-mono uppercase tracking-[0.25em] [writing-mode:vertical-rl] rotate-180">
              Principios
            </span>
          </div>

          <motion.ul
            className="lg:col-span-11 space-y-10 sm:space-y-16"
            initial="oculto"
            whileInView="visible"
            viewport={{ once: false, amount: 0.15 }}
            variants={variantesContenedor}
          >
            {principios.map((principio) => (
              <motion.li
                key={principio.numero}
                variants={variantesPrincipio}
                className="group grid grid-cols-[auto_1fr] gap-6 sm:gap-8"
              >
                {/* Bullet naranja + línea vertical que crece */}
                <div className="flex flex-col items-center pt-3">
                  <motion.span
                    variants={variantesDot}
                    className="w-2.5 h-2.5 rounded-full bg-acento"
                  />
                  {/* Línea vertical con scaleY desde top */}
                  <motion.span
                    variants={variantesLinea}
                    style={{ transformOrigin: "top" }}
                    className="w-px flex-1 bg-borde mt-2 group-hover:bg-acento transition-colors duration-500"
                  />
                </div>

                {/* Contenido del principio */}
                <div>
                  <motion.span
                    variants={{
                      oculto: { opacity: 0, y: 10 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.4, delay: 0.2 },
                      },
                    }}
                    className="block text-acento font-mono text-sm mb-3"
                  >
                    {principio.numero}
                  </motion.span>
                  <h3 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-texto mb-3 sm:mb-4 tracking-tight">
                    {principio.titulo}
                  </h3>
                  <p className="text-texto-suave text-base sm:text-lg leading-relaxed max-w-2xl">
                    {principio.descripcion}
                  </p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
