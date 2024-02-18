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
import { useDeleteNote } from "@/hooks/services/notes";
import { useState } from "react";
import { MoveNoteForm } from "./form-move";
import { DeleteNote } from "./delete-note";

type Props = {
    note: Note;
};

type Dialog = "delete" | "move" | null;

export function NoteCard({ note }: Props) {
    const [dialog, setDialog] = useState<Dialog>(null);
    const params = useParams<NoteParams>();
    const { mutate, isLoading } = useDeleteNote();

    const createdAt = note.createdAt.toISOString();
    const dateFormat = Intl.DateTimeFormat("fr-FR", {
        dateStyle: "long",
    });

    return (
        <>
            <Dialog>
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
                                <time dateTime={createdAt}>
                                    {dateFormat.format(note.createdAt)}
                                </time>
                            </p>
                        </Link>
                    </ContextMenuTrigger>

                    <ContextMenuContent>
                        <ContextMenuCopy copyValue={note.name} />
                        <ContextMenuItem>Favori</ContextMenuItem>

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

                        <DeleteNote
                            disabled={isLoading}
                            onClick={() => mutate({ noteId: note.id })}
                        />
                    </DialogContent>
                ) : null}
            </Dialog>
        </>
    );
}
