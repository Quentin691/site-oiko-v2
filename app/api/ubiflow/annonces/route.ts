import { NextRequest, NextResponse } from "next/server";
import { getAdsList } from "@/lib/ubiflow";
import { checkRateLimit } from "@/lib/rate-limit";

export async function GET(request: NextRequest) {
  // Rate limiting
  const rateLimit = checkRateLimit(request, "api");
  if (!rateLimit.allowed) {
    const response = NextResponse.json(
      { error: "Trop de requêtes. Veuillez réessayer plus tard." },
      { status: 429 }
    );
    response.headers.set("Retry-After", Math.ceil(rateLimit.resetIn / 1000).toString());
    return response;
  }

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
