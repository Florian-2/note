"use client";

import { ContextMenuContent, ContextMenuItem } from "@/components/ui/context-menu";
import { ContextMenuCopy, ContextMenuDelete } from "@/components/ui/context-menu-item";
import { useFolders } from "@/context/folders";
import type { Folder } from "@prisma/client";

type Props = {
    folder: Folder;
};

export function ContextMenuItems({ folder }: Props) {
    const { archiveFolder } = useFolders();
    const { mutate, isLoading } = archiveFolder();

    return (
        <ContextMenuContent>
            <ContextMenuCopy copyValue={folder.name} />
            <ContextMenuItem disabled>Favori</ContextMenuItem>
            <ContextMenuDelete
                disabled={isLoading}
                onSelect={(e) => {
                    e.preventDefault();
                    mutate({ folderId: folder.id });
                }}
            />
        </ContextMenuContent>
    );
}
