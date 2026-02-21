import { Hono } from "hono";

export const mockTodos = new Hono().get("/", async (c) => {
  const throttle = c.req.query("throttle") === "true";

  if (throttle) {
    await new Promise((resolve) => setTimeout(resolve, 5000));
  }

  const mockTodos = Array.from({ length: 10 }, (_, i) => ({
    id: `mock-${i + 1}`,
    title: `Mock todo ${i + 1}`,
    completed: false,
    userId: "mock-user",
    createdAt: new Date().toISOString(),
  }));

  return c.json(mockTodos);
});
