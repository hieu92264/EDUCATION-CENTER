import { z } from "zod";

export const CreateCategoryDTO = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .min(3, "Name must be at least 3 characters long")
    .max(50, "Name must be at most 50 characters long"),
});
