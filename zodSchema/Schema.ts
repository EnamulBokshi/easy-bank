import { z } from "zod";
export const formSchema = z.object({
    username: z.string().min(3,{
        message: "Username should be at least 3 characters long"
    }).max(50).regex(/^[a-zA-Z0-9_]*$/, "Username should not contain special characters"),
    email:z.string().email(),
    
    password: z.string().min(8,{
        message: "Password should be at least 8 characters long"
    }).max(50,{
        message: "Password should not exceed 50 characters"
    })
    .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Password should contain at least one uppercase letter, one lowercase letter, one number and one special character"),
    
    confirmPassword: z.string()
})
.superRefine((data, ctx) => {
    if (data.confirmPassword !== data.password) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["confirmPassword"],
            message: "Passwords do not match",
        });
    }
});

