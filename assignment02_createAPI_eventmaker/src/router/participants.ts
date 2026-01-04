import { Hono } from "hono";
import { prisma } from "../utils/prisma.js";
import { zValidator } from "@hono/zod-validator";
import { createParticipantValidation } from "../validation/participant-validation.js";

const participantsRoute = new Hono();

participantsRoute
  .get("/", async (c) => {
    const participants = await prisma.participants.findMany({
      include: {
        event: true,
      },
    });
    return c.json({ participants: participants });
  })
  .get("/:id", async (c) => {
    const id = c.req.param("id");
    const participant = await prisma.participants.findFirst({
      where: {
        id: id,
      },
      include: {
        event: true,
      },
    });
    if (!participant) {
      return c.json(
        {
          error: {
            code: "PARTICIPANT NOT FOUND",
            message: `Participant with id: ${id} not found`,
          },
        },
        404
      );
    }
    return c.json({ participant: participant }, 200);
  })
  .post("/", zValidator("json", createParticipantValidation), async (c) => {
    const body = c.req.valid("json");
    const newParticipant = await prisma.participants.create({
      data: {
        name: body.name,
        email: body.email,
        eventId: body.eventId,
      },
    });
    return c.json({ participant: newParticipant }, 201);
  })
  .patch("/:id", async (c) => {
    const id = c.req.param("id");
    const body = await c.req.json();
    const updateParticipant = await prisma.participants.update({
      where: {
        id: id,
      },
      data: {
        name: body.name,
        email: body.email,
        eventId: body.eventId,
      },
    });
    return c.json({ participant: updateParticipant }, 200);
  })
  .delete("/:id", async (c) => {
    const id = c.req.param("id");
    await prisma.participants.delete({
      where: {
        id: id,
      },
    });
    return c.json(
      { message: `Participant with id: ${id} has been deleted` },
      200
    );
  });

export default participantsRoute;
