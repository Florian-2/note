import { toast } from "@/components/ui/use-toast";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";

export function useRestoreFolder() {
    const router = useRouter();

    return api.folders.restoreFolder.useMutation({
        onSuccess() {
            // toast({ variant: "default", description: "Le dossier à bien " });
            router.push("/workspace/folders");
        },
        onError() {
            console.log("erreur");
        },
    });
}
