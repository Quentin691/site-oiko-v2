import ButtonLink from "@/components/ButtonLink";

export default function Header() {
  return (
    <header className="border-b">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        
        {/* Logo à gauche */}
        <div>
          <p>LOGO</p>
        </div>

        {/* Bloc à droite : connexion + réseaux */}
        <div className="flex items-center gap-6">
          <ButtonLink href="/connexion">
          Connexion
        </ButtonLink>
          <p>réseaux sociaux</p>
        </div>

      </div>
    </header>
  );
}
