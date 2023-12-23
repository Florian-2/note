"use client";

import { FolderCard } from "@/components/folder/ui/folder-card";
import { CreateFolder } from "./create-folder";
import { useFolders } from "@/context/folders";

export function FoldersList() {
    const { folders } = useFolders();

    return (
        <section className="flex flex-wrap gap-4">
            <CreateFolder />

            {folders.map((folder) => (
                <FolderCard key={folder.id} folder={folder} />
            ))}
        </section>
    );
}
