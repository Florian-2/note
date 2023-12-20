import type { Folder } from "@prisma/client";
import { CreateFolder } from "./create-folder";
import { FolderCard } from "@/components/folder/ui/folder-card";

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
        <div className="grid grid-cols-7 justify-center gap-4">
            <CreateFolder />

            {folders.map((folder) => (
                <FolderCard key={folder.id} folder={folder} />
            ))}
        </div>
    );
}
