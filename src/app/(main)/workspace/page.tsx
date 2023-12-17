import { getAuthSession } from "@/server/auth";

export default async function Main() {
    const session = await getAuthSession();

    return (
        <div>
            <h1 className="text-2xl">Main</h1>
            <p>{session?.user.name}</p>
        </div>
    );
}
