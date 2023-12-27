"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { api } from "@/trpc/react";
import { Button } from "@/components/ui/button";
import { createFolderSchema, type CreateFolderType } from "@/shared/validators/folder";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FolderSearch, Loader2 } from "lucide-react";
import { useFolders } from "@/context/folders";

export function SearchFolder() {
    // const { addFolder } = useFolders();
    const { mutate, isLoading } = api.folders.create.useMutation({
        onError(error) {
            if (error.data?.zodError) {
                return form.setError("root", { message: "La validation du formulaire a échoué" });
            }
        },
        onSuccess(data) {
            console.log(data);
        },
    });

    const form = useForm<CreateFolderType>({
        resolver: zodResolver(createFolderSchema),
        defaultValues: {
            name: "",
        },
    });

    function onSubmit(values: CreateFolderType) {
        mutate({ name: values.name });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input {...field} placeholder="Rechercher un dossier" />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" disabled={isLoading}>
                    {isLoading && <Loader2 className="animate-spin" />}
                    <FolderSearch />
                    <span className="sr-only">Rechercher un dossier</span>
                </Button>
            </form>
        </Form>
    );
}
