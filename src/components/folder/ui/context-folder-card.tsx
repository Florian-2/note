import { m } from "framer-motion";
import { ContextMenu, ContextMenuTrigger } from "@/components/ui/context-menu";
import { ContextMenuItems } from "../context-menu/menu";
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

            <ContextMenuItems folder={folder} />
        </ContextMenu>
    );
});

export const ContextFolderCard = m(component);
