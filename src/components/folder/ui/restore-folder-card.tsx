import type { FolderWithCount } from "@/shared/types";
import { FolderCard } from "./folder-card";
import {
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { RestoreFolderAction } from "../context-menu/restore";

type Props = {
    folder: FolderWithCount;
};

export function RestoreFolderCard({ folder }: Props) {
    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <FolderCard key={folder.id} folder={folder} asLink={false} />
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Restaurer le dossier</AlertDialogTitle>

                    <AlertDialogHeader>
                        Si vous décidez de restaurer le dossier, vous serez ensuite redirigé vers
                        l'explorateur de dossier.
                    </AlertDialogHeader>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                    <RestoreFolderAction folderId={folder.id} />
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
