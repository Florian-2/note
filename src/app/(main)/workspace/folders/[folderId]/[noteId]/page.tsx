import { api } from "@/trpc/server";
import { redirect } from "next/navigation";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("@/components/editor/editor"), { ssr: false });

type Props = {
    params: { noteId: string };
};

export default async function NotePage({ params }: Props) {
    const note = await api.notes.getNoteById.query({ noteId: params.noteId });

    if (!note) {
        return redirect("/workspace/folders");
    }

    return <Editor note={note} />;
}
