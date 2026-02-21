import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import {
	type AuthVariables,
	authMiddleware,
} from "../../middleware/authMiddleware";
import { createTodoSchema, updateTodoSchema } from "./schema";
import { createTodo, deleteTodo, getTodos, updateTodo } from "./service";

export const todos = new Hono<{ Variables: AuthVariables }>()
	.use("*", authMiddleware)
	.post("/", zValidator("json", createTodoSchema), async (c) => {
		const user = c.get("user");
		const data = { ...c.req.valid("json"), userId: user.id };
		try {
			const todo = await createTodo(data);
			return c.json({ success: true, data: todo }, 201);
		} catch (error) {
			console.error(error);
			throw new HTTPException(400, { message: "Failed to create todo" });
		}
	})
	.get("/", async (c) => {
		const user = c.get("user");
		try {
			const todoList = await getTodos(user.id);
			return c.json({ success: true, data: todoList });
		} catch (error) {
			console.error(error);
			throw new HTTPException(400, { message: "Failed to fetch todos" });
		}
	})
	.put("/:id", zValidator("json", updateTodoSchema), async (c) => {
		const id = c.req.param("id");
		const data = c.req.valid("json");
		try {
			const todo = await updateTodo(id, data);
			return c.json({ success: true, data: todo });
		} catch (error) {
			console.error(error);
			throw new HTTPException(400, { message: "Failed to update todo" });
		}
	})
	.delete("/:id", async (c) => {
		const id = c.req.param("id");
		try {
			const result = await deleteTodo(id);
			return c.json({ success: true, data: result });
		} catch (error) {
			console.error(error);
			throw new HTTPException(400, { message: "Failed to delete todo" });
		}
	});
