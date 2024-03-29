import { folderRouter } from "@/server/api/routers/folders";
import { createTRPCRouter } from "@/server/api/trpc";
import { noteRouter } from "./routers/notes";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
    folders: folderRouter,
    notes: noteRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
