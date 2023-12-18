import { ThemeToggle } from "@/components/theme";
import { Account } from "@/components/user/account";
import { ScrollText } from "lucide-react";

export function Header() {
    return (
        <header className="flex w-full items-center justify-between border-t-[6px] border-primary p-4">
            <div className="flex items-center gap-2">
                <ScrollText className="h-7 w-7" />
                <h1 className="text-2xl font-semibold">Note+</h1>
            </div>

            <div className="flex items-center gap-3">
                <Account />
                <ThemeToggle />
            </div>
        </header>
    );
}
