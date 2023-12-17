import { ThemeSwitcher } from "@/components/theme";
import { Account } from "@/components/user/account";
import Link from "next/link";

export function Header() {
    return (
        <header className="flex w-full items-center justify-between border-t-[6px] border-primary p-4">
            <Link href="/" className="text-3xl font-medium">
                Note+
            </Link>

            <div className="flex items-center gap-4">
                <Account />

                <ThemeSwitcher />
            </div>
        </header>
    );
}
