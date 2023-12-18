import { FolderClosedIcon, Star, Trash, UserCog2 } from "lucide-react";

export const navItems = [
    {
        name: "Favories",
        icon: Star,
        href: "/favories",
    },
    {
        name: "Corbeille",
        icon: Trash,
        href: "/trash",
    },
    {
        name: "Mes dossiers",
        icon: FolderClosedIcon,
        href: "/folders",
    },
    {
        name: "Mon compte",
        icon: UserCog2,
        href: "/user",
    },
];
