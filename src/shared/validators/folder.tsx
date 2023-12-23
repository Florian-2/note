import { z } from "zod";

export const DEFAULT_COLOR = "yellow";

export const createFolderSchema = z.object({
    name: z
        .string()
        .min(1, { message: "Le nom est obligatoire" })
        .max(50, { message: "50 caractères maximum" }),
    // file: z.boolean() Ajoute on non un fichier au dossier
});

export type CreateFolderType = z.infer<typeof createFolderSchema>;

export const searchFolderSchema = z.object({
    query: z.string().min(1, { message: "Veuillez renseigner un nom de dossier" }),
});

export const deleteFolderSchema = z.object({
    folderId: z.string().min(20, { message: "L'identifiant du dossier est requis" }),
});
