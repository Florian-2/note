import { toast } from "@/components/ui/use-toast";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";

export function useFavoriteNote() {
    const router = useRouter();

    return api.notes.favoriteNote.useMutation({
        onSuccess() {
            router.refresh();
        },
        onError() {
            toast({
                variant: "destructive",
                description: "Le fichier n'a pas pu être ajouté aux favoris",
            });
        },
    });
}
