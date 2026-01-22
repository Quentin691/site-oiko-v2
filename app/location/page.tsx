"use client";

export default function LocationPage() {
  const handleTestToken = async () => {
    const response = await fetch("/api/ubiflow/token", { method: "POST" });
    const data = await response.json();
    console.log("Token récupéré :", data.token);
  };

  const handleTestAnnonces = async () => {
    console.log("Récupération des annonces...");
    const response = await fetch("/api/ubiflow/annonces");
    const data = await response.json();
    console.log("Annonces récupérées :", data);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Annonces de biens à la location</h1>

      <div className="flex gap-4">
        <button
          onClick={handleTestToken}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark"
        >
          Tester le token
        </button>

        <button
          onClick={handleTestAnnonces}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Tester les annonces
        </button>
      </div>
    </div>
  );
}
