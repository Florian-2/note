"use client";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useDeletesAllArchivedFolders } from "@/hooks/services";
import { Loader2, Trash } from "lucide-react";
import { useState } from "react";

export function DeletesAllFolder() {
    const title = "Vider la corbeille";

    const { isLoading, mutate } = useDeletesAllArchivedFolders();
    const [isClicked, setIsClicked] = useState(false);

    function handleClick() {
        setIsClicked(true);
        mutate();
    }

    return (
        <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
                <Button
                    variant={"outline"}
                    className="group border-2 border-destructive hover:bg-destructive"
                    onClick={handleClick}
                    disabled={isClicked}
                >
                    {isLoading ? (
                        <Loader2 size={22} className="animate-spin" />
                    ) : (
                        <Trash
                            size={22}
                            className="text-red-500 transition-colors group-hover:text-white"
                        />
                    )}

                    <span className="sr-only">{title}</span>
                </Button>
            </TooltipTrigger>

            <TooltipContent>
                <p>{title}</p>
            </TooltipContent>
        </Tooltip>
    );
}
