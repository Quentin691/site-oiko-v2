export interface Author {
  id: string;
  name: string;
  role: string;
  avatar: string;
  bio?: string;
}

export const AUTHORS: Record<string, Author> = {
  oiko: {
    id: "oiko",
    name: "OIKO Gestion",
    role: "Equipe OIKO",
    avatar: "/logo.png",
    bio: "L'equipe OIKO vous accompagne dans tous vos projets immobiliers.",
  },
  quentin: {
    id: "quentin",
    name: "Quentin",
    role: "Gérant",
    avatar: "", // Ajouter /authors/quentin.jpg quand la photo sera disponible
    bio: "Fondateur et gérant d'OIKO Gestion.",
  },
};

export function getAuthor(id: string): Author {
  return AUTHORS[id] || AUTHORS.oiko;
}

export function getAllAuthors(): Author[] {
  return Object.values(AUTHORS);
}
