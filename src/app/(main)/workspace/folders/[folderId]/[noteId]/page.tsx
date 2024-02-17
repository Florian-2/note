import { api } from "@/trpc/server";
import { redirect } from "next/navigation";
import dynamic from "next/dynamic";
import { InfosNote } from "./_components/infos-note";
import { ScrollArea } from "@/components/ui/scroll-area";

const Editor = dynamic(() => import("./_components/editor"), { ssr: false });

type Props = {
    params: { noteId: string };
};

// export const revalidate = 0;

export default async function EditorNotePage({ params }: Props) {
    const note = await api.notes.getNoteById.query({ noteId: params.noteId });

    if (!note) {
        return redirect("/workspace/folders");
    }

    return (
        <ScrollArea className="h-screen">
            <div className="flex flex-col gap-10 p-6">
                <InfosNote note={note} folderName={note.folder.name} />
                <Editor note={note} />
            </div>
        </ScrollArea>
    );
}
