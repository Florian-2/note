import { api } from "@/trpc/server";
import { RestoreFolderCard } from "@/components/folder/ui/restore-folder-card";
import { FolderGrid } from "@/components/folder/ui/folder-grid";

export default async function TrashPage() {
    const folders = await api.folders.getDeletedFolders.query({});

    return (
        <section className="pt-20">
            <FolderGrid>
                {folders.map((folder) => (
                    <RestoreFolderCard key={folder.id} folder={folder} />
                ))}
            </FolderGrid>
        </section>
    );
}
