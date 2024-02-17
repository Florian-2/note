import { getAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import Sidebar from "./_components/nav/sidebar";
import Header from "./_components/header";
import { Toaster } from "@/components/ui/toaster";
import { cookies } from "next/headers";

type Props = {
    children: ReactNode;
};

export default async function MainLayout({ children }: Props) {
    const session = await getAuthSession();
    const collapsed = cookies().get("sidebar_is_open");

    const sidebarIsOpen = collapsed ? Boolean(JSON.parse(collapsed.value)) : undefined;
    console.log(sidebarIsOpen);

    if (!session?.user) {
        redirect("/login");
    }

    return (
        <>
            <Header />

            <div className="flex h-screen overflow-hidden">
                <Sidebar open={sidebarIsOpen} />

                <main className="max-h-screen flex-1 overflow-hidden">{children}</main>
            </div>

            <Toaster />
        </>
    );
}
