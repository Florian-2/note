import { FolderClosedIcon, Star, Trash } from "lucide-react";

export const navItems = [
    {
        name: "Mes dossiers",
        icon: FolderClosedIcon,
        href: "/workspace/folders",
    },
    {
        name: "Favories",
        icon: Star,
        href: "/workspace/favories",
    },
    {
        name: "Corbeille",
        icon: Trash,
        href: "/workspace/trash",
    },
];
