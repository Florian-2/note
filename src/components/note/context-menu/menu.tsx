"use client";

import { ContextMenuContent, ContextMenuItem } from "@/components/ui/context-menu";
import { ContextMenuCopy, ContextMenuDelete } from "@/components/ui/context-menu-item";
import { useDeleteNote } from "@/hooks/services/notes";
import type { Note } from "@prisma/client";

type Props = {
    note: Note;
};

export function ContextMenuItems({ note }: Props) {
    const { mutate, isLoading } = useDeleteNote();

    return (
        <ContextMenuContent>
            <ContextMenuCopy copyValue={note.name} />
            <ContextMenuItem>Favori</ContextMenuItem>
            <ContextMenuDelete
                disabled={isLoading}
                onSelect={(e) => {
                    e.preventDefault();
                    mutate({ noteId: note.id });
                }}
            />
        </ContextMenuContent>
    );
}
