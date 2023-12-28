"use client";

import { type Folder, SortBy } from "@/shared/types/folders";
import {
    type ReactNode,
    createContext,
    useState,
    useContext,
    // useEffect,
    useMemo,
    type Dispatch,
    type SetStateAction,
} from "react";

type FoldersContext = {
    folders: Folder[];
    setFoldersList: Dispatch<SetStateAction<Folder[]>>;
    deleteFolder: (id: string) => void;
    addFolder: (newFolder: Folder) => void;
    orderBy: SortBy;
    setOrderBy: Dispatch<SetStateAction<SortBy>>;
};

export const FoldersContext = createContext<FoldersContext | null>(null);

type Props = {
    children: ReactNode;
    folders: Folder[];
};

export function FoldersProvider({ children, folders }: Props) {
    const [orderBy, setOrderBy] = useState(SortBy.NameAsc);
    const [foldersList, setFoldersList] = useState<Folder[]>(() => sortBy(folders));

    console.log(1);

    const sortedFolderList = useMemo(() => {
        console.log("useMemo");
        return sortBy(foldersList);
    }, [foldersList, orderBy]);

    // useEffect(() => {
    //     console.log("useEffect");
    //     setFoldersList(sortBy(foldersList));
    // }, [orderBy]);

    function deleteFolder(id: string) {
        const newFolderList = foldersList.filter((folder) => folder.id !== id);
        setFoldersList(newFolderList);
    }

    function addFolder(newFolder: Folder) {
        const newFolderList = [...foldersList, newFolder];
        setFoldersList(newFolderList);
    }

    function sortBy(folders: Folder[]): Folder[] {
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
                return foldersList;
        }
    }

    return (
        <FoldersContext.Provider
            value={{
                folders: sortedFolderList,
                setFoldersList,
                deleteFolder,
                addFolder,
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
