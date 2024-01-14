import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { createFolderSchema, folderIdSchema, searchFolderSchema } from "@/shared/validators/folder";
import { z } from "zod";

export const folderRouter = createTRPCRouter({
    create: protectedProcedure.input(createFolderSchema).mutation(async ({ ctx, input }) => {
        try {
            const userId = ctx.session.user.id;

            return await ctx.db.folder.create({
                data: {
                    name: input.name,
                    createdBy: { connect: { id: userId } },
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

    getAllFolders: protectedProcedure.input(searchFolderSchema).query(({ ctx, input }) => {
        const userId = ctx.session.user.id;

        return ctx.db.folder.findMany({
            where: {
                createdBy: { id: userId },
                ...(input.query && { name: { contains: input.query } }),
                isArchived: false,
            },
            include: { _count: true },
            orderBy: { name: "asc" },
        });
    }),

    getDeletedFolders: protectedProcedure.input(searchFolderSchema).query(({ ctx, input }) => {
        const userId = ctx.session.user.id;

        return ctx.db.folder.findMany({
            where: {
                createdBy: { id: userId },
                ...(input.query && { name: { contains: input.query } }),
                isArchived: true,
            },
            include: { _count: true },
            orderBy: { name: "asc" },
        });
    }),

    getFolderByName: protectedProcedure
        .input(z.object({ name: z.string() }))
        .query(({ ctx, input }) => {
            const userId = ctx.session.user.id;

            return ctx.db.folder.findFirst({
                where: { createdBy: { id: userId }, AND: { name: input.name }, isArchived: false },
                include: { notes: true },
                orderBy: { name: "asc" },
            });
        }),

    getFolderById: protectedProcedure
        .input(z.object({ id: z.string() }))
        .query(({ ctx, input }) => {
            const userId = ctx.session.user.id;

            return ctx.db.folder.findFirst({
                where: { createdBy: { id: userId }, AND: { id: input.id }, isArchived: false },
                include: { notes: true },
                orderBy: { name: "asc" },
            });
        }),

    getAllFavoriteFolders: protectedProcedure.query(({ ctx }) => {
        const userId = ctx.session.user.id;

        return ctx.db.folder.findMany({
            where: { createdBy: { id: userId }, isFavorite: true },
            include: { _count: true },
            orderBy: { name: "asc" },
        });
    }),

    searchFolder: protectedProcedure.input(searchFolderSchema).mutation(({ ctx, input }) => {
        const userId = ctx.session.user.id;

        return ctx.db.folder.findMany({
            where: {
                createdBy: { id: userId },
                name: { contains: input.query },
                isArchived: false,
            },
            include: { _count: true },
            orderBy: { name: "asc" },
        });
    }),

    favoriteFolder: protectedProcedure.input(folderIdSchema).mutation(async ({ ctx, input }) => {
        const userId = ctx.session.user.id;

        return ctx.db.folder.update({
            where: { createdBy: { id: userId }, id: input.folderId },
            data: { isFavorite: true },
        });
    }),

    archiveFolder: protectedProcedure.input(folderIdSchema).mutation(async ({ ctx, input }) => {
        const userId = ctx.session.user.id;

        return ctx.db.folder.update({
            where: { createdBy: { id: userId }, id: input.folderId },
            data: { isArchived: true },
        });
    }),

    restoreFolder: protectedProcedure.input(folderIdSchema).mutation(async ({ ctx, input }) => {
        const userId = ctx.session.user.id;

        return ctx.db.folder.update({
            where: { createdBy: { id: userId }, id: input.folderId },
            data: { isArchived: false },
        });
    }),

    restoresAllArchivedFolders: protectedProcedure.mutation(async ({ ctx }) => {
        const userId = ctx.session.user.id;

        return ctx.db.folder.updateMany({
            where: { createdBy: { id: userId }, isArchived: true },
            data: { isArchived: false },
        });
    }),

    deletesAllArchivedFolders: protectedProcedure.mutation(async ({ ctx }) => {
        const userId = ctx.session.user.id;

        return ctx.db.folder.deleteMany({
            where: { createdBy: { id: userId }, isArchived: true },
        });
    }),
});
