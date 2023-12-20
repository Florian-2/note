"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { api } from "@/trpc/react";
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

type Props = {
    onClose: () => void;
};

export function FolderForm({ onClose }: Props) {
    const router = useRouter();
    const { mutate, isLoading } = api.folders.create.useMutation({
        onError(error) {
            if (error.data?.code === "CONFLICT") {
                return form.setError("name", {
                    message: "Ce nom de dossier est déjà utilisé",
                });
            }

            if (error.data?.zodError) {
                return form.setError("root", { message: "La validation du formulaire a échoué" });
            }
        },
        onSuccess() {
            router.refresh();

            onClose();
        },
    });

    const form = useForm<CreateFolderType>({
        resolver: zodResolver(createFolderSchema),
        defaultValues: {
            name: "",
        },
    });
    const { formState } = form;

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
