import { z } from "zod";

export const createParticipantValidation = z.object({
  name: z.string().min(1),
  email: z.email(),
  eventId: z.string().min(1),
});
