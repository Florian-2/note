import { ContextMenuItem } from "@/components/ui/context-menu";
import { Loader } from "lucide-react";
import type { ContextAction } from "./type";
import { forwardRef } from "react";

export const ContextMenuDelete = forwardRef<HTMLDivElement, ContextAction>(
    ({ onSelect, disabled }, ref) => {
        return (
            <ContextMenuItem
                ref={ref}
                variant={"destructive"}
                disabled={disabled}
                onSelect={onSelect}
            >
                Supprimer
                {disabled && <Loader width={16} className="animate-spin" />}
            </ContextMenuItem>
        );
    },
);
