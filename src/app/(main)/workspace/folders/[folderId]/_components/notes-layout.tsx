"use client";

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import type { Note } from "@prisma/client";
import { NoteCard } from "@/components/note/ui/note-card";
import { type ReactNode } from "react";
import { CreateNoteModal } from "@/app/(main)/workspace/folders/[folderId]/[noteId]/_components/create-note-modal";

type Props = {
    notes: Note[];
    children: ReactNode;
};

export const revalidate = 0;

export function NotesLayout({ notes, children }: Props) {
    return (
        <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={25} minSize={20} maxSize={30} className="space-y-6 p-3">
                <CreateNoteModal />

                <ul className="flex min-h-full flex-col gap-3">
                    {notes.map((note) => (
                        <li key={note.id}>
                            <NoteCard note={note} />
                        </li>
                    ))}
                </ul>
            </ResizablePanel>

            <ResizableHandle withHandle />

            <ResizablePanel defaultSize={75}>{children}</ResizablePanel>
        </ResizablePanelGroup>
    );
}
