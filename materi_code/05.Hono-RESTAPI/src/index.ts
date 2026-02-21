import { Hono } from "hono";
import { todoRoute } from "../modules/todoRoute";


const app = new Hono();
app.route("/todos", todoRoute);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

export default app;
