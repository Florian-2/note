"use client";

import dynamic from "next/dynamic";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import type { Note } from "@prisma/client";
import { NoteCard } from "../note/ui/note-card";

const Editor = dynamic(() => import("@/components/editor/editor"), { ssr: false });

type Props = {
    notes: Note[];
};

export function Notes({ notes }: Props) {
    return (
        <>
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel defaultSize={25} minSize={20} maxSize={30}>
                    <ul className="flex h-screen flex-col gap-2 p-2">
                        {notes.map((note) => (
                            <li key={note.id}>
                                <NoteCard note={note} />
                            </li>
                        ))}
                    </ul>
                </ResizablePanel>

                <ResizableHandle withHandle />

                <ResizablePanel defaultSize={75}>
                    <Editor />
                </ResizablePanel>
            </ResizablePanelGroup>
        </>
    );
}
