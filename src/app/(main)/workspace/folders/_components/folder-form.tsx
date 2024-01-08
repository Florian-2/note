"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { createFolderSchema, type CreateFolderType } from "@/shared/validators/folder";
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
import { useFolders } from "@/context/folders";
import { useEffect } from "react";

type Props = {
    onClose: () => void;
};

export function FolderForm({ onClose }: Props) {
    const { addFolder } = useFolders();

    const form = useForm<CreateFolderType>({
        resolver: zodResolver(createFolderSchema),
        defaultValues: {
            name: "",
        },
    });
    const { formState } = form;
    const { mutate, isLoading, isSuccess } = addFolder(form);

    useEffect(() => {
        if (isSuccess) {
            onClose();
        }
    }, [isSuccess]);

    const onSubmit = (values: CreateFolderType) => mutate({ name: values.name });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nom</FormLabel>

                            <FormControl>
                                <Input {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <p className="text-sm text-destructive">{formState.errors.root?.message}</p>

                <Button type="submit" disabled={isLoading} className="w-full gap-3 text-base">
                    {isLoading && <Loader2 className="animate-spin" />}
                    Enregistrer
                </Button>
            </form>
        </Form>
    );
}
