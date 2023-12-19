import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

type Props = {
    onClick: () => void;
};

export function CreateFolderButton({ onClick }: Props) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        variant={"outline"}
                        className="h-36 w-36 border-2 border-dashed dark:border-foreground/60"
                        onClick={onClick}
                    >
                        <Plus />
                    </Button>
                </TooltipTrigger>

                <TooltipContent align="center" side="bottom">
                    <p>Créer un dossier</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
