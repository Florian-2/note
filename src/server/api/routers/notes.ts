import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import {
    createNoteSchema,
    noteIdSchema,
    updateNameNote,
    updateNote,
} from "@/shared/validators/note";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { TRPCError } from "@trpc/server";

export const noteRouter = createTRPCRouter({
    createNote: protectedProcedure.input(createNoteSchema).mutation(async ({ ctx, input }) => {
        try {
            const userId = ctx.session.user.id;

            return await ctx.db.note.create({
                data: {
                    name: input.name,
                    content: "",
                    createdBy: { connect: { id: userId } },
                    folder: { connect: { id: input.folderId } },
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

    // Créer une note (vérifier qu'elle n'est pas créer a partir d'un dossier supprimer)

    getNoteById: protectedProcedure.input(noteIdSchema).query(({ ctx, input }) => {
        const userId = ctx.session.user.id;

        return ctx.db.note.findFirst({
            where: { createdBy: { id: userId }, id: input.noteId },
            include: { folder: { select: { name: true } } },
        });
    }),

    deleteNote: protectedProcedure.input(noteIdSchema).mutation(({ ctx, input }) => {
        const userId = ctx.session.user.id;

        return ctx.db.note.delete({
            where: { createdBy: { id: userId }, id: input.noteId },
        });
    }),

    updateNote: protectedProcedure.input(updateNote).mutation(({ ctx, input }) => {
        const userId = ctx.session.user.id;

        return ctx.db.note.update({
            where: { createdBy: { id: userId }, id: input.noteId },
            data: { content: input.content },
        });
    }),

    updateNameNote: protectedProcedure.input(updateNameNote).mutation(({ ctx, input }) => {
        const userId = ctx.session.user.id;

        return ctx.db.note.update({
            where: { createdBy: { id: userId }, id: input.noteId },
            data: { name: input.name },
        });
    }),
});
