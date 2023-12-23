"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { LogoutButton } from "./logout-button";
import { Thumbnail } from "./thumbnail";
import { Button } from "../ui/button";

export function PopoverAccount() {
    const { data, status } = useSession();

    if (status === "unauthenticated") {
        return undefined;
    }

    return (
        <Popover>
            <PopoverTrigger>
                <Thumbnail src={data?.user.image} />
            </PopoverTrigger>

            <PopoverContent className="flex w-min flex-col gap-4" align="end">
                <div>
                    <p className="text-lg font-normal">{data?.user.name}</p>

                    {data?.user.email && <p className="text-foreground/80">{data?.user.email}</p>}
                </div>

                <div className="space-y-2">
                    <Link href="/workspace">
                        <Button
                            variant={"secondary"}
                            className="w-full justify-start gap-2 text-base font-medium hover:text-primary"
                        >
                            Mon compte
                        </Button>
                    </Link>

                    <LogoutButton />
                </div>
            </PopoverContent>
        </Popover>
    );
}
