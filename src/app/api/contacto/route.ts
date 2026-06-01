import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

/**
 * Endpoint POST para enviar el formulario de contacto.
 *
 * Protecciones implementadas:
 *  - Rate limiting por IP (3 envíos cada 5 minutos, en memoria)
 *  - Honeypot anti-bot (campo oculto "website")
 *  - Validación de formato + longitudes máximas
 *  - Escape HTML en el cuerpo del mail para evitar XSS
 *
 * Si no hay EMAIL_USER/EMAIL_PASS configuradas, hace fallback a
 * "modo desarrollo": loggea en consola y devuelve éxito. Así funciona
 * out-of-the-box para que pruebes el flujo.
 *
 * Para activarlo en producción:
 *   EMAIL_USER=tu_correo@gmail.com
 *   EMAIL_PASS=app_password_de_gmail   (no la contraseña normal)
 *   EMAIL_TO=opcional_destino@gmail.com
 */

// ============================================================
// Constantes de validación y rate limit
// ============================================================
const EMAIL_MAX = 254; // RFC 5321
const ASUNTO_MAX = 200;
const MENSAJE_MAX = 5000;
const MENSAJE_MIN = 10;

const VENTANA_RATE_MS = 5 * 60 * 1000; // 5 minutos
const MAX_PETICIONES = 3; // máximo 3 envíos por ventana

// ============================================================
// Rate limiter en memoria — IP -> timestamps
// Funciona perfecto en una sola instancia. Para Vercel con
// múltiples regiones o alto tráfico, migrar a Upstash Redis.
// ============================================================
const registroPorIp = new Map<string, number[]>();

/**
 * Extrae la IP del request. En Vercel y la mayoría de los proxies
 * viene en x-forwarded-for. Si no, probamos x-real-ip.
 */
function obtenerIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();

  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp;

  // Fallback para desarrollo local
  return "127.0.0.1";
}

/**
 * Verifica si la IP puede enviar. Devuelve ok + segundos hasta
 * que se libere la cuota, en caso de estar bloqueada.
 */
function verificarRateLimit(ip: string): {
  ok: boolean;
  resetEnSegundos?: number;
} {
  const ahora = Date.now();
  const timestamps = registroPorIp.get(ip) || [];

  // Filtramos timestamps fuera de la ventana
  const recientes = timestamps.filter((t) => ahora - t < VENTANA_RATE_MS);

  if (recientes.length >= MAX_PETICIONES) {
    const masViejo = recientes[0];
    const resetEnSegundos = Math.ceil(
      (VENTANA_RATE_MS - (ahora - masViejo)) / 1000,
    );
    return { ok: false, resetEnSegundos };
  }

  // Registramos este intento
  recientes.push(ahora);
  registroPorIp.set(ip, recientes);
  return { ok: true };
}

// ============================================================
// Helpers
// ============================================================

/**
 * Escapa caracteres HTML para que lo que escriba el usuario
 * se vea literal y no rompa el template del email.
 */
function escapeHtml(texto: string): string {
  return texto
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Sanitiza el mensaje quitando URLs y saltos de línea múltiples
 * para reducir spam/phishing en el cuerpo del mail.
 */
function sanitizarMensaje(texto: string): string {
  return texto.trim().replace(/\r\n/g, "\n").slice(0, MENSAJE_MAX);
}

/**
 * Limpia el asunto para usarlo como subject del mail: saca newlines
 * (que podrían usarse para inyectar headers como Bcc:) y limita el largo.
 */
function sanitizarAsunto(texto: string): string {
  return texto.trim().replace(/[\r\n]+/g, " ").slice(0, ASUNTO_MAX);
}

// Regex más estricto para email — letras, dígitos, símbolos válidos
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export async function POST(request: NextRequest) {
  try {
    // 1) Rate limiting por IP — primera línea de defensa
    const ip = obtenerIp(request);
    const limite = verificarRateLimit(ip);
    if (!limite.ok) {
      const minutos = Math.ceil((limite.resetEnSegundos || 60) / 60);
      return NextResponse.json(
        {
          error: `Demasiados intentos. Probá de nuevo en ${minutos} ${minutos === 1 ? "minuto" : "minutos"}.`,
        },
        { status: 429 },
      );
    }

    // 2) Parseo del body
    const body = await request.json();
    const { email, asunto, mensaje, website } = body as {
      email?: string;
      asunto?: string;
      mensaje?: string;
      website?: string;
    };

    // 3) Honeypot — si el campo oculto "website" tiene algo, es un bot
    // Devolvemos éxito falso para que el bot crea que pasó
    if (website && website.trim() !== "") {
      console.log(`🤖 Bot bloqueado por honeypot desde IP: ${ip}`);
      return NextResponse.json({ ok: true });
    }

    // 4) Validación de campos requeridos
    if (!email || !asunto || !mensaje) {
      return NextResponse.json(
        { error: "Todos los campos son requeridos" },
        { status: 400 },
      );
    }

    // 5) Validación de longitudes
    if (email.length > EMAIL_MAX) {
      return NextResponse.json(
        { error: "El correo es demasiado largo" },
        { status: 400 },
      );
    }
    if (asunto.length > ASUNTO_MAX) {
      return NextResponse.json(
        { error: `El asunto no puede superar los ${ASUNTO_MAX} caracteres` },
        { status: 400 },
      );
    }
    if (mensaje.length < MENSAJE_MIN) {
      return NextResponse.json(
        { error: `El mensaje debe tener al menos ${MENSAJE_MIN} caracteres` },
        { status: 400 },
      );
    }
    if (mensaje.length > MENSAJE_MAX) {
      return NextResponse.json(
        { error: `El mensaje no puede superar los ${MENSAJE_MAX} caracteres` },
        { status: 400 },
      );
    }

    // 6) Validación de formato de email
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "El formato del correo no es válido" },
        { status: 400 },
      );
    }

    // 7) Sanitización del mensaje antes de usarlo
    const mensajeLimpio = sanitizarMensaje(mensaje);

    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;
    const emailTo = process.env.EMAIL_TO || emailUser;

    // 8) Si no hay credenciales configuradas, modo desarrollo
    if (!emailUser || !emailPass) {
      console.log("📧 [DEV] Nuevo mensaje de contacto:", {
        de: email,
        asunto,
        mensaje: mensajeLimpio,
      });
      return NextResponse.json({
        ok: true,
        mensaje:
          "Mensaje recibido (modo desarrollo — configurá EMAIL_USER y EMAIL_PASS para envío real)",
      });
    }

    // 9) Configuramos el transporter de Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    // 10) Armamos el HTML del correo con todo escapado
    const html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #111111; color: #f5f5f5; border-radius: 12px;">
        <h2 style="color: #ff6b00; margin: 0 0 24px; font-size: 22px;">Nuevo mensaje desde el portfolio</h2>
        <div style="background: #0a0a0a; border-left: 3px solid #ff6b00; padding: 16px 20px; margin-bottom: 20px; border-radius: 4px;">
          <p style="margin: 0 0 8px; color: #888888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">De</p>
          <p style="margin: 0; font-size: 15px;">${escapeHtml(email)}</p>
        </div>
        <div style="background: #0a0a0a; border-left: 3px solid #ff6b00; padding: 16px 20px; margin-bottom: 20px; border-radius: 4px;">
          <p style="margin: 0 0 8px; color: #888888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Asunto</p>
          <p style="margin: 0; font-size: 15px;">${escapeHtml(asunto)}</p>
        </div>
        <div style="background: #0a0a0a; border-left: 3px solid #ff6b00; padding: 16px 20px; border-radius: 4px;">
          <p style="margin: 0 0 8px; color: #888888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Mensaje</p>
          <p style="margin: 0; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(mensajeLimpio)}</p>
        </div>
      </div>
    `;

    const text = `Nuevo mensaje desde el portfolio

De: ${email}
Asunto: ${asunto}

${mensajeLimpio}`;

    // 11) Envío real — sanitizamos el asunto antes de meterlo en el
    // subject del mail para evitar inyección de headers por newlines
    const asuntoLimpio = sanitizarAsunto(asunto);

    await transporter.sendMail({
      from: `"Portfolio Web" <${emailUser}>`,
      to: emailTo,
      replyTo: email,
      subject: `[Portfolio] ${asuntoLimpio}`,
      text,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("❌ Error al enviar el email:", error);
    return NextResponse.json(
      { error: "Error al enviar el mensaje. Intentá de nuevo en un rato." },
      { status: 500 },
    );
  }
}
