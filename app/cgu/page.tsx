import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions Générales d'Utilisation | OIKO",
  description: "Consultez les conditions générales d'utilisation du site OIKO Gestion.",
};

export default function CGU() {
    return(
        <main className="min-h-screen bg-background flex items-center justify-center px-4">
            <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">conditions générales d'utilisation</h1>
            <p className="text-muted">le contenue arrive bientot</p></div>
        </main>
    )
}