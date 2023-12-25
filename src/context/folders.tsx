"use client";

import type { Folder } from "@/shared/types/folders";
import {
    type ReactNode,
    createContext,
    useState,
    useContext,
    type Dispatch,
    type SetStateAction,
} from "react";

type FoldersContext = {
    folders: Folder[];
    setFoldersList: Dispatch<SetStateAction<Folder[]>>;
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
        const newFolderList = foldersList.slice();
        newFolderList.push(newFolder);

        setFolders(newFolderList);
    }

    return (
        <FoldersContext.Provider
            value={{ folders: foldersList, setFoldersList: setFolders, deleteFolder, addFolder }}
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
