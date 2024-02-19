import { z } from "zod";
import { folderIdSchema } from "./folder";

export const noteIdSchema = z.object({ noteId: z.string() });

export const createNoteSchema = folderIdSchema.merge(
    z.object({
        name: z
            .string()
            .min(1, { message: "Le nom est obligatoire" })
            .max(50, { message: "50 caractères maximum" }),
    }),
);

export type CreateNoteType = z.infer<typeof createNoteSchema>;

export const updateNote = noteIdSchema.merge(z.object({ content: z.string().min(1) }));

export const updateNameNote = noteIdSchema.merge(z.object({ name: z.string().min(1) }));
export type UpdateNameNoteType = z.infer<typeof updateNameNote>;

export const moveNoteSchema = noteIdSchema.merge(folderIdSchema);
export type MoveNoteType = z.infer<typeof moveNoteSchema>;

export const favoriteNoteSchema = noteIdSchema.merge(z.object({ isFavorite: z.boolean() }));
