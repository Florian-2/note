import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

type Props = {
    onClick: () => void;
};

export function CreateFolderButton({ onClick }: Props) {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    variant={"outline"}
                    className="h-full w-full border-2 border-dashed dark:border-foreground/60"
                    onClick={onClick}
                >
                    <Plus />
                    <span className="sr-only">Créer un dossier</span>
                </Button>
            </TooltipTrigger>

            <TooltipContent align="center" side="bottom">
                <p>Créer un dossier</p>
            </TooltipContent>
        </Tooltip>
    );
}
