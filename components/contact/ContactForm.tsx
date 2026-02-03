"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import { Card, Button } from "@/components/ui";
import FormField from "./FormField";

interface ContactFormProps {
  subjects?: string[];
  // Props optionnels pour le contact d'un bien
  propertyId?: string;
  propertyTitle?: string;
  propertyReference?: string;
  contactEmail?: string;
}

export default function ContactForm({
  subjects,
  propertyId,
  propertyTitle,
  propertyReference,
  contactEmail,
}: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [captchaError, setCaptchaError] = useState(false);
  const [captcha, setCaptcha] = useState({ a: 0, b: 0 });
  const [attempts, setAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // Déterminer si c'est un formulaire pour un bien
  const isPropertyContact = !!propertyId;

  // Générer un nouveau captcha et vider le champ
  const generateCaptcha = () => {
    setCaptcha({
      a: Math.floor(Math.random() * 9) + 1,
      b: Math.floor(Math.random() * 9) + 1,
    });
    // Vider le champ captcha pour éviter le spam
    const captchaInput = formRef.current?.querySelector('input[name="captcha"]') as HTMLInputElement;
    if (captchaInput) {
      captchaInput.value = "";
    }
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCaptchaError(false);
    setSubmitError(null);

    // Bloquer si trop de tentatives
    if (isBlocked) {
      return;
    }

    // Récupérer les données du formulaire
    const formData = new FormData(e.currentTarget);
    const phone = formData.get("phone") as string;

    // Valider le numéro de téléphone si fourni
    if (phone && phone.trim() !== "") {
      // Vérifier que le numéro contient uniquement des caractères autorisés
      const validCharsRegex = /^[0-9\s\-\(\)\+]+$/;
      if (!validCharsRegex.test(phone)) {
        setSubmitError("Le numéro de téléphone contient des caractères non autorisés.");
        return;
      }

      // Compter le nombre de chiffres
      const digitCount = phone.replace(/\D/g, "").length;
      if (digitCount < 10) {
        setSubmitError("Le numéro de téléphone doit contenir au moins 10 chiffres.");
        return;
      }
    }

    // Vérifier le captcha
    const captchaAnswer = formData.get("captcha");
    if (parseInt(captchaAnswer as string) !== captcha.a + captcha.b) {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      setCaptchaError(true);

      // Bloquer après 3 tentatives
      if (newAttempts >= 3) {
        setIsBlocked(true);
      } else {
        generateCaptcha(); // Nouveau captcha après erreur
      }
      return;
    }

    setIsSubmitting(true);

    try {
      // Préparer les données pour l'API
      const requestData = {
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        email: formData.get("email"),
        phone: formData.get("phone") || "",
        message: formData.get("message"),
        subject: formData.get("subject") || "",
        // Données du bien (si présentes)
        propertyId,
        propertyTitle,
        propertyReference,
        recipientEmail: contactEmail,
      };

      // Appel à l'API
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Erreur lors de l'envoi");
      }

      setIsSubmitted(true);

      // Réinitialiser après 5 secondes
      setTimeout(() => {
        setIsSubmitted(false);
        setAttempts(0);
        generateCaptcha();
        formRef.current?.reset();
      }, 5000);
    } catch (error) {
      console.error("Erreur envoi formulaire:", error);
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Une erreur est survenue. Veuillez réessayer."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
        {/* Afficher les infos du bien si c'est un contact pour un bien */}
        {isPropertyContact && (
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
            <p className="text-sm text-muted mb-1">Vous contactez pour le bien :</p>
            <p className="font-semibold text-foreground">{propertyTitle}</p>
            {propertyReference && (
              <p className="text-sm text-muted">Réf : {propertyReference}</p>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="Prénom"
            name="firstName"
            type="text"
            placeholder="Votre prénom"
            required
          />
          <FormField
            label="Nom"
            name="lastName"
            type="text"
            placeholder="Votre nom"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="Email"
            name="email"
            type="email"
            placeholder="votre.email@exemple.com"
            required
          />
          <FormField
            label="Téléphone"
            name="phone"
            type="tel"
            placeholder="06 12 34 56 78"
          />
        </div>

        {/* Afficher le champ Objet seulement si ce n'est pas pour un bien */}
        {!isPropertyContact && subjects && subjects.length > 0 && (
          <FormField
            label="Objet"
            name="subject"
            type="select"
            options={subjects}
            required
          />
        )}

        <FormField
          label="Message"
          name="message"
          type="textarea"
          placeholder="Votre message..."
          rows={6}
          required
        />

        <FormField
          label="J'accepte d'être contacté par téléphone"
          name="callback"
          type="checkbox"
        />

        <FormField
          label=""
          name="rgpd"
          type="checkbox"
          required
        >
          J&apos;accepte la <a href="/politique-rgpd" className="text-foreground underline">politique de confidentialité</a> et le traitement de mes données personnelles.
        </FormField>

        {/* Captcha simple */}
        <div className="bg-background border rounded p-4">
          <FormField
            label={`Vérification : Combien font ${captcha.a} + ${captcha.b} ?`}
            name="captcha"
            type="text"
            placeholder="Votre réponse"
            required
            disabled={isBlocked}
          />
          {captchaError && !isBlocked && (
            <p className="text-red-600 text-sm mt-2" role="alert" aria-live="polite">
              Réponse incorrecte ({attempts}/3 tentatives). Veuillez réessayer.
            </p>
          )}
          {isBlocked && (
            <p className="text-red-600 text-sm mt-2 font-semibold" role="alert" aria-live="assertive">
              Trop de tentatives échouées. Veuillez recharger la page pour réessayer.
            </p>
          )}
        </div>

        {/* Message d'erreur */}
        {submitError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded" role="alert">
            {submitError}
          </div>
        )}

        {/* Message de succès */}
        {isSubmitted && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded" role="status" aria-live="polite">
            Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.
          </div>
        )}

        <Button type="submit" variant="primary" disabled={isBlocked || isSubmitting}>
          {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
        </Button>
      </form>
    </Card>
  );
}
