"use client";

import { api } from "@/trpc/react";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { type MoveNoteType, moveNoteSchema } from "@/shared/validators/note";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Check, ChevronUp, Loader } from "lucide-react";
import { useMoveNote } from "@/hooks/services/notes/useMoveNote";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";

type Props = {
    folderId: string;
    noteId: string;
    onCloseModal: () => void;
};

export function MoveNoteForm({ folderId, noteId, onCloseModal }: Props) {
    const { data } = api.folders.getAllFolderLight.useQuery();
    const folders = data?.filter((folder) => folder.id !== folderId);

    const form = useForm<MoveNoteType>({
        resolver: zodResolver(moveNoteSchema),
        defaultValues: {
            folderId: "",
            noteId,
        },
    });
    const { formState } = form;
    const { mutate, isLoading, isSuccess } = useMoveNote(form);

    useEffect(() => {
        if (isSuccess) {
            onCloseModal();
        }
    }, [isSuccess]);

    function handelSubmit({ folderId }: MoveNoteType) {
        console.log(1);

        mutate({ folderId, noteId });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handelSubmit)} className="space-y-2">
                <FormField
                    control={form.control}
                    name="folderId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Dossiers</FormLabel>

                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            className={cn(
                                                "w-[200px] justify-between",
                                                !field.value && "text-muted-foreground",
                                            )}
                                        >
                                            {field.value
                                                ? folders?.find(
                                                      (folder) => folder.id === field.value,
                                                  )?.name
                                                : "Sélectionner un dossier"}

                                            <ChevronUp className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>

                                <PopoverContent className="p-0">
                                    <Command>
                                        <CommandInput placeholder="Rechercher un dossier" />
                                        <CommandEmpty>Aucun résultat...</CommandEmpty>

                                        <CommandGroup>
                                            {folders?.map((folder) => (
                                                <CommandItem
                                                    key={folder.id}
                                                    value={folder.name}
                                                    onSelect={() =>
                                                        form.setValue("folderId", folder.id)
                                                    }
                                                >
                                                    {folder.name}
                                                    <Check
                                                        className={cn(
                                                            "ml-auto h-4 w-4",
                                                            folder.id === field.value
                                                                ? "opacity-100"
                                                                : "opacity-0",
                                                        )}
                                                    />
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </Command>
                                </PopoverContent>
                            </Popover>

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
