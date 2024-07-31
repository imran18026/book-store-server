import { z } from "zod";

const create = z.object({
  body: z.object({
    name: z.string().min(1, {
      message: "Name is required",
    }),
    bio: z
      .string({
        required_error: "Bio is optional",
      })
      .optional(),
    birthDate: z.string().refine(
      (value) => {
        const date = new Date(value);
        return !isNaN(date.getTime());
      },
      {
        message: "Invalid date format",
      }
    ),
  }),
});

const update = z.object({
  body: z.object({
    name: z.string().optional(),
    bio: z.string().optional(),
    birthDate: z.string().optional(),
  }),
});

export const authorValidationSchemas = {
  create,
  update,
};
