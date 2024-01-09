"use client";

import {
    createContext,
    useState,
    useContext,
    useMemo,
    type ReactNode,
    type Dispatch,
    type SetStateAction,
} from "react";
import { useRouter } from "next/navigation";
import { api } from "@/trpc/react";
import { toast } from "@/components/ui/use-toast";
import type { UseFormReturn } from "react-hook-form";
import { type Folder, SortBy } from "@/shared/types/folders";
import type { CreateFolderType } from "@/shared/validators/folder";

type FoldersContext = {
    folders: Folder[];
    addFolder: (
        form: UseFormReturn<CreateFolderType>,
    ) => ReturnType<typeof api.folders.create.useMutation>;
    orderBy: SortBy;
    archiveFolder: () => ReturnType<typeof api.folders.archiveFolder.useMutation>;
    setOrderBy: Dispatch<SetStateAction<SortBy>>;
};

export const FoldersContext = createContext<FoldersContext | null>(null);

type Props = {
    children: ReactNode;
    folders: Folder[];
};

export function FoldersProvider({ children, folders }: Props) {
    const router = useRouter();
    const [orderBy, setOrderBy] = useState(SortBy.NameAsc);

    const sortedFolderList = useMemo(() => {
        const newFolderList = folders.slice();

        switch (orderBy) {
            case SortBy.NameAsc:
                return newFolderList.sort((a, b) => a.name.localeCompare(b.name));

            case SortBy.NameDesc:
                return newFolderList.sort((a, b) => b.name.localeCompare(a.name));

            case SortBy.DateAsc:
                return newFolderList.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

            case SortBy.DateDesc:
                return newFolderList.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

            default:
                return folders;
        }
    }, [orderBy, folders]);

    function archiveFolder() {
        return api.folders.archiveFolder.useMutation({
            onSuccess() {
                router.refresh();
            },
            onError() {
                toast({
                    variant: "destructive",
                    description: "La suppression du dossier a échoué !",
                });
            },
        });
    }

    function addFolder(form: UseFormReturn<CreateFolderType>) {
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

    return (
        <FoldersContext.Provider
            value={{
                folders: sortedFolderList,
                addFolder,
                archiveFolder,
                orderBy,
                setOrderBy,
            }}
        >
            {children}
        </FoldersContext.Provider>
    );
}

export function useFolders() {
    const context = useContext(FoldersContext);

    if (!context) {
        throw new Error("Folder provider not found !");
    }

    return context;
}
