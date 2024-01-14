"use client";

import { folderCardVariant } from "@/animations/folder";
import { ContextFolderCard } from "@/components/folder/ui/context-folder-card";
import { FolderGrid } from "@/components/folder/ui/folder-grid";
import type { FolderWithCount } from "@/shared/types";
import { AnimatePresence } from "framer-motion";

type Props = {
    folders: FolderWithCount[];
};

export function FoldersList({ folders }: Props) {
    return (
        <FolderGrid>
            <AnimatePresence initial={false}>
                {folders?.map((folder) => (
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
    );
}
