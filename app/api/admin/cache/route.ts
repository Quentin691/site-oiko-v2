import { NextRequest, NextResponse } from "next/server";
import { getCacheStats, invalidateCache } from "@/lib/ubiflow";

function isAuthenticated(request: NextRequest): boolean {
  const session = request.cookies.get("admin-session");
  return session?.value === "authenticated";
}

/**
 * GET /api/admin/cache - Retourne les statistiques du cache
 */
export async function GET(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const stats = getCacheStats();
  return NextResponse.json(stats);
}

/**
 * DELETE /api/admin/cache - Invalide tout le cache
 */
export async function DELETE(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  invalidateCache();
  return NextResponse.json({ success: true, message: "Cache invalidé" });
}
