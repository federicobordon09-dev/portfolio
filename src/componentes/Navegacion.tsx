"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { IconoCerrar, IconoMenu } from "./iconos/Iconos";
import { EASE_OUT_EXPO, VIEWPORT_PRESET } from "@/lib/animaciones";

// Definimos los enlaces de navegación en un solo lugar
// así es fácil agregar o reordenar secciones más adelante
const enlacesNavegacion = [
  { id: "inicio", etiqueta: "Inicio" },
  { id: "trabajo", etiqueta: "Proyectos" },
  { id: "enfoque", etiqueta: "Enfoque" },
  { id: "contacto", etiqueta: "Contacto" },
];

export default function Navegacion() {
  // Controlamos si la página ya se scrolleó para activar el blur de fondo
  const [estaScrolleada, setEstaScrolleada] = useState(false);
  // Estado del menú mobile
  const [menuAbierto, setMenuAbierto] = useState(false);
  // Qué sección está actualmente visible — para resaltar el link en el navbar
  const [seccionActiva, setSeccionActiva] = useState("inicio");

  // Refs para focus management del menú mobile — al abrir movemos
  // el foco al primer link; al cerrar lo devolvemos al botón hamburguesa
  const refBotonHamburguesa = useRef<HTMLButtonElement>(null);
  const refPrimerLinkMenu = useRef<HTMLButtonElement>(null);

  // Guard SSR para el portal: en el server `document` no existe,
  // así que solo renderizamos el portal cuando estamos en el cliente.
  // Sin esto, `createPortal(..., document.body)` tira error en build.
  const [montado, setMontado] = useState(false);
  useEffect(() => {
    setMontado(true);
  }, []);

  useEffect(() => {
    // Handler de scroll: si bajamos más de 80px, activamos el blur prolijo
    const manejarScroll = () => {
      setEstaScrolleada(window.scrollY > 80);
    };

    // Chequeamos el estado inicial por si la página carga scrolleada
    manejarScroll();
    window.addEventListener("scroll", manejarScroll, { passive: true });
    return () => window.removeEventListener("scroll", manejarScroll);
  }, []);

  // IntersectionObserver para detectar qué sección está en el viewport
  // y resaltar el link correspondiente en el navbar
  useEffect(() => {
    const secciones = enlacesNavegacion
      .map((enlace) => document.getElementById(enlace.id))
      .filter((seccion): seccion is HTMLElement => seccion !== null);

    if (secciones.length === 0) return;

    const observer = new IntersectionObserver(
      (entradas) => {
        const entradasVisibles = entradas.filter((e) => e.isIntersecting);
        if (entradasVisibles.length > 0) {
          const masVisible = entradasVisibles.reduce((prev, curr) =>
            curr.intersectionRatio > prev.intersectionRatio ? curr : prev,
          );
          setSeccionActiva(masVisible.target.id);
        }
      },
      {
        threshold: [0.3, 0.5, 0.7],
        rootMargin: "-20% 0px -40% 0px",
      },
    );

    secciones.forEach((seccion) => observer.observe(seccion));
    return () => observer.disconnect();
  }, []);

  // Bloqueamos el scroll del body cuando el menú mobile está abierto
  useEffect(() => {
    if (menuAbierto) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuAbierto]);

  // Focus management del menú mobile: al abrir, movemos el foco al
  // primer link; al cerrar, lo devolvemos al botón hamburguesa.
  useEffect(() => {
    if (menuAbierto) {
      // Pequeño delay para que la animación de entrada arranque
      // antes de que el foco se mueva (evita saltos visuales)
      const timer = setTimeout(() => {
        refPrimerLinkMenu.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    } else {
      // Al cerrar, devolvemos el foco al botón que abrió el menú
      // (solo si el foco actual está dentro del menú, para no
      // pisar el foco si el usuario ya navegó a otro lado)
      const focoActual = document.activeElement;
      if (
        focoActual instanceof HTMLElement &&
        focoActual.closest("#menu-mobile")
      ) {
        refBotonHamburguesa.current?.focus();
      }
    }
  }, [menuAbierto]);

  // Escape cierra el menú mobile (así como ya cierra el form)
  useEffect(() => {
    const manejarTecla = (evento: KeyboardEvent) => {
      if (evento.key === "Escape" && menuAbierto) setMenuAbierto(false);
    };
    window.addEventListener("keydown", manejarTecla);
    return () => window.removeEventListener("keydown", manejarTecla);
  }, [menuAbierto]);

  // Si el usuario cambia de tamaño (rotación de tablet, resize de ventana,
  // abrir devtools) y cruzamos el breakpoint de desktop, cerramos el menú
  // para que no quede "pegado" en modo mobile dentro de un layout desktop
  useEffect(() => {
    const manejarResize = () => {
      if (window.innerWidth >= 1024 && menuAbierto) {
        setMenuAbierto(false);
      }
    };
    window.addEventListener("resize", manejarResize);
    return () => window.removeEventListener("resize", manejarResize);
  }, [menuAbierto]);

  // Helper para hacer scroll suave a una sección
  const manejarClickAncla = (
    evento: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    idSeccion: string,
  ) => {
    evento.preventDefault();
    const seccion = document.getElementById(idSeccion);
    if (seccion) {
      seccion.scrollIntoView({ behavior: "smooth", block: "start" });
      // Cerramos el menú mobile apenas se hace click
      setMenuAbierto(false);
    }
  };

  // Contenido del menú mobile — lo renderizamos vía portal a `document.body`
  // para escapar del `motion.header` (que tiene `transform` y crea un
  // containing block que rompe el `position: fixed` del overlay).
  // Así, sin importar el contexto DOM, el menú siempre llena el viewport.
  const contenidoMenuMovil = (
    <AnimatePresence>
      {menuAbierto && (
        <motion.div
          id="menu-mobile"
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          // `nav-movil`: visible en cualquier pantalla táctil.
          // `min-h-dvh` + fallback: iOS Safari bug con la barra de URL.
          // `h-[100dvh]` para llenar la altura visual exacta del device.
          // z-40 < header z-50: el header (logo + X) queda arriba.
          className="lg:hidden nav-movil fixed inset-0 z-40 bg-fondo flex flex-col items-center justify-center min-h-[100vh] min-h-dvh h-[100dvh]"
        >
          <ul className="flex flex-col items-center gap-7 sm:gap-8">
            {enlacesNavegacion.map((enlace, indice) => {
              const esActivo = seccionActiva === enlace.id;
              return (
                <motion.li
                  key={enlace.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.1 + indice * 0.08,
                    ease: "easeOut",
                  }}
                >
                  <button
                    ref={indice === 0 ? refPrimerLinkMenu : undefined}
                    onClick={(e) => manejarClickAncla(e, enlace.id)}
                    className={`flex items-baseline gap-3 text-3xl sm:text-4xl font-display font-medium transition-colors px-4 py-2 ${
                      esActivo
                        ? "text-acento"
                        : "text-texto hover:text-acento"
                    }`}
                  >
                    <span className="text-acento text-sm font-mono">
                      0{indice}
                    </span>
                    {enlace.etiqueta}
                  </button>
                </motion.li>
              );
            })}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          estaScrolleada
            ? "bg-fondo/70 backdrop-blur-md border-b borde-acento-suave"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        {/* z-50 del header: cuando el overlay mobile (z-40 en el portal)
            está abierto, el header queda ARRIBA del overlay, así el
            botón X sigue siendo tappable por encima del fondo negro. */}
        <nav className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-16 h-16 sm:h-20 flex items-center justify-between">
          {/* Logo — contenedor flexible a altura completa del nav para
              centrar la imagen verticalmente. La imagen es 1536x1024 (1.5:1)
              y la dimensionamos al 62.5% del nav en mobile (40/64) y al
              60% en desktop (48/80), siempre dentro del rango 60-70%.
              `priority` porque está above the fold y no debe lazy-loadear. */}
          <a
            href="#inicio"
            onClick={(e) => manejarClickAncla(e, "inicio")}
            className="relative z-50 flex items-center h-full overflow-visible transition-opacity duration-300 hover:opacity-80"
            aria-label="Volver al inicio"
          >
            <Image
              src="/logo.png"
              alt="Federico Bordon"
              width={1536}
              height={1024}
              priority
              draggable={false}
              sizes="(min-width: 640px) 72px, 60px"
              quality={90}
              className="h-10 sm:h-12 w-auto max-h-full object-contain select-none flex-shrink-0"
            />
          </a>

          {/* Links desktop — alineados a la derecha (ocultos en mobile).
              La clase `nav-desktop` la pisa el @media de touch en
              globals.css: en cualquier pantalla táctil (sin importar
              el ancho) se oculta y se muestra el hamburguesa. */}
          <ul className="hidden lg:flex nav-desktop items-center gap-8 xl:gap-10">
            {enlacesNavegacion.map((enlace, indice) => {
              const esActivo = seccionActiva === enlace.id;
              return (
                <li key={enlace.id}>
                  <a
                    href={`#${enlace.id}`}
                    onClick={(e) => manejarClickAncla(e, enlace.id)}
                    className={`group relative text-sm font-medium transition-colors duration-300 ${
                      esActivo
                        ? "text-texto texto-halo-acento"
                        : "text-texto-suave hover:text-texto"
                    }`}
                  >
                    <span className="text-acento mr-1.5 text-xs font-mono">
                      0{indice}
                    </span>
                    {enlace.etiqueta}
                    <span
                      className={`absolute -bottom-1 left-0 right-0 h-px bg-acento origin-left transition-transform duration-300 ${
                        esActivo
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Botón hamburguesa — `nav-movil` lo hace visible en
              cualquier pantalla táctil, sin importar el ancho. */}
          <button
            ref={refBotonHamburguesa}
            onClick={() => setMenuAbierto(!menuAbierto)}
            className="lg:hidden nav-movil p-3 -mr-2 z-50 text-acento"
            aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuAbierto}
            aria-controls="menu-mobile"
          >
            {menuAbierto ? (
              // X para cerrar
              <IconoCerrar tamano={24} />
            ) : (
              // Icono hamburguesa ☰
              <IconoMenu tamano={24} />
            )}
          </button>
        </nav>
      </motion.header>

      {/* Overlay mobile — vive en document.body vía portal.
          Esto GARANTIZA que el `position: fixed` del overlay mida contra
          el viewport (no contra un ancestor con transform). */}
      {montado && createPortal(contenidoMenuMovil, document.body)}
    </>
  );
}
