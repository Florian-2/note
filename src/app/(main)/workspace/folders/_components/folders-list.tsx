"use client";

import { FolderCard } from "@/components/folder/ui/folder-card";
import { CreateFolder } from "./create-folder";
import { useFolders } from "@/context/folders";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function FoldersList() {
    const { folders } = useFolders();

    return (
        <section className="grid h-full grid-cols-1 grid-rows-layout gap-3">
            <div className="">
                <CreateFolder />

                <Input />
                <Button>Rechercher</Button>
                <Button>ASC</Button>
                <Button>desc</Button>
            </div>

            <ScrollArea>
                <div className="grid grid-cols-folders gap-2">
                    {folders.map((folder) => (
                        <FolderCard key={folder.id} folder={folder} />
                    ))}
                </div>
            </ScrollArea>
        </section>
    );
}
