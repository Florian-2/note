"use client";

import { type MouseEvent } from "react";
import { Loader2 } from "lucide-react";
import { AlertDialogAction } from "@/components/ui/alert-dialog";
import { useRestoreFolder } from "@/hooks/services";

type Props = {
    folderId: string;
};

export function RestoreFolderAction({ folderId }: Props) {
    const { isLoading, mutate } = useRestoreFolder();

    function handleSelect(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        mutate({ folderId });
    }

    return (
        <AlertDialogAction onClick={handleSelect} disabled={isLoading} className="gap-2">
            Restaurer
            {isLoading && <Loader2 width={16} className="animate-spin" />}
        </AlertDialogAction>
    );
}
