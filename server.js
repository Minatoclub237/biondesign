import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config({ path: ".env.local" });

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.API_PORT || 3001;
const DEST_EMAIL = "callcenter@j2dprestige.com";

app.use(express.json());

// En production : sert le build Vite
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "dist")));
}

app.post("/api/contact", async (req, res) => {
  const { name, email, phone, city, niche, nicheLabel, country, countryLabel, message } = req.body;

  if (!name || !email || !phone || !city) {
    return res.status(400).json({ error: "Champs obligatoires manquants." });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const html = `
    <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f5f5f5; padding: 0;">
      <div style="background: #121318; padding: 32px 40px 24px; border-radius: 16px 16px 0 0;">
        <p style="color: #9fff00; font-family: monospace; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; margin: 0 0 8px;">bi.on studio</p>
        <h1 style="color: #ffffff; font-size: 22px; font-weight: 900; margin: 0; letter-spacing: -0.5px;">Nouveau devis reçu</h1>
        <p style="color: #666; font-size: 12px; margin: 8px 0 0; font-family: monospace;">callcenter@j2dprestige.com</p>
      </div>

      <div style="background: #ffffff; padding: 32px 40px; border-radius: 0 0 16px 16px;">

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-size: 11px; color: #999; font-family: monospace; text-transform: uppercase; letter-spacing: 1px; width: 40%;">Enseigne</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-size: 13px; font-weight: 700; color: #1a1a1a;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-size: 11px; color: #999; font-family: monospace; text-transform: uppercase; letter-spacing: 1px;">Email</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-size: 13px; font-weight: 700; color: #1a1a1a;"><a href="mailto:${email}" style="color: #0070f3;">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-size: 11px; color: #999; font-family: monospace; text-transform: uppercase; letter-spacing: 1px;">Téléphone</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-size: 13px; font-weight: 700; color: #1a1a1a;"><a href="tel:${phone}" style="color: #0070f3;">${phone}</a></td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-size: 11px; color: #999; font-family: monospace; text-transform: uppercase; letter-spacing: 1px;">Ville</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-size: 13px; font-weight: 700; color: #1a1a1a;">${city}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-size: 11px; color: #999; font-family: monospace; text-transform: uppercase; letter-spacing: 1px;">Pays</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-size: 13px; font-weight: 700; color: #1a1a1a;">${countryLabel || country}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-size: 11px; color: #999; font-family: monospace; text-transform: uppercase; letter-spacing: 1px;">Secteur</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-size: 13px; font-weight: 700; color: #1a1a1a;">${nicheLabel || niche}</td>
          </tr>
          ${message ? `
          <tr>
            <td style="padding: 10px 0; font-size: 11px; color: #999; font-family: monospace; text-transform: uppercase; letter-spacing: 1px; vertical-align: top;">Message</td>
            <td style="padding: 10px 0; font-size: 13px; color: #444; line-height: 1.6;">${message}</td>
          </tr>` : ""}
        </table>

        <div style="background: #f9f9f9; border: 1px solid #eee; border-radius: 12px; padding: 16px 20px; margin-top: 8px;">
          <p style="margin: 0; font-size: 11px; color: #999; font-family: monospace; text-transform: uppercase; letter-spacing: 1px;">Action recommandée</p>
          <p style="margin: 6px 0 0; font-size: 13px; font-weight: 600; color: #1a1a1a;">Répondre sous 12h — Audit local + maquette gratuite à préparer pour <strong>${city}</strong></p>
        </div>

        <p style="margin: 24px 0 0; font-size: 10px; color: #bbb; font-family: monospace; text-align: center; text-transform: uppercase; letter-spacing: 1px;">
          bi.on studio — formulaire reçu le ${new Date().toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}
        </p>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"bi.on studio" <${process.env.SMTP_USER}>`,
      to: DEST_EMAIL,
      replyTo: email,
      subject: `[bi.on] Nouveau devis — ${name} · ${city} (${countryLabel || country})`,
      html,
    });
    res.json({ success: true });
  } catch (err) {
    console.error("Erreur envoi email:", err);
    res.status(500).json({ error: "Erreur lors de l'envoi. Réessayez ou contactez directement callcenter@j2dprestige.com" });
  }
});

// En production : catch-all → index.html (SPA routing)
if (process.env.NODE_ENV === "production") {
  app.get("*", (_req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`[bi.on API] Serveur démarré sur le port ${PORT}`);
});
