"use client";

import { ContextMenuItem } from "@/components/ui/context-menu";
import { api } from "@/trpc/react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
    id: string;
};

export function DeleteFolderButton({ id }: Props) {
    const router = useRouter();
    const { mutate, isLoading } = api.folders.deleteFolder.useMutation({
        onSuccess() {
            router.refresh();
        },
    });

    function handleSelect(e: Event) {
        e.preventDefault();
        mutate({ folderId: id });
    }

    return (
        <ContextMenuItem
            className="justify-between focus:bg-destructive/10 focus:text-destructive"
            disabled={isLoading}
            onSelect={handleSelect}
        >
            Supprimer
            {isLoading && <Loader2 width={16} className="animate-spin" />}
        </ContextMenuItem>
    );
}
