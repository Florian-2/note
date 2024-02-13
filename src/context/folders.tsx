import { useState, useMemo } from "react";
import { type Folder, SortBy } from "@/shared/types/folders";

export const useFolders = (initialFoldersList: Folder[]) => {
    const [orderBy, setOrderBy] = useState(SortBy.NameAsc);

    const sortedFolderList = useMemo(() => {
        const newFolderList = initialFoldersList.slice();

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
                return initialFoldersList;
        }
    }, [orderBy, initialFoldersList]);

    return { folders: sortedFolderList, orderBy, setOrderBy };
};
