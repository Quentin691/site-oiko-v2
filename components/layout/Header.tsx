import Button from "@/components/ui/Button";
import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

        {/* Logo à gauche */}
        <div>
          <p><Link href="/">LOGO</Link></p>
        </div>

        {/* Bloc à droite : connexion + réseaux */}
        <div className="flex items-center gap-6">
          <Button href="/connexion" variant="secondary">
            Connexion
          </Button>
          <p>réseaux sociaux</p>
        </div>

      </div>
    </header>
  );
}
