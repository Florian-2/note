"use client";

import { ContextMenuContent } from "@/components/ui/context-menu";
import { ContextMenuCopy, ContextMenuDelete } from "@/components/ui/context-menu-item";
import { ContextMenuFavori } from "@/components/ui/context-menu-item/favori";
import { useArchiveFolder } from "@/hooks/services/folders";
import { useFavoriteFolder } from "@/hooks/services/folders/useFavoriteFolder";
import type { Folder } from "@prisma/client";

type Props = {
    folder: Folder;
};

export function ContextMenuItems({ folder }: Props) {
    const { mutate: mutateArchiveFolder, isLoading: archiveFolderLoading } = useArchiveFolder();
    const { mutate: mutateFavoriteFolder, isLoading: favoriteFolderLoading } = useFavoriteFolder();

    return (
        <ContextMenuContent>
            <ContextMenuCopy copyValue={folder.name} />
            <ContextMenuFavori
                disabled={favoriteFolderLoading}
                onSelect={(e) => {
                    e.preventDefault();
                    mutateFavoriteFolder({ folderId: folder.id });
                }}
            >
                Favori
            </ContextMenuFavori>
            <ContextMenuDelete
                disabled={archiveFolderLoading}
                onSelect={(e) => {
                    e.preventDefault();
                    mutateArchiveFolder({ folderId: folder.id });
                }}
            />
        </ContextMenuContent>
    );
}
