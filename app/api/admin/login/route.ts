import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  // Rate limiting strict pour la route de login (protection brute force)
  const rateLimit = checkRateLimit(request, "login");
  if (!rateLimit.allowed) {
    const response = NextResponse.json(
      { error: "Trop de tentatives. Réessayez dans 15 minutes." },
      { status: 429 }
    );
    response.headers.set("Retry-After", Math.ceil(rateLimit.resetIn / 1000).toString());
    return response;
  }

  try {
    const { password } = await request.json();

    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: "Mot de passe incorrect" },
        { status: 401 }
      );
    }

    // Créer la réponse avec le cookie de session
    const response = NextResponse.json({ success: true });

    response.cookies.set("admin-session", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 24 heures
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
