import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex h-full flex-col items-center justify-center gap-6">
            <Image
                src="/undraw_not_found.svg"
                alt="page not found"
                width={400}
                height={400}
                draggable={false}
            />

            <Link href="/">
                <Button className="items-center gap-2 text-lg">Accueil</Button>
            </Link>
        </div>
    );
}
