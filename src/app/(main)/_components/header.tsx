import { ScrollText } from "lucide-react";
import { MobileSidebar } from "./nav/mobile-sidebar";
import { ThemeToggle } from "@/components/theme";
import { Account } from "@/components/user/account";

export default function Header() {
    return (
        <div className="supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 h-14 border-b bg-background/95 px-2 backdrop-blur md:px-4">
            <nav className="flex h-full items-center justify-between">
                <div className="hidden items-center justify-between gap-2 md:flex">
                    <ScrollText className="h-6 w-6" />
                    <h1 className="text-lg font-semibold">Note+</h1>
                </div>

                <div className="block md:!hidden">
                    <MobileSidebar />
                </div>

                <div className="flex items-center gap-3">
                    <Account />
                    <ThemeToggle />
                </div>
            </nav>
        </div>
    );
}
