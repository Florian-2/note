import { ContextMenuItem } from "@/components/ui/context-menu";
import { Loader2 } from "lucide-react";

type Props = {
    disabled: boolean;
    onSelect: (e: Event) => void;
};

export function ContextMenuDelete({ onSelect, disabled }: Props) {
    return (
        <ContextMenuItem
            className="justify-between text-destructive focus:bg-destructive/10 focus:text-destructive dark:text-red-500 dark:focus:bg-red-500/10 dark:focus:text-red-500"
            disabled={disabled}
            onSelect={onSelect}
        >
            Supprimer
            {disabled && <Loader2 width={16} className="animate-spin" />}
        </ContextMenuItem>
    );
}
