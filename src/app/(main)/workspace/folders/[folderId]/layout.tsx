import { type ReactNode } from "react";

type Props = {
    children: ReactNode;
};

export default function Layout({ children }: Props) {
    return <div className="h-screen border-4 border-red-500">{children}</div>;
}
