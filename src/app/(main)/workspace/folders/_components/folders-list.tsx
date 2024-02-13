"use client";

import { AnimatePresence } from "framer-motion";
import { ContextFolderCard } from "@/components/folder/ui/context-folder-card";
import { CreateFolder } from "./create-folder";
import { useFolders } from "@/context/folders";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SelectOrderBy } from "./ui/select-sort";
import { folderCardVariant } from "@/animations/folder";
import { SearchFolder } from "./search-folder";
import { FolderGrid } from "@/components/folder/ui/folder-grid";
import { type FolderWithCount } from "@/shared/types";

type Props = {
    folders: FolderWithCount[];
};

export function FoldersList({ folders }: Props) {
    const { folders: foldersList, orderBy, setOrderBy } = useFolders(folders);

    return (
        <section className="grid h-full grid-rows-layout gap-10 px-3 pt-20 md:px-6">
            <div className="flex flex-col gap-2 md:flex-row md:justify-between">
                <SearchFolder />
                <SelectOrderBy defaultValue={orderBy} onChange={(value) => setOrderBy(value)} />
            </div>

            <ScrollArea>
                <FolderGrid>
                    <CreateFolder />

                    <AnimatePresence initial={false}>
                        {foldersList.map((folder) => (
                            <ContextFolderCard
                                key={folder.id}
                                folder={folder}
                                variants={folderCardVariant}
                                initial="add"
                                animate="current"
                                exit="remove"
                            />
                        ))}
                    </AnimatePresence>
                </FolderGrid>
            </ScrollArea>
        </section>
    );
}
