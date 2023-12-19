import Link from "next/link";
import type { Folder } from "@prisma/client";
import { IconFolder, IconFolderEmpty } from "@/components/folder/icons";
import { Badge } from "@/components/ui/badge";
import { colors } from "@/constants/colors";

type Props = {
    folder: Folder & {
        _count: {
            notes: number;
        };
    };
};

export function FolderCard({ folder }: Props) {
    const countNotes = folder._count.notes;
    const color = colors.filter((color) => color.name === folder.color)[0];

    return (
        <Link
            href={`folders/${folder.id}`}
            className="rounded-md px-7 py-4 transition-colors duration-300 hover:bg-muted"
        >
            <article className="flex flex-col items-center gap-1">
                <div className="relative">
                    {countNotes ? (
                        <IconFolder color={color?.primary} gradient={color?.gradient} />
                    ) : (
                        <IconFolderEmpty color={color?.primary} gradient={color?.gradient} />
                    )}

                    {countNotes >= 1 && (
                        <Badge className="absolute -right-3.5 top-0">{countNotes}</Badge>
                    )}
                </div>

                <p>{folder.name}</p>
            </article>
        </Link>
    );
}
