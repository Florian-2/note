import type { ReactNode } from "react";
import { Header } from "./_components/header";

type Props = {
    children: ReactNode;
};

export default function HomeLayout({ children }: Props) {
    return (
        <>
            <Header />

            <main className="flex flex-grow items-center justify-center p-4">
                {children}
            </main>
        </>
    );
}
