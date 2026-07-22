import type { Metadata, Viewport } from "next";
import { Syne, Inter } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import EnvoltorioCarga from "@/componentes/EnvoltorioCarga";
import ProgresoScroll from "@/componentes/ProgresoScroll";
import ScrollAlInicio from "@/componentes/ScrollAlInicio";
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

const metadataBase = new URL(
  process.env.NEXT_PUBLIC_SITE_URL || "https://federicobordon.com.ar",
);

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: "Federico Bordon | Desarrollador Web en Mendoza",
    template: "%s | Federico Bordon",
  },
  description:
    "Portafolio de Federico Bordon, desarrollador web en Mendoza, Argentina. Especialista en Next.js, React y TypeScript. Construyo experiencias web modernas que ayudan a las marcas a crecer digitalmente.",
  keywords: [
    "desarrollador web",
    "portafolio",
    "diseño web",
    "react",
    "next.js",
    "typescript",
    "mendoza",
    "argentina",
    "desarrollador frontend",
    "programador web",
    "federico bordón",
    "creación de páginas web",
  ],
  authors: [{ name: "Federico Bordon", url: "https://federicobordon.com.ar" }],
  creator: "Federico Bordon",
  publisher: "Federico Bordon",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [{ url: "/logo.png", type: "image/png" }],
    apple: "/logo.png",
  },
  openGraph: {
    title: "Federico Bordon | Desarrollador Web",
    description:
      "Portafolio de Federico Bordon, desarrollador web en Mendoza. Especialista en Next.js, React y TypeScript.",
    type: "website",
    locale: "es_AR",
    siteName: "Federico Bordon",
    url: metadataBase.toString(),
    countryName: "Argentina",
  },
  twitter: {
    card: "summary_large_image",
    title: "Federico Bordon | Desarrollador Web",
    description:
      "Portafolio de Federico Bordon, desarrollador web en Mendoza. Especialista en Next.js, React y TypeScript.",
    creator: "@federicobordon",
  },
  alternates: {
    canonical: metadataBase.toString(),
  },
  category: "technology",
  verification: {
    google: "googlefd9640e9bce2a36b",
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
    sameAs: [DATOS_PERSONALES.github, DATOS_PERSONALES.linkedin],
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
        <Script id="google-tag-manager" strategy="beforeInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MNJ67BWX');`}
        </Script>
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MNJ67BWX" height="0" width="0" style={{ display: "none", visibility: "hidden" }}></iframe></noscript>
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
        {/* Preloader tipo boot sequence — se auto-remueve */}
        <EnvoltorioCarga>
          {/* Barra de progreso de scroll — refleja cuánto se recorrió la página */}
          <ProgresoScroll />
          {/* Cada recarga vuelve al Inicio en vez de restaurar el scroll */}
          <ScrollAlInicio />
          {/* MotionConfig hace que todas las animaciones de Framer Motion
              respeten prefers-reduced-motion del sistema operativo */}
          <ConfiguracionMovimiento>{children}</ConfiguracionMovimiento>
        </EnvoltorioCarga>
        {/* Vercel Analytics — page views automáticos, sin cookies,
            no impacta performance. Se activa solo en producción. */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
