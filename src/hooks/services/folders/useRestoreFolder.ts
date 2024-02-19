import { toast } from "@/components/ui/use-toast";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";

export function useRestoreFolder() {
    const router = useRouter();

    return api.folders.restoreFolder.useMutation({
        onSuccess() {
            router.push("/workspace/folders");
            router.refresh();
        },
        onError() {
            toast({
                variant: "destructive",
                description: "La restauration du dossier a échoué !",
            });
        },
    });
}
