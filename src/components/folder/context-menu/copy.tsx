"use client";

import { ContextMenuItem } from "@/components/ui/context-menu";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";

type Props = {
    folderName: string;
};

export function CopyFolderNameButton({ folderName }: Props) {
    const [, copy] = useCopyToClipboard();

    return <ContextMenuItem onSelect={() => copy(folderName)}>Copier le nom</ContextMenuItem>;
}
