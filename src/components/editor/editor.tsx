"use client";

import { useTheme } from "next-themes";
import { type BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";

export default function Editor() {
    const editor: BlockNoteEditor | null = useBlockNote({});
    const theme = useTheme().theme as "dark" | "light";

    return <BlockNoteView editor={editor} theme={theme} />;
}
