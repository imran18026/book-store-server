"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorValidationSchemas = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, {
            message: "Name is required",
        }),
        bio: zod_1.z
            .string({
            required_error: "Bio is optional",
        })
            .optional(),
        birthDate: zod_1.z.string().refine((value) => {
            const date = new Date(value);
            return !isNaN(date.getTime());
        }, {
            message: "Invalid date format",
        }),
    }),
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        bio: zod_1.z.string().optional(),
        birthDate: zod_1.z.string().optional(),
    }),
});
exports.authorValidationSchemas = {
    create,
    update,
};
