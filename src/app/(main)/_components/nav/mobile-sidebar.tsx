"use client";

import { useState } from "react";
import { MenuIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { navItems } from "@/constants/nav";
import { SideNav } from "./side-nav";

export function MobileSidebar() {
    const [open, setOpen] = useState(false);

    return (
        <Sheet open={open} onOpenChange={setOpen} modal={true}>
            <SheetTrigger asChild>
                <div className="flex items-center gap-2">
                    <MenuIcon />
                    <h1 className="text-xl font-semibold">Note+</h1>
                </div>
            </SheetTrigger>

            <SheetContent side="left" className="w-72">
                <div className="pt-16">
                    <SideNav items={navItems} setOpen={setOpen} />
                </div>
            </SheetContent>
        </Sheet>
    );
}
