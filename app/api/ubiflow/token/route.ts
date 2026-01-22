import { NextResponse } from "next/server";
import { getUbiflowToken } from "@/lib/ubiflow";

export async function POST() {
  try {
    // Utilise le cache : si le token est valide, on le réutilise
    const token = await getUbiflowToken();
    return NextResponse.json({ token });
  } catch (error) {
    console.error("[API Token] Erreur:", error);
    return NextResponse.json({ error: "Auth failed" }, { status: 500 });
  }
}
