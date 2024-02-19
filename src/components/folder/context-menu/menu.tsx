"use client";

import type { PropsWithChildren } from "react";
import { ContextMenuContent } from "@/components/ui/context-menu";
import { ContextMenuCopy, ContextMenuDelete } from "@/components/ui/context-menu-item";
import { ContextMenuFavori } from "@/components/ui/context-menu-item/favorite";
import { useArchiveFolder } from "@/hooks/services/folders";
import { useFavoriteFolder } from "@/hooks/services/folders/useFavoriteFolder";
import type { Folder } from "@prisma/client";

type Props = PropsWithChildren & {
    folder: Folder;
};

export function ContextMenuItems({ folder, children }: Props) {
    const { mutate: mutateArchiveFolder, isLoading: archiveFolderLoading } = useArchiveFolder();
    const { mutate: mutateFavoriteFolder, isLoading: favoriteFolderLoading } = useFavoriteFolder();

    function handleFavorite(e: Event) {
        e.preventDefault();
        mutateFavoriteFolder({ folderId: folder.id, isFavorite: !folder.isFavorite });
    }

    return (
        <ContextMenuContent>
            <ContextMenuCopy copyValue={folder.name} />

            <ContextMenuFavori disabled={favoriteFolderLoading} onSelect={handleFavorite}>
                {folder.isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
            </ContextMenuFavori>

            {children}

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
