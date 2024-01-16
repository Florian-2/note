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
import { type Folder, SortBy } from "@/shared/types/folders";

type FoldersContext = {
    folders: Folder[];
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

    return (
        <FoldersContext.Provider
            value={{
                folders: sortedFolderList,

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
