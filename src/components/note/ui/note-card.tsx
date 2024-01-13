import { ContextMenu, ContextMenuTrigger } from "@/components/ui/context-menu";
import type { Note } from "@prisma/client";
import Link from "next/link";
import { ContextMenuItems } from "../context-menu/menu";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";
import type { NoteParams } from "@/shared/types";

type Props = {
    note: Note;
};

export function NoteCard({ note }: Props) {
    const params = useParams<NoteParams>();

    const createdAt = note.createdAt.toISOString();
    const dateFormat = Intl.DateTimeFormat("fr-FR", {
        dateStyle: "long",
    });

    return (
        <ContextMenu>
            <ContextMenuTrigger asChild>
                <Link
                    href={`/workspace/folders/${note.folderId}/${note.id}`}
                    className={cn(
                        "group flex flex-col gap-2 rounded border p-3 transition-colors hover:bg-muted",
                        params.noteId === note.id && "bg-muted",
                    )}
                >
                    <h3 className="font-medium">{note.name}</h3>
                    <p className="text-foreground/80">
                        <time dateTime={createdAt}>{dateFormat.format(note.createdAt)}</time>
                    </p>
                </Link>
            </ContextMenuTrigger>

            <ContextMenuItems note={note} />
        </ContextMenu>
    );
}
