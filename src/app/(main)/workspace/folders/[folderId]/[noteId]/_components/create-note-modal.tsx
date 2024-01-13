"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { CreateNoteForm } from "./create-form";

export function CreateNoteModal() {
    const [isOpen, setIsOpen] = useState(false);

    const openChange = () => setIsOpen(!isOpen);

    return (
        <Dialog modal={true} open={isOpen} onOpenChange={openChange}>
            <DialogTrigger asChild>
                <Button
                    variant={"secondary"}
                    className="h-fit w-full gap-2 py-3 text-base font-medium"
                >
                    <Plus width={22} /> Créer une note
                </Button>
            </DialogTrigger>

            <DialogContent className="flex flex-col gap-7">
                <DialogHeader>
                    <DialogTitle className="text-xl">Créer une note</DialogTitle>
                </DialogHeader>

                <CreateNoteForm handleClose={openChange} />
            </DialogContent>
        </Dialog>
    );
}
