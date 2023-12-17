import type { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

export default function MainLayout({ children }: Props) {
    return (
        <>
            <aside>Aside</aside>
            <main>{children}</main>
        </>
    );
}
