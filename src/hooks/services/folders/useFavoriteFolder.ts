"use client";

import { toast } from "@/components/ui/use-toast";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";

export function useFavoriteFolder() {
    const router = useRouter();

    return api.folders.favoriteFolder.useMutation({
        onSuccess() {
            router.refresh();
        },
        onError() {
            toast({
                variant: "destructive",
                description: "Le dossier n'a pas pu être ajouté aux favoris",
            });
        },
    });
}
