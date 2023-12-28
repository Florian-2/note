"use client";

import { AnimatePresence } from "framer-motion";
import { FolderCard } from "@/components/folder/ui/folder-card";
import { CreateFolder } from "./create-folder";
import { useFolders } from "@/context/folders";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SelectOrderBy } from "./ui/select-sort";
import { folderCardVariant } from "@/animations/folder";
import { SearchFolder } from "./search-folder";

export function FoldersList() {
    const { folders, orderBy, setOrderBy } = useFolders();

    return (
        <section className="grid h-full grid-rows-layout gap-3">
            <div className="flex flex-col gap-2">
                <SearchFolder />
                <SelectOrderBy defaultValue={orderBy} onChange={(value) => setOrderBy(value)} />
            </div>

            <ScrollArea>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
                    <CreateFolder />

                    <AnimatePresence initial={false}>
                        {folders.map((folder) => (
                            <FolderCard
                                key={folder.id}
                                folder={folder}
                                variants={folderCardVariant}
                                initial="add"
                                animate="current"
                                exit="remove"
                            />
                        ))}
                    </AnimatePresence>
                </div>
            </ScrollArea>
        </section>
    );
}
