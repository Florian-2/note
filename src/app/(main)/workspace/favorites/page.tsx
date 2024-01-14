import { api } from "@/trpc/server";
import { FoldersList } from "./_components/folders-list";

export default async function FavoritesPage() {
    const folders = await api.folders.getAllFavoriteFolders.query();

    if (!folders.length) {
        return (
            <div className="flex h-full items-center justify-center">
                <h3 className="text-lg">Vous n'avez aucun dossier favori</h3>
            </div>
        );
    }

    return <FoldersList folders={folders} />;
}
