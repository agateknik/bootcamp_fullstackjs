import { z } from "zod";

const createParticipantVal = z.object({
  name: z.string().trim().min(1, "name is required"),
  email: z.email().transform((v) => v.toLowerCase().trim()),
  eventId: z.string().trim(),
});

const updateParticipantVal = z.object({
  name: z.string().trim().optional(),
  eventId: z.string().trim().optional(),
  email: z
    .email()
    .transform((v) => v.toLowerCase().trim())
    .optional(),
});

const queryParticipantVal = z.object({
  eventId: z.string().trim(),
});

const paramParticipantVal = z.object({
  id: z.string().trim(),
});

export {
  createParticipantVal,
  updateParticipantVal,
  queryParticipantVal,
  paramParticipantVal,
};
