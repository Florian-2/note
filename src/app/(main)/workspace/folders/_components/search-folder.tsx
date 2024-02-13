"use client";

import type { FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FolderSearch } from "lucide-react";

export function SearchFolder() {
    console.log("render <SearchFolder/>");

    const searchParams = useSearchParams();

    function handleSubmit(e: FormEvent) {
        e.preventDefault();

        const form = e.currentTarget as HTMLFormElement;
        const query = new FormData(form).get("query");
        const searchQueryParams = searchParams.get("query");

        if (searchQueryParams === query) return;

        form.submit();
    }

    return (
        <form onSubmit={handleSubmit} method="GET" className="flex items-center gap-2">
            <Input
                name="query"
                defaultValue={searchParams.get("query") ?? ""}
                placeholder="Rechercher un dossier"
                className="h-fit p-3 md:min-w-[250px]"
            />

            <Button variant={"secondary"} type="submit" className="h-full">
                <FolderSearch strokeWidth={1.5} />
                <span className="sr-only">Rechercher un dossier</span>
            </Button>
        </form>
    );
}
