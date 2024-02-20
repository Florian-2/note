import { useState, useMemo } from "react";
import { type FolderWithCount, SortBy } from "@/shared/types/folders";
import { type Note } from "@prisma/client";

type SortableItem = FolderWithCount | Note;

export const useSortBy = <T extends SortableItem>(
    initialFoldersList: T[],
    sortBy = SortBy.NameAsc,
) => {
    const [orderBy, setOrderBy] = useState(sortBy);

    const sortedFolderList: T[] = useMemo(() => {
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

            case SortBy.Favorite:
                return newFolderList.sort((a, b) => {
                    if (a.isFavorite && !b.isFavorite) {
                        return -1;
                    }
                    if (!a.isFavorite && b.isFavorite) {
                        return 1;
                    }
                    return 0;
                });

            default:
                return initialFoldersList;
        }
    }, [orderBy, initialFoldersList]);

    return { data: sortedFolderList, orderBy, setOrderBy };
};
