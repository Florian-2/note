"use client";

import { ContextMenuItem } from "@/components/ui/context-menu";
import type { ContextAction } from "./type";
import type { PropsWithChildren } from "react";
import { Loader } from "lucide-react";

export function ContextMenuFavori({
    onSelect,
    disabled,
    children,
}: PropsWithChildren<ContextAction>) {
    return (
        <ContextMenuItem
            onSelect={onSelect}
            disabled={disabled}
            className="justify-between focus:bg-orange-400/10 focus:text-orange-400 dark:focus:bg-orange-400/10 dark:focus:text-orange-400"
        >
            {children}
            {disabled && <Loader width={16} className="animate-spin" />}
        </ContextMenuItem>
    );
}
