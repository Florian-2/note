import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { getServerSession, Session, type NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import GithubProvider from "next-auth/providers/github";

import { env } from "@/env";
import { db } from "@/server/db";

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
    callbacks: {
        session: ({ session, user }) => {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: user.id,
                },
            };
        },
    },
    adapter: PrismaAdapter(db),
    providers: [
        DiscordProvider({
            clientId: env.DISCORD_CLIENT_ID,
            clientSecret: env.DISCORD_CLIENT_SECRET,
        }),
        GithubProvider({
            clientId: env.GITHUB_CLIENT_ID,
            clientSecret: env.GITHUB_CLIENT_SECRET,
        }),
    ],
    pages: {
        signIn: "/login",
    },
};

export const getAuthSession = (): Promise<Session | null> =>
    new Promise((res) =>
        setTimeout(() => res(getServerSession(authOptions)), 0),
    );
