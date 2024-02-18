import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

type Props = {
    disabled: boolean;
    onClick: () => void;
};

export function DeleteNote({ disabled, onClick }: Props) {
    return (
        <Button
            variant={"destructive"}
            className="mt-2 gap-2 text-base font-semibold"
            disabled={disabled}
            onClick={onClick}
        >
            <span>Supprimer</span>
            {disabled && <Loader size={16} className="animate-spin" />}
        </Button>
    );
}
