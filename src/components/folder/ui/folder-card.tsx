"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { forwardRef } from "react";
import { IconFolder, IconFolderEmpty } from "../icons";
import { Badge } from "@/components/ui/badge";
import type { FolderWithCount } from "@/shared/types";

type Props = {
    folder: FolderWithCount;
    asLink?: boolean;
};

const component = forwardRef<HTMLDivElement, Props>(function Folder(
    { folder, asLink = true },
    ref,
) {
    const countNotes = folder._count.notes;

    const card = (
        <div
            ref={ref}
            className="flex h-full w-full flex-col items-center justify-center gap-1 rounded-md p-4 transition-colors duration-200 hover:bg-muted"
        >
            <div className="relative">
                {countNotes ? <IconFolder /> : <IconFolderEmpty />}

                {countNotes >= 1 && (
                    <Badge className="absolute -right-3.5 top-0">{countNotes}</Badge>
                )}
            </div>

            <p className="w-full truncate text-center">{folder.name}</p>
        </div>
    );

    return asLink ? <Link href={`/workspace/folders/${folder.id}`}>{card}</Link> : card;
});

export const FolderCard = motion(component);
