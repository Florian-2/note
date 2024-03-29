import { File, FolderOpenIcon, Star, Trash } from "lucide-react";

export const navItems = [
    {
        name: "Mes dossiers",
        icon: FolderOpenIcon,
        href: "/workspace/folders",
    },
    {
        name: "Mes notes",
        icon: File,
        href: "/workspace/notes",
    },
    {
        name: "Favoris",
        icon: Star,
        href: "/workspace/favorites",
    },
    {
        name: "Corbeille",
        icon: Trash,
        href: "/workspace/trash",
    },
];
