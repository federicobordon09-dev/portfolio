# Federico Bordon — Portfolio

Portfolio personal de **Federico Bordon**, desarrollador web de Mendoza, Argentina.
Construido con Next.js 16, React 19, TypeScript, Tailwind v4 y Framer Motion.

Sitio en producción: [federicobordon.dev](https://federicobordon.dev)

---

## Stack

- **Next.js 16.2.6** (App Router, RSC, Server Actions, `next/og`)
- **React 19.2.4**
- **TypeScript** (strict)
- **Tailwind CSS v4** (vía `@theme inline` con CSS variables)
- **Framer Motion 12** (animaciones + `MotionConfig` para `prefers-reduced-motion`)
- **Nodemailer 8** (envío de mails del formulario vía Gmail SMTP)
- **next/font/google** (Syne display + Inter body)

## Estructura

```
src/
├── app/
│   ├── api/contacto/      # POST endpoint del formulario
│   ├── error.tsx          # Error boundary global
│   ├── layout.tsx         # Root layout (fonts, metadata, MotionConfig)
│   ├── loading.tsx        # Skeleton mientras compila Next.js
│   ├── opengraph-image.tsx # OG image dinámica (next/og)
│   ├── page.tsx           # Home (ensambla todas las secciones)
│   ├── robots.ts          # /robots.txt
│   ├── sitemap.ts         # /sitemap.xml
│   └── globals.css        # Variables CSS + utilidades globales
├── componentes/
│   ├── iconos/            # SVGs centralizados (Cerrar, Flecha, Check, etc.)
│   ├── BarraProgreso.tsx
│   ├── ConfiguracionMovimiento.tsx # MotionConfig client wrapper
│   ├── Contacto.tsx
│   ├── Enfoque.tsx
│   ├── FormularioContacto.tsx
│   ├── Inicio.tsx         # Hero con typewriter
│   ├── Navegacion.tsx
│   ├── PieDePagina.tsx
│   └── Trabajo.tsx
└── lib/
    └── datos.ts           # DATOS_PERSONALES (email, github, etc.)
public/
└── logo.png               # Logo del portfolio
```

## Setup local

### 1. Requisitos

- Node.js 20+ (recomendado LTS)
- npm, pnpm o yarn

### 2. Instalar dependencias

```bash
npm install
```

### 3. Variables de entorno

Copiá el archivo de ejemplo y completá los valores:

```bash
cp .env.example .env.local
```

Las variables necesarias son:

| Variable            | Descripción                                                         | Requerida |
| ------------------- | ------------------------------------------------------------------- | --------- |
| `EMAIL_USER`        | Dirección de Gmail que ENVÍA los mails                              | Sí        |
| `EMAIL_PASS`        | App Password de Google (16 caracteres)                              | Sí        |
| `EMAIL_TO`          | Dirección que RECIBE los mensajes del formulario                    | Sí        |
| `NEXT_PUBLIC_SITE_URL` | URL pública (usada en canonical, OG, robots, sitemap)             | No (default: `https://federicobordon.dev`) |

**Cómo sacar el App Password de Gmail:**

1. Activar verificación en 2 pasos en la cuenta de Google
2. Ir a [myaccount.google.com → Seguridad → Contraseñas de aplicación](https://myaccount.google.com/apppasswords)
3. Crear una nueva con nombre "Portfolio"
4. Copiar los 16 caracteres (sin espacios) a `EMAIL_PASS`

> ⚠️ No es tu contraseña normal de Gmail. Es una contraseña específica
> de aplicación que podés revocar en cualquier momento.

### 4. Correr en desarrollo

```bash
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000).

### 5. Build de producción

```bash
npm run build
npm start
```

## Decisiones técnicas

### Mobile-first responsive
- Tipografía con `clamp()` para escalado fluido
- Tap targets ≥ 44px en mobile
- Menú hamburguesa fullscreen con animaciones
- Formulario tipo "Genie" que sube desde abajo en mobile, modal centrado en desktop

### Accesibilidad
- `prefers-reduced-motion` respetado vía `MotionConfig` (Framer) + CSS
- Focus management + focus trap en el formulario modal
- Roles `dialog` + `aria-modal` en menús y formularios
- `aria-controls` + `aria-expanded` en el botón hamburguesa
- Escape cierra el form, click en backdrop cierra el form
- Labels asociados con `htmlFor` en todos los inputs
- Honeypot invisible + atributos anti-autofill (`autoComplete="off"`, `data-1p-ignore`, etc.) en el form

### Performance
- Logo con `next/image` (`priority`, sizes responsive)
- SVG inline (no requests HTTP extra para iconos)
- Dynamic OG image (`next/og` → PNG compilado en build)
- Fonts de Google servidas por Next (sin FOUT, con preload automático)

### SEO
- `robots.ts` + `sitemap.ts` automáticos
- `metadataBase` configurable vía env
- OpenGraph + Twitter cards completos
- `lang="es"` en el `<html>`
- OG image dinámica de 1200x630 con la paleta de marca

### Seguridad del formulario
- Honeypot field (los bots caen)
- Rate limit: 3 envíos cada 5 minutos por IP (en memoria — no persistente)
- Validación server-side: email regex, asunto ≤ 200 chars, mensaje 10-5000 chars
- Sanitización HTML en todos los inputs antes de meterlos en el mail
- Sanitización de newlines en el subject (anti header injection)
- HTML escape en la respuesta

## Deploy

### Vercel (recomendado)

1. Push del repo a GitHub
2. Importar en [vercel.com](https://vercel.com)
3. Configurar las variables de entorno en Settings → Environment Variables
4. Deploy automático en cada push a `main`

El proyecto está optimizado para Vercel: zero-config, ISR, OG image compilada en build.

### Otros (Netlify, Railway, etc.)

Build command: `npm run build`
Output dir: `.next`
Node version: 20+

## Tests

Pendiente de setup. El hook del typewriter tiene un reducer puro
(`reductorTypewriter` en `src/componentes/Inicio.tsx`) pensado
para ser testeado sin tocar React ni timers.

```bash
# (próximamente)
npm test
```

## Licencia

© 2026 Federico Bordon. Todos los derechos reservados.
El código fuente no es open source — es un portfolio personal.
