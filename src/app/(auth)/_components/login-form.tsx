"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function LoginForm() {
    return (
        <div>
            <Button onClick={() => signIn("github")}>github</Button>
            <Button onClick={() => signIn("discord")}>discord</Button>
        </div>
    );
}
