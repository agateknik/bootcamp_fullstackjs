import { Hono } from "hono";
import { prisma } from "../utils/prisma.js";
import { zValidator } from "@hono/zod-validator";
import { createEventValidation } from "../validation/event-validation.js";

const eventsRoute = new Hono();

eventsRoute
  .get("/", async (c) => {
    const events = await prisma.events.findMany({
      include: {
        participants: true,
      },
    });
    return c.json({ events }, 200);
  })
  .get("/:id", async (c) => {
    const id = c.req.param("id");
    const event = await prisma.events.findFirst({
      where: {
        id: id,
      },
      include: {
        participants: true,
      },
    });
    if (!event) {
      return c.json(
        {
          error: {
            code: "EVENT NOT FOUND",
            message: `Event with id: ${id} not found`,
          },
        },
        404
      );
    }
    return c.json({ event: event }, 200);
  })
  .post("/", zValidator("json", createEventValidation), async (c) => {
    const body = c.req.valid("json");
    const newEvent = await prisma.events.create({
      data: {
        name: body.name,
        description: body.description,
        dateTime: body.dateTime,
        location: body.location,
      },
    });
    return c.json({ event: newEvent }, 201);
  })
  .patch("/:id", async (c) => {
    const id = c.req.param("id");
    const body = await c.req.json();
    const updatedEvent = await prisma.events.update({
      where: {
        id: id,
      },
      data: {
        name: body.name,
        description: body.description,
        dateTime: body.dateTime,
        location: body.location,
      },
    });
    return c.json({ event: updatedEvent }, 200);
  })
  .delete("/:id", async (c) => {
    const id = c.req.param("id");
    await prisma.events.delete({
      where: {
        id: id,
      },
    });
    return c.json({ message: `Event with id: ${id} has been deleted` }, 200);
  });

export default eventsRoute;
