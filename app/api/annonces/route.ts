import { NextRequest, NextResponse } from "next/server";
import { getAdsPage, getAllAds } from "@/lib/ubiflow";
import { mapApiToProperties } from "@/lib/mapProperty";
import { checkRateLimit } from "@/lib/rate-limit";

export async function GET(request: NextRequest) {
  // Rate limiting pour protéger l'API
  const rateLimit = checkRateLimit(request, "api");
  if (!rateLimit.allowed) {
    const response = NextResponse.json(
      { error: "Trop de requêtes. Veuillez réessayer plus tard." },
      { status: 429 }
    );
    response.headers.set("Retry-After", Math.ceil(rateLimit.resetIn / 1000).toString());
    return response;
  }

  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get("type") as "L" | "V" || "L";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const all = searchParams.get("all") === "true";

  try {
    if (all) {
      // Charger toutes les annonces
      const rawProperties = await getAllAds(type);
      const properties = mapApiToProperties(rawProperties);
      return NextResponse.json({
        data: properties,
        total: properties.length,
        complete: true
      });
    } else {
      // Charger une seule page
      const { data, total } = await getAdsPage(page, type);
      const properties = mapApiToProperties(data);
      return NextResponse.json({
        data: properties,
        total,
        complete: false
      });
    }
  } catch (error) {
    console.error("[API Annonces] Erreur:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des annonces" },
      { status: 500 }
    );
  }
}
