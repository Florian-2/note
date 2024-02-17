"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/hooks/useSidebar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { navItems } from "@/constants/nav";
import { SideNav } from "./side-nav";

interface SidebarProps {
    open: boolean | undefined;
    className?: string;
}

export default function Sidebar({ open, className }: SidebarProps) {
    const [isOpen, setIsOpen] = useState(open ?? true);

    const [swith, setSwitch] = useState(false);

    const handleToggle = () => {
        const open = !isOpen;
        setSwitch(true);
        setIsOpen(open);
        document.cookie = `sidebar_is_open=${open};`;
        setTimeout(() => setSwitch(false), 200);
    };

    return (
        <aside className="flex flex-col">
            <nav
                className={cn(
                    `relative hidden h-screen border-r pt-16 md:block`,
                    swith && "duration-200",
                    isOpen ? "w-64" : "w-[78px]",
                    className,
                )}
            >
                <div className="space-y-4 py-4">
                    <div className="px-3 py-2">
                        <div className="mt-3 space-y-1">
                            <SideNav
                                isOpen={isOpen}
                                className="text-background opacity-0 transition-all duration-300 group-hover:z-50 group-hover:ml-4 group-hover:rounded group-hover:bg-foreground group-hover:p-2 group-hover:opacity-100"
                                items={navItems}
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-30 absolute bottom-5 w-full space-y-2 px-3">
                    <Separator />
                    <Button
                        onClick={handleToggle}
                        className={cn("h-10 w-full bg-foreground", isOpen && "rotate-180")}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </nav>
        </aside>
    );
}
