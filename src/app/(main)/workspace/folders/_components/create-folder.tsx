"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { FolderForm } from "./folder-form";
import { useState } from "react";
import { CreateFolderButton } from "./ui/button-create";

export function CreateFolder() {
    const [isOpen, setIsOpen] = useState(false);

    const openChange = () => setIsOpen(!isOpen);

    return (
        <Dialog modal={true} open={isOpen} onOpenChange={openChange}>
            <DialogTrigger asChild>
                <CreateFolderButton onClick={openChange} />
            </DialogTrigger>

            <DialogContent className="flex flex-col gap-7">
                <DialogHeader>
                    <DialogTitle className="text-2xl">Nouveau dossier</DialogTitle>
                </DialogHeader>

                <FolderForm onClose={openChange} />
            </DialogContent>
        </Dialog>
    );
}
