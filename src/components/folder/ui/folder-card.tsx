import Link from "next/link";
import type { Folder } from "@prisma/client";
import { ContextMenu, ContextMenuContent, ContextMenuTrigger } from "@/components/ui/context-menu";
import { IconFolder, IconFolderEmpty } from "@/components/folder/icons";
import { Badge } from "@/components/ui/badge";
import { DeleteFolderButton, CopyFolderNameButton } from "../context-menu";

type Props = {
    folder: Folder & {
        _count: {
            notes: number;
        };
    };
};

export function FolderCard({ folder }: Props) {
    const countNotes = folder._count.notes;

    return (
        <ContextMenu>
            <ContextMenuTrigger className="flex-grow rounded-md px-7 py-4 transition-colors duration-200 hover:bg-muted">
                <Link href={`folders/${folder.id}`}>
                    <div className="flex flex-col items-center gap-1">
                        <div className="relative">
                            {countNotes ? (
                                <IconFolder width={90} />
                            ) : (
                                <IconFolderEmpty width={90} />
                            )}

                            {countNotes >= 1 && (
                                <Badge className="absolute -right-3.5 top-0">{countNotes}</Badge>
                            )}
                        </div>

                        <p className="w-full truncate text-center">{folder.name}</p>
                    </div>
                </Link>
            </ContextMenuTrigger>

            <ContextMenuContent>
                <CopyFolderNameButton folderName={folder.name} />
                <DeleteFolderButton id={folder.id} />
            </ContextMenuContent>
        </ContextMenu>
    );
}
