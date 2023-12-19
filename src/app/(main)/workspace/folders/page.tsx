import { FoldersList } from "@/components/folder/folders-list";
import { api } from "@/trpc/server";
import { CreateFolder } from "./_components/create-folder";

export default async function FoldersPage() {
    const folders = await api.folders.getAllFolders.query();

    return (
        <section>
            <div className="flex gap-4">
                <CreateFolder />

                <FoldersList folders={folders} />
            </div>
        </section>
    );
}
