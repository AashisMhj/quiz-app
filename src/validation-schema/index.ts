import {z} from "zod";

export const start_exam = z.object({
    tags: z.array(z.number())
})