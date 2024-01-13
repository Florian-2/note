import { Notes } from "@/components/editor/editor-layout";
import { api } from "@/trpc/server";
import { redirect } from "next/navigation";
import { type ReactNode } from "react";

type Props = {
    params: { folderId: string };
    children: ReactNode;
};

export default async function FolderPage({ children, params }: Props) {
    const folder = await api.folders.getFolderById.query({ id: params.folderId });

    if (!folder) {
        return redirect("/workspace/folders");
    }

    return (
        <section className="h-full pt-14">
            <Notes notes={folder.notes}>{children}</Notes>
        </section>
    );
}
