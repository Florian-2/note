import type { Folder as FolderPrisma } from "@prisma/client";

export type Folder = FolderPrisma & {
    _count: {
        createdBy: number;
        notes: number;
    };
};

export enum SortBy {
    NameAsc = "name.asc",
    NameDesc = "name.desc",
    DateAsc = "date.asc",
    DateDesc = "date.desc",
}
