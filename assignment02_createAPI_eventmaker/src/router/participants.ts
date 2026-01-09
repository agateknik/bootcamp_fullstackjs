import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { prisma } from "../utils/prisma.js";
import {
  createParticipantVal,
  updateParticipantVal,
  queryParticipantVal,
  paramParticipantVal,
} from "../validation/participant-validator.js";

// Method chaining membuat kode lebih bersih dan lebih mudah dibaca
// Semua route didefinisikan dalam satu instance Hono, mengikuti pola yang sama dengan events.ts
export const participantsRoute = new Hono()
  // GET /participants?eventId=xxx - Tampilkan peserta untuk event tertentu
  // Kenapa: Parameter query sangat cocok untuk menyaring data
  // Ini menjaga URL kita tetap bersih dan RESTful
  .get("/", zValidator("query", queryParticipantVal), async (c) => {
    const { eventId } = c.req.valid("query");
    // Kenapa filter berdasarkan eventId : untuk mencegah menampilkan semua peserta
    // juga memastikan privasi data dan penanganan relasi yang tepat
    try {
      const participants = await prisma.participant.findMany({
        where: {
          eventId: eventId,
        },
      });
      return c.json(
        {
          data: participants,
        },
        200
      );
    } catch (error) {
      console.error(
        `Failed to get participants for event with id ${eventId}`,
        error
      );
      return c.json({ message: "Failed to retrieve participants" }, 500);
    }
  })
  .post("/", zValidator("json", createParticipantVal), async (c) => {
    // POST /participants - Buat peserta baru
    // Kenapa: Kita memvalidasi event ada sebelum membuat peserta
    // Ini mencegah peserta yatim (peserta tanpa event)
    try {
      const body = c.req.valid("json");

      const event = await prisma.event.findUnique({
        where: {
          id: body.eventId,
        },
      });
      if (!event) {
        //validasi event ada sebelum membuat peserta
        // Mencegah error database relasi dan data yatim
        return c.json(
          { message: "Event not found, can not create participant data" },
          404
        );
      }
      const newParticipant = await prisma.participant.create({
        data: {
          name: body.name,
          email: body.email,
          eventId: body.eventId,
        },
      });
      return c.json(
        {
          data: newParticipant,
          message: "Participant created successfully",
        },
        201
      );
    } catch (error) {
      console.error(`Failed to create participant data`, error);
      return c.json({ message: "Failed to create participant" }, 500);
    }
  })
  .patch(
    // PATCH /participants/:id - Update peserta
    // Skema validasi terpisah untuk create vs update
    // Update mengizinkan perubahan parsial (field opsional), create membutuhkan semuanya
    "/:id",
    zValidator("param", paramParticipantVal),
    zValidator("json", updateParticipantVal),
    async (c) => {
      const { id } = c.req.valid("param");

      try {
        const body = c.req.valid("json");
        const existingParticipant = await prisma.participant.findUnique({
          where: {
            id: id,
          },
        });
        if (!existingParticipant) {
          // Cek keberadaan sebelum update
          // dan Memberikan respons 404 yang jelas jika peserta tidak ditemukan
          return c.json({ message: "Participant not found" }, 404);
        }

        const event = await prisma.event.findUnique({
          where: {
            id: body.eventId,
          },
        });
        if (!event) {
          return c.json({ message: "Event not found" }, 404);
        }

        const updatedParticipant = await prisma.participant.update({
          where: {
            id: id,
          },
          data: {
            name: body.name,
            email: body.email,
            eventId: body.eventId,
          },
        });
        return c.json(
          {
            data: updatedParticipant,
            message: "Participant updated successfully",
          },
          200
        );
      } catch (error) {
        console.error(
          `failed to update data of participant with id=${id}`,
          error
        );
        return c.json({ message: "Failed to update participant" }, 500);
      }
    }
  )
  .delete("/:id", zValidator("param", paramParticipantVal), async (c) => {
    // DELETE /participants/:id - Hapus peserta
    // Periksa keberadaan sebelum penghapusan untuk memberikan respons 404 yang tepat
    // Ini memberikan umpan balik yang jelas kepada pengguna tentang apa yang terjadi
    const { id } = c.req.valid("param");
    try {
      const existingParticipant = await prisma.participant.findUnique({
        where: {
          id: id,
        },
      });
      if (!existingParticipant) {
        return c.json(
          { message: "Participant not found, cannot delete anything" },
          404
        );
      }

      await prisma.participant.delete({
        where: {
          id: id,
        },
      });
      return c.json(
        {
          message: "Participant deleted successfully",
        },
        200
      );
    } catch (error) {
      console.error(`Failed to delete participant with id=${id}`, error);
      return c.json({ message: "Failed to delete participant" }, 500);
    }
  });
