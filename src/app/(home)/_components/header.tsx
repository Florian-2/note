import { ThemeSwitcher } from "@/components/theme";

import Link from "next/link";

export function Header() {
    return (
        <header className="flex w-full items-center justify-between border-t-[6px] border-primary p-4">
            <Link href="/" className="text-3xl font-medium">
                Note+
            </Link>

            <ThemeSwitcher />
        </header>
    );
}
