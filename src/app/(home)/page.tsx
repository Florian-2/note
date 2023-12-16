import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default async function Home() {
    return (
        <div className="flex flex-col items-center gap-4 text-center">
            <h1 className="flex flex-col items-center text-3xl font-bold md:text-4xl">
                <span>Une idée ?</span>
                <span className="whitespace-nowrap">
                    Ne prenez aucun risque !
                </span>
                <span>Notez-la !</span>
            </h1>

            <h2 className="text-lg font-medium md:text-xl">
                Catégorisez, étiquetez et retrouvez vos notes en un clin d'œil
            </h2>

            <Link href={"/login"}>
                <Button className="text-lg">Essayer Note+</Button>
            </Link>

            <div className="mt-7 flex gap-20 md:gap-40">
                <Image
                    src={"/undraw_add_notes.svg"}
                    alt="Icon"
                    width={250}
                    height={250}
                    className="w-48 md:w-64"
                    priority
                />
                <Image
                    src={"/undraw_add_notes_reverse.svg"}
                    alt="Icon"
                    width={250}
                    height={250}
                    className="hidden sm:block sm:w-48 md:w-64"
                    priority
                />
            </div>
        </div>
    );
}
