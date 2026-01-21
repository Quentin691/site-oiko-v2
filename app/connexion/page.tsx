import { Button, Card } from "@/components/ui";


export default function Connexion() {
    return(
        <main className="min-h-screen bg-background flex items-center justify-center px-4">
            <Card>
                <h1 className="text-3xl font-bold text-foreground mb-4">Connexion</h1>
                    <form>
                        <label className="block mb-2 text-sm font-medium text-foreground">Email</label>
                        <input type="email" className="mb-4 p-2 border border-border bg-card text-foreground rounded w-full" />

                        <label className="block mb-2 text-sm font-medium text-foreground">Mot de passe</label>
                        <input type="password" className="mb-4 p-2 border border-border bg-card text-foreground rounded w-full" />

                        <Button type="submit" variant="primary" className="w-full">
                            Se connecter
                        </Button>
                    </form>
            </Card>

        </main>

    )
}