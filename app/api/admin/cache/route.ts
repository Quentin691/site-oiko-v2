import { NextRequest, NextResponse } from "next/server";
import { getCacheStats, invalidateCache } from "@/lib/ubiflow";
import { checkRateLimit, getRateLimitStats } from "@/lib/rate-limit";

function isAuthenticated(request: NextRequest): boolean {
  const session = request.cookies.get("admin-session");
  return session?.value === "authenticated";
}

/**
 * GET /api/admin/cache - Retourne les statistiques du cache et rate limiting
 */
export async function GET(request: NextRequest) {
  const rateLimit = checkRateLimit(request, "admin");
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Trop de requêtes" },
      { status: 429 }
    );
  }

  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const cacheStats = getCacheStats();
  const rateLimitStats = getRateLimitStats();

  return NextResponse.json({
    cache: cacheStats,
    rateLimit: rateLimitStats,
  });
}

/**
 * DELETE /api/admin/cache - Invalide tout le cache
 */
export async function DELETE(request: NextRequest) {
  const rateLimit = checkRateLimit(request, "admin");
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Trop de requêtes" },
      { status: 429 }
    );
  }

  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  invalidateCache();
  return NextResponse.json({ success: true, message: "Cache invalidé" });
}
