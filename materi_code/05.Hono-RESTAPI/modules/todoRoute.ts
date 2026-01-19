import { Hono } from "hono";
import { todos, incrementTodoId, nextId } from "../utils/db";
import type { Todo } from "../utils/db";
import { HTTPException } from "hono/http-exception";
import { METHOD_NAME_ALL_LOWERCASE } from "hono/router";
import { except } from "hono/combine";
//import type { Todos } from "../utils/db";

//GET untuk mengambil data dari sebuah database
export const todoRoute = new Hono()
  .get("/", (c) => {
    return c.json(
      {
        success: true,
        data: todos,
        total: todos.length,
      },
      200
    );
  })
  .get("/:id", (c) => {
    const id = parseInt(c.req.param("id"));
    const todo = todos.find((t) => t.id === id);

    if (!todo) {
      throw new HTTPException(404, { message: "To do not found" });
    }

    return c.json(
      {
        success: true,
        data: todo,
      },
      200
    );
  })
  .post("/", async (c) => {
    try {
      const body = await c.req.json();

      //validasi manual
      if (!body.title || typeof body.title !== "string") {
        throw new HTTPException(400, {
          message: "Title is required and must be a string",
        });
      }
      if (body.title.trim().length === 0) {
        throw new HTTPException(400, { message: "title tidak boleh kosong" });
      }

      //baru buat todo baru
      const newTodo: Todo = {
        id: incrementTodoId(),
        title: body.title,
        completed: body.completed || false,
        createdAt: new Date(),
      };
      todos.push(newTodo);

      return c.json(
        {
          succes: true,
          data: {
            id: newTodo.id,
            title: newTodo.title,
            completed: newTodo.completed,
          },
          message: "Todo created successfully",
        },
        201
      );
    } catch (error) {
      throw new HTTPException(400, { message: "Bad Request" });
    }
  })
  .put("/:id", async (c) => {
    try {
      const id = parseInt(c.req.param("id"));
      const body = await c.req.json();

      //cari todo
      const todo = todos.find((t) => t.id === id);
      //kalau id tidak ditemukan
      if (!todo) {
        throw new HTTPException(404, { message: "todo not found" });
      }

      //kalau data title todo ada
      if (body.title !== undefined) {
        if (typeof body.title !== "string" || body.title.trim().length === 0) {
          throw new HTTPException(400, {
            message: "title is required and not valid",
          });
        }
        //lanjut update title kalau memang ada
        todo.title = body.title.trim();
      }

      //kalau data completed ada
      if (body.completed !== undefined) {
        if (typeof body.completed !== "boolean") {
          throw new HTTPException(400, {
            message: "completed must be boolean",
          });
        }
        //lanjut update status completed
        todo.completed = body.completed;
      }

      return c.json({
        success: true,
        data: {
          id: todo.id,
          title: todo.title,
          completed: todo.completed,
        },
        message: "todo updated successfully",
      });
    } catch (error) {
      if (error instanceof HTTPException) {
        throw error;
      }
      throw new HTTPException(400, { message: "bad request" });
    }
  })
  .delete("/:id", async (c) => {
    try {
      const id = parseInt(c.req.param("id"));
      const todoIndex = todos.findIndex((t) => t.id === id);

      if (todoIndex === -1) {
        throw new HTTPException(404, { message: "todo not found" });
      }

      const deletedTodo = todos.splice(todoIndex, 1)[0];

      return c.json({
        success: true,
        data: {
          id: deletedTodo.id,
          title: deletedTodo.title,
          completed: deletedTodo.completed,
        },
        message: "todo deleted successfully",
      });
    } catch (error) {
      throw new HTTPException(400, { message: "bad request" });
    }
  });
