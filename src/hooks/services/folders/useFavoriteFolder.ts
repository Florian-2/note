"use client";

import { toast } from "@/components/ui/use-toast";
import { api } from "@/trpc/react";

export function useFavoriteFolder() {
    return api.folders.favoriteFolder.useMutation({
        onError() {
            toast({
                variant: "destructive",
                description: "Le dossier n'a pas pu être ajouté aux favoris",
            });
        },
    });
}
