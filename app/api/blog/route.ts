import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limit";

interface ArticleData {
  title: string;
  excerpt: string;
  content: string;
  category: string;
}

export async function POST(request: NextRequest) {
  // Rate limiting admin
  const rateLimit = checkRateLimit(request, "admin");
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Trop de requêtes" },
      { status: 429 }
    );
  }

  try {
    // Vérifier l'authentification via cookie
    const session = request.cookies.get("admin-session");
    if (!session || session.value !== "authenticated") {
      return NextResponse.json(
        { error: "Non autorisé" },
        { status: 401 }
      );
    }

    const data: ArticleData = await request.json();

    // Validation des champs (avec trim pour éviter les espaces vides)
    if (!data.title?.trim() || !data.content?.trim() || !data.excerpt?.trim()) {
      return NextResponse.json(
        { error: "Titre, extrait et contenu sont requis" },
        { status: 400 }
      );
    }

    // Générer le slug à partir du titre
    const slug = data.title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    // Créer le contenu Markdown
    const date = new Date().toISOString().split("T")[0];
    const markdownContent = `---
title: "${data.title}"
excerpt: "${data.excerpt}"
date: "${date}"
author: "OIKO Gestion"
category: "${data.category || "actualites"}"
---

${data.content}
`;

    // Encoder le contenu en base64
    const contentBase64 = Buffer.from(markdownContent).toString("base64");

    // Appel à l'API GitHub
    const githubResponse = await fetch(
      `https://api.github.com/repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/contents/content/blog/${slug}.md`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          "Content-Type": "application/json",
          Accept: "application/vnd.github.v3+json",
        },
        body: JSON.stringify({
          message: `Nouvel article: ${data.title}`,
          content: contentBase64,
          branch: "main",
        }),
      }
    );

    if (!githubResponse.ok) {
      const errorData = await githubResponse.json();
      console.error("[Blog API] Erreur GitHub:", errorData);
      return NextResponse.json(
        { error: "Erreur lors de la création sur GitHub" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      slug,
      message: "Article créé ! Il sera visible dans ~2 minutes après le redéploiement.",
    });
  } catch (error) {
    console.error("[Blog API] Erreur:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
