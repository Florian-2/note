"use client";

import { ContextMenuItem } from "@/components/ui/context-menu";
import { Loader2 } from "lucide-react";
import { useFolders } from "@/context/folders";

type Props = {
    id: string;
};

export function DeleteFolderButton({ id }: Props) {
    const { deleteFolder } = useFolders();

    const { mutate, isLoading } = deleteFolder();

    function handleSelect(e: Event) {
        e.preventDefault();
        mutate({ folderId: id });
    }

    return (
        <ContextMenuItem
            className="justify-between bg-blend-saturation focus:bg-destructive/10 focus:text-destructive dark:hover:bg-destructive/40 dark:focus:text-white"
            disabled={isLoading}
            onSelect={handleSelect}
        >
            Supprimer
            {isLoading && <Loader2 width={16} className="animate-spin" />}
        </ContextMenuItem>
    );
}
