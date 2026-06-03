import type { Metadata, Viewport } from "next";
import { Syne, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import BarraProgreso from "@/componentes/BarraProgreso";
import ConfiguracionMovimiento from "@/componentes/ConfiguracionMovimiento";
import { DATOS_PERSONALES } from "@/lib/datos";

// Fuente display — la usamos para títulos y el nombre en el hero
const fuenteSyne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

// Fuente cuerpo — para párrafos, UI, y cualquier texto de lectura
const fuenteInter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

// metadataBase lo usa Next.js para resolver URLs absolutas del OG image
// y favicon. Cuando tengas dominio propio (federicobordon.dev, etc.) lo cambiás acá
const metadataBase = new URL(
  process.env.NEXT_PUBLIC_SITE_URL || "https://federicobordon.dev",
);

export const metadata: Metadata = {
  metadataBase,
  title: "Federico Bordon — Desarrollador Web",
  description:
    "Construyo experiencias web que ayudan a las marcas a crecer digitalmente. Disponible para proyectos freelance.",
  keywords: [
    "desarrollador web",
    "portafolio",
    "diseño web",
    "react",
    "next.js",
    "mendoza",
  ],
  authors: [{ name: "Federico Bordon" }],
  // Favicon e iconos
  icons: {
    icon: [{ url: "/logo.png", type: "image/png" }],
    apple: "/logo.png",
  },
  openGraph: {
    title: "Federico Bordon — Desarrollador Web",
    description:
      "Construyo experiencias web que ayudan a las marcas a crecer digitalmente.",
    type: "website",
    locale: "es_AR",
    siteName: "Federico Bordon",
  },
  twitter: {
    card: "summary_large_image",
    title: "Federico Bordon — Desarrollador Web",
    description:
      "Construyo experiencias web que ayudan a las marcas a crecer digitalmente.",
  },
  alternates: {
    canonical: metadataBase.toString(),
  },
};

// En Next.js 14+ el themeColor va en un export separado "viewport"
export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

/**
 * JSON-LD con el schema "Person" para que los buscadores entiendan
 * que este sitio es de una persona real. Da rich results en Google
 * (panel de conocimiento con foto, links a redes, etc).
 *
 * https://schema.org/Person
 * https://developers.google.com/search/docs/appearance/structured-data
 */
function datosEstructurados() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: DATOS_PERSONALES.nombreCompleto,
    jobTitle: DATOS_PERSONALES.rol,
    url: metadataBase.toString(),
    email: DATOS_PERSONALES.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: DATOS_PERSONALES.ubicacion,
      addressCountry: "AR",
    },
    sameAs: [DATOS_PERSONALES.github],
    image: "/logo.png",
    knowsAbout: [
      "Next.js",
      "React",
      "TypeScript",
      "Desarrollo Web",
      "Tailwind CSS",
      "Diseño Web",
    ],
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${fuenteSyne.variable} ${fuenteInter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-fondo text-texto">
        {/* JSON-LD — datos estructurados para Google. Le dice a los
            buscadores que este sitio es de una persona real y permite
            rich results (panel de conocimiento con foto, links, etc).
            No es visible para el usuario. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(datosEstructurados()),
          }}
        />
        {/* Barra de carga decorativa — se auto-remueve */}
        <BarraProgreso />
        {/* MotionConfig hace que todas las animaciones de Framer Motion
            respeten prefers-reduced-motion del sistema operativo */}
        <ConfiguracionMovimiento>{children}</ConfiguracionMovimiento>
        {/* Vercel Analytics — page views automáticos, sin cookies,
            no impacta performance. Se activa solo en producción. */}
        <Analytics />
      </body>
    </html>
  );
}
