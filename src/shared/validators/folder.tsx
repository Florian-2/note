import { z } from "zod";

export const DEFAULT_COLOR = "yellow";

export const createFolderSchema = z.object({
    name: z
        .string()
        .min(1, { message: "Le nom est obligatoire" })
        .max(50, { message: "50 caractères maximum" }),
    color: z.string().default(DEFAULT_COLOR),
    // file: z.boolean() Ajoute on non un fichier au dossier
});

export type CreateFolderType = z.infer<typeof createFolderSchema>;
