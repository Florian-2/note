import { getAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

export default async function MainLayout({ children }: Props) {
    const session = await getAuthSession();

    if (!session?.user) {
        redirect("/login");
    }

    return (
        <>
            <aside>Aside</aside>
            <main>{children}</main>
        </>
    );
}
