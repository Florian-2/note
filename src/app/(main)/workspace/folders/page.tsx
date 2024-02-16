import { api } from "@/trpc/server";
import { FoldersList } from "./_components/folders-list";

type Props = {
    searchParams: { query?: string };
};

export default async function FoldersPage({ searchParams }: Props) {
    const folders = await api.folders.getAllFolders.query({ query: searchParams.query ?? "" });

    return <FoldersList folders={folders} />;
}
