import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

export function useDeleteNote() {
    const router = useRouter();

    return api.notes.deleteNote.useMutation({
        onSuccess(data) {
            router.push(`/workspace/folders/${data.folderId}`);
            router.refresh();
        },
        onError() {
            toast({
                variant: "destructive",
                description: "La suppression du fichier a échoué !",
            });
        },
    });
}
