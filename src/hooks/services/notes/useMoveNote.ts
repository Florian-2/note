import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import type { UseFormReturn } from "react-hook-form";
import type { MoveNoteType } from "@/shared/validators/note";

export function useMoveNote(form: UseFormReturn<MoveNoteType>) {
    const router = useRouter();

    return api.notes.moveNote.useMutation({
        onError(error) {
            // if (error.data?.code === "CONFLICT") {
            //     return form.setError("", {
            //         message: "Ce nom de dossier est déjà utilisé",
            //     });
            // }

            if (error.data?.zodError) {
                return form.setError("root", {
                    message: "La validation du formulaire a échoué",
                });
            }

            console.log(error);
        },
        onSuccess() {
            router.refresh();
        },
    });
}
