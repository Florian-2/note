import { api } from "@/trpc/server";
import { FoldersList } from "./_components/folders-list";
import { FoldersProvider } from "@/context/folders";

type Props = {
    searchParams: { query?: string };
};

export default async function FoldersPage({ searchParams }: Props) {
    const folders = await api.folders.getAllFolders.query({ query: searchParams.query ?? "" });

    return (
        <FoldersProvider folders={folders}>
            <FoldersList />
        </FoldersProvider>
    );
}
