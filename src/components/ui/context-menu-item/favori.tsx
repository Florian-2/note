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
        <ContextMenuItem onSelect={onSelect} disabled={disabled} className="justify-between">
            {children}
            {disabled && <Loader width={16} className="animate-spin" />}
        </ContextMenuItem>
    );
}
