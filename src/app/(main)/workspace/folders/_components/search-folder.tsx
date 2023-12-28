"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { api } from "@/trpc/react";
import { Button } from "@/components/ui/button";
import { type SearchFolderType, searchFolderSchema } from "@/shared/validators/folder";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FolderSearch, Loader2 } from "lucide-react";
import { useFolders } from "@/context/folders";

export function SearchFolder() {
    const { setFoldersList } = useFolders();
    const { mutate, isLoading } = api.folders.searchFolder.useMutation({
        onSuccess(data) {
            setFoldersList(data);
        },
    });

    const form = useForm<SearchFolderType>({
        resolver: zodResolver(searchFolderSchema),
        defaultValues: {
            query: "",
        },
    });

    function onSubmit(values: SearchFolderType) {
        mutate({ query: values.query });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center gap-2">
                <FormField
                    control={form.control}
                    name="query"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input {...field} placeholder="Rechercher un dossier" />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" disabled={isLoading} className="px-2">
                    {isLoading ? <Loader2 className="animate-spin" /> : <FolderSearch />}
                    <span className="sr-only">Rechercher un dossier</span>
                </Button>
            </form>
        </Form>
    );
}
