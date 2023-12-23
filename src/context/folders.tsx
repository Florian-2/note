"use client";

import type { Folder } from "@/shared/types/folders";
import { type ReactNode, createContext, useState, useContext } from "react";

type FoldersContext = {
    folders: Folder[];
    deleteFolder: (id: string) => void;
    addFolder: (newFolder: Folder) => void;
    // sortBy: () => void
};

export const FoldersContext = createContext<FoldersContext | null>(null);

type Props = {
    children: ReactNode;
    folders: Folder[];
};

export function FoldersProvider({ children, folders }: Props) {
    const [foldersList, setFolders] = useState<Folder[]>(folders);

    function deleteFolder(id: string) {
        const newFolderList = foldersList.filter((folder) => folder.id !== id);
        setFolders(newFolderList);
    }

    function addFolder(newFolder: Folder) {
        setFolders([...folders, newFolder]);
    }

    return (
        <FoldersContext.Provider value={{ folders: foldersList, deleteFolder, addFolder }}>
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
