"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookValidationSchemas = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(1, {
            message: "Title is required",
        }),
        description: zod_1.z
            .string({
            required_error: "Description is optional",
        })
            .optional(),
        authorId: zod_1.z.number({
            required_error: "Author id is required",
        }),
        publishedDate: zod_1.z.string().refine((value) => {
            const date = new Date(value);
            return !isNaN(date.getTime());
        }, {
            message: "Published date is invalid",
        }),
    }),
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        authorId: zod_1.z.string().optional(),
        publishedDate: zod_1.z.string().optional(),
    }),
});
exports.bookValidationSchemas = {
    create,
    update,
};
