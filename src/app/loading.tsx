/**
 * Skeleton que se muestra mientras Next.js compila la página
 * (primera carga, ISR, etc). Es async server component: resuelve
 * el idioma por cookie para la etiqueta/texto. Diseño intacto.
 */
import { diccionarioServidor } from "@/lib/i18n/servidor";

export default async function Cargando() {
  const { diccionario } = await diccionarioServidor();
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={diccionario.cargando.etiqueta}
      className="min-h-screen flex items-center justify-center bg-fondo"
    >
      {/* Spinner con el color de marca */}
      <div className="flex flex-col items-center gap-6">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-2 border-borde" />
          <div className="absolute inset-0 rounded-full border-2 border-acento border-t-transparent animate-spin" />
        </div>
        <span className="text-xs uppercase tracking-[0.25em] text-texto-suave font-mono">
          {diccionario.cargando.texto}
        </span>
      </div>
    </div>
  );
}
