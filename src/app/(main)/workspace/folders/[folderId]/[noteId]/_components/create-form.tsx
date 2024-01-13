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
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useCreateNote } from "@/hooks/services/notes";
import { createNoteSchema, type CreateNoteType } from "@/shared/validators/note";
import { useParams } from "next/navigation";
import type { NoteParams } from "@/shared/types";

type Props = {
    handleClose: () => void;
};

export function CreateNoteForm({ handleClose }: Props) {
    const params = useParams<NoteParams>();

    const form = useForm<CreateNoteType>({
        resolver: zodResolver(createNoteSchema),
        defaultValues: {
            name: "",
            folderId: params.folderId,
        },
    });
    const { formState } = form;
    const { mutate, isLoading, isSuccess } = useCreateNote(form);

    useEffect(() => {
        if (isSuccess) {
            handleClose();
        }
    }, [isSuccess]);

    function handelSubmit(values: CreateNoteType) {
        mutate({ name: values.name, folderId: params.folderId });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handelSubmit)} className="space-y-2">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nom du fichier</FormLabel>

                            <FormControl>
                                <Input {...field} />
                            </FormControl>

                            <FormMessage className="text-red-500" />
                        </FormItem>
                    )}
                />

                <p className="text-sm text-red-500">{formState.errors.root?.message}</p>

                <Button type="submit" disabled={isLoading} className="w-full gap-3 text-base">
                    {isLoading && <Loader2 className="animate-spin" />}
                    Enregistrer
                </Button>
            </form>
        </Form>
    );
}
