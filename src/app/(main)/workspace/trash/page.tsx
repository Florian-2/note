import { api } from "@/trpc/server";
import { RestoreFolderCard } from "@/components/folder/ui/restore-folder-card";
import { FolderGrid } from "@/components/folder/ui/folder-grid";
import { DeletesAllFolder } from "./_components/deletes-all-folder";
import { RestoresAllFolder } from "./_components/restores-all-folder";

export default async function TrashPage() {
    const folders = await api.folders.getDeletedFolders.query({});

    if (!folders.length) {
        return (
            <div className="flex h-full items-center justify-center">
                <h2 className="text-xl">La corbeille est vide !</h2>
            </div>
        );
    }

    return (
        <section className="grid h-full grid-rows-layout gap-10 px-3 pt-20 md:px-6">
            <div className="flex gap-2">
                <RestoresAllFolder />
                <DeletesAllFolder />
            </div>

            <FolderGrid>
                {folders.map((folder) => (
                    <RestoreFolderCard key={folder.id} folder={folder} />
                ))}
            </FolderGrid>
        </section>
    );
}
