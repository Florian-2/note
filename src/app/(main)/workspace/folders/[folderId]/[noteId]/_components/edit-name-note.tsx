"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Edit, Loader } from "lucide-react";
import { type UpdateNameNoteType, updateNameNote } from "@/shared/validators/note";
import type { NoteParams } from "@/shared/types";
import { useParams } from "next/navigation";
import { useUpdateNameNote } from "@/hooks/services/notes";
import type { Note } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

type Props = {
    note: Note;
};

export function EditNameNote({ note }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const params = useParams<NoteParams>();

    const form = useForm<UpdateNameNoteType>({
        resolver: zodResolver(updateNameNote),
        defaultValues: {
            name: note.name,
            noteId: params.folderId,
        },
    });
    const { formState } = form;
    const { mutate, isLoading, isSuccess } = useUpdateNameNote(form);

    useEffect(() => {
        if (isSuccess) {
            setIsOpen(false);
        }
    }, [isSuccess]);

    function handelSubmit(values: UpdateNameNoteType) {
        mutate({ noteId: note.id, name: values.name });
    }

    return (
        <Dialog open={isOpen} onOpenChange={(value) => setIsOpen(value)}>
            <DialogTrigger>
                <div className="group flex cursor-pointer gap-4">
                    <h2 className="text-3xl">{note.name}</h2>

                    <Edit
                        className="opacity-0 transition-opacity group-hover:opacity-100"
                        size={17}
                    />
                </div>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-xl">Renomer le fichier</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handelSubmit)} className="space-y-2">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nouveau nom</FormLabel>

                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>

                                    <FormMessage className="text-red-500" />
                                </FormItem>
                            )}
                        />

                        <p className="text-sm text-red-500">{formState.errors.root?.message}</p>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full gap-3 text-base"
                        >
                            {isLoading && <Loader className="animate-spin" />}
                            Enregistrer
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
