import { signOut } from "next-auth/react";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";

export function LogoutButton() {
    return (
        <Button
            variant="secondary"
            className="w-full justify-between gap-2 text-base hover:text-destructive"
            onClick={() => signOut()}
        >
            Déconnexion
            <LogOut size={16} strokeWidth={2.5} />
        </Button>
    );
}
