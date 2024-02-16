import { z } from "zod";

export const noteIdSchema = z.object({ noteId: z.string() });

export const createNoteSchema = z.object({
    name: z
        .string()
        .min(1, { message: "Le nom est obligatoire" })
        .max(50, { message: "50 caractères maximum" }),
    folderId: z.string().min(20),
});
export type CreateNoteType = z.infer<typeof createNoteSchema>;

export const updateNote = noteIdSchema.merge(z.object({ content: z.string().min(1) }));

export const updateNameNote = noteIdSchema.merge(z.object({ name: z.string().min(1) }));
export type UpdateNameNoteType = z.infer<typeof updateNameNote>;
