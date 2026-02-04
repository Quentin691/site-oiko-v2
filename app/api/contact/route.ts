import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { checkRateLimit } from "@/lib/rate-limit";

const resend = new Resend(process.env.RESEND_API_KEY);
const DEFAULT_EMAIL = "contact@oikogestion.fr";

export async function POST(request: NextRequest) {
  // Rate limiting pour éviter le spam
  const rateLimit = checkRateLimit(request, "contact");
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Trop de requêtes. Veuillez réessayer plus tard." },
      { status: 429 }
    );
  }

  try {
    const data = await request.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      message,
      propertyId,
      propertyTitle,
      propertyReference,
      recipientEmail,
    } = data;

    // Validation des champs requis
    if (!firstName?.trim() || !lastName?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Veuillez remplir tous les champs obligatoires." },
        { status: 400 }
      );
    }

    // Validation email basique
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Adresse email invalide." },
        { status: 400 }
      );
    }

    // Destinataire : email du bien ou email par défaut
    const to = recipientEmail && recipientEmail.trim() ? recipientEmail : DEFAULT_EMAIL;

    // Construire le contenu de l'email
    const propertyInfo = propertyId
      ? `
        <p><strong>Bien concerné :</strong> ${propertyTitle || "Non spécifié"}</p>
        <p><strong>Référence :</strong> ${propertyReference || propertyId}</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
      `
      : "";

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Nouvelle demande de contact</h2>
        ${propertyInfo}
        <p><strong>Nom :</strong> ${firstName} ${lastName}</p>
        <p><strong>Email :</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Téléphone :</strong> ${phone || "Non renseigné"}</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
        <p><strong>Message :</strong></p>
        <p style="white-space: pre-wrap; background: #f9f9f9; padding: 15px; border-radius: 5px;">${message}</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="color: #666; font-size: 12px;">
          Ce message a été envoyé depuis le formulaire de contact du site OIKO Gestion.
        </p>
      </div>
    `;

    // Sujet de l'email
    const subject = propertyTitle
      ? `Demande de contact - ${propertyTitle}`
      : "Nouvelle demande de contact - Site OIKO";

    // Envoi de l'email via Resend
    const { error } = await resend.emails.send({
      from: "OIKO Gestion <onboarding@resend.dev>",
      to: to,
      replyTo: email,
      subject: subject,
      html: htmlContent,
    });

    if (error) {
      console.error("[Contact API] Erreur Resend:", error);
      return NextResponse.json(
        { error: "Erreur lors de l'envoi du message." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Votre message a été envoyé avec succès !",
    });
  } catch (error) {
    console.error("[Contact API] Erreur:", error);
    return NextResponse.json(
      { error: "Erreur serveur. Veuillez réessayer plus tard." },
      { status: 500 }
    );
  }
}
