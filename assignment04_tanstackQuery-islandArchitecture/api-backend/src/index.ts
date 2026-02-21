import "dotenv/config";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { HTTPException } from "hono/http-exception";
import { auth } from "./modules/auth/route";
import { profile } from "./modules/profile/route";
import { todos } from "./modules/todos/route";
import { logger } from "hono/logger";
import { mockTodos } from "./modules/mock/route";

const app = new Hono()
	.use(cors())
	.use(logger())
	.onError((err, c) => {
		if (err instanceof HTTPException) {
			return c.json({ error: err.message }, err.status);
		}

		if (err.name === "ZodError") {
			return c.json({ error: err }, 400);
		}

		console.error(err);
		return c.json({ error: err.message || "Internal Server Error" }, 500);
	})
	.route("/auth", auth)
	.route("/profile", profile)
	.route("/todos", todos)
	.route("/mock-todos", mockTodos);

serve(
	{
		fetch: app.fetch,
		port: 8000,
	},
	(info) => {
		console.log(`Server is running on http://localhost:${info.port}`);
	},
);
