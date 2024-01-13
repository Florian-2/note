"use client";

import { ContextMenuItem } from "@/components/ui/context-menu";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";

type Props = {
    copyValue: string;
};

export function ContextMenuCopy({ copyValue }: Props) {
    const [, copy] = useCopyToClipboard();

    return <ContextMenuItem onSelect={() => copy(copyValue)}>Copier le nom</ContextMenuItem>;
}
