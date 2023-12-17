import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type Props = {
    src?: string | null;
    fallback?: string | null;
};

export function Thumbnail({ src, fallback }: Props) {
    return (
        <Avatar>
            {src && (
                <>
                    <AvatarImage src={src} />
                    <AvatarFallback>{fallback}</AvatarFallback>
                </>
            )}
        </Avatar>
    );
}
