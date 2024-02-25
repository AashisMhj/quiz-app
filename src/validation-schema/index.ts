import {z} from "zod";

export const StartExam = z.object({
    tags: z.array(z.number())
})