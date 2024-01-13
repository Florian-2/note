"use client";

import { useTheme } from "next-themes";
import { type BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";
import { type Note } from "@prisma/client";

type Props = {
    note: Note;
};

export default function Editor({ note }: Props) {
    const initialContent = [
        {
            id: "initialBlockId",
            type: "paragraph" as const,
            props: {
                textColor: "default",
                backgroundColor: "default",
                textAlignment: "left" as const,
            },
            content: [
                {
                    type: "text" as const,
                    text: note.content,
                    styles: {},
                },
            ],
            children: [],
        },
    ];

    const editor: BlockNoteEditor | null = useBlockNote({ initialContent });
    const theme = useTheme().theme as "dark" | "light";

    editor.onEditorContentChange(() => {
        console.log(editor.topLevelBlocks);
    });

    return (
        <>
            <BlockNoteView editor={editor} theme={theme} />
            <p>{note.content}</p>
        </>
    );
}
