import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { createFolderSchema } from "@/shared/validators/folder";

export const folderRouter = createTRPCRouter({
    create: protectedProcedure.input(createFolderSchema).mutation(async ({ ctx, input }) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        try {
            return await ctx.db.folder.create({
                data: {
                    name: input.name,
                    color: input.color,
                    createdBy: { connect: { id: ctx.session.user.id } },
                },
            });
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    throw new TRPCError({
                        code: "CONFLICT",
                    });
                }
            }
        }
    }),

    getAllFolders: protectedProcedure.query(({ ctx }) => {
        const userId = ctx.session.user.id;

        return ctx.db.folder.findMany({
            where: { createdBy: { id: userId } },
            include: { _count: true },
            orderBy: { createdAt: "asc" },
        });
    }),
});
