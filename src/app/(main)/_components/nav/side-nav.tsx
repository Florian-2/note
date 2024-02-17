"use client";
import Link from "next/link";

import { type NavItem } from "@/shared/interfaces";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface SideNavProps {
    isOpen: boolean;
    items: NavItem[];
    setOpen?: (open: boolean) => void;
    className?: string;
}

export function SideNav({ items, isOpen, setOpen, className }: SideNavProps) {
    const path = usePathname();
    const [openItem, setOpenItem] = useState("");
    const [lastOpenItem, setLastOpenItem] = useState("");

    useEffect(() => {
        if (isOpen) {
            setOpenItem(lastOpenItem);
        } else {
            setLastOpenItem(openItem);
            setOpenItem("");
        }
    }, [isOpen]);

    return (
        <nav className="space-y-2">
            {items.map((item) => (
                <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => {
                        if (setOpen) setOpen(false);
                    }}
                    className={cn(
                        buttonVariants({ variant: "ghost" }),
                        "group relative flex h-12 justify-start font-normal",
                        path === item.href && "bg-muted hover:bg-muted",
                    )}
                >
                    <div className="flex items-center gap-4">
                        <item.icon className={"h-5 w-5"} />
                        <span className={cn("text-base duration-200", !isOpen && className)}>
                            {item.name}
                        </span>
                    </div>
                </Link>
            ))}
        </nav>
    );
}
