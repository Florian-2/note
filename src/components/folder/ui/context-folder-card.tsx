import { motion } from "framer-motion";
import { ContextMenu, ContextMenuContent, ContextMenuTrigger } from "@/components/ui/context-menu";
import { DeleteFolderButton, CopyFolderNameButton } from "../context-menu";
import { forwardRef } from "react";
import type { FolderWithCount } from "@/shared/types";
import { FolderCard } from "./folder-card";
import { folderCardVariant } from "@/animations/folder";

type Props = {
    folder: FolderWithCount;
};

const component = forwardRef<HTMLElement, Props>(function Folder({ folder }, ref) {
    return (
        <ContextMenu>
            <ContextMenuTrigger>
                <FolderCard
                    ref={ref}
                    folder={folder}
                    variants={folderCardVariant}
                    initial="add"
                    animate="current"
                    exit="remove"
                />
            </ContextMenuTrigger>

            <ContextMenuContent>
                <CopyFolderNameButton folderName={folder.name} />
                <DeleteFolderButton id={folder.id} />
            </ContextMenuContent>
        </ContextMenu>
    );
});

export const ContextFolderCard = motion(component);
