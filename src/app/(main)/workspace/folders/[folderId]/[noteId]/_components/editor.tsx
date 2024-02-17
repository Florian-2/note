"use client";

import { useTheme } from "next-themes";
import type { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";
import { type Note } from "@prisma/client";
import { useUpdateNote } from "@/hooks/services/notes/useUpdateNote";
import { Loader } from "lucide-react";
import { useEffect } from "react";
// import { useDebounce } from "@/hooks/useDebounce";

type Props = {
    note: Note;
};

export default function Editor({ note }: Props) {
    const { mutate, isLoading } = useUpdateNote();

    console.log("Rendu <Editor/>");

    const initialContent = note.content ? (JSON.parse(note.content) as PartialBlock[]) : undefined;

    const editor: BlockNoteEditor = useBlockNote({
        initialContent,
        onEditorContentChange(editor) {
            const content = JSON.stringify(editor.topLevelBlocks, null, 2);
            mutate({ noteId: note.id, content });
        },
        domAttributes: {
            editor: { class: "editor" },
        },
    });
    const theme = useTheme().theme as "dark" | "light";

    return (
        <>
            <BlockNoteView editor={editor} theme={theme} />

            {isLoading && <Loader className="animate-spin" />}
        </>
    );
}
