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
import { Loader } from "lucide-react";
import type { Folder } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { type RenameFolderType, renameFolderSchema } from "@/shared/validators/folder";
import { useRenameFolder } from "@/hooks/services/folders";
import { useEffect } from "react";

type Props = {
    folder: Folder;
    onCloseModal: () => void;
};

export function RenameFolderForm({ folder, onCloseModal }: Props) {
    const form = useForm<RenameFolderType>({
        resolver: zodResolver(renameFolderSchema),
        defaultValues: {
            name: folder.name,
            folderId: folder.id,
        },
    });
    const { formState } = form;
    const { mutate, isLoading, isSuccess } = useRenameFolder(form);

    useEffect(() => {
        if (isSuccess) {
            onCloseModal();
        }
    }, [isSuccess]);

    function handelSubmit(values: RenameFolderType) {
        mutate({ name: values.name, folderId: folder.id });
    }

    return (
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

                <Button type="submit" disabled={isLoading} className="w-full gap-3 text-base">
                    {isLoading && <Loader className="animate-spin" />}
                    Enregistrer
                </Button>
            </form>
        </Form>
    );
}
