import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "@/server/api/trpc";

export const noteRouter = createTRPCRouter({
    hello: publicProcedure
        .input(z.object({ text: z.string() }))
        .query(({ input }) => {
            return {
                greeting: `Hello ${input.text}`,
            };
        }),

    // create: protectedProcedure
    //     .input(
    //         z.object({ title: z.string().min(1), content: z.string().min(1) }),
    //     )
    //     .mutation(async ({ ctx, input }) => {
    //         // simulate a slow db call
    //         await new Promise((resolve) => setTimeout(resolve, 1000));

    //         return ctx.db.note.create({
    //             data: {
    //                 title: input.title,
    //                 content: input.content,
    //                 createdBy: { connect: { id: ctx.session.user.id } },
    //             },
    //         });
    //     }),

    // getLatest: protectedProcedure.query(({ ctx }) => {
    //     console.log(ctx.session.user);

    //     return ctx.db.note.findFirst({
    //         orderBy: { createdAt: "desc" },
    //         where: { createdBy: { id: ctx.session.user.id } },
    //     });
    // }),

    getFolders: protectedProcedure.query(({ ctx }) => {
        const userId = ctx.session.user.id;

        return ctx.db.folder.findMany({
            where: { createdBy: { id: userId } },
            include: { notes: true },
        });
    }),

    getSecretMessage: protectedProcedure.query(() => {
        return "you can now see this secret message!";
    }),
});
