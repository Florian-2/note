import type { Note } from "@prisma/client";
import Link from "next/link";

type Props = {
    note: Note;
};

export function NoteCard({ note }: Props) {
    return (
        <Link
            href={`/workspace/folders/${note.folderId}/note/${note.id}`}
            className="flex rounded bg-muted p-3"
        >
            <p>{note.name}</p>
        </Link>
    );
}
