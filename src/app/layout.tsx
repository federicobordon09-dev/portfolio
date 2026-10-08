import type { Metadata, Viewport } from "next";
import { Syne, Inter } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import ProgresoScroll from "@/componentes/ProgresoScroll";
import ScrollAlInicio from "@/componentes/ScrollAlInicio";
import ConfiguracionMovimiento from "@/componentes/ConfiguracionMovimiento";
import { IdiomaProvider } from "@/lib/i18n/IdiomaContext";
import { diccionarioServidor } from "@/lib/i18n/servidor";
import type { Diccionario } from "@/lib/i18n/tipos";
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

export async function generateMetadata(): Promise<Metadata> {
  const { idioma, diccionario } = await diccionarioServidor();
  return construirMetadata(idioma, diccionario);
}

function construirMetadata(idioma: string, es: Diccionario): Metadata {
  return {
    metadataBase,
  title: {
    default: es.metadata.titulo,
    template: "%s | Federico Bordon",
  },
  description: es.metadata.descripcion,
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
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  },
  openGraph: {
    title: es.metadata.ogTitulo,
    description: es.metadata.ogDescripcion,
    type: "website",
    locale: idioma === "en" ? "en_US" : "es_AR",
    siteName: "Federico Bordon",
    url: metadataBase.toString(),
    countryName: "Argentina",
  },
  twitter: {
    card: "summary_large_image",
    title: es.metadata.twitterTitulo,
    description: es.metadata.twitterDescripcion,
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
} // construirMetadata

// En Next.js 14+ el themeColor va en un export separado "viewport"
export const viewport: Viewport = {
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
function datosEstructurados(es: Diccionario) {
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
    knowsAbout: es.metadata.conocimientos,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { idioma, diccionario } = await diccionarioServidor();
  return (
    <html
      lang={idioma}
      suppressHydrationWarning
      className={`${fuenteSyne.variable} ${fuenteInter.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function() {
  try {
    var tema = localStorage.getItem('tema-portfolio');
    if (tema === 'claro') {
      document.documentElement.classList.remove('dark');
    } else if (tema === 'oscuro') {
      document.documentElement.classList.add('dark');
    } else {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
      }
    }
  } catch(e) {}
})();
`,
          }}
        />
      </head>
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
            __html: JSON.stringify(datosEstructurados(diccionario)),
          }}
        />
        {/* Barra de progreso de scroll — refleja cuánto se recorrió la página */}
        <ProgresoScroll />
        {/* Cada recarga vuelve al Inicio en vez de restaurar el scroll */}
        <ScrollAlInicio />
        {/* MotionConfig hace que todas las animaciones de Framer Motion
            respeten prefers-reduced-motion del sistema operativo */}
        <IdiomaProvider><ConfiguracionMovimiento>{children}</ConfiguracionMovimiento></IdiomaProvider>
        {/* Vercel Analytics — page views automáticos, sin cookies,
            no impacta performance. Se activa solo en producción. */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
