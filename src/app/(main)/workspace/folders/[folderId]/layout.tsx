import { NotesLayout } from "./_components/notes-layout";
import { api } from "@/trpc/server";
import { redirect } from "next/navigation";
import { type ReactNode } from "react";

type Props = {
    params: { folderId: string };
    children: ReactNode;
};

export default async function Layout({ children, params }: Props) {
    const folder = await api.folders.getFolderById.query({ id: params.folderId }); // + query: params.query

    if (!folder) {
        return redirect("/workspace/folders");
    }

    return (
        <section className="h-full pt-14">
            <NotesLayout notes={folder.notes}>{children}</NotesLayout>
        </section>
    );
}
