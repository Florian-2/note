"use client";

import { m } from "framer-motion";
import { ContextMenu, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";
import { ContextMenuItems } from "../context-menu/menu";
import { forwardRef, useState } from "react";
import type { FolderWithCount } from "@/shared/types";
import { FolderCard } from "./folder-card";
import { folderCardVariant } from "@/animations/folder";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { RenameFolderForm } from "../form-rename";

type Props = {
    folder: FolderWithCount;
};

const component = forwardRef<HTMLElement, Props>(function Folder({ folder }, ref) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Dialog open={isOpen} onOpenChange={(value) => setIsOpen(value)}>
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

                <ContextMenuItems folder={folder}>
                    <DialogTrigger asChild>
                        <ContextMenuItem>Renommer</ContextMenuItem>
                    </DialogTrigger>
                </ContextMenuItems>
            </ContextMenu>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Renomer le dossier</DialogTitle>
                </DialogHeader>

                <RenameFolderForm folder={folder} onCloseModal={() => setIsOpen(false)} />
            </DialogContent>
        </Dialog>
    );
});

export const ContextFolderCard = m(component);
