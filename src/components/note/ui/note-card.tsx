import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@/components/ui/context-menu";
import type { Note } from "@prisma/client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";
import type { NoteParams } from "@/shared/types";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { ContextMenuCopy } from "@/components/ui/context-menu-item";
import { useDeleteNote, useFavoriteNote } from "@/hooks/services/notes";
import { useState } from "react";
import { MoveNoteForm } from "./form-move";
import { DeleteNote } from "./delete-note";
import { Loader } from "lucide-react";
import { ContextMenuFavori } from "@/components/ui/context-menu-item/favorite";

type Props = {
    note: Note;
};

type Dialog = "delete" | "move" | null;

export function NoteCard({ note }: Props) {
    const [dialog, setDialog] = useState<Dialog>(null);
    const params = useParams<NoteParams>();
    const { mutate, isLoading } = useDeleteNote();
    const { mutate: favoriteNoteMutate, isLoading: favoriteNoteIsLoading } = useFavoriteNote();

    const createdAt = note.createdAt.toISOString();
    const dateFormat = Intl.DateTimeFormat("fr-FR", {
        dateStyle: "long",
    });

    return (
        <Dialog>
            <ContextMenu>
                <ContextMenuTrigger asChild>
                    <Link
                        href={`/workspace/folders/${note.folderId}/${note.id}`}
                        className={cn(
                            "group flex flex-col gap-2 rounded border p-3 transition-colors hover:bg-muted",
                            params.noteId === note.id && "bg-muted",
                            note.isFavorite &&
                                "border-orange-400 bg-orange-400/10 hover:bg-orange-400/20",
                        )}
                    >
                        <h3 className="font-medium">{note.name}</h3>
                        <p className="text-foreground/80">
                            <time dateTime={createdAt}>{dateFormat.format(note.createdAt)}</time>
                        </p>
                    </Link>
                </ContextMenuTrigger>

                <ContextMenuContent>
                    <ContextMenuCopy copyValue={note.name} />
                    {/* Mettre ca dans un composant (voir si il exsite déjà) */}
                    <ContextMenuFavori
                        disabled={favoriteNoteIsLoading}
                        onSelect={() =>
                            favoriteNoteMutate({
                                noteId: note.id,
                                isFavorite: !note.isFavorite,
                            })
                        }
                    >
                        {note.isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
                    </ContextMenuFavori>

                    <DialogTrigger asChild>
                        <ContextMenuItem onClick={() => setDialog("move")}>
                            Déplacer
                        </ContextMenuItem>
                    </DialogTrigger>

                    <DialogTrigger asChild>
                        <ContextMenuItem
                            variant={"destructive"}
                            onClick={() => setDialog("delete")}
                        >
                            Supprimer
                        </ContextMenuItem>
                    </DialogTrigger>
                </ContextMenuContent>
            </ContextMenu>

            {dialog === "move" ? (
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Déplacer le fichier</DialogTitle>
                    </DialogHeader>

                    <MoveNoteForm
                        folderId={params.folderId}
                        noteId={note.id}
                        onCloseModal={() => setDialog(null)}
                    />
                </DialogContent>
            ) : null}

            {dialog && dialog === "delete" ? (
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Supprimer le fichier</DialogTitle>
                        <DialogDescription>
                            Etes-vous sûr de vouloir supprimer ce fichier de façon permanente ?
                        </DialogDescription>
                    </DialogHeader>

                    <DeleteNote disabled={isLoading} onClick={() => mutate({ noteId: note.id })} />
                </DialogContent>
            ) : null}
        </Dialog>
    );
}
