import { z } from "zod";

const create = z.object({
  body: z.object({
    title: z.string().min(1, {
      message: "Title is required",
    }),
    description: z
      .string({
        required_error: "Description is optional",
      })
      .optional(),
    authorId: z.number({
      required_error: "Author id is required",
    }),
    publishedDate: z.string().refine(
      (value) => {
        const date = new Date(value);
        return !isNaN(date.getTime());
      },
      {
        message: "Published date is invalid",
      }
    ),
  }),
});

const update = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    authorId: z.string().optional(),
    publishedDate: z.string().optional(),
  }),
});

export const bookValidationSchemas = {
  create,
  update,
};
