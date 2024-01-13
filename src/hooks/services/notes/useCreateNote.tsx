import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import type { CreateNoteType } from "@/shared/validators/note";
import type { UseFormReturn } from "react-hook-form";

export function useCreateNote(form: UseFormReturn<CreateNoteType>) {
    const router = useRouter();

    return api.notes.createNote.useMutation({
        onSuccess(data) {
            if (data) {
                router.push(`/workspace/folders/${data.folderId}/${data.id}`);
            }

            router.refresh();
        },
        onError(error) {
            if (error.data?.code === "CONFLICT") {
                return form.setError("name", {
                    message: "Ce nom de fichier est déjà utilisé",
                });
            }

            if (error.data?.zodError) {
                return form.setError("root", {
                    message: "La validation du formulaire a échoué",
                });
            }
        },
    });
}
