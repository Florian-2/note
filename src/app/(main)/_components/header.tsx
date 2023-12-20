import { MobileSidebar } from "./nav/mobile-sidebar";
import { ThemeToggle } from "@/components/theme";
import { PopoverAccount } from "@/components/user/popover-account";

export default function Header() {
    return (
        <div className="supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 h-14 border-b bg-background/95 px-2 backdrop-blur md:px-4">
            <nav className="flex h-full items-center justify-between">
                <h1 className="hidden text-xl font-semibold md:block">Note+</h1>

                <div className="block md:!hidden">
                    <MobileSidebar />
                </div>

                <div className="flex items-center gap-3">
                    <PopoverAccount />
                    <ThemeToggle />
                </div>
            </nav>
        </div>
    );
}
