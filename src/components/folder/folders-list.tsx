import type { Folder } from "@prisma/client";
import { FolderCard } from "./ui/folder-card";

type Props = {
    folders: (Folder & {
        _count: {
            createdBy: number;
            notes: number;
        };
    })[];
};

export function FoldersList({ folders }: Props) {
    return (
        <section className="flex flex-wrap gap-4">
            {folders.map((folder) => (
                <FolderCard key={folder.id} folder={folder} />
            ))}
        </section>
    );
}
