import { z } from "zod";

export const CreateClassDTO = z.object({
  name: z
    .string()
    .min(5, "Name must be at least 5 characters long")
    .max(50, "Name must be at most 50 characters long"),

  courseId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Course ID format"),

  teacherId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Teacher ID format"),

  students: z
    .array(z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid User ID"))
    .optional(),

  startDate: z
    .string()
    .or(z.date())
    .refine((val) => new Date(val).toString() !== "Invalid Date", {
      message: "Invalid start date",
    }),

  description: z.string().max(255).optional(),
});
