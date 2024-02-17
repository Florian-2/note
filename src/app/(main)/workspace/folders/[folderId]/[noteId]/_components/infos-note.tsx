import type { Note } from "@prisma/client";
import { EditNameNote } from "./edit-name-note";
import { Separator } from "@/components/ui/separator";
import { CalendarDays, Folder } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

type Props = {
    note: Note;
    folderName: string;
};

export function InfosNote({ note, folderName }: Props) {
    const dateFormat = Intl.DateTimeFormat("fr-FR", {
        dateStyle: "long",
    });

    const timeFormat = Intl.DateTimeFormat("fr-FR", {
        dateStyle: "long",
        timeStyle: "short",
    });

    return (
        <div className="space-y-8">
            <EditNameNote note={note} />

            <div className="space-y-4 text-foreground/75">
                <div className="flex items-center gap-8">
                    <CalendarDays size={20} />
                    <p>Date</p>

                    <div className="flex items-center gap-2">
                        <Tooltip delayDuration={0}>
                            <TooltipTrigger asChild>
                                <p className="cursor-default underline">
                                    {dateFormat.format(note.createdAt)}
                                </p>
                            </TooltipTrigger>

                            <TooltipContent side="bottom">
                                <span>Date de création</span>
                            </TooltipContent>
                        </Tooltip>

                        <div className="h-1 w-1 rounded-full bg-foreground/80"></div>

                        <Tooltip delayDuration={0}>
                            <TooltipTrigger asChild>
                                <p className="cursor-default underline">
                                    {dateFormat.format(note.updatedAt)}
                                </p>
                            </TooltipTrigger>

                            <TooltipContent side="bottom">
                                <span>
                                    Dernière modification - {timeFormat.format(note.updatedAt)}
                                </span>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                </div>

                <Separator />

                <div className="flex items-center gap-8">
                    <Folder size={20} />
                    <p>Dossier</p>

                    <p>{folderName}</p>
                </div>
            </div>
        </div>
    );
}
