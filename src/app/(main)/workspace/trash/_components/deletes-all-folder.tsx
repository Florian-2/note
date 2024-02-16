"use client";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useDeletesAllArchivedFolders } from "@/hooks/services/folders";
import { Loader, Trash } from "lucide-react";
import { useState } from "react";

const TITLE = "Vider la corbeille";

export function DeletesAllFolder() {
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
                        <Loader size={22} className="animate-spin" />
                    ) : (
                        <Trash
                            size={22}
                            className="text-red-500 transition-colors group-hover:text-white"
                        />
                    )}

                    <span className="sr-only">{TITLE}</span>
                </Button>
            </TooltipTrigger>

            <TooltipContent>
                <p>{TITLE}</p>
            </TooltipContent>
        </Tooltip>
    );
}
