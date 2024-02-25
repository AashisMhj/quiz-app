import { ZodObject, ZodSchema } from "zod";

export const validate = <T>(ValidationSchema:ZodSchema<T>, data:any): T | null =>{
    try {
        const validatedData = ValidationSchema.parse(data);
        return validatedData;
    } catch (error) {
        return null;
    }

}