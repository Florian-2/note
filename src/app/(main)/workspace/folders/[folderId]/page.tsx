import { Notes } from "@/components/editor/editor-layout";
import { api } from "@/trpc/server";
import { redirect } from "next/navigation";

type Props = {
    params: { folderId: string };
};

export default async function FolderPage({ params }: Props) {
    const folder = await api.folders.getFolderById.query({ id: params.folderId });

    if (!folder) {
        return redirect("./");
    }

    return (
        <section className="pt-14">
            <Notes notes={folder.notes} />
        </section>
    );
}
