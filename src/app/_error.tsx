"use client";

import { ClientError } from "@/lib/error";
import Image from "next/image";

type Props = {
    error: Error;
};

export default function ErrorPage({ error }: Props) {
    const message =
        error instanceof ClientError ? error.message : "Une erreur est survenu";

    return (
        <div className="flex flex-col items-center gap-4">
            <Image
                src="/undraw_warning.svg"
                alt="error"
                width={200}
                height={200}
            />
            <p className="text-xl font-medium text-destructive">{message}</p>
        </div>
    );
}
