import { z } from "zod";

export const CreateUserDTO = z.object({
  fullname: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .min(3, "Name must be at least 3 characters long")
    .max(50, "Name must be at most 50 characters long")
    .trim(),
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required")
    .trim(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(100, "Password must be at most 100 characters long")
    .nonempty("Password is required")
    .trim(),
  address: z
    .string()
    .min(10, "Address must be at least 10 characters long")
    .max(100, "Address must be at most 100 characters long")
    .trim(),
  phone_number: z.string().trim(),
  role: z.enum(["student", "admin", "teacher"]).default("student"),
  dob: z.string().trim(),
});
