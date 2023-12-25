"use client";

import { Button } from "@/components/ui/button";

type Props = {
    onClick: () => void;
};

export function MoreFoldersButton({ onClick }: Props) {
    return <Button onClick={onClick}>More</Button>;
}
