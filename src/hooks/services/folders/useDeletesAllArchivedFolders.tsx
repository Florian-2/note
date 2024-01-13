"use client";

import { toast } from "@/components/ui/use-toast";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";

export function useDeletesAllArchivedFolders() {
    const router = useRouter();

    return api.folders.deletesAllArchivedFolders.useMutation({
        onSuccess() {
            router.refresh();
        },
        onError() {
            toast({
                variant: "destructive",
                description: "La suppression des dossiers a échoué !",
            });
        },
    });
}
