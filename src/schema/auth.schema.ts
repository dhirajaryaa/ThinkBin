import z from "zod";

const emailSchema = z
    .string({ error: "Email is required" })
    .email("Please enter a valid email address");

const passwordSchema = z.string({ error: "Password is required" })
    .min(8, { error: "Password must be at least 8 characters" })
    .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
            error: "Password must contain at least one lowercase letter, one uppercase letter, one digit and one special character",
        },
    );
// login schema 
export const loginSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
});
// register schema 
export const signUpSchema = z.object({
    name: z.string({ error: 'Name is required' })
        .min(3, { error: "name must be at least 3 characters" })
        .max(60, { error: "Name must be less than or equal to 60 characters" }),
    email: emailSchema,
    password: passwordSchema,
});