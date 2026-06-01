/**
 * Datos centralizados del portfolio.
 *
 * Si cambia el email, el GitHub, o el nombre, se actualiza una sola vez
 * acá en vez de andar buscando por todos los componentes.
 *
 * Las constantes de UI (colores, paleta) están en `app/globals.css`.
 * Lo que va acá son datos que podrían llegar a venir de un CMS o
 * de variables de entorno.
 */

export const DATOS_PERSONALES = {
  nombreCompleto: "Federico Bordon",
  email: "federicobordon.dev@gmail.com",
  github: "https://github.com/federicobordondev",
  ubicacion: "Mendoza, Argentina",
  rol: "Desarrollador Web",
} as const;
