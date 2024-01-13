import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { createNoteSchema, noteIdSchema } from "@/shared/validators/note";
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

    getNoteById: protectedProcedure.input(noteIdSchema).query(({ ctx, input }) => {
        const userId = ctx.session.user.id;

        return ctx.db.note.findFirst({
            where: { createdBy: { id: userId }, id: input.noteId },
        });
    }),

    deleteNote: protectedProcedure.input(noteIdSchema).mutation(({ ctx, input }) => {
        const userId = ctx.session.user.id;

        return ctx.db.note.delete({
            where: { createdBy: { id: userId }, id: input.noteId },
        });
    }),

    // Créer une note (vérifier qu'elle n'ets pas créer a partir d'un dossier supprimer)
});
