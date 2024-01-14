"use client";

import { toast } from "@/components/ui/use-toast";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";

export function useArchiveFolder() {
    const router = useRouter();

    return api.folders.archiveFolder.useMutation({
        onSuccess() {
            router.refresh();
        },
        onError() {
            toast({
                variant: "destructive",
                description: "La restauration du dossier a échoué !",
            });
        },
    });
}
