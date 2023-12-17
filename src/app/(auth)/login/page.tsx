import { getAuthSession } from "@/server/auth";
import { LoginForm } from "../_components/login-form";
import { redirect } from "next/navigation";

export default async function LoginPage() {
    const session = await getAuthSession();

    if (session?.user) {
        redirect("/workspace");
    }

    return <LoginForm />;
}
