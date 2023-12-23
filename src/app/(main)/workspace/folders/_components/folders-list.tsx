"use client";

import { api } from "@/trpc/react";
import { CreateFolder } from "./create-folder";
import { FolderCard } from "@/components/folder/ui/folder-card";
import { Loader2 } from "lucide-react";

export function FoldersList() {
    const { data: folders, isLoading } = api.folders.getAllFolders.useQuery();

    if (isLoading) {
        return (
            <div className="flex h-full items-center justify-center">
                <Loader2 className="animate-spin" size={40} />
            </div>
        );
    }

    return (
        <div className="grid grid-cols-7 justify-center gap-4">
            <CreateFolder />

            {folders?.map((folder) => <FolderCard key={folder.id} folder={folder} />)}
        </div>
    );
}
