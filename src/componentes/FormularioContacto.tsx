"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconoCerrar,
  IconoCheck,
  IconoEnviar,
  IconoSpinner,
} from "./iconos/Iconos";
import { EASE_BACK_OUT, EASE_GENIE, EASE_GENIE_SALIDA } from "@/lib/animaciones";

/**
 * Formulario de contacto inline que se abre con animación "Genie"
 * (como cuando abrís una ventana desde el Dock en macOS).
 *
 * Props:
 *  - abierto:  controla si el panel está visible
 *  - onCerrar: callback para cerrar el panel
 */
interface Props {
  abierto: boolean;
  onCerrar: () => void;
}

// Estado del formulario
interface EstadoForm {
  email: string;
  asunto: string;
  mensaje: string;
}

type EstadoEnvio = "idle" | "enviando" | "exito" | "error";

export default function FormularioContacto({ abierto, onCerrar }: Props) {
  const [form, setForm] = useState<EstadoForm>({
    email: "",
    asunto: "",
    mensaje: "",
  });
  const [estado, setEstado] = useState<EstadoEnvio>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  // Ref al campo honeypot — los bots lo llenan, los humanos no
  // ni lo ven. Si está lleno en el submit, fingimos éxito sin enviar
  const honeypotRef = useRef<HTMLInputElement>(null);

  // Ref al contenedor del panel — lo usamos para el focus trap
  const panelRef = useRef<HTMLDivElement>(null);

  // Ref al primer input — para mover el foco ahí cuando se abre el form
  const primerInputRef = useRef<HTMLInputElement>(null);

  // Ref al elemento que tenía foco antes de abrir el form — para
  // devolvérselo cuando se cierra (buena práctica de a11y)
  const focoAnteriorRef = useRef<HTMLElement | null>(null);

  // Cuando se abre el panel, reseteamos el estado y vaciamos los campos
  // así no queda nada escrito de la vez anterior. También guardamos
  // quién tenía foco para devolvérselo al cerrar.
  useEffect(() => {
    if (abierto) {
      // Guardamos el elemento con foco actual (generalmente el email
      // que disparó la apertura) para devolvérselo al cerrar
      focoAnteriorRef.current = document.activeElement as HTMLElement;

      setEstado("idle");
      setErrorMsg("");
      setForm({ email: "", asunto: "", mensaje: "" });

      // Movemos el foco al primer input después de que la animación
      // de entrada haya arrancado (un pequeño delay para que no
      // compita con la animación Genie)
      const timer = setTimeout(() => {
        primerInputRef.current?.focus();
      }, 100);

      return () => clearTimeout(timer);
    } else {
      // Al cerrar, devolvemos el foco al elemento que lo tenía antes
      focoAnteriorRef.current?.focus();
      focoAnteriorRef.current = null;
    }
  }, [abierto]);

  // Bloqueamos el scroll del body cuando el panel está abierto
  useEffect(() => {
    if (abierto) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [abierto]);

  // Cerrar con la tecla Escape
  useEffect(() => {
    const manejarTecla = (evento: KeyboardEvent) => {
      if (evento.key === "Escape" && abierto) onCerrar();
    };
    window.addEventListener("keydown", manejarTecla);
    return () => window.removeEventListener("keydown", manejarTecla);
  }, [abierto, onCerrar]);

  // Focus trap — cuando el form está abierto, el Tab tiene que ciclar
  // dentro del panel. Si el usuario está en el último elemento y
  // presiona Tab, vuelve al primero (y viceversa con Shift+Tab).
  useEffect(() => {
    if (!abierto) return;

    const manejarTab = (evento: KeyboardEvent) => {
      if (evento.key !== "Tab" || !panelRef.current) return;

      // Selector de todos los elementos focusables dentro del panel
      // (excluimos el honeypot que tiene tabIndex={-1})
      const selector =
        'button:not([disabled]), [href], input:not([tabindex="-1"]), select, textarea, [tabindex]:not([tabindex="-1"])';
      const focusables = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(selector),
      ).filter((el) => !el.hasAttribute("disabled"));

      if (focusables.length === 0) return;

      const primero = focusables[0];
      const ultimo = focusables[focusables.length - 1];
      const activo = document.activeElement as HTMLElement;

      if (evento.shiftKey) {
        // Shift+Tab en el primero → salta al último
        if (activo === primero || activo === panelRef.current) {
          evento.preventDefault();
          ultimo.focus();
        }
      } else {
        // Tab en el último → vuelve al primero
        if (activo === ultimo) {
          evento.preventDefault();
          primero.focus();
        }
      }
    };

    document.addEventListener("keydown", manejarTab);
    return () => document.removeEventListener("keydown", manejarTab);
  }, [abierto]);

  // Envío del formulario al API route
  const manejarSubmit = async (evento: React.FormEvent) => {
    evento.preventDefault();
    setEstado("enviando");
    setErrorMsg("");

    // Leemos el honeypot — si tiene algo, es un bot
    const honeypotValor = honeypotRef.current?.value || "";
    if (honeypotValor.trim() !== "") {
      // Fingimos éxito para que el bot crea que pasó
      setEstado("exito");
      return;
    }

    try {
      const respuesta = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          // Enviamos el honeypot también al server para doble chequeo
          website: honeypotValor,
        }),
      });

      if (!respuesta.ok) {
        const data = await respuesta.json();
        throw new Error(data.error || "Error al enviar el mensaje");
      }

      setEstado("exito");
    } catch (err) {
      setEstado("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Error desconocido",
      );
    }
  };

  return (
    <AnimatePresence>
      {abierto && (
        <>
          {/* Backdrop con blur — oscurece el fondo cuando el panel está abierto */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onCerrar}
            className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Panel con animación Genie — sale desde el "dock" inferior
              y crece hacia arriba, igualito al efecto de macOS */}
          <motion.div
            ref={panelRef}
            initial={{
              scaleY: 0,
              scaleX: 0.5,
              opacity: 0.6,
              filter: "blur(6px)",
            }}
            animate={{
              scaleY: 1,
              scaleX: 1,
              opacity: 1,
              filter: "blur(0px)",
            }}
            exit={{
              scaleY: 0,
              scaleX: 0.7,
              opacity: 0,
              filter: "blur(4px)",
              transition: {
                duration: 0.35,
                ease: EASE_GENIE_SALIDA,
              },
            }}
            transition={{
              duration: 0.55,
              ease: EASE_GENIE,
            }}
            style={{
              transformOrigin: "bottom center",
              willChange: "transform, opacity, filter",
            }}
            className="fixed inset-x-0 bottom-0 z-[70] max-h-[92vh] overflow-y-auto bg-superficie border-t-2 border-acento rounded-t-2xl shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="form-titulo"
          >
            <div className="max-w-2xl mx-auto px-5 sm:px-8 py-8 sm:py-12">
              {/* Header del panel */}
              <div className="flex items-start justify-between mb-8 sm:mb-10">
                <div>
                  <span className="block text-xs uppercase tracking-[0.2em] text-acento font-mono mb-2">
                    Nuevo mensaje
                  </span>
                  <h2
                    id="form-titulo"
                    className="font-display font-bold text-2xl sm:text-4xl text-texto tracking-tight"
                  >
                    Escribime
                  </h2>
                </div>
                <button
                  onClick={onCerrar}
                  className="w-10 h-10 -mr-2 flex items-center justify-center rounded-full text-texto-suave hover:text-acento hover:bg-acento/10 transition-colors"
                  aria-label="Cerrar formulario"
                >
                  <IconoCerrar tamano={22} />
                </button>
              </div>

              {/* Estado de éxito — reemplazamos el form con un check.
                  role="status" + aria-live para que screen readers
                  anuncien el cambio de estado al usuario. */}
              {estado === "exito" ? (
                <motion.div
                  role="status"
                  aria-live="polite"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="text-center py-8 sm:py-12"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      duration: 0.5,
                      ease: EASE_BACK_OUT,
                      delay: 0.1,
                    }}
                    className="w-20 h-20 mx-auto mb-6 rounded-full bg-acento/20 flex items-center justify-center"
                  >
                    <IconoCheck tamano={36} className="text-acento" />
                  </motion.div>
                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-texto mb-3">
                    ¡Mensaje enviado!
                  </h3>
                  <p className="text-texto-suave mb-8 max-w-md mx-auto">
                    Gracias por escribirme. Te respondo a la brevedad.
                  </p>
                  <button
                    onClick={onCerrar}
                    className="px-6 py-3 bg-acento text-fondo font-display font-semibold rounded-full hover:bg-acento-hover transition-colors"
                  >
                    Cerrar
                  </button>
                </motion.div>
              ) : (
                // Formulario
                <form
                  onSubmit={manejarSubmit}
                  className="space-y-5"
                  autoComplete="off"
                  // Atributos extra para que password managers y el
                  // autocompletado del navegador no se metan
                  data-1p-ignore="true"
                  data-lpignore="true"
                  data-form-type="other"
                >
                  {/* Campo honeypot — los bots lo llenan, los humanos no.
                      Si llega con contenido al submit, fingimos éxito y
                      no mandamos el mail. Doble check en server. */}
                  <input
                    ref={honeypotRef}
                    type="text"
                    name="website"
                    autoComplete="off"
                    tabIndex={-1}
                    className="absolute opacity-0 pointer-events-none -left-[9999px] h-0 w-0"
                    aria-hidden="true"
                  />

                  {/* Tu correo */}
                  <div>
                    <label
                      htmlFor="contacto-email"
                      className="block text-xs uppercase tracking-[0.15em] text-texto-suave mb-2 font-mono"
                    >
                      Tu correo
                    </label>
                    <input
                      type="email"
                      id="contacto-email"
                      ref={primerInputRef}
                      name="campo-correo-portfolio"
                      autoComplete="email"
                      spellCheck={false}
                      required
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      className="w-full bg-fondo border border-borde rounded-lg px-4 py-3 text-texto placeholder-texto-suave/50 focus:outline-none focus:border-acento transition-colors"
                      placeholder="tu@correo.com"
                    />
                  </div>

                  {/* Asunto */}
                  <div>
                    <label
                      htmlFor="contacto-asunto"
                      className="block text-xs uppercase tracking-[0.15em] text-texto-suave mb-2 font-mono"
                    >
                      Asunto
                    </label>
                    <input
                      type="text"
                      id="contacto-asunto"
                      name="campo-asunto-portfolio"
                      autoComplete="off"
                      spellCheck={false}
                      required
                      value={form.asunto}
                      onChange={(e) =>
                        setForm({ ...form, asunto: e.target.value })
                      }
                      className="w-full bg-fondo border border-borde rounded-lg px-4 py-3 text-texto placeholder-texto-suave/50 focus:outline-none focus:border-acento transition-colors"
                      placeholder="¿De qué se trata?"
                    />
                  </div>

                  {/* Mensaje */}
                  <div>
                    <label
                      htmlFor="contacto-mensaje"
                      className="block text-xs uppercase tracking-[0.15em] text-texto-suave mb-2 font-mono"
                    >
                      Mensaje
                    </label>
                    <textarea
                      id="contacto-mensaje"
                      name="campo-mensaje-portfolio"
                      autoComplete="off"
                      spellCheck={false}
                      required
                      rows={5}
                      value={form.mensaje}
                      onChange={(e) =>
                        setForm({ ...form, mensaje: e.target.value })
                      }
                      className="w-full bg-fondo border border-borde rounded-lg px-4 py-3 text-texto placeholder-texto-suave/50 focus:outline-none focus:border-acento transition-colors resize-none"
                      placeholder="Contame en qué te puedo ayudar..."
                    />
                  </div>

                  {/* Error — aria-live="assertive" porque es algo
                      que el user necesita enterarse sí o sí para actuar */}
                  {estado === "error" && (
                    <motion.p
                      role="alert"
                      aria-live="assertive"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-sm"
                    >
                      {errorMsg}
                    </motion.p>
                  )}

                  {/* Botón de enviar */}
                  <motion.button
                    type="submit"
                    disabled={estado === "enviando"}
                    aria-busy={estado === "enviando"}
                    whileHover={{ scale: estado === "enviando" ? 1 : 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-acento text-fondo font-display font-semibold py-3.5 rounded-lg hover:bg-acento-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {estado === "enviando" ? (
                      <>
                        <IconoSpinner tamano={18} className="animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        Enviar mensaje
                        <IconoEnviar tamano={18} />
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
