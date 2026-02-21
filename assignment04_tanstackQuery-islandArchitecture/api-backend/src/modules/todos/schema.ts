import { z } from "zod";

export const createTodoSchema = z.object({
	title: z.string(),
	completed: z.boolean().optional(),
});

export type CreateTodoInput = z.infer<typeof createTodoSchema> & {
	userId: string;
};
export const updateTodoSchema = z.object({
	title: z.string().optional(),
	completed: z.boolean().optional(),
});

export type UpdateTodoInput = z.infer<typeof updateTodoSchema>;
