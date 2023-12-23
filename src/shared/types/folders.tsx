import type { Folder as FolderPrisma } from "@prisma/client";

export type Folder = FolderPrisma & {
    _count: {
        createdBy: number;
        notes: number;
    };
};
