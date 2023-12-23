import { api } from "@/trpc/server";

import { FoldersList } from "./_components/folders-list";
import { FoldersProvider } from "@/context/folders";

export default async function FoldersPage() {
    const folders = await api.folders.getAllFolders.query();

    return (
        <FoldersProvider folders={folders}>
            <FoldersList />
        </FoldersProvider>
    );
}
