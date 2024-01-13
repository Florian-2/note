"use client";

import { toast } from "@/components/ui/use-toast";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";

export function useRestoresAllArchivedFolders() {
    const router = useRouter();

    return api.folders.restoresAllArchivedFolders.useMutation({
        onSuccess() {
            // router.push("/workspace/folders");
            router.refresh();
        },
        onError() {
            toast({
                variant: "destructive",
                description: "La restauration des dossiers a échoué !",
            });
        },
    });
}
