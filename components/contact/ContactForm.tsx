"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import { Card, Button } from "@/components/ui";
import FormField from "./FormField";

interface ContactFormProps {
  subjects: string[];
}

export default function ContactForm({ subjects }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [captchaError, setCaptchaError] = useState(false);
  const [captcha, setCaptcha] = useState({ a: 0, b: 0 });
  const [attempts, setAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

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
        alert("Le numéro de téléphone contient des caractères non autorisés. Utilisez uniquement des chiffres, espaces, tirets, parenthèses ou +.");
        return;
      }

      // Compter le nombre de chiffres
      const digitCount = phone.replace(/\D/g, "").length;
      if (digitCount < 10) {
        alert("Le numéro de téléphone doit contenir au moins 10 chiffres.");
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

    // Simulation d'envoi (à remplacer par vraie API plus tard)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Réinitialiser après 3 secondes
    setTimeout(() => {
      setIsSubmitted(false);
      setAttempts(0); // Reset du compteur d'essais
      generateCaptcha(); // Nouveau captcha après envoi
      (e.target as HTMLFormElement).reset();
    }, 3000);
  };

  return (
    <Card>
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
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

        <FormField
          label="Objet"
          name="subject"
          type="select"
          options={subjects}
          required
        />

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
          J'accepte la <a href="/politique-rgpd" className="text-foreground underline">politique de confidentialité</a> et le traitement de mes données personnelles.
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

        {isSubmitted && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded" role="status" aria-live="polite">
            Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.
          </div>
        )}

        <Button type="submit" variant="primary" disabled={isBlocked}>
          {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
        </Button>
      </form>
    </Card>
  );
}