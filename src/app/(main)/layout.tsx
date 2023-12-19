import { getAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import Sidebar from "./_components/nav/sidebar";
import Header from "./_components/header";

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
            <Header />

            <div className="flex h-screen overflow-hidden">
                <Sidebar />

                <main className="flex-1 overflow-y-auto overflow-x-hidden px-3 pt-16">
                    {children}
                </main>
            </div>
        </>
    );
}
