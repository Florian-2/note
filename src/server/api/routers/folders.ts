import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    createFolderSchema,
    deleteFolderSchema,
    searchFolderSchema,
} from "@/shared/validators/folder";

export const folderRouter = createTRPCRouter({
    create: protectedProcedure.input(createFolderSchema).mutation(async ({ ctx, input }) => {
        try {
            return await ctx.db.folder.create({
                data: {
                    name: input.name,
                    createdBy: { connect: { id: ctx.session.user.id } },
                },
                include: { _count: true },
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
            orderBy: { name: "asc" },
        });
    }),

    searchFolder: protectedProcedure.input(searchFolderSchema).mutation(({ ctx, input }) => {
        const userId = ctx.session.user.id;

        return ctx.db.folder.findMany({
            where: { createdBy: { id: userId }, name: { contains: input.query } },
            include: { _count: true },
            orderBy: { name: "asc" },
        });
    }),

    deleteFolder: protectedProcedure.input(deleteFolderSchema).mutation(async ({ ctx, input }) => {
        const userId = ctx.session.user.id;

        return ctx.db.folder.delete({
            where: { createdBy: { id: userId }, id: input.folderId },
        });
    }),
});
