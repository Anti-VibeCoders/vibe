import { z } from "zod"

export const restoreSchema = z.object({
    email: z.string().email(),
})