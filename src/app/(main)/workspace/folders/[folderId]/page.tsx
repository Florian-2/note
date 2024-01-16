import { FileText } from "lucide-react";

export default async function GlobalNotePage() {
    return (
        <div className="flex h-full flex-col items-center justify-center gap-3 p-9 text-center">
            <FileText size={80} strokeWidth={1} />

            <h2 className="text-2xl font-medium">Sélectionner une page</h2>

            <p className="max-w-md text-muted-foreground">
                Choisissez une note dans la liste de gauche pour afficher son contenu ou créez une
                nouvelle note à ajouter à votre dossier.
            </p>
        </div>
    );
}
