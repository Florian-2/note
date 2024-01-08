import { getAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import { LoginForm } from "../_components/login-form";

export default async function LoginPage() {
    const session = await getAuthSession();

    if (session?.user) {
        redirect("/workspace/folders");
    }

    return (
        <div className="relative -mt-32 flex flex-col gap-10">
            <h1 className="text-2xl font-medium">Inscription / Connexion</h1>

            <LoginForm />
        </div>
    );
}
