import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import type { UpdateNameNoteType } from "@/shared/validators/note";
import type { UseFormReturn } from "react-hook-form";

export function useUpdateNameNote(form: UseFormReturn<UpdateNameNoteType>) {
    const router = useRouter();

    return api.notes.updateNameNote.useMutation({
        onSuccess() {
            router.refresh();
        },
        onError(error) {
            if (error.data?.zodError) {
                return form.setError("root", {
                    message: "La validation du formulaire a échoué",
                });
            }
        },
    });
}
