"use client";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useRestoresAllArchivedFolders } from "@/hooks/services/folders";
import { ArchiveRestore, Loader } from "lucide-react";
import { useState } from "react";

export function RestoresAllFolder() {
    const title = "Restaurer tous les dossiers";

    const { isLoading, mutate } = useRestoresAllArchivedFolders();
    const [isClicked, setIsClicked] = useState(false);

    function handleClick() {
        setIsClicked(true);
        mutate();
    }

    return (
        <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
                <Button variant={"secondary"} onClick={handleClick} disabled={isClicked}>
                    {isLoading ? (
                        <Loader size={22} className="animate-spin" />
                    ) : (
                        <ArchiveRestore size={22} />
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
