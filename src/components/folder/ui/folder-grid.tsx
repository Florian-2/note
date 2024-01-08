import type { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

export function FolderGrid({ children }: Props) {
    return (
        <div className="grid auto-rows-[140px] grid-cols-2 grid-rows-[140px] gap-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
            {children}
        </div>
    );
}
