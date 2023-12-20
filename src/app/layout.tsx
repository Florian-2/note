import "@/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";

import { TRPCReactProvider } from "@/trpc/react";
import { ThemeProvider } from "@/components/theme";
import { AuthProvider } from "@/components/user/auth-provider";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-sans",
});

export const metadata = {
    title: "Note+",
    description: "Generated by create-t3-app",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="fr" suppressHydrationWarning>
            <body className={`font-sans ${inter.variable} flex flex-col`}>
                <TRPCReactProvider cookies={cookies().toString()}>
                    <AuthProvider>
                        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                            <TooltipProvider>{children}</TooltipProvider>
                        </ThemeProvider>
                    </AuthProvider>
                </TRPCReactProvider>
            </body>
        </html>
    );
}
