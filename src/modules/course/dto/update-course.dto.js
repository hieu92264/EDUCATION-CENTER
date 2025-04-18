import { z } from "zod";

export const UpdateCourseDTO = z
  .object({
    name: z
      .string({
        required_error: "Course name is required",
        invalid_type_error: "Course name must be a string",
      })
      .min(5, "Course name must be at least 5 characters long")
      .max(50, "Course name must be at most 50 characters long"),

    categoryId: z
      .string({
        required_error: "Category ID is required",
        invalid_type_error: "Category ID must be a string",
      })
      .regex(/^[0-9a-fA-F]{24}$/, "Invalid category ID format"),

    price: z
      .number({
        required_error: "Price is required",
        invalid_type_error: "Price must be a number",
      })
      .min(0, "Price must be greater than or equal to 0"),

    description: z
      .string()
      .max(255, "Description must be at most 255 characters long")
      .optional(),
  })
  .partial();
