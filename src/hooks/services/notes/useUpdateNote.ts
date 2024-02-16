import { api } from "@/trpc/react";
import { toast } from "@/components/ui/use-toast";

export function useUpdateNote() {
    return api.notes.updateNote.useMutation({
        onError() {
            toast({
                variant: "destructive",
                description: "Une erreur est survenu lors de l'enregistrement des modifications",
            });
        },
    });
}
