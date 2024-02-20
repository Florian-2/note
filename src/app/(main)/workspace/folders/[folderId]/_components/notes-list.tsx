import { NoteCard } from "@/components/note/ui/note-card";
import { useSortBy } from "@/hooks/useSortBy";
import { SelectOrderBy } from "@/components/ui/select-sort";
import type { Note } from "@prisma/client";
import { SortBy } from "@/shared/types";

type Props = {
    notes: Note[];
};

export function NotesListe({ notes }: Props) {
    const { data: notesList, orderBy, setOrderBy } = useSortBy(notes, SortBy.Favorite);

    return (
        <div className="flex flex-col items-end space-y-3">
            <SelectOrderBy defaultValue={orderBy} onChange={(value) => setOrderBy(value)} />

            <ul className="flex min-h-full w-full flex-col gap-3">
                {notesList.map((note) => (
                    <li key={note.id}>
                        <NoteCard note={note} />
                    </li>
                ))}
            </ul>
        </div>
    );
}
