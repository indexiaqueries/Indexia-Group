import cors from "cors";
import express from "express";
import { existsSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import nodemailer from "nodemailer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PORT = Number(process.env.PORT);
const DIST_DIR = path.resolve(__dirname, "../dist");

const mailTo = process.env.MAIL_TO;
const mailFrom = process.env.MAIL_FROM;

const smtpConfigured = Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);

const rejectUnauthorized = process.env.SMTP_TLS_REJECT_UNAUTHORIZED === "true";

let transporter = null;
if (smtpConfigured) {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === "true",
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    tls: { rejectUnauthorized },
  });
}

async function sendMail({ to = mailTo, subject, text, html }) {
  if (!transporter) {
    console.log(`\n[mail:dev] SMTP not configured — email NOT sent.\nTo: ${to}\nSubject: ${subject}\n${text}\n`);
    return { delivered: false, dev: true };
  }
  await transporter.sendMail({ from: mailFrom, to, subject, text, html });
  console.log(`[mail:sent] "${subject}" -> ${to}`);
  return { delivered: true };
}

const escapeHtml = (value) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function buildContactEmail({ name, phone, email, subject, message }) {

  const cleanSubject = (subject || "General enquiry").trim();
  const text = [
    `New website enquiry for ${cleanSubject}`,
    "",
    `Company: ${cleanSubject}`,
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Email: ${email}`,
    "",
    "Message:",
    message,
    "",
  ].join("\n");

  const row = (label, value) =>
    `<tr><td style="padding:6px 0;color:#6b7280;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.06em">${escapeHtml(label)}</td></tr>` +
    `<tr><td style="padding:0 0 14px;color:#111827;font-size:15px">${escapeHtml(value)}</td></tr>`;

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;background:#f8fafc;padding:24px">
      <div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:16px;overflow:hidden">
        <div style="background:#066a9c;color:#ffffff;padding:20px 24px;font-size:18px;font-weight:700">
          New Website Enquiry — ${escapeHtml(cleanSubject)}
        </div>
        <table style="width:100%;border-collapse:collapse;padding:0 24px">
          <tr><td style="padding:20px 24px 0">
            <table style="width:100%;border-collapse:collapse">
              ${row("Company", cleanSubject)}
              ${row("Name", name)}
              ${row("Phone", phone)}
              ${row("Email", email)}
              ${row("Message", message)}
            </table>
          </td></tr>
        </table>
        <div style="padding:4px 24px 24px;color:#9ca3af;font-size:12px">
          Sent from the Indexia Group website contact form.
        </div>
      </div>
    </div>`;

  return { subject: `New website enquiry for ${cleanSubject}`, text, html };
}

function buildAutoReplyEmail({ name, email, subject }) {
  const cleanSubject = (subject || "your enquiry").trim();
  return {
    subject: "We received your enquiry - Indexia Group",
    text: [
      `Hi ${name},`,
      "",
      `Thank you for reaching out to Indexia Group. We have received your enquiry for "${cleanSubject}"`,
      "and a member of our team will get back to you within 24 hours.",
      "",
      "While you wait, you can explore our businesses at https://indexiagroup.com or call us",
      "on +91 86551 68551 for anything urgent.",
      "",
      "Warm regards,",
      "The Indexia Group team",
      "",
    ].join("\n"),
    html: `
      <div style="font-family:Arial,Helvetica,sans-serif;background:#f8fafc;padding:24px">
        <div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:16px;overflow:hidden">
          <div style="background:#066a9c;color:#ffffff;padding:20px 24px;font-size:18px;font-weight:700">
            Thank you, ${escapeHtml(name)}
          </div>
          <div style="padding:20px 24px;color:#111827;font-size:15px;line-height:1.7">
            <p style="margin:0 0 12px">Thanks for reaching out to <strong>Indexia Group</strong>. We have received your enquiry
              for <em>&ldquo;${escapeHtml(cleanSubject)}&rdquo;</em> and a member of our team will get back to you within 24 hours.</p>
            <p style="margin:0 0 12px">For anything urgent, call us on <strong>+91 86551 68551</strong>.</p>
            <p style="margin:0">Warm regards,<br />The Indexia Group team</p>
          </div>
          <div style="padding:4px 24px 24px;color:#9ca3af;font-size:12px">
            This is an automated acknowledgement - please do not reply to this email.
          </div>
        </div>
      </div>`,
  };
}

const app = express();
app.use(cors());
app.use(express.json({ limit: "100kb" }));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, smtpConfigured, mailTo });
});

app.post("/api/contact", async (req, res) => {
  const { name, phone, email, subject, message } = req.body ?? {};
  const messageText = String(message ?? "").trim();

  if (!name || !phone || !email || !subject || !messageText) {
    return res.status(400).json({ ok: false, error: "Name, phone, email, subject and message are required." });
  }
  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ ok: false, error: "Please enter a valid email address." });
  }

  try {
    const result = await sendMail(buildContactEmail({ name, phone, email, subject, message: messageText }));

    try {
      await sendMail({ ...buildAutoReplyEmail({ name, email, subject }), to: email });
    } catch (replyErr) {
      console.error("Failed to send auto-reply:", replyErr);
    }

    res.json({ ok: true, dev: result.dev });
  } catch (err) {
    console.error("Failed to send contact email:", err);
    res.status(500).json({ ok: false, error: "Could not send your message. Please try again later." });
  }
});

const BROTLI_RE = /\bbr\b/;
const GZIP_RE = /\bgzip\b/;

const HASH_RE = /-[A-Za-z0-9_-]{8,}\.[a-z0-9]+$/;

function setCacheControl(res, filePath) {
  const base = path.basename(filePath);
  if (base === "index.html") {
    res.setHeader("Cache-Control", "no-cache, must-revalidate");
  } else if (HASH_RE.test(base)) {
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
  } else {
    res.setHeader("Cache-Control", "public, max-age=86400, stale-while-revalidate=604800");
  }
}

app.use((req, res, next) => {
  if (req.method !== "GET" || req.path.startsWith("/api")) return next();
  if (!existsSync(path.join(DIST_DIR, "index.html"))) return next();

  const target = path.join(DIST_DIR, decodeURIComponent(req.path.split("?")[0]));
  if (!target.startsWith(DIST_DIR) || !existsSync(target)) return next();
  try {
    if (!statSync(target).isFile()) return next();
  } catch {
    return next();
  }

  const acceptEncoding = String(req.headers["accept-encoding"] || "");
  const variant = BROTLI_RE.test(acceptEncoding) ? ".br" : GZIP_RE.test(acceptEncoding) ? ".gz" : null;
  if (!variant) return next();
  const variantPath = `${target}${variant}`;
  if (!existsSync(variantPath)) return next();

  res.set("Content-Encoding", variant === ".br" ? "br" : "gzip");
  res.set("Vary", "Accept-Encoding");
  res.type(path.extname(target));
  setCacheControl(res, target);
  return res.sendFile(variantPath);
});

app.use(
  express.static(DIST_DIR, {
    index: "index.html",
    setHeaders: setCacheControl,
  })
);

if (existsSync(path.join(DIST_DIR, "index.html"))) {
  app.use((req, res, next) => {
    if (req.method === "GET" && !req.path.startsWith("/api")) {
      return res.sendFile(path.join(DIST_DIR, "index.html"));
    }
    next();
  });
}

app.use("/api", (_req, res) => {
  res.status(404).json({ ok: false, error: "Not found." });
});

// When imported by Vercel (api/index.js), only the app is exported and the
// platform handles listening. When run directly (npm run server), listen here.
const isDirectRun =
  Boolean(process.argv[1]) && import.meta.url === pathToFileURL(process.argv[1]).href;

if (isDirectRun) {
  app.listen(PORT, () => {
    console.log(`Indexia backend listening on http://localhost:${PORT}`);
    console.log(smtpConfigured ? `Email delivery via SMTP → ${mailTo}` : "SMTP not configured — emails will be logged to the console (dev mode). Set SMTP_* env vars to enable delivery.");
  });
}

export default app;
