import { NextResponse } from "next/server";
import { getAdsList } from "@/lib/ubiflow";

export async function GET(request: Request) {
  try {
    // Récupérer le paramètre "page" de l'URL (défaut: 1)
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);

    // Récupérer les annonces (le token est géré automatiquement avec cache)
    const annonces = await getAdsList(page);

    return NextResponse.json(annonces);
  } catch (error) {
    console.error("[API Annonces] Erreur:", error);
    return NextResponse.json(
      { error: "Échec de la récupération des annonces" },
      { status: 500 }
    );
  }
}
