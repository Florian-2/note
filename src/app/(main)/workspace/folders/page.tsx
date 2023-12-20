import { api } from "@/trpc/server";
import { FoldersList } from "./_components/folders-list";

export default async function FoldersPage() {
    const folders = await api.folders.getAllFolders.query();

    return (
        <section className="flex h-full items-center justify-center">
            <FoldersList folders={folders} />
        </section>
    );
}
