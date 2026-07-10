import { ImageResponse } from "next/og";
import { DATOS_PERSONALES } from "@/lib/datos";

export const alt = "Federico Bordon";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// OpenGraph image dinámica — se sirve desde /opengraph-image automáticamente.
// Cuando alguien comparte el portfolio en LinkedIn, Twitter, WhatsApp, etc.
// aparece este card con la paleta de marca.
//
// NOTA sobre next/image: ImageResponse (next/og) NO soporta el componente
// Image de next/image. Si en algún momento se quiere agregar una foto o
// screenshot, hay que leerla con fs.readFile y pasarla al array "images"
// del ImageResponse como Buffer. Por ahora el card es 100% tipográfico.

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          backgroundColor: "#0a0a0a",
          color: "#f5f5f5",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <div
            style={{
              color: "#ff6b00",
              fontSize: "28px",
              fontWeight: 700,
              fontFamily: "monospace",
            }}
          >
            01
          </div>
          <div
            style={{
              display: "flex",
              height: "1px",
              width: "64px",
              backgroundColor: "#1f1f1f",
            }}
          />
          <div
            style={{
              color: "#888888",
              fontSize: "22px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              fontWeight: 500,
            }}
          >
            {DATOS_PERSONALES.rol}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: "140px",
              fontWeight: 800,
              lineHeight: 0.95,
              color: "#f5f5f5",
              letterSpacing: "-0.03em",
            }}
          >
            Federico
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "140px",
              fontWeight: 800,
              lineHeight: 0.95,
              color: "#ff6b00",
              letterSpacing: "-0.03em",
            }}
          >
            Bordon.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "#888888",
            fontSize: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: "#ff6b00",
              }}
            />
            <div
              style={{
                display: "flex",
              }}
            >
              Soy de {DATOS_PERSONALES.ubicacion}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              color: "#888888",
              fontSize: "18px",
              fontFamily: "monospace",
            }}
          >
            {DATOS_PERSONALES.email}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
