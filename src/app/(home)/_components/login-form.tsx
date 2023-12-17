"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

export function LoginForm() {
    return (
        <div className="flex flex-col gap-3">
            <Button
                onClick={() => signIn("github")}
                className="gap-6 py-7 text-lg"
            >
                <Github />
                Github
            </Button>

            <Button
                onClick={() => signIn("discord")}
                variant={"none"}
                className="bg-discord gap-6 py-7 text-lg dark:text-white"
            >
                <Image
                    src="/discord.svg"
                    alt="icon Discord"
                    width={25}
                    height={25}
                />
                Discord
            </Button>
        </div>
    );
}
