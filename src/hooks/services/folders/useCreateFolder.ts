import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import type { CreateFolderType } from "@/shared/validators/folder";
import type { UseFormReturn } from "react-hook-form";

export function useCreateFolder(form: UseFormReturn<CreateFolderType>) {
    const router = useRouter();

    return api.folders.create.useMutation({
        onError(error) {
            if (error.data?.code === "CONFLICT") {
                return form.setError("name", {
                    message: "Ce nom de dossier est déjà utilisé",
                });
            }

            if (error.data?.zodError) {
                return form.setError("root", {
                    message: "La validation du formulaire a échoué",
                });
            }
        },
        onSuccess() {
            router.refresh();
        },
    });
}
